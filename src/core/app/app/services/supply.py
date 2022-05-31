from sqlalchemy.orm import Session
from what3words import what3words

from app import crud
from app.models import Supplier
from app.schemas import SupplyCreate, Coordinates


def add_supplier(db: Session, geocoder: what3words.Geocoder, *, request: SupplyCreate) -> Supplier:
    coordinates = None
    if request.postcode is not None:
        if request.postcode.startswith('///') or len(request.postcode.split('.')) == 3:
            resp = geocoder.convert_to_coordinates(request.postcode)
            coordinates_resp = resp['coordinates']
            coordinates = Coordinates(lat=coordinates_resp['lat'], lng=coordinates_resp['lng'])
    return crud.supplier.create_from_request(db, request=request, converted_coordinates=coordinates)
