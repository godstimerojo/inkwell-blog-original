# Inkwell blog

An Express + EJS personal blog with in-memory post management.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:5050`.

## Project structure

- `views/index.ejs` — dynamic home page that lists posts
- `views/post-form.ejs` — shared create/edit form
- `views/partials/` — shared header and footer
- `public/css/` — browser-facing styles entry point
- `public/js/` — browser-facing behaviour
- `server.js` — ES module Express server and in-memory CRUD routes

## Features

- Create a post at `/posts/new`
- View all posts on `/`
- Edit or delete any post from the home page
- Posts are deliberately held in memory and reset when the server restarts
