# Dashboard de Equipos Informáticos — ILM
### Instituto Leonardo Murialdo

Panel de gestión y relevamiento de equipos informáticos para todas las aulas del instituto.

---

## 🚀 Ver online

**URL:** `https://TU-USUARIO.github.io/ilm-dashboard`

---

## 📁 Estructura de archivos

```
ilm-dashboard/
├── index.html      # Estructura HTML del dashboard
├── style.css       # Estilos y diseño visual
├── script.js       # Lógica, datos y gráficos
└── README.md       # Este archivo
```

---

## ✨ Funcionalidades

- **Dashboard** — métricas globales y 4 gráficos (estado por aula, RAM, CPU, HDD vs SSD)
- **Inventario** — tabla completa con filtros por estado, RAM, tipo de disco y búsqueda libre
- **Alertas** — detección automática de PCs no operativas, velocidad degradada y RAM baja
- **Historial** — registro de todos los cambios realizados en la sesión
- **Exportar PDF** — reporte imprimible de todos los equipos
- **Importar / Exportar JSON** — actualizar datos sin tocar el código

---

## 🛠️ Tecnologías

- HTML5 / CSS3 / JavaScript vanilla
- [Chart.js 4.4.1](https://www.chartjs.org/) — gráficos
- [Google Fonts](https://fonts.google.com/) — tipografía Outfit + JetBrains Mono
- Sin frameworks, sin dependencias locales

---

## 📦 Cómo actualizar los datos

1. En el dashboard, hacé clic en **Exportar JSON**
2. Editá el archivo o importá datos nuevos con **Importar JSON**
3. Los datos se actualizan en tiempo real

---

## 🌐 Cómo desplegar en GitHub Pages

### Paso 1 — Crear repositorio
1. Entrá a [github.com](https://github.com) y creá una cuenta si no tenés
2. Clic en **New repository**
3. Nombre: `ilm-dashboard`
4. Marcá **Public**
5. Clic en **Create repository**

### Paso 2 — Subir archivos
1. En el repositorio recién creado, clic en **uploading an existing file**
2. Arrastrá los 4 archivos: `index.html`, `style.css`, `script.js`, `README.md`
3. Clic en **Commit changes**

### Paso 3 — Activar GitHub Pages
1. Ir a **Settings** del repositorio
2. Sección **Pages** (en el menú lateral)
3. En **Source** seleccioná **Deploy from a branch**
4. Branch: **main** / Folder: **/ (root)**
5. Clic en **Save**

### Paso 4 — Acceder
- En 1-2 minutos la URL estará disponible en:
  `https://TU-USUARIO.github.io/ilm-dashboard`
- Compartí esa URL con todos en el ILM

---

## 👥 Proyecto

Desarrollado por alumnos de 7° año Informática — Instituto Leonardo Murialdo (2026)
