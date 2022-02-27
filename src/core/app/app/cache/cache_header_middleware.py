from starlette.middleware.base import BaseHTTPMiddleware, RequestResponseEndpoint
from starlette.requests import Request
from starlette.responses import Response
from starlette.types import ASGIApp

from cashews import Cache, context_cache_detect


class CacheHeaderMiddleware(BaseHTTPMiddleware):
    def __init__(self, app: ASGIApp, cache: Cache) -> None:

        super().__init__(app)
        self.app = app
        self.cache = cache

    async def dispatch(self, request: Request, call_next: RequestResponseEndpoint) -> Response:
        with context_cache_detect as detector:
            response = await call_next(request)
            if detector.keys:
                key = list(detector.keys.keys())[0]
                response.headers["X-From-Cache"] = key
                expire = await self.cache.get_expire(key)
                response.headers["X-From-Cache-Expire-In-Seconds"] = str(expire)
                if "exc" in detector.keys[key]:
                    response.headers["X-From-Cache-Exc"] = str(detector.keys[key]["exc"])
            return response
