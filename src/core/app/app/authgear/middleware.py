import json
from contextlib import closing
from typing import Optional
from urllib.request import urlopen

from jwcrypto.jwk import JWKSet
from jwcrypto.jwt import JWT
from starlette.middleware.base import BaseHTTPMiddleware, RequestResponseEndpoint
from starlette.requests import Request
from starlette.responses import Response
from starlette.types import ASGIApp


def fetch_jwks_uri(endpoint: str) -> str:
    u = endpoint + "/.well-known/openid-configuration"
    with closing(urlopen(u)) as f:
        doc = json.load(f)
    jwks_uri = doc["jwks_uri"]
    return jwks_uri


def fetch_jwks(jwks_uri: str) -> JWKSet:
    with closing(urlopen(jwks_uri)) as f:
        return JWKSet.from_json(f.read())


def get_jwt_token(request: Request) -> Optional[str]:
    authorization = request.headers.get("authorization")
    if authorization is None:
        return None

    parts = authorization.split(" ")
    if len(parts) != 2:
        return None

    scheme = parts[0]
    if scheme.lower() != "bearer":
        return None

    return parts[1]


class AuthgearMiddleware(BaseHTTPMiddleware):
    def __init__(self, app: ASGIApp, endpoint: str) -> None:
        super().__init__(app)
        self.endpoint = endpoint
        self.jwk_set = None

    def get_jwk_set(self) -> JWKSet:
        if self.jwk_set is not None:
            return self.jwk_set
        jwks_uri = fetch_jwks_uri(self.endpoint)
        jwk_set = fetch_jwks(jwks_uri)
        self.jwk_set = jwk_set
        return jwk_set

    async def dispatch(self, request: Request, call_next: RequestResponseEndpoint) -> Response:
        request.state.user_id = None
        raw_token = get_jwt_token(request)
        jwk_set = self.get_jwk_set()
        if raw_token is not None:
            try:
                jwt_token = JWT(jwt=raw_token, key=jwk_set)
                claims = json.loads(jwt_token.claims)
                sub = claims["sub"]
                request.state.user_id = sub
            except:
                pass
        return await call_next(request)
