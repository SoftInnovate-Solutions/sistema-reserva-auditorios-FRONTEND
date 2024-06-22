# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# DESPLEGAR EL PROYECTO LOCALMENTE
    Instalar dependencias
        > npm installl

    Lanzar proyecto
        > npm run dev

# Estructura del proyecto

sistema-reserva-auditorios/
│
├── node_modules/
├── public/
│
├── src/
│   ├── assets/
│   │   ├── imagenes/
│   │
│   ├── components/
│   │   ├── Header/
│   │   │   ├── Header.js
│   │   │   └── Header.css
│   │   │
│   │   ├── Sidebar/
│   │   │   ├── Sidebar.js
│   │   │   └── Sidebar.css
│   │   │
│   │   └── MainContent/
│   │       ├── MainContent.js
│   │       └── MainContent.css
│   │
│   ├── pages/
│   │   ├── Home/
│   │   │   ├── Home.js
│   │   │   └── Home.css
│   │   │
│   │   ├── About/
│   │   │   ├── About.js
│   │   │   └── About.css
│   │   │
│   │   └── Contact/
│   │       ├── Contact.js
│   │       └── Contact.css
│   │
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── index-html
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
└── tailwind.config.js

Breakpoint	Rango de Ancho de Pantalla
xs	0px o más
sm	600px o más
md	900px o más
lg	1200px o más
xl	1536px o más