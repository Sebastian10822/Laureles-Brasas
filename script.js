// Utilidades básicas
const $ = (sel, parent=document) => parent.querySelector(sel);
const $$ = (sel, parent=document) => [...parent.querySelectorAll(sel)];

// Datos de ejemplo (reemplaza imágenes y textos fácilmente)
const menuItems = [
  { id:1, name:'Shawarma clásico', price: 22000, img:'assets/img/dish1.webp', rating:4, cat:'shawarma' },
  { id:2, name:'Kebab mixto', price: 25000, img:'assets/img/dish2.jpg', rating:5, cat:'kebab' },
  { id:3, name:'Hamburguesa de la casa', price: 23000, img:'assets/img/dish3.jpg', rating:4, cat:'hamburguesa' },
  { id:4, name:'Pizza pepperoni', price: 28000, img:'assets/img/dish4.webp', rating:4, cat:'pizza' },
  { id:5, name:'Baklava', price: 12000, img:'assets/img/dish5.jpg', rating:5, cat:'postre' },
  { id:6, name:'Kebab de cordero', price: 27000, img:'assets/img/dish6.jpg', rating:5, cat:'kebab' },
];

const featured = [1,2,3].map(i => menuItems[i-1]);

const testimonials = [
  { name:'María', text:'La mejor sazón de La Candelaria. Volveré con toda mi familia.', img:'./assets/img/testimonial1.jpg' },
  { name:'Camilo', text:'Atención 10/10 y platos generosos. ¡Recomendadísimo!', img:'./assets/img/testimonial2.jpg' },
  { name:'Laura', text:'El shawarma es otro nivel. Se siente el amor por la cocina.', img:'./assets/img/testimonial3.jpg' },
];

const posts = [
  { title:'Tips para una parrilla perfecta', img:'assets/img/Parrillada.jpg', excerpt:'Consejos rápidos para lograr un sellado crujiente y jugoso.', url:'#' },
  { title:'Nuestros proveedores locales', img:'assets/img/Locales.jpg', excerpt:'Apoyamos el comercio de la zona, por eso compramos local.', url:'#' },
  { title:'Nuevo menú de temporada', img:'assets/img/menu.png', excerpt:'Sabores frescos inspirados en ingredientes del mes.', url:'#' },
  { title:'Postres que enamoran', img:'assets/img/postres.jpg', excerpt:'Cierra tu experiencia con dulces hechos en casa.', url:'#' },
];

const gallery = ['assets/img/Galeria.png','assets/img/Galeria2.png','assets/img/Galeria3.png','assets/img/Galeria4.png'];

// Render helpers
function pesoCOP(n){ return n.toLocaleString('es-CO', { style:'currency', currency:'COP' }); }

function renderMenu(filter='all'){
  const grid = $('#menuGrid');
  grid.innerHTML = '';
  menuItems.filter(m => filter==='all' ? true : m.cat===filter)
    .forEach(m => {
      const el = document.createElement('article');
      el.className = 'card';
      el.innerHTML = `
        <img src="${m.img}" alt="${m.name}">
        <div class="pad">
          <h3>${m.name}</h3>
          <div class="rating">${'★'.repeat(m.rating)}${'☆'.repeat(5-m.rating)}</div>
          <div class="price">${pesoCOP(m.price)}</div>
        </div>
      `;
      grid.appendChild(el);
    });
}

function renderFeatured(){
  const track = $('#featuredTrack');
  track.innerHTML = '';
  featured.forEach(m => {
    const el = document.createElement('div');
    el.className = 'slide';
    el.innerHTML = `
      <img src="${m.img}" alt="${m.name}">
      <div class="pad">
        <h3>${m.name}</h3>
        <div class="rating">${'★'.repeat(m.rating)}${'☆'.repeat(5-m.rating)}</div>
        <div class="price">${pesoCOP(m.price)}</div>
      </div>
    `;
    track.appendChild(el);
  });
  $('.carousel-btn.prev').onclick = () => track.scrollBy({left:-320, behavior:'smooth'});
  $('.carousel-btn.next').onclick = () => track.scrollBy({left: 320, behavior:'smooth'});
}

