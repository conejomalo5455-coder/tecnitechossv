# TecniTechos — Sitio Web (Demo)

Sitio de una sola página para **TecniTechos**, firma salvadoreña de arquitectura, construcción y remodelación con obra que se remonta a 1989.

🔗 **Demo en vivo:** https://tecnitechossv-obra-ia.vercel.app

## Contenido

- `index.html` — sitio completo, autocontenido (HTML + CSS + JS en un solo archivo, sin dependencias de build).
- `assets/img/` — carpeta reservada para el logo y las fotografías reales de proyectos (ver "Pendientes" abajo).

## Secciones

1. Hero con animación de línea de horizonte (SVG que se dibuja al cargar)
2. El Estudio (historia de la marca desde 1989)
3. Servicios (arquitectura, construcción, remodelación, techos, interiores, estructuras metálicas)
4. Proyectos con filtro por categoría (residencial, comercial, industrial, institucional, techos)
5. Proceso de trabajo en 6 pasos
6. Testimonios
7. Marcas y proveedores
8. Llamado a la acción + footer con contacto real

## Identidad de marca

- Rojo de marca: `#F50A2E` (muestreado del logo oficial)
- Tipografías: Montserrat (títulos) + Inter (texto)
- Tagline: "Diseñamos. Construimos. Transformamos."

## Contacto integrado

- Tel/WhatsApp: 7910-0340 · 7937-5232
- Email: tecnitechos.sv@gmail.com

## Pendientes

- [ ] **Logo real incrustado**: esta versión usa el nombre en texto ("TECNITECHOS") en el nav y footer. Para incrustar el logo PNG real (con variante en blanco para fondos oscuros), sube el archivo del logo y se reemplaza el bloque `<span class="logo-tag">` por las etiquetas `<img>` correspondientes en base64.
- [ ] **Fotografías reales de proyectos**: la galería usa ilustraciones vectoriales tipo blueprint como marcador de posición. Cuando estén disponibles las fotos en alta resolución de cada proyecto (Cantón El Carmen, Fábrica Protecto, Catedral Santiago de María, etc.), se reemplazan los bloques `<svg>` de `.proj-media` por `<img>`.

## Despliegue

El sitio está desplegado en Vercel apuntando a este repositorio. Cualquier cambio en `main` puede configurarse para desplegar automáticamente (Vercel → Project Settings → Git → conectar este repo).

## Desarrollo local

No requiere build. Basta con abrir `index.html` en un navegador, o servirlo con cualquier servidor estático:

```bash
npx serve .
```
