const nav=document.getElementById('nav');
addEventListener('scroll',()=>{nav.classList.toggle('scrolled',scrollY>60)},{passive:true});
const t=document.getElementById('ticker');
t.innerHTML+=t.innerHTML;
const io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}});},{threshold:.14});
document.querySelectorAll('.rv,.step').forEach(el=>io.observe(el));
const btns=document.querySelectorAll('.filters button');
const projs=document.querySelectorAll('.proj');
btns.forEach(b=>b.addEventListener('click',()=>{
  btns.forEach(x=>x.classList.remove('active'));
  b.classList.add('active');
  const f=b.dataset.f;
  projs.forEach(p=>{
    const show=f==='all'||p.dataset.cat===f;
    p.classList.toggle('hidden',!show);
    if(show){p.style.opacity=0;requestAnimationFrame(()=>{p.style.transition='opacity .6s var(--ease)';p.style.opacity=1})}
  });
}));
if(!matchMedia('(prefers-reduced-motion: reduce)').matches){
  const sky=document.querySelector('.skyline');
  addEventListener('scroll',()=>{const y=Math.min(scrollY,innerHeight);sky.style.transform=`translateY(${y*.16}px)`;},{passive:true});
}

/* ===== Mobile nav toggle ===== */
const navToggle=document.getElementById('navToggle');
if(navToggle){
  navToggle.addEventListener('click',()=>{
    const open=document.body.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded',open);
    navToggle.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');
  });
  document.querySelectorAll('#navLinks a').forEach(a=>a.addEventListener('click',()=>{
    document.body.classList.remove('nav-open');
    navToggle.setAttribute('aria-expanded','false');
  }));
}

