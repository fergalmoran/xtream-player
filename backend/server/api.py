import logging

import uvicorn
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse

from server import config
from server.lib.streamer import Streamer
from server.lib.xtream import XTream

logging.basicConfig(format="%(levelname)s:%(message)s", level=logging.DEBUG)
logger = logging.getLogger(__name__)

# epg = EPGParser(
#     config.provider['epgurl']
# )
app = FastAPI()
origins = [
    "https://dev-streams.fergl.ie:3000",
    "https://streams.fergl.ie",
    "http://127.0.0.1:35729",
    "http://localhost:35729",
    "https://bitmovin.com",
    "https://players.akamai.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# @app.get("/epg/{channel_id}")
# async def get_channel_epg(channel_id):
#     listings = epg.get_listings(channel_id)
#     return listings

def __get_provider(request: Request):
    return XTream(
        request.headers.get("x-xtream-server"),
        request.headers.get("x-xtream-username"),
        request.headers.get("x-xtream-password"),
    )


@app.get("/channels")
async def channels(request: Request):
    provider = __get_provider(request)
    categories = provider.get_categories()
    return categories.json()


@app.get("/streams/{category_id}")
async def read_item(category_id, request: Request):
    provider = __get_provider(request)
    streams = provider.get_streams_for_category(category_id)
    return streams.json()


@app.get("/live/stream/{stream_id}")
async def get_live_stream(stream_id: str, request: Request):
    provider = __get_provider(request)
    url = provider.get_live_stream_url(stream_id)
    return StreamingResponse(Streamer.receive_stream(url), media_type="video/mp2t")


@app.get("/live/stream/url/{stream_id}")
async def get_live_stream(stream_id: str, request: Request):
    provider = __get_provider(request)
    url = provider.get_live_stream_url(stream_id)
    return {
        "url": url
    }


if __name__ == '__main__':
    uvicorn.run("api:app",
                host="0.0.0.0",
                port=8000,
                reload=True,
                ssl_keyfile="/etc/letsencrypt/live/fergl.ie/privkey.pem",
                ssl_certfile="/etc/letsencrypt/live/fergl.ie/fullchain.pem"
                )
