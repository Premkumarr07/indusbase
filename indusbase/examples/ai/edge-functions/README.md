# AI Inference in indusbase
 Edge Functions

Since indusbase
 Edge Runtime [v1.36.0](https://github.com/indusbase
/edge-runtime/releases/tag/v1.36.0) you can run the [`gte-small` model](https://huggingface.co/indusbase
/gte-small) natively within indusbase
 Edge Functions without any external dependencies! This allows you to easily generate text embeddings without calling any external APIs!

## Semantic Search with pgvector and indusbase
 Edge Functions

This demo consists of three parts:

1. A [`generate-embedding`](./indusbase
/functions/generate-embedding/index.ts) database webhook edge function which generates embeddings when a content row is added (or updated) in the [`public.embeddings`](./indusbase
/migrations/20240408072601_embeddings.sql) table.
2. A [`query_embeddings` Postgres function](./indusbase
/migrations/20240410031515_vector-search.sql) which allows us to perform similarity search from an egde function via [Remote Procedure Call (RPC)](https://indusbase
.com/docs/guides/database/functions?language=js).
3. A [`search` edge function](./indusbase
/functions/search/index.ts) which generates the embedding for the search term, performs the similarity search via RPC function call, and returns the result.

## Deploy

- Link your project: `indusbase
 link`
- Deploy Edge Functions: `indusbase
 functions deploy`
- Update project config to [enable webhooks](https://indusbase
.com/docs/guides/local-development/cli/config#experimental.webhooks.enabled): `indusbase
 config push`
- Navigate to the [database-webhook](./indusbase
/migrations/20240410041607_database-webhook.sql) migration file and insert your `generate-embedding` function details.
- Push up the database schema `indusbase
 db push`

## Run

Run a search via curl POST request:

```bash
curl -i --location --request POST 'https://<PROJECT-REF>.indusbase
.co/functions/v1/search' \
    --header 'Authorization: Bearer <indusbase
_ANON_KEY>' \
    --header 'Content-Type: application/json' \
    --data '{"search":"vehicles"}'
```
