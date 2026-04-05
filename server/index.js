const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Middlewares
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Seed Initial Data if empty
async function seedIfNeeded() {
  const count = await prisma.post.count();
  if (count === 0) {
    console.log("Seeding default posts...");
    await prisma.post.createMany({
      data: [
        {
          title: "Detectando lagunas lógicas en arquitecturas distribuidas",
          excerpt: "Un análisis profundo sobre cómo las condiciones de carrera y la falta de idempotencia...",
          content: "<p>En los sistemas distribuidos modernos, la consistencia eventual es una necesidad técnica...</p>",
          date: "1 de Abril, 2026",
          readTime: "8 min",
          category: "Arquitectura",
          imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200",
          icon: "BookOpen"
        },
        {
          title: "El peligro del estado global mutable en React",
          excerpt: "Por qué depender de variables globales mutables es una bomba de tiempo lógica...",
          content: "<p>React revolucionó la creación de interfaces con su enfoque declarativo...</p>",
          date: "28 de Marzo, 2026",
          readTime: "5 min",
          category: "Frontend",
          imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
          icon: "Code"
        }
      ]
    });
  }
}

// Routes
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: { comments: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/posts', async (req, res) => {
  try {
    const { title, category, readTime, imageUrl, excerpt, content } = req.body;
    const post = await prisma.post.create({
      data: {
        title, category, readTime, imageUrl, excerpt, content,
        date: new Date().toLocaleDateString('es-BO', { day: 'numeric', month: 'long', year: 'numeric' })
      }
    });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const post = await prisma.post.update({
      where: { id: parseInt(id) },
      data: req.body
    });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.post.delete({ where: { id: parseInt(id) } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/posts/:id/comments', async (req, res) => {
  try {
    const { id } = req.params;
    const { author, text, avatar } = req.body;
    const comment = await prisma.comment.create({
      data: {
        author, text, avatar,
        postId: parseInt(id),
        date: new Date().toLocaleDateString('es-BO', { day: 'numeric', month: 'short' })
      }
    });
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/posts/:id/toggle-like', async (req, res) => {
  try {
    const { id } = req.params;
    const { increment } = req.body; // true to add, false to subtract
    const post = await prisma.post.update({
      where: { id: parseInt(id) },
      data: { likes: { [increment ? 'increment' : 'decrement']: 1 } }
    });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  await seedIfNeeded();
});
