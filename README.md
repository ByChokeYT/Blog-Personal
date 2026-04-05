# LogicLog | Arquitectura de Software Premium (Full-Stack Edition)

LogicLog es una plataforma de análisis crítico y divulgación técnica dedicada a la ingeniería de software con rigor analítico. Desde **Oruro, Bolivia**, este blog explora las lagunas lógicas, condiciones de carrera y fallos de arquitectura en sistemas complejos.

![LogicLog Blue Edition](file:///C:/Users/Virtual%20System/.gemini/antigravity/brain/6865b0c4-6d9f-4429-bcca-1920393404e5/final_showcase_logiclog_blue_hearts_1775423211431.webp)

## 🚀 Stack Tecnológico

El proyecto ha evolucionado a una arquitectura **Full-Stack** robusta:

### **Frontend**
*   **Vite + React**: Reactividad extrema y tiempos de carga mínimos.
*   **Tailwind CSS v4**: Motor de diseño de última generación para una fidelidad estética absoluta.
*   **Framer Motion**: Animaciones fluidas y transiciones de página inmersivas.
*   **Lucide-React**: Iconografía técnica y minimalista.

### **Backend & Persistencia**
*   **Node.js + Express**: Servidor de API RESTful para la gestión de datos.
*   **Prisma ORM**: Capa de abstracción de base de datos moderna y segura.
*   **SQLite**: Base de datos local eficiente (preparada para migración a **Supabase/PostgreSQL**).

## 🛠️ Funcionalidades Core

*   **Navegación Full-Page**: Experiencia de lectura inmersiva sin modales.
*   **Panel Administrativo (Modo Operativo)**:
    *   Protección mediante código de acceso técnico (`LOGICLOG2026`).
    *   Gestión CRUD completa: Crear, Leer, Editar y Eliminar publicaciones.
*   **Interacciones en Tiempo Real**:
    *   Sistema de comentarios persistente sincronizado con la base de datos.
    *   Contador de Reacciones (Likes) con persistencia dual (DB e híbrida local).
*   **Categorización Técnica**: Filtros dinámicos por Arquitectura, Lógica, Backend y Frontend.

## 🎨 Diseño e Identidad

*   **Edición Azul Técnica**: Paleta de colores Zinc/Black con acentos en Azul y Cian Neón.
*   **Micro-animaciones**: Efectos de escaneo en tiempo real y transiciones de estado suaves.
*   **Tipografía**: Enfoque en la legibilidad del código y el análisis técnico profundo.

## 🔧 Instalación y Despliegue

### **1. Configuración del Repositorio**
```bash
git clone <url-del-repo>
npm install
```

### **2. Configuración del Servidor (Backend)**
```bash
cd server
npm install
npx prisma migrate dev --name init
```

### **3. Ejecución en Desarrollo**
Para una experiencia completa, se deben ejecutar ambos servidores:

*   **Frontend**: `npm run dev` (Puerto 5173)
*   **Backend**: `cd server && npm run dev` (Puerto 3001)

## 🛡️ Acceso Administrativo
El acceso al panel de control se realiza mediante el botón **"Panel"** en la cabecera.
> [!IMPORTANT]
> **Código de Autorización Operativa**: `LOGICLOG2026`

---
*LogicLog © 2026 // ANALYZING_SYSTEMS_CONTINUOUSLY*
*Arquitectura de Software boliviana para el mundo.*
