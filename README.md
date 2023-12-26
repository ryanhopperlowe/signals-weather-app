# React + Vite + Bun + Signals

This is a project that I'm using to test the practical usage of signals in React, as well as practice with some newer tools like Bun and Vite

## Prereqs

- Must have a JavaScript runitme installed (node, deno, **bun**, etc.)
- Must have a package manager installed as well (npm, yarn, **bun**, etc.)
- Must have a free api key from [https://www.weatherapi.com/](https://www.weatherapi.com/)

## Steps to run (examples will use **bun**, but you can always replace `bun` with `yarn`, `pnpm`, or `npm`)

- clone repository
- create a file `.env` and add `VITE_WEATHER_API_KEY="<your-api-key>"`
- from within project directory, run `bun install`
- run command `bun run build`
- run command `bun run start`
