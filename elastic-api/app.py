from aiohttp import web

from elastic import init_es, close_es
from routes import setup_routes
from setting import get_config


async def init_app():
    app = web.Application()
    app['config'] = get_config()

    app.on_startup.append(init_es)
    app.on_cleanup.append(close_es)

    setup_routes(app)
    return app


def main():
    app = init_app()
    config = get_config()

    web.run_app(app, host=config['host'], port=config['port'])


if __name__ == '__main__':
    main()
