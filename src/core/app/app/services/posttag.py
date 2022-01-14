from typing import List

import httpx

from app.core.config import settings
from app.schemas import AddressEntry, PosttagPostcodeFullResponse


def _append_credentials_params(params: httpx.QueryParams) -> httpx.QueryParams:
    return params.merge({"key": settings.POSTTAG_API_KEY, "id": settings.POSTTAG_ID,})


async def _get(*, client: httpx.AsyncClient, path: str, params: httpx.QueryParams):
    response = await client.get(path, params=params,)
    return response.json()


def get_posttag_http_client() -> httpx.AsyncClient:
    return httpx.AsyncClient(base_url=settings.POSTTAG_ENDPOINT)


async def search_address(
    client: httpx.AsyncClient, postcode: str
) -> List[AddressEntry]:
    params = httpx.QueryParams({"cmd": "postcodefull", "postcode": postcode})
    params = _append_credentials_params(params)
    response = await _get(client=client, path="/GTP034.php", params=params)
    data = PosttagPostcodeFullResponse(**response)
    return [AddressEntry.from_response_data(data=d) for d in data.data]
