from fastapi import APIRouter, Depends
from httpx import AsyncClient

from app import schemas
from app.api import deps
from app.services import posttag

router = APIRouter()


@router.get("", response_model=schemas.SearchAddressResponse)
async def search_by_postcode(
    term: str, posttag_client: AsyncClient = Depends(deps.get_posttag_client)
) -> schemas.SearchAddressResponse:
    response = await posttag.search_address(client=posttag_client, postcode=term)
    return schemas.SearchAddressResponse(data=response)
