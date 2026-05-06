// 🔹 CONFIGURACIÓN DE LAS 3 SEDES 🔹
const sedes = {
  grandbourg: {
    nombre: "🏆 Sede Grand Bourg",
    descripcion: "Nuestra sede principal con todos los planes disponibles",
    direccion: "📍 Paso de los Patos 342, Grand Bourg",
    direccionMapa: "Paso de los Patos 342, Grand Bourg",
    mapa: "https://maps.google.com/maps?q=Paso%20de%20los%20Patos%20342%20Grand%20Bourg&t=&z=15&ie=UTF8&iwloc=&output=embed",
    whatsapp: "5491161388313",
    // 🔥 NUEVO: Configuración de imágenes
    imagenes: {
      hero: "images/Lugar-del-clan.png",
      galeria: {
        salaPrincipal: "images/Sala-principal.jpeg",
        funcional: "images/funcional.png",
        spinning: "images/spinning.jpeg",
        musculacion: "images/Musculacion.png",
        recepcion: "images/recepcion.png"
      }
    },
    precios: {
      musculacion: 44000,
      fitness: 44000,
      combinado: 48000,
      clase: 8000
    },
    planes: {
      musculacion: true,
      fitness: true,
      combinado: true,
      clase: true,
      proximamente: false
    }
  },
  moreno: {
    nombre: "📍 Sede Moreno",
    descripcion: "Musculación y clases libres disponibles",
    direccion: "📍 Av. Néstor Kirchner 3330, Moreno",
    direccionMapa: "Av. Néstor Kirchner 3330, Moreno",
    mapa: "https://maps.google.com/maps?q=Av.%20N%C3%A9stor%20Kirchner%203330%20Moreno&t=&z=15&ie=UTF8&iwloc=&output=embed",
    whatsapp: "5491155814161",
    // 🔥 NUEVO: Configuración de imágenes (Spinning en null)
    imagenes: {
      hero: "images/Lugar-del-clan.png",
      galeria: {
        salaPrincipal: "images/moreno/sala-principal.jpeg",
        funcional: null,
        spinning: null, // <-- NULL: Oculta el recuadro de Spinning completamente
        musculacion: "images/moreno/musculacion.jpeg",
        recepcion: "images/moreno/recepcion.jpeg"
      }
    },
    precios: {
      musculacion: 40000,
      fitness: 44000,
      combinado: 48000,
      clase: 8000
    },
    planes: {
      musculacion: true,
      fitness: false,
      combinado: false,
      clase: true,
      proximamente: false
    }
  },
  pasodelrey: {
    nombre: "📍 Sede Paso Del Rey",
    descripcion: "Musculación y clases libres. ¡Próximamente clases grupales!",
    direccion: "📍 Av. Humboldt 1342, Paso Del Rey",
    direccionMapa: "Av. Humboldt 1342, Paso Del Rey",
    mapa: "https://maps.google.com/maps?q=Av.%20Humboldt%201342%20Paso%20Del%20Rey&t=&z=15&ie=UTF8&iwloc=&output=embed",
    whatsapp: "2320674864",
    // 🔥 NUEVO: Configuración de imágenes (Spinning en null)
    imagenes: {
      hero: "images/Lugar-del-clan.png",
      galeria: {
        salaPrincipal: "images/pasodelrey/sala-principal.jpeg",
        funcional: null,
        spinning: null, // <-- NULL: Oculta el recuadro de Spinning completamente
        musculacion: "images/pasodelrey/musculacion.jpeg",
        recepcion: "images/pasodelrey/recepcion.jpeg"
      }
    },
    precios: {
      musculacion: 35000,
      fitness: 44000,
      combinado: 48000,
      clase: 8000
    },
    planes: {
      musculacion: true,
      fitness: false,
      combinado: false,
      clase: true,
      proximamente: true
    }
  }
};

let sedeActual = 'grandbourg';

// 🔹 FUNCIÓN PARA ACTUALIZAR IMÁGENES DE LA SEDE 🔹
function actualizarImagenesSede(sedeKey) {
  const sede = sedes[sedeKey];
  if (!sede || !sede.imagenes) return;

  // 1. Actualizar imagen del HERO
  const heroImg = document.getElementById('hero-image');
  if (heroImg && sede.imagenes.hero) {
    heroImg.style.opacity = '0';
    setTimeout(() => {
      heroImg.src = sede.imagenes.hero;
      heroImg.onload = () => { heroImg.style.opacity = '1'; };
    }, 200);
  }

  // 2. Actualizar imágenes de la GALERÍA
  if (sede.imagenes.galeria) {
    const galeria = sede.imagenes.galeria;
    const imgIds = {
      'img-sala-principal': galeria.salaPrincipal,
      'img-funcional': galeria.funcional,
      'img-spinning': galeria.spinning,
      'img-musculacion': galeria.musculacion,
      'img-recepcion': galeria.recepcion
    };

    for (const [id, src] of Object.entries(imgIds)) {
      const imgEl = document.getElementById(id);
      if (imgEl) {
        // Seleccionamos el contenedor padre (.gallery-item)
        const galleryItem = imgEl.closest('.gallery-item');
        
        if (src) {
          // SI HAY IMAGEN: Mostramos el contenedor y cargamos la foto
          if (galleryItem) galleryItem.style.display = 'block';
          imgEl.style.opacity = '0';
          setTimeout(() => {
            imgEl.src = src;
            imgEl.onload = () => { imgEl.style.opacity = '1'; };
          }, 100);
          imgEl.style.display = 'block';
        } else {
          // SI ES NULL: Ocultamos el contenedor completo (se quita el recuadro vacío)
          if (galleryItem) galleryItem.style.display = 'none';
        }
      }
    }
  }
}

