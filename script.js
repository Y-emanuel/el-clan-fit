// 🔹 CONFIGURACIÓN DE LAS 3 SEDES 🔹
const sedes = {
  grandbourg: {
    nombre: "🏆 Sede Grand Bourg",
    descripcion: "Nuestra sede principal con todos los planes disponibles",
    direccion: "📍 Paso de los Patos 342, Grand Bourg",
    direccionMapa: "Paso de los Patos 342, Grand Bourg",
    mapa: "https://maps.google.com/maps?q=Paso%20de%20los%20Patos%20342%20Grand%20Bourg&t=&z=15&ie=UTF8&iwloc=&output=embed",
    whatsapp: "5491161388313",
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

// 🔹 FUNCIÓN PARA ACTUALIZAR TODOS LOS LINKS DE WHATSAPP 🔹
function actualizarWhatsAppLinks(whatsappNumber) {
  // Links en botones de planes
  ['musculacion', 'fitness', 'combinado', 'clase', 'proximamente'].forEach(tipo => {
    const btn = document.getElementById(`btn-${tipo}`);
    if (btn && btn.href) {
      const currentUrl = new URL(btn.href);
      const text = currentUrl.searchParams.get('text') || '';
      btn.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    }
  });
  
  // 🔹 Navbar WhatsApp button
  const navWhatsapp = document.querySelector('.btn-whatsapp');
  if (navWhatsapp) {
    navWhatsapp.href = `https://wa.me/${whatsappNumber}`;
  }
  
  // 🔹 WhatsApp flotante
  const floatWhatsapp = document.querySelector('.whatsapp-float');
  if (floatWhatsapp) {
    floatWhatsapp.href = `https://wa.me/${whatsappNumber}`;
  }
  
  // 🔹 Botones en Hero y CTA
  document.querySelectorAll('a[href*="wa.me/"]').forEach(link => {
    if (!link.id || !['btn-musculacion','btn-fitness','btn-combinado','btn-clase','btn-proximamente'].includes(link.id)) {
      link.href = link.href.replace(/wa\.me\/\d+/, `wa.me/${whatsappNumber}`);
    }
  });
  
  // 🔹 Footer WhatsApp link
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

  // Actualizar botones de selector y aria-pressed
  document.querySelectorAll('.sede-btn').forEach(btn => {
    btn.classList.remove('active');
    btn.setAttribute('aria-pressed', 'false');
    if (btn.dataset.sede === sedeKey) {
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
    }
  });

  // Actualizar info de sede
  document.getElementById('sedeNombre').textContent = sede.nombre;
  document.getElementById('sedeDescripcion').textContent = sede.descripcion;
  document.getElementById('sedeDireccion').textContent = sede.direccion;
  document.getElementById('ubicacionTexto').textContent = sede.direccionMapa;
  document.getElementById('mapaUbicacion').src = sede.mapa;

  // Mostrar/ocultar planes según disponibilidad
  const planesConfig = sede.planes;
  document.getElementById('card-musculacion').style.display = planesConfig.musculacion ? 'flex' : 'none';
  document.getElementById('card-fitness').style.display = planesConfig.fitness ? 'flex' : 'none';
  document.getElementById('card-combinado').style.display = planesConfig.combinado ? 'flex' : 'none';
  document.getElementById('card-clase').style.display = planesConfig.clase ? 'flex' : 'none';
  document.getElementById('card-proximamente').style.display = planesConfig.proximamente ? 'flex' : 'none';

  // Actualizar precios y links de WhatsApp en planes
  const precios = ['musculacion', 'fitness', 'combinado', 'clase'];
  precios.forEach(tipo => {
    if (planesConfig[tipo]) {
      const priceElement = document.getElementById(`price-${tipo}`);
      const btnElement = document.getElementById(`btn-${tipo}`);
      
      // Animación de precio
      priceElement.classList.add('price-updating');
      
      // Formatear precio ARS
      const precioFormateado = '$' + sede.precios[tipo].toLocaleString('es-AR');
      priceElement.textContent = precioFormateado;
      
      // 🔹 WhatsApp con mensaje SIMPLIFICADO (solo plan, sin sede)
      const nombrePlan = tipo.charAt(0).toUpperCase() + tipo.slice(1);
      const mensaje = `Hola! Quiero consultar por el abono ${nombrePlan}`;
      btnElement.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(mensaje)}`;
      
      // Remover animación
      setTimeout(() => priceElement.classList.remove('price-updating'), 500);
    }
  });

  // 🔹 ACTUALIZAR TODOS LOS LINKS DE WHATSAPP DEL SITIO
  actualizarWhatsAppLinks(whatsappNumber);

  // Scroll suave hacia sección de planes
  document.getElementById('planes').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// 🔹 EVENTOS DOMContentLoaded 🔹
document.addEventListener('DOMContentLoaded', () => {
  
  // Header scroll effect
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Inicializar sede por defecto (esto configura todos los WhatsApp)
  cambiarSede('grandbourg');

  // Mobile menu toggle con accesibilidad
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  
  hamburger.addEventListener('click', () => {
    const isActive = hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isActive);
  });

  // Cerrar menú al clickear enlace
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Scroll reveal animation optimizado
  const reveals = document.querySelectorAll('.reveal');
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 120;
    
    reveals.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      if (elementTop < windowHeight - elementVisible) {
        element.classList.add('active');
      }
    });
  };
  
  window.addEventListener('scroll', revealOnScroll, { passive: true });
  revealOnScroll(); // Ejecutar inicial

  // Smooth scroll para enlaces internos
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Fallback para imágenes con lazy loading
  document.querySelectorAll('img[onerror]').forEach(img => {
    img.addEventListener('error', function() {
      this.style.display = 'none';
      const placeholder = this.nextElementSibling;
      if (placeholder && placeholder.classList.contains('placeholder')) {
        placeholder.style.display = 'flex';
      }
    });
  });
});