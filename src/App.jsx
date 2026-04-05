import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, 
  Search, 
  Clock, 
  Tag, 
  ChevronRight, 
  Menu,
  X,
  Code,
  Database,
  Cpu,
  BookOpen,
  Focus,
  ShieldCheck,
  MapPin,
  Zap,
  ArrowRight,
  Heart
} from 'lucide-react';

export default function App() {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [scanText, setScanText] = useState('Analizando sistemas...');
  
  // Estados de Datos
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState(() => {
    const saved = localStorage.getItem('logiclog_likes_local');
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(true);

  // Estados de Administración
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminView, setAdminView] = useState('dashboard'); // 'dashboard' | 'editor'
  const [editingPost, setEditingPost] = useState(null);
  const ADMIN_PASSWORD = "LOGICLOG2026";

  const API_URL = "http://localhost:3001/api";

  // Cargar Posts desde la API
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/posts`);
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      console.error("Error al sincronizar con el núcleo:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Guardar likes locales (opcional: se puede mover a DB también)
  useEffect(() => {
    localStorage.setItem('logiclog_likes_local', JSON.stringify(likedPosts));
  }, [likedPosts]);

  const handleSavePost = async (postData) => {
    try {
      const url = editingPost ? `${API_URL}/posts/${editingPost.id}` : `${API_URL}/posts`;
      const method = editingPost ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
      });

      if (response.ok) {
        await fetchPosts();
        setAdminView('dashboard');
        setEditingPost(null);
      }
    } catch (err) {
      console.error("Fallo en la inyección de datos:", err);
    }
  };

  const handleDeletePost = async (id) => {
    if (!window.confirm('¿Confirmar desactivado de este post?')) return;
    try {
      await fetch(`${API_URL}/posts/${id}`, { method: 'DELETE' });
      await fetchPosts();
    } catch (err) {
      console.error("Error al purgar registros:", err);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (e.target.password.value === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert("CÓDIGO DE ACCESO INVÁLIDO");
    }
  };

  const toggleLike = async (e, postId) => {
    if (e) e.stopPropagation();
    const isLiked = likedPosts.includes(postId);
    
    try {
      const response = await fetch(`${API_URL}/posts/${postId}/toggle-like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ increment: !isLiked })
      });

      if (response.ok) {
        const updatedPost = await response.json();
        // Sincronizar posts globales
        await fetchPosts();
        // Sincronizar post seleccionado si es el mismo
        if (selectedPost && selectedPost.id === postId) {
          // Re-fetch para traer comentarios también
          const fullPostRes = await fetch(`${API_URL}/posts`);
          const allPosts = await fullPostRes.json();
          const target = allPosts.find(p => p.id === postId);
          setSelectedPost(target);
        }
        
        setLikedPosts(prev => 
          isLiked ? prev.filter(id => id !== postId) : [...prev, postId]
        );
      }
    } catch (err) {
      console.error("Error en pulso de like:", err);
    }
  };

  const addComment = async (postId, text) => {
    try {
      const response = await fetch(`${API_URL}/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          author: "Analista Águila",
          text,
          avatar: "LG"
        })
      });

      if (response.ok) {
        await fetchPosts();
        if (selectedPost && selectedPost.id === postId) {
          const fullPostRes = await fetch(`${API_URL}/posts`);
          const allPosts = await fullPostRes.json();
          const target = allPosts.find(p => p.id === postId);
          setSelectedPost(target);
        }
      }
    } catch (err) {
      console.error("Fallo en la sincronización del comentario:", err);
    }
  };

  // Efecto de texto dinámico para el Hero
  useEffect(() => {
    const phrases = [
      'Analizando arquitecturas...',
      'Detectando lagunas lógicas...',
      'Optimizando flujos críticos...',
      'Desde Oruro, Bolivia',
      'LogicLog activo'
    ];
    let i = 0;
    const interval = setInterval(() => {
      setScanText(phrases[i]);
      i = (i + 1) % phrases.length;
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const categories = ['Todos', 'Arquitectura', 'Lógica', 'Backend', 'Frontend'];

  const filteredPosts = activeCategory === 'Todos' 
    ? posts 
    : posts.filter(post => post.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-300 font-sans selection:bg-blue-500/30 selection:text-white">
      
      {/* Navegación Global */}
      <header className="sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => { setSelectedPost(null); setIsAdminMode(false); }}
            className="flex items-center gap-2 text-white font-bold text-xl tracking-tight cursor-pointer"
          >
            <Terminal className="text-blue-500" size={24} />
            <span>Logic<span className="text-zinc-500">Log</span></span>
          </motion.div>

          {/* Icono de Modo Operativo (Admin) */}
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              <button onClick={() => { setSelectedPost(null); setIsAdminMode(false); }} className={`transition-colors ${!isAdminMode ? 'text-white' : 'text-zinc-500 hover:text-white'}`}>Bitácora</button>
              <button 
                onClick={() => setIsAdminMode(!isAdminMode)} 
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${
                  isAdminMode 
                    ? 'bg-blue-500/10 border-blue-500 text-blue-400' 
                    : 'border-zinc-800 text-zinc-500 hover:text-white hover:border-zinc-700'
                }`}
              >
                <ShieldCheck size={16} /> <span className="text-[10px] font-black uppercase">Panel</span>
              </button>
            </nav>
            <button className="md:hidden text-zinc-400" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Menú Móvil */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-zinc-900 border-b border-zinc-800 p-4 space-y-4 overflow-hidden fixed top-16 left-0 right-0 z-40"
          >
            <button onClick={() => { setSelectedPost(null); setIsMenuOpen(false); setIsAdminMode(false); }} className="block w-full text-left text-white py-2 px-2 hover:bg-zinc-800 rounded transition-colors text-sm">Bitácora</button>
            <button onClick={() => { setIsAdminMode(true); setIsMenuOpen(false); }} className="block w-full text-left text-blue-400 py-2 px-2 hover:bg-zinc-800 rounded transition-colors text-[10px] font-black uppercase">Modo Operativo</button>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-7xl mx-auto px-4 md:px-6 min-h-[calc(100vh-64px)]">
        <AnimatePresence mode="wait">
          {isAdminMode ? (
            !isAuthenticated ? (
              <motion.div key="login" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="h-[70vh] flex items-center justify-center">
                <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl w-full max-w-md shadow-2xl">
                  <div className="flex justify-center mb-6">
                    <div className="p-4 bg-blue-500/10 rounded-full border border-blue-500/20">
                      <ShieldCheck size={40} className="text-blue-500" />
                    </div>
                  </div>
                  <h2 className="text-xl font-bold text-white text-center mb-2 uppercase tracking-tighter">Terminal de Acceso</h2>
                  <p className="text-zinc-500 text-center text-xs mb-8 uppercase tracking-widest">Ingrese código de autorización operativa</p>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <input name="password" type="password" placeholder="LOGIC_CODE_..." className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white text-center focus:outline-none focus:border-blue-500 transition-all font-mono tracking-widest" required autoFocus />
                    <button type="submit" className="w-full bg-blue-500 text-black py-4 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-blue-400 transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)]">Sincronizar</button>
                  </form>
                </div>
              </motion.div>
            ) : adminView === 'dashboard' ? (
              <motion.div key="dashboard" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="py-12">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-zinc-800 pb-8">
                  <div>
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic">Dashboard Operativo</h2>
                    <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em] mt-1">Gestión de flujo de datos // LOGICLOG_v4</p>
                  </div>
                  <button onClick={() => { setEditingPost(null); setAdminView('editor'); }} className="bg-white text-black px-6 py-3 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-zinc-200 transition-all flex items-center gap-2">
                    <Zap size={16} /> Crear Publicación
                  </button>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  {posts.map(post => (
                    <div key={post.id} className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex items-center justify-between group hover:border-blue-500/30 transition-all">
                      <div className="flex items-center gap-6">
                        <div className="bg-zinc-950 w-24 h-16 rounded-lg overflow-hidden border border-zinc-800">
                          <img src={post.imageUrl} className="w-full h-full object-cover opacity-60" />
                        </div>
                        <div>
                          <h3 className="text-white font-bold group-hover:text-blue-400 transition-colors uppercase tracking-tight">{post.title}</h3>
                          <div className="flex gap-4 mt-1">
                            <span className="text-[10px] text-zinc-500 font-mono italic uppercase">#{post.category}</span>
                            <span className="text-[10px] text-blue-500/50 font-mono uppercase">{post.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button onClick={() => { setEditingPost(post); setAdminView('editor'); }} className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-400 hover:text-white hover:border-zinc-700 transition-all"><BookOpen size={18} /></button>
                        <button onClick={() => handleDeletePost(post.id)} className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-500 hover:text-rose-500 hover:border-rose-900/50 transition-all"><X size={18} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div key="editor" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="py-12 max-w-4xl mx-auto">
                <button onClick={() => setAdminView('dashboard')} className="flex items-center gap-2 text-zinc-500 hover:text-white mb-8 font-black uppercase text-[10px] tracking-widest transition-all">
                  <ArrowRight className="rotate-180" size={14} /> Cancelar Operación
                </button>
                <div className="bg-zinc-900 border border-zinc-800 p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none italic text-7xl font-black">{editingPost ? 'EDIT' : 'NEW'}</div>
                  <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-12 italic border-l-4 border-blue-500 pl-6">
                    {editingPost ? 'Refactorizar Publicación' : 'Inyectar Conocimiento'}
                  </h2>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    handleSavePost({
                      title: formData.get('title'),
                      category: formData.get('category'),
                      readTime: formData.get('readTime'),
                      imageUrl: formData.get('imageUrl'),
                      excerpt: formData.get('excerpt'),
                      content: formData.get('content')
                    });
                  }} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-1">Título del Análisis</label>
                        <input name="title" defaultValue={editingPost?.title} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all" required />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-1">Categoría Técnica</label>
                        <select name="category" defaultValue={editingPost?.category || 'Arquitectura'} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all appearance-none">
                          {categories.filter(c => c !== 'Todos').map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-1">Tiempo de Lectura (ej: 5 min)</label>
                        <input name="readTime" defaultValue={editingPost?.readTime} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all" required />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-1">URL de Imagen (Unsplash/...)</label>
                        <input name="imageUrl" defaultValue={editingPost?.imageUrl} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-1">Extracto (Resumen del post)</label>
                      <textarea name="excerpt" defaultValue={editingPost?.excerpt} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all h-24 resize-none" required />
                    </div>
                    <div className="space-y-2">
                      <legend className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-1 mb-2">Contenido (Soporta HTML)</legend>
                      <textarea name="content" defaultValue={editingPost?.content} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all h-64 font-mono text-sm" required />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-black py-4 rounded-xl font-black uppercase text-xs tracking-[0.3em] hover:bg-blue-400 transition-all shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                      Sincronizar Datos
                    </button>
                  </form>
                </div>
              </motion.div>
            )
          ) : !selectedPost ? (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {/* HERO */}
              <section className="py-12 md:py-20 lg:py-28 relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')]"></div>
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-8">
                    <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 rounded-full">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                      </span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-sky-400">
                        {scanText}
                      </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tighter">
                      Desentrañando la <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600 italic">
                        Complejidad Lógica
                      </span>
                    </h1>

                    <p className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-xl">
                      Bienvenidos a <span className="text-white font-bold">LogicLog</span>. Un espacio dedicado al análisis crítico donde detectamos aquellas lagunas lógicas que otros pasan por alto.
                    </p>

                    <div className="flex flex-wrap gap-4 pt-4">
                      <button className="bg-blue-500 text-black px-8 py-4 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-blue-400 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                        Explorar Bitácora <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="hidden lg:block relative">
                    <div className="relative z-20 bg-zinc-900 border border-zinc-800 p-8 rounded-3xl shadow-2xl overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent"></div>
                      <div className="space-y-6 font-mono text-sm">
                        <div className="flex gap-4 p-3 bg-blue-500/5 border-l-2 border-blue-500 rounded-r-md">
                          <div className="text-blue-500">02</div>
                          <div className="text-blue-100 uppercase text-xs font-black">Laguna Detectada: Race Condition</div>
                        </div>
                        <div className="flex gap-4 opacity-50">
                          <div className="text-blue-500 uppercase text-xs">03</div>
                          <div className="text-zinc-400 uppercase text-xs">Sincronización en curso...</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Categorías */}
              <div className="flex flex-wrap gap-2 mb-12">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeCategory === cat 
                        ? 'bg-white text-black' 
                        : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 border border-zinc-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Feed & Sidebar */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-8 pb-20">
                <div className="lg:col-span-2">
                  <div className="flex items-center justify-between mb-8 border-b border-zinc-800/50 pb-4">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                      <Zap size={20} className="text-blue-500" /> Publicaciones Recientes
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {filteredPosts.map(post => (
                      <motion.article 
                        key={post.id}
                        whileHover={{ y: -8 }}
                        onClick={() => setSelectedPost(post)}
                        className="group flex flex-col bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all cursor-pointer shadow-lg"
                      >
                        <div className="relative h-48 w-full bg-zinc-950 overflow-hidden">
                          <img src={post.imageUrl} alt={post.title} className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-110 transition-transform duration-700" />
                          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent"></div>
                          <button onClick={(e) => toggleLike(e, post.id)} className="absolute top-3 right-3 z-30 p-2 bg-zinc-900/60 backdrop-blur-md border border-white/10 rounded-full">
                            <Heart size={16} className={likedPosts.includes(post.id) ? 'fill-rose-500 text-rose-500' : 'text-zinc-400'} />
                          </button>
                        </div>
                        <div className="p-6 flex flex-col flex-1">
                          <span className="text-[10px] text-zinc-500 font-mono uppercase mb-2">{post.date}</span>
                          <h3 className="text-lg font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">{post.title}</h3>
                          <p className="text-sm text-zinc-400 mb-6 line-clamp-3">{post.excerpt}</p>
                          <div className="flex items-center justify-between mt-auto">
                            <span className="text-xs text-zinc-600 font-mono italic">#{post.category}</span>
                            <span className="text-blue-400 text-sm font-bold flex items-center gap-1">Analizar <ChevronRight size={14} /></span>
                          </div>
                        </div>
                      </motion.article>
                    ))}
                  </div>
                </div>

                <aside className="space-y-8">
                  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 relative overflow-hidden shadow-lg group">
                    <h3 className="text-sm font-black text-white uppercase tracking-widest mb-4 border-b border-zinc-800 pb-2">Operativo Base</h3>
                    <div className="flex items-center gap-2 text-blue-400 mb-4 text-[10px] font-black uppercase tracking-widest">
                      <MapPin size={14} /> Oruro, Bolivia
                    </div>
                    <p className="text-sm text-zinc-300 leading-relaxed">
                      Especialista en sistemas críticos y análisis de lagunas lógicas.
                    </p>
                  </div>
                  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 relative overflow-hidden shadow-lg">
                    <h3 className="text-sm font-black text-blue-400 uppercase tracking-widest mb-2">Sincronización</h3>
                    <p className="text-sm text-zinc-300 mb-5 leading-relaxed text-xs">Recibe análisis técnicos directamente.</p>
                    <button className="w-full bg-blue-500 text-black font-black uppercase text-[10px] tracking-widest rounded-lg px-4 py-3 hover:bg-blue-400 transition-colors">Sincronizar</button>
                  </div>
                </aside>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="article"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="py-12"
            >
              <button 
                onClick={() => setSelectedPost(null)}
                className="flex items-center gap-2 text-zinc-500 hover:text-blue-400 transition-colors mb-12 group font-black uppercase text-[10px] tracking-[0.3em]"
              >
                <ArrowRight className="rotate-180 group-hover:-translate-x-1 transition-transform" size={14} /> 
                Volver a la Bitácora
              </button>

              <article className="max-w-5xl mx-auto">
                <header className="mb-16">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="px-3 py-1 bg-blue-500 text-black text-[10px] font-black uppercase tracking-widest rounded-md">
                      {selectedPost.category}
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">
                      {selectedPost.date} • {selectedPost.readTime}
                    </span>
                  </div>
                  <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8 italic">
                    {selectedPost.title}
                  </h1>
                </header>

                <div className="relative h-[400px] md:h-[600px] w-full rounded-3xl overflow-hidden mb-16 border border-zinc-800 shadow-2xl">
                  <img src={selectedPost.imageUrl} alt={selectedPost.title} className="w-full h-full object-cover opacity-60" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">
                  <div className="lg:col-span-3">
                    <div 
                      className="prose prose-invert max-w-none text-zinc-400 text-lg md:text-xl leading-[1.8] space-y-8 font-light"
                      dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                    />

                    {/* SECCIÓN DE COMENTARIOS */}
                    <div className="mt-24 pt-16 border-t border-zinc-800/50">
                      <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                        <Terminal size={24} className="text-blue-500" /> Análisis de la Comunidad
                      </h3>
                      
                      <div className="space-y-12 mb-16">
                        {(selectedPost.comments || []).map(comment => (
                          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={comment.id} className="flex gap-6">
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 font-bold text-sm">
                              {comment.avatar}
                            </div>
                            <div className="space-y-2 flex-1">
                              <div className="flex items-center justify-between">
                                <span className="text-white font-bold text-sm">{comment.author}</span>
                                <span className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest">{comment.date}</span>
                              </div>
                              <p className="text-zinc-400 leading-relaxed text-sm">{comment.text}</p>
                            </div>
                          </motion.div>
                        ))}

                        {(!selectedPost.comments || selectedPost.comments.length === 0) && (
                          <div className="text-center py-12 bg-zinc-900/30 rounded-2xl border border-zinc-800/50 border-dashed">
                            <p className="text-zinc-600 text-xs uppercase font-black tracking-widest">Aún no hay análisis. Sé el primero.</p>
                          </div>
                        )}
                      </div>

                      <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl">
                        <form 
                          className="space-y-4"
                          onSubmit={(e) => {
                            e.preventDefault();
                            const text = e.target.comment.value;
                            if (text.trim()) {
                              addComment(selectedPost.id, text);
                              e.target.reset();
                            }
                          }}
                        >
                          <textarea name="comment" placeholder="Escribe tu análisis técnico aquí..." className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-6 py-4 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors min-h-[150px] resize-none" required></textarea>
                          <div className="flex justify-end">
                            <button type="submit" className="bg-blue-500 text-black px-8 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)]">Publicar Comentario</button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>

                  <aside className="lg:col-span-1 space-y-12">
                    <div className="p-6 bg-zinc-900/30 border border-zinc-800/50 rounded-2xl">
                      <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4">Métricas</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-zinc-400">Lectura</span>
                          <span className="text-xs text-white font-mono">{selectedPost.readTime}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-zinc-400">Likes</span>
                          <span className="text-xs text-rose-400 font-mono flex items-center gap-1">
                            <Heart size={12} className={likedPosts.includes(selectedPost.id) ? 'fill-rose-400' : ''} />
                            {selectedPost.likes || 0}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => toggleLike(null, selectedPost.id)}
                      className={`w-full py-4 rounded-xl font-black uppercase text-[10px] tracking-[0.2em] transition-all border ${
                        likedPosts.includes(selectedPost.id)
                          ? 'bg-rose-500/10 border-rose-500/20 text-rose-500'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-white'
                      }`}
                    >
                      {likedPosts.includes(selectedPost.id) ? 'Artículo Liked' : 'Dar Like'}
                    </button>
                  </aside>
                </div>
              </article>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="border-t border-zinc-800/50 mt-16 py-12 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-white font-bold text-xl tracking-tight">
              <Terminal className="text-blue-500" size={24} />
              <span>Logic<span className="text-zinc-500">Log</span></span>
            </div>
            <p className="text-xs text-zinc-600 uppercase font-black tracking-widest leading-loose">Construyendo arquitecturas impecables.</p>
          </div>
          <div className="flex items-center gap-8 text-[10px] font-black text-zinc-500 uppercase tracking-widest">
            <a href="#" className="hover:text-blue-400">GitHub</a>
            <a href="#" className="hover:text-blue-400">Twitter</a>
          </div>
        </div>
        <div className="text-center text-[10px] text-zinc-700 font-black uppercase mt-12 tracking-[0.3em]">
          LogicLog © 2026 // ANALYZING_SYSTEMS
        </div>
      </footer>
    </div>
  );
}