function renderTestimonials(){
  const wrap = $('#testimonialSlider');
  wrap.innerHTML = '';
  testimonials.forEach(t => {
    const el = document.createElement('div');
    el.className = 'testimonial';
    el.innerHTML = `
      <div class="meta">
        <img class="avatar" src="${t.img}" alt="${t.name}">
        <strong>${t.name}</strong>
      </div>
      <p>${t.text}</p>
    `;
    wrap.appendChild(el);
  });
}

function renderPosts(){
  const list = $('#blogList');
  list.innerHTML = '';
  posts.forEach(p => {
    const el = document.createElement('article');
    el.className = 'blog-card';
    el.innerHTML = `
      <img src="${p.img}" alt="${p.title}">
      <div class="pad">
        <h3>${p.title}</h3>
        <p>${p.excerpt}</p>
        <a class="readmore" href="${p.url}">Leer más →</a>
      </div>
    `;
    list.appendChild(el);
  });
}

function renderGallery(){
  const g = $('#galleryGrid');
  g.innerHTML = '';
  gallery.forEach(src => {
    const im = document.createElement('img');
    im.loading = 'lazy';
    im.src = src;
    im.alt = 'Galería Primos 1999';
    g.appendChild(im);
  });
}

// Filtros
$$('.filters .chip').forEach(chip => {
  chip.addEventListener('click', () => {
    $$('.filters .chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    renderMenu(chip.dataset.filter);
  });
});

// Nav responsive
const hamburger = $('#hamburger');
const mainNav = $('#mainNav');
hamburger?.addEventListener('click', () => {
  const shown = getComputedStyle(mainNav).display !== 'none';
  mainNav.style.display = shown ? 'none' : 'flex';
  hamburger.setAttribute('aria-expanded', String(!shown));
});
$$('#mainNav a').forEach(a => a.addEventListener('click', () => {
  if (window.innerWidth < 720) mainNav.style.display = 'none';
}));

// Back to top
const backToTop = $('#backToTop');
window.addEventListener('scroll', () => {
  backToTop.style.display = window.scrollY > 600 ? 'block' : 'none';
});
backToTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

// Booking form -> crea email "mailto" listo para enviar
$('#bookingForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target).entries());
  const subject = encodeURIComponent('Reserva Web — Primos 1999');
  const body = encodeURIComponent(
    `Nombre: ${data.nombre}\nTeléfono: ${data.telefono}\nCorreo: ${data.correo}\nPersonas: ${data.personas}\nFecha: ${data.fecha} ${data.hora}\n\nMensaje: ${data.mensaje || '-'}\n\nOrigen: sitio web`
  );
  // Cambia el correo aquí si deseas otro
  const mail = `mailto:reservas@primos1999.com?subject=${subject}&body=${body}`;
  window.location.href = mail;
  $('#bookingStatus').textContent = 'Abriendo tu app de correo para enviar la reserva…';
});

// Newsletter (simulado)
$('#newsletterForm').addEventListener('submit', (e) => {
  e.preventDefault();
  $('#newsletterStatus').textContent = '¡Gracias! Te agregaremos a la lista.';
  e.target.reset();
});

// Video modal
$('#playVideo').addEventListener('click', () => {
  const modal = $('#videoModal');
  $('#videoFrame').src = 'assets/video/Restarual.mp4'; // reemplaza
  modal.showModal();
});
$('#closeVideo').addEventListener('click', () => {
  const modal = $('#videoModal');
  $('#videoFrame').src = '';
  modal.close();
});

// Año del footer
$('#year').textContent = new Date().getFullYear();

// Inicializa renders
renderMenu();
renderFeatured();
renderTestimonials();
renderPosts();
renderGallery();