/* ===== Project detail modal ===== */
const PROJECTS={
  p1:{cat:'Residencial — Vivienda a la Medida',title:'Residencia en Cantón El Carmen',sub:'San Salvador · Entregada en 2022',img:'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=75',meta:[['Ubicación','Cantón El Carmen, San Salvador'],['Año','2022'],['Tipología','Vivienda unifamiliar'],['Alcance','Diseño + construcción llave en mano']],desc:['Vivienda diseñada a la medida de la familia, del anteproyecto arquitectónico a la entrega de llaves. Un solo equipo integró diseño, ingeniería estructural, construcción y acabados.','Se priorizó la iluminación natural, la ventilación cruzada y espacios sociales abiertos, con materiales de baja mantención pensados para el clima salvadoreño.'],scope:['Arquitectura','Estructura','Construcción','Acabados','Interiorismo']},
  p2:{cat:'Industrial — Fábricas',title:'Fábrica Protecto',sub:'San Juan Opico, La Libertad · 2016',img:'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=75',meta:[['Ubicación','San Juan Opico, La Libertad'],['Año','2016'],['Tipología','Nave industrial'],['Alcance','Obra civil + estructura metálica']],desc:['Construcción de instalaciones industriales de gran claro para producción, con estructura metálica de acero y cubiertas de gran extensión.','El proyecto exigió coordinación logística en sitio, control de calidad continuo y cumplimiento estricto de plazos productivos.'],scope:['Obra civil','Estructura metálica','Cubiertas','Instalaciones','Supervisión']},
  p3:{cat:'Institucional — Obra Religiosa',title:'Catedral Santiago de María',sub:'Santiago de María, Usulután · 1989–1992',img:'https://images.unsplash.com/photo-1438032005730-c779502df39b?auto=format&fit=crop&w=1200&q=75',meta:[['Ubicación','Santiago de María, Usulután'],['Período','1989–1992'],['Tipología','Obra religiosa'],['Alcance','Construcción integral']],desc:['Uno de los proyectos fundacionales de la firma: obra religiosa de escala monumental que consolidó nuestra experiencia en construcción institucional.','Trabajo de estructura, albañilería fina y detalle arquitectónico de largo aliento, ejecutado con estándares que hoy siguen definiendo nuestra obra.'],scope:['Estructura','Albañilería','Acabados','Detalle arquitectónico']},
  p4:{cat:'Comercial — Oficinas',title:'Local Comercial y Oficinas',sub:'Paseo Gral. Escalón, San Salvador · 2017',img:'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=75',meta:[['Ubicación','Paseo Gral. Escalón, San Salvador'],['Año','2017'],['Tipología','Comercial / oficinas'],['Alcance','Remodelación + interiorismo']],desc:['Adecuación de local comercial y oficinas sobre uno de los corredores más exigentes de la capital, con foco en imagen de marca y funcionalidad.','Se ejecutó por fases para permitir la continuidad del negocio, integrando iluminación, mobiliario y sistemas.'],scope:['Remodelación','Interiorismo','Iluminación','Instalaciones']},
  p5:{cat:'Techos y Cubiertas',title:'Cocheras y Cubiertas Residenciales',sub:'Gran San Salvador · Diseño e instalación',img:'https://images.unsplash.com/photo-1632759145351-1d592919f522?auto=format&fit=crop&w=1200&q=75',meta:[['Cobertura','Gran San Salvador'],['Tipología','Techos y cubiertas'],['Materiales','Estructura metálica + lámina'],['Alcance','Diseño e instalación']],desc:['Sistemas de techos y cubiertas para vivienda: cocheras, terrazas y ampliaciones con estructura metálica y láminas de alto desempeño.','Diseñados para resistir sol, lluvia y viento, con soluciones de drenaje e impermeabilización adaptadas a cada casa.'],scope:['Estructura metálica','Cubiertas','Impermeabilización','Drenajes']},
  p6:{cat:'Comercial — Restaurantes',title:'Restaurante de Comida China',sub:'San Salvador · 2019',img:'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=75',meta:[['Ubicación','San Salvador'],['Año','2019'],['Tipología','Gastronomía'],['Alcance','Remodelación + interiorismo']],desc:['Transformación de un local en un restaurante temático, cuidando el ambiente, la circulación de comensales y las áreas de cocina.','Se integraron acabados, iluminación y detalles decorativos para lograr una experiencia coherente de principio a fin.'],scope:['Remodelación','Interiorismo','Cocina','Iluminación']},
  p7:{cat:'Residencial — Casa de Campo',title:'Casa de Campo',sub:'Camino a Comasagua, La Libertad · 2020',img:'https://images.unsplash.com/photo-1595877244574-e90ce41ce089?auto=format&fit=crop&w=1200&q=75',meta:[['Ubicación','Camino a Comasagua, La Libertad'],['Año','2020'],['Tipología','Casa de campo'],['Alcance','Diseño + construcción']],desc:['Casa de campo integrada al entorno natural, con materiales cálidos y grandes vanos que enmarcan el paisaje.','Pensada para el descanso: terrazas, ventilación natural y una relación fluida entre el interior y el exterior.'],scope:['Arquitectura','Construcción','Estructura','Acabados','Exteriores']},
  p8:{cat:'Institucional — Salud',title:'Remodelación Edificio Inframedica',sub:'San Salvador · 2014–2015',img:'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=75',meta:[['Ubicación','San Salvador'],['Período','2014–2015'],['Tipología','Institucional / salud'],['Alcance','Remodelación integral']],desc:['Remodelación de un edificio de servicios de salud, cumpliendo requerimientos técnicos, de higiene y de flujo de pacientes.','Intervención por áreas para mantener el funcionamiento de la clínica, con acabados durables y fáciles de sanitizar.'],scope:['Remodelación','Instalaciones','Acabados sanitarios','Señalización']}
};
const modal=document.getElementById('projModal');
let pmLastFocus=null;
function openProject(id){
  const d=PROJECTS[id]; if(!d||!modal) return;
  document.getElementById('pmTag').textContent=d.cat.split('—')[0].trim();
  document.getElementById('pmCat').textContent=d.cat;
  document.getElementById('pmTitle').textContent=d.title;
  document.getElementById('pmSub').textContent=d.sub;
  const img=document.getElementById('pmImg'); img.src=d.img; img.alt=d.title;
  document.getElementById('pmMeta').innerHTML=d.meta.map(m=>`<div><small>${m[0]}</small><strong>${m[1]}</strong></div>`).join('');
  document.getElementById('pmDesc').innerHTML=d.desc.map(p=>`<p>${p}</p>`).join('');
  document.getElementById('pmScope').innerHTML=d.scope.map(s=>`<li>${s}</li>`).join('');
  pmLastFocus=document.activeElement;
  modal.classList.add('show'); modal.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
  document.getElementById('pmClose').focus();
}
function closeProject(){
  if(!modal) return;
  modal.classList.remove('show'); modal.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
  if(pmLastFocus) pmLastFocus.focus();
}
projs.forEach(p=>{
  const id=p.dataset.id; if(!id) return;
  p.addEventListener('click',()=>openProject(id));
  p.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openProject(id);}});
});
if(modal){
  modal.addEventListener('click',e=>{if(e.target.hasAttribute('data-close')) closeProject();});
  document.getElementById('pmCtaLink').addEventListener('click',closeProject);
  addEventListener('keydown',e=>{if(e.key==='Escape'&&modal.classList.contains('show')) closeProject();});
}