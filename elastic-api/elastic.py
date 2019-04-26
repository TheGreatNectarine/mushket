from elasticsearch_async import AsyncElasticsearch


# subject = {'id': subject_id, plus all needed information}
async def index(es, subject: dict):
    print(f'INSERTING SUBJECT WITH ID: {subject["id"]}')
    await es.index(index='subjects', doc_type='subject', id=subject['id'], body=subject)


async def search(es, keywords: str):
    body = {
        "query": {
            "multi_match": {
                "query": keywords,
                "fields": ["title", "description"]  # subject fields that you wanna search
            }
        }
    }
    res = await es.search(index='subjects', body=body, sort='_score')
    return res['hits']['hits']


async def init_es(app):
    es = AsyncElasticsearch(hosts=app['config']['elastic-host'])
    # es.indices.delete(index='vacancies', ignore=[400, 404])  # if needed to drop previous indexes
    app['es'] = es


async def close_es(app):
    await app['es'].transport.close()
    # await app['es'].transport.wait_closed()
