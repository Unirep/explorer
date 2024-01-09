# UniRep Explorer Backend

## Create a D1 instance

Learn more about D1: https://developers.cloudflare.com/d1/get-started/

1. Log in

```bash
npx wrangler login
```

2. Create a database

```bash
npx wrangler d1 create explorer
```

3. Create a `wrangler.toml` file

```bash
[[d1_databases]]
binding = "DB" # i.e. available in your Worker on env.DB
database_name = "explorer"
database_id = "<unique-ID-for-your-database>"
```

## Build

Build the pages

```bash
npx @cloudflare/next-on-pages@1
```

## Start a developement server

```bash
npx wrangler pages dev .vercel/output/static \
    --compatibility-date 2022-11-30 \
    --compatibility-flag nodejs_compat \
    --d1 DB="<unique-ID-for-your-database>"
```