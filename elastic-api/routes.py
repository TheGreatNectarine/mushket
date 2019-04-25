from aiohttp import web

from elastic import index, search


async def add_index(request):
    body = await request.json()
    try:
        subject = {
            'id': body.get('id'),
            'title': body.get('title'),
            'description': body.get('description'),
            'annotations': body.get('annotations'),
            'teacher': body.get('teacher')
        }
    except KeyError:
        raise web.HTTPBadRequest()

    print(body)
    await index(request.app['es'], subject)
    return web.json_response({'success': True})


async def get_res(request):
    if 'keywords' not in request.query:
        raise web.HTTPBadRequest()

    print(request.query['keywords'])
    return web.json_response(await search(request.app['es'], request.query['keywords']))


def setup_routes(app):
    router = app.router

    router.add_route('POST', '/addIndex', add_index, name='add_index')
    router.add_route('GET', '/search', get_res, name='search')
