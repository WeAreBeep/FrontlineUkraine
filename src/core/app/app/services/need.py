from sqlalchemy.orm import Session
from what3words import what3words

from app import crud
from app.models import Need
from app.schemas import NeedCreate, Coordinates


def add_need(db: Session, geocoder: what3words.Geocoder, *, request: NeedCreate) -> Need:
    coordinates = None
    if request.postcode is not None:
        if request.postcode.startswith('///') or len(request.postcode.split('.')) == 3:
            resp = geocoder.convert_to_coordinates(request.postcode)
            coordinates_resp = resp['coordinates']
            coordinates = Coordinates(lat=coordinates_resp['lat'], lng=coordinates_resp['lng'])
    return crud.need.create_from_request(db, request=request, converted_coordinates=coordinates)
