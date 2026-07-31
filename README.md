# TecniTechos — Sitio Web

Sitio de una sola página para **TecniTechos**, firma salvadoreña de arquitectura, construcción y remodelación con obra que se remonta a 1989.

🔗 **En vivo:** https://tecnitechossv.vercel.app

## Estructura

```
index.html            # Marcado (HTML)
css/styles.css        # Estilos
js/main.js            # Interacción (nav móvil, filtros, modal de proyectos)
assets/img/           # Logo, favicons, social card e imágenes
site.webmanifest      # Manifest PWA (íconos, colores)
vercel.json           # Cache-Control de assets + cleanUrls
brand/                # Master del logo (NO se despliega — ver .vercelignore)
```

Sitio estático, **sin build**. Vercel lo sirve tal cual.

## Secciones

Hero animado · El Estudio · Servicios · Proyectos (con filtro y **modal de detalle** por caso) · Proceso · Testimonios · Marcas · CTA + footer con contacto real.

## Identidad de marca

- Rojo de marca: `#F50A2E`
- Tipografías: Montserrat (títulos) + Inter (texto)
- Logo real en `assets/img/logo.png` (variante clara, para fondos oscuros) y `logo-dark.png` (para fondos claros). El favicon es el mark circular recortado del logo (`favicon-32/48`, `apple-touch-icon`, `icon-192/512`). Todo derivado de `brand/logo-original.png`.

## Contacto

- Tel/WhatsApp: 7910-0340 · 7937-5232 (WhatsApp abre en pestaña nueva)
- Email: tecnitechos.sv@gmail.com

## Imágenes

Las fotos de proyectos son de **Unsplash** como marcador de posición (imágenes de referencia). Cuando estén las fotos reales de cada obra, se reemplazan los `src` en `index.html` y los `img` del objeto `PROJECTS` en `js/main.js`.

## Desarrollo local

No requiere build. Servir con cualquier estático:

```bash
python -m http.server 8000
```

Y abrir http://localhost:8000

## Despliegue

Conectado a Vercel (team ObraIA). Cada push a `main` despliega automáticamente.
