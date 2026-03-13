// 🔹 CONFIGURACIÓN DE LAS 3 SEDES 🔹
const sedes = {
  grandbourg: {
    nombre: "🏆 Sede Grand Bourg",
    descripcion: "Nuestra sede principal con todos los planes disponibles",
    direccion: "📍 Paso de los Patos 342, Grand Bourg",
    direccionMapa: "Paso de los Patos 342, Grand Bourg",
    mapa: "https://maps.google.com/maps?q=Paso%20de%20los%20Patos%20342%20Grand%20Bourg&t=&z=15&ie=UTF8&iwloc=&output=embed",
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

// 🔹 FUNCIÓN PARA CAMBIAR SEDE 🔹
function cambiarSede(sedeKey) {
  if (!sedes[sedeKey]) return;

  sedeActual = sedeKey;
  const sede = sedes[sedeKey];

  // Actualizar botones y aria-pressed
  document.querySelectorAll('.sede-btn').forEach(btn => {
    btn.classList.remove('active');
    btn.setAttribute('aria-pressed', 'false');
    if (btn.dataset.sede === sedeKey) {
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
    }
  });

  // Actualizar info
  document.getElementById('sedeNombre').textContent = sede.nombre;
  document.getElementById('sedeDescripcion').textContent = sede.descripcion;
  document.getElementById('sedeDireccion').textContent = sede.direccion;
  document.getElementById('ubicacionTexto').textContent = sede.direccionMapa;
  document.getElementById('mapaUbicacion').src = sede.mapa;

  // Mostrar/ocultar planes
  const planesConfig = sede.planes;
  document.getElementById('card-musculacion').style.display = planesConfig.musculacion ? 'flex' : 'none';
  document.getElementById('card-fitness').style.display = planesConfig.fitness ? 'flex' : 'none';
  document.getElementById('card-combinado').style.display = planesConfig.combinado ? 'flex' : 'none';
  document.getElementById('card-clase').style.display = planesConfig.clase ? 'flex' : 'none';
  document.getElementById('card-proximamente').style.display = planesConfig.proximamente ? 'flex' : 'none';

  // Actualizar precios
  const precios = ['musculacion', 'fitness', 'combinado', 'clase'];
  precios.forEach(tipo => {
    if (planesConfig[tipo]) {
      const priceElement = document.getElementById(`price-${tipo}`);
      const btnElement = document.getElementById(`btn-${tipo}`);
      priceElement.classList.add('price-updating');
      const precioFormateado = '$' + sede.precios[tipo].toLocaleString('es-AR');
      priceElement.textContent = precioFormateado;
      const mensaje = `Hola! Quiero consultar por el abono ${tipo.charAt(0).toUpperCase() + tipo.slice(1)} en ${sede.nombre}`;
      btnElement.href = `https://wa.me/5491161388313?text=${encodeURIComponent(mensaje)}`;
      setTimeout(() => priceElement.classList.remove('price-updating'), 500);
    }
  });

  document.getElementById('planes').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

document.addEventListener('DOMContentLoaded', () => {
  // Header scroll
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  });

  // Inicializar sede por defecto
  cambiarSede('grandbourg');

  // Mobile menu
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  hamburger.addEventListener('click', () => {
    const isActive = hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isActive);
  });
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 120;
    reveals.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      if (elementTop < windowHeight - elementVisible) element.classList.add('active');
    });
  };
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Fallback imágenes
  document.querySelectorAll('img[onerror]').forEach(img => {
    img.addEventListener('error', function() {
      this.style.display = 'none';
      const placeholder = this.nextElementSibling;
      if (placeholder && placeholder.classList.contains('placeholder')) placeholder.style.display = 'flex';
    });
  });
});