// 🔹 FUNCIÓN PARA ACTUALIZAR TODOS LOS LINKS DE WHATSAPP 🔹
function actualizarWhatsAppLinks(whatsappNumber) {
  ['musculacion', 'fitness', 'combinado', 'clase', 'proximamente'].forEach(tipo => {
    const btn = document.getElementById(`btn-${tipo}`);
    if (btn && btn.href) {
      const currentUrl = new URL(btn.href);
      const text = currentUrl.searchParams.get('text') || '';
      btn.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    }
  });
  
  const navWhatsapp = document.querySelector('.btn-whatsapp');
  if (navWhatsapp) navWhatsapp.href = `https://wa.me/${whatsappNumber}`;
  
  const floatWhatsapp = document.querySelector('.whatsapp-float');
  if (floatWhatsapp) floatWhatsapp.href = `https://wa.me/${whatsappNumber}`;
  
  document.querySelectorAll('a[href*="wa.me/"]').forEach(link => {
    if (!link.id || !['btn-musculacion','btn-fitness','btn-combinado','btn-clase','btn-proximamente'].includes(link.id)) {
      link.href = link.href.replace(/wa\.me\/\d+/, `wa.me/${whatsappNumber}`);
    }
  });
  
  const footerLinks = document.querySelectorAll('footer a[href*="wa.me"]');
  footerLinks.forEach(link => {
    link.href = link.href.replace(/wa\.me\/\d+/, `wa.me/${whatsappNumber}`);
  });
}

// 🔹 FUNCIÓN PARA CAMBIAR SEDE 🔹
function cambiarSede(sedeKey) {
  if (!sedes[sedeKey]) return;

  sedeActual = sedeKey;
  const sede = sedes[sedeKey];
  const whatsappNumber = sede.whatsapp;

  // Actualizar botones de selector
  document.querySelectorAll('.sede-btn').forEach(btn => {
    btn.classList.remove('active');
    btn.setAttribute('aria-pressed', 'false');
    if (btn.dataset.sede === sedeKey) {
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
    }
  });

  // Actualizar info de sede
  const idsInfo = ['sedeNombre', 'sedeDescripcion', 'sedeDireccion', 'ubicacionTexto'];
  const keysInfo = ['nombre', 'descripcion', 'direccion', 'direccionMapa'];
  idsInfo.forEach((id, i) => {
    const el = document.getElementById(id);
    if (el) el.textContent = sede[keysInfo[i]];
  });
  const mapaEl = document.getElementById('mapaUbicacion');
  if (mapaEl) mapaEl.src = sede.mapa;

  // 🔥 ACTUALIZAR IMÁGENES (Aquí se aplica la lógica de ocultar/null)
  actualizarImagenesSede(sedeKey);

  // Mostrar/ocultar planes
  const planesConfig = sede.planes;
  ['musculacion', 'fitness', 'combinado', 'clase', 'proximamente'].forEach(plan => {
    const card = document.getElementById(`card-${plan}`);
    if (card) card.style.display = planesConfig[plan] ? 'flex' : 'none';
  });

  // Actualizar precios y WhatsApp
  ['musculacion', 'fitness', 'combinado', 'clase'].forEach(tipo => {
    if (planesConfig[tipo]) {
      const priceEl = document.getElementById(`price-${tipo}`);
      const btnEl = document.getElementById(`btn-${tipo}`);
      if (priceEl) {
        priceEl.classList.add('price-updating');
        priceEl.textContent = '$' + sede.precios[tipo].toLocaleString('es-AR');
        setTimeout(() => priceEl.classList.remove('price-updating'), 500);
      }
      if (btnEl) {
        const nombrePlan = tipo.charAt(0).toUpperCase() + tipo.slice(1);
        const mensaje = `Hola! Quiero consultar por el abono ${nombrePlan}`;
        btnEl.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(mensaje)}`;
      }
    }
  });

  actualizarWhatsAppLinks(whatsappNumber);
  const planesSection = document.getElementById('planes');
  if (planesSection) planesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// 🔹 EVENTOS DOMContentLoaded 🔹
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }, { passive: true });

  // Inicializar sede por defecto
  cambiarSede('grandbourg');

  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isActive = hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', isActive);
    });
  }

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      if (hamburger) hamburger.classList.remove('active');
      if (navLinks) navLinks.classList.remove('active');
      if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  const reveals = document.querySelectorAll('.reveal');
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    reveals.forEach(el => {
      if (el.getBoundingClientRect().top < windowHeight - 120) {
        el.classList.add('active');
      }
    });
  };
  window.addEventListener('scroll', revealOnScroll, { passive: true });
  revealOnScroll();

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Listeners para botones de sede (opcional si usás onclick en HTML, pero recomendado)
  document.querySelectorAll('.sede-btn').forEach(btn => {
    btn.addEventListener('click', () => cambiarSede(btn.dataset.sede));
  });

  // Fallback imágenes
  document.querySelectorAll('img[onerror]').forEach(img => {
    img.addEventListener('error', function() {
      this.style.display = 'none';
      const ph = this.nextElementSibling;
      if (ph && ph.classList.contains('placeholder')) ph.style.display = 'flex';
    });
  });
});