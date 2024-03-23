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
proyecto/
│
├── public/
│   ├── index.html
│   └── assets/
│       ├── css/
│       ├── js/
│       ├── images/
│       └── fonts/
│
├── src/
│   ├── assets/
│   │   ├── css/
│   │   ├── js/
│   │   ├── images/
│   │   └── fonts/
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
│   ├── services/
│   │   └── ApiService.js
│   │
│   ├── router/
│   │   ├── AppRouter.js
│   │   └── routes.js
│   │
│   ├── App.js
│   ├── index.js
│   └── index.css
│
├── node_modules/
├── package.json
├── README.md
└── .gitignore

