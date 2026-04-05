import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Search, 
  Clock, 
  Tag, 
  ChevronRight, 
  Menu,
  X,
  Mail,
  MapPin,
  Code,
  Database,
  Cpu,
  BookOpen,
  Focus,
  ShieldCheck,
  Zap,
  ArrowRight
} from 'lucide-react';

export default function App() {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scanText, setScanText] = useState('Analizando sistemas...');

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

  const posts = [
    {
      id: 0,
      title: "Detectando lagunas lógicas en arquitecturas distribuidas",
      excerpt: "Un análisis profundo sobre cómo las condiciones de carrera y la falta de idempotencia pueden destruir tu sistema en producción. Identificando los errores de diseño que suelen pasar desapercibidos.",
      date: "1 de Abril, 2026",
      readTime: "8 min",
      category: "Arquitectura",
      imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200",
      icon: <BookOpen size={18} />
    },
    {
      id: 1,
      title: "El peligro del estado global mutable en React",
      excerpt: "Por qué depender de variables globales mutables es una bomba de tiempo lógica y cómo refactorizar hacia un flujo de datos unidireccional estricto.",
      date: "28 de Marzo, 2026",
      readTime: "5 min",
      category: "Frontend",
      imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
      icon: <Code size={18} />
    },
    {
      id: 2,
      title: "Optimizando consultas complejas en PostgreSQL",
      excerpt: "Cuando los índices B-Tree no son suficientes: entendiendo los planes de ejecución y detectando cuellos de botella lógicos en tus queries.",
      date: "15 de Marzo, 2026",
      readTime: "12 min",
      category: "Backend",
      imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800",
      icon: <Database size={18} />
    },
    {
      id: 3,
      title: "Algoritmos: Más allá de Big O Notation",
      excerpt: "La complejidad temporal importa, pero la constante oculta y la localidad de caché pueden hacer que un algoritmo O(N^2) venza a un O(N log N) en casos reales.",
      date: "2 de Febrero, 2026",
      readTime: "7 min",
      category: "Lógica",
      imageUrl: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=800",
      icon: <Cpu size={18} />
    }
  ];

  const filteredPosts = activeCategory === 'Todos' 
    ? posts 
    : posts.filter(post => post.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-300 font-sans selection:bg-emerald-500/30 selection:text-white pb-12">
      
      {/* Navegación */}
      <header className="sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white font-bold text-xl tracking-tight cursor-pointer">
            <Terminal className="text-emerald-500" size={24} />
            <span>Logic<span className="text-zinc-500">Log</span></span>
          </div>

          <div className="hidden md:flex items-center bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 w-64 focus-within:border-emerald-500/50 transition-colors">
            <Search size={16} className="text-zinc-500 mr-2" />
            <input 
              type="text" 
              placeholder="Buscar conocimiento..." 
              className="bg-transparent border-none outline-none text-sm text-white w-full placeholder:text-zinc-600"
            />
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="#" className="text-white hover:text-emerald-400 transition-colors">Artículos</a>
            <a href="#" className="text-zinc-400 hover:text-white transition-colors">Metodología</a>
            <button className="bg-emerald-500 text-black px-4 py-2 rounded-lg hover:bg-emerald-400 transition-colors font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              Suscribirse
            </button>
          </nav>

          <button className="md:hidden text-zinc-400" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Menú Móvil */}
      {isMenuOpen && (
        <div className="md:hidden bg-zinc-900 border-b border-zinc-800 p-4 space-y-4">
          <input 
            type="text" 
            placeholder="Buscar..." 
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white"
          />
          <div className="flex flex-col gap-2 font-medium">
            <a href="#" className="text-white py-2 px-2 hover:bg-zinc-800 rounded transition-colors">Artículos</a>
            <a href="#" className="text-zinc-400 py-2 px-2 hover:bg-zinc-800 rounded transition-colors">Metodología</a>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* NUEVO HERO: Presentación del Blog */}
        <section className="py-12 md:py-20 lg:py-28 relative overflow-hidden">
          {/* Fondo decorativo con rejilla */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')]"></div>
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-in fade-in slide-in-from-left-6 duration-700">
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">
                  {scanText}
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tighter">
                Desentrañando la <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600 italic">
                  Complejidad Logica
                </span>
              </h1>

              <p className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-xl">
                Bienvenidos a <span className="text-white font-bold">LogicLog</span>. Un espacio dedicado al análisis crítico donde detectamos aquellas lagunas lógicas que otros pasan por alto. Ingeniería de software con rigor analítico desde <span className="text-emerald-500 font-bold underline decoration-emerald-500/30">Oruro, Bolivia</span>.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <button className="bg-emerald-500 text-black px-8 py-4 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-emerald-400 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.2)] active:scale-95">
                  Explorar Bitácora <ArrowRight size={16} />
                </button>
                <button className="border border-zinc-800 text-zinc-300 px-8 py-4 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-white/5 hover:text-white transition-all active:scale-95">
                  Ver Metodología
                </button>
              </div>

              <div className="flex items-center gap-8 pt-8 border-t border-zinc-800/50">
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-white tracking-tighter">100%</div>
                  <div className="text-[10px] uppercase text-zinc-500 font-black tracking-widest">Rigor Analítico</div>
                </div>
                <div className="w-px h-8 bg-zinc-800"></div>
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-white tracking-tighter">ORU</div>
                  <div className="text-[10px] uppercase text-zinc-500 font-black tracking-widest">Base de Operaciones</div>
                </div>
              </div>
            </div>

            <div className="hidden lg:block relative animate-in fade-in zoom-in duration-1000 delay-200">
              {/* Representación Visual de "Análisis de Lógica" */}
              <div className="relative z-20 bg-zinc-900 border border-zinc-800 p-8 rounded-3xl shadow-2xl overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="flex items-center justify-between mb-8">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500/50"></div>
                  </div>
                  <div className="text-[10px] font-mono text-zinc-600">SYS_ANALYSIS.LOG</div>
                </div>

                <div className="space-y-6 font-mono">
                  <div className="flex gap-4">
                    <div className="text-emerald-500 opacity-50">01</div>
                    <div className="text-zinc-400">Escaneando dependencias de estado...</div>
                  </div>
                  <div className="flex gap-4 p-3 bg-emerald-500/5 border-l-2 border-emerald-500 rounded-r-md">
                    <div className="text-emerald-500">02</div>
                    <div className="text-emerald-100">LAGUNA LÓGICA DETECTADA: Race Condition</div>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-emerald-500 opacity-50">03</div>
                    <div className="text-zinc-400">Aplicando patrón de resiliencia...</div>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-emerald-500 opacity-50">04</div>
                    <div className="text-zinc-400 text-xs">Sincronización de hilos completada.</div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-zinc-800 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Focus size={16} className="text-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-black uppercase text-zinc-500">Escaneo Profundo</span>
                  </div>
                  <div className="text-emerald-500 font-bold text-xs">ACTIVO</div>
                </div>
              </div>

              {/* Decoración detrás del recuadro */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border border-emerald-500/10 rounded-[4rem] -rotate-3 pointer-events-none"></div>
            </div>
          </div>
        </section>

        {/* Layout Principal: Feed y Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-8 md:mt-16">
          
          {/* Feed de Artículos */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-8 border-b border-zinc-800/50 pb-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Zap size={20} className="text-emerald-500" /> Publicaciones Recientes
              </h2>
            </div>

            {/* Filtros de Categoría */}
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeCategory === cat 
                      ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.2)]' 
                      : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Lista de Artículos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredPosts.map(post => (
                <article key={post.id} className="group flex flex-col bg-zinc-900/40 border border-zinc-800/80 rounded-2xl overflow-hidden hover:bg-zinc-900 hover:border-emerald-500/30 transition-all cursor-pointer shadow-lg">
                  
                  <div className="relative h-48 w-full bg-zinc-950 overflow-hidden">
                    <img 
                      src={post.imageUrl} 
                      alt={post.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 group-hover:opacity-100 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-80"></div>
                    <div className="absolute bottom-3 left-3 flex items-center gap-2">
                      <div className="p-1.5 bg-zinc-900/80 backdrop-blur border border-zinc-700 rounded-md text-emerald-400">
                        {post.icon}
                      </div>
                      <span className="text-xs font-bold text-white uppercase tracking-wider bg-zinc-900/80 backdrop-blur px-2 py-1 rounded-md border border-zinc-700">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex justify-end items-center mb-3">
                      <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">{post.date}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-zinc-100 mb-3 group-hover:text-emerald-400 transition-colors line-clamp-2 leading-tight">
                      {post.title}
                    </h3>
                    
                    <p className="text-sm text-zinc-400 leading-relaxed mb-6 line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm mt-auto pt-4 border-t border-zinc-800/50">
                      <span className="flex items-center gap-1.5 text-zinc-500 font-medium">
                        <Clock size={14} /> {post.readTime}
                      </span>
                      <span className="flex items-center gap-1 text-emerald-400 font-bold group-hover:gap-2 transition-all">
                        Analizar <ChevronRight size={16} />
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            
            {filteredPosts.length === 0 && (
              <div className="text-center py-16 text-zinc-500 bg-zinc-900/30 rounded-2xl border border-zinc-800 border-dashed">
                <Terminal size={48} className="mx-auto text-zinc-700 mb-4" />
                <p>Módulo de categoría sin registros activos.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-8 lg:pt-16">
            {/* Widget: Sobre el Autor */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 relative overflow-hidden shadow-lg group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none group-hover:bg-emerald-500/20 transition-all"></div>
              
              <h3 className="text-sm font-black text-white uppercase tracking-widest mb-4 border-b border-zinc-800 pb-2 relative z-10 flex items-center gap-2">
                <ShieldCheck size={16} className="text-emerald-500" /> Operativo Base
              </h3>
              
              <div className="flex items-center gap-2 text-emerald-400 mb-4 text-[10px] font-black uppercase tracking-widest relative z-10 bg-emerald-950/30 w-fit px-3 py-1.5 rounded-lg border border-emerald-900/50">
                <MapPin size={14} /> Oruro, Bolivia
              </div>

              <p className="text-sm text-zinc-300 leading-relaxed mb-4 relative z-10">
                Especialista en sistemas críticos. Mi valor diferencial es el escaneo de <strong className="text-emerald-400 font-bold underline decoration-emerald-500/30">lagunas lógicas</strong> ocultas tras arquitecturas aparentemente perfectas.
              </p>
            </div>

            {/* Widget: Newsletter */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 relative overflow-hidden shadow-lg">
              <h3 className="text-sm font-black text-emerald-400 uppercase tracking-widest mb-2 relative z-10">
                Feed de Inteligencia
              </h3>
              <p className="text-sm text-zinc-300 mb-5 relative z-10 leading-relaxed">
                Únete a otros desarrolladores que valoran el rigor técnico. Recibe mis análisis directamente.
              </p>
              <form className="flex flex-col gap-3 relative z-10" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="operativo@correo.com" 
                  className="bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors shadow-inner"
                />
                <button className="bg-emerald-500 text-black font-black uppercase text-[10px] tracking-widest rounded-lg px-4 py-3 hover:bg-emerald-400 transition-colors shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                  Sincronizar
                </button>
              </form>
            </div>

            {/* Widget: Etiquetas */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-lg">
              <h3 className="text-sm font-black text-white uppercase tracking-widest mb-4 border-b border-zinc-800 pb-2 flex items-center gap-2">
                <Tag size={16} className="text-emerald-500" /> Tópicos
              </h3>
              <div className="flex flex-wrap gap-2">
                {['#React', '#PostgreSQL', '#SystemDesign', '#Algoritmos', '#CleanCode', '#Testing', '#Python', '#Concurrencia'].map(tag => (
                  <span key={tag} className="text-[10px] font-black uppercase tracking-widest bg-zinc-950 border border-zinc-800 text-zinc-500 px-3 py-1.5 rounded-lg hover:text-emerald-400 hover:border-emerald-500/50 cursor-pointer transition-colors shadow-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </aside>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800/50 mt-16 py-12 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white font-bold text-xl tracking-tight">
              <Terminal className="text-emerald-500" size={24} />
              <span>Logic<span className="text-zinc-500">Log</span></span>
            </div>
            <p className="text-xs text-zinc-600 uppercase font-black tracking-widest leading-loose">
              Construyendo arquitecturas impecables. <br />
              Detectando fallas lógicas desde Oruro.
            </p>
          </div>
          <div className="flex items-center gap-12 text-[10px] font-black text-zinc-500 uppercase tracking-widest">
            <a href="#" className="hover:text-emerald-400 transition-colors">GitHub</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Twitter</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">LinkedIn</a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-6 mt-12 pt-8 border-t border-zinc-900 text-center text-[10px] text-zinc-700 font-black uppercase tracking-[0.3em]">
          LogicLog © 2026 // ANALYZING_SYSTEMS_CONTINUOUSLY
        </div>
      </footer>

      {/* Animaciones Globales */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideInLeft { from { transform: translateX(-20px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes zoomIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        
        .animate-in { animation-duration: 600ms; animation-fill-mode: both; }
        .fade-in { animation-name: fadeIn; }
        .slide-in-from-left-6 { animation-name: slideInLeft; }
        .zoom-in { animation-name: zoomIn; }
      `}} />
    </div>
  );
}