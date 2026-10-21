import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 5050;
let nextPostId = 3;
let posts = [
  { id: 1, title: 'The pleasure of getting lost', content: 'In an age that rewards efficiency above all else, there is a quiet joy in choosing the slower path. This is a note on wandering without a destination and making space for the unexpected.', createdAt: new Date('2024-10-14') },
  { id: 2, title: 'Make room for the unfinished', content: 'A creative life is rarely tidy. The things we return to, revise, and leave open often teach us more than the work we finish on schedule.', createdAt: new Date('2024-09-15') }
];

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (_request, response) => {
  response.render('index', { title: 'Inkwell — Your personal journal', posts });
});

app.get('/posts/new', (_request, response) => {
  response.render('post-form', { title: 'New post — Inkwell', heading: 'Write a new post', post: {}, action: '/posts', buttonLabel: 'Publish post' });
});

app.post('/posts', (request, response) => {
  const title = request.body.title?.trim();
  const content = request.body.content?.trim();
  if (!title || !content) return response.status(400).render('post-form', { title: 'New post — Inkwell', heading: 'Write a new post', post: request.body, action: '/posts', buttonLabel: 'Publish post', error: 'Please add a title and some text before publishing.' });
  posts.unshift({ id: nextPostId++, title, content, createdAt: new Date() });
  response.redirect('/');
});

app.get('/posts/:id/edit', (request, response) => {
  const post = posts.find((item) => item.id === Number(request.params.id));
  if (!post) return response.status(404).send('Post not found');
  response.render('post-form', { title: 'Edit post — Inkwell', heading: 'Edit your post', post, action: `/posts/${post.id}/edit`, buttonLabel: 'Save changes' });
});

app.post('/posts/:id/edit', (request, response) => {
  const post = posts.find((item) => item.id === Number(request.params.id));
  const title = request.body.title?.trim();
  const content = request.body.content?.trim();
  if (!post) return response.status(404).send('Post not found');
  if (!title || !content) return response.status(400).render('post-form', { title: 'Edit post — Inkwell', heading: 'Edit your post', post: { ...post, ...request.body }, action: `/posts/${post.id}/edit`, buttonLabel: 'Save changes', error: 'Please add a title and some text before saving.' });
  post.title = title;
  post.content = content;
  response.redirect('/');
});

app.post('/posts/:id/delete', (request, response) => {
  posts = posts.filter((item) => item.id !== Number(request.params.id));
  response.redirect('/');
});

app.listen(port, () => console.log(`Inkwell is running at http://localhost:${port}`));
