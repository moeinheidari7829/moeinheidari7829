// ===== Mobile Navigation =====
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  navToggle.classList.toggle('active');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
  });
});

// ===== Navbar Scroll Effect =====
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// ===== Tab Switching =====
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const targetTab = btn.dataset.tab;
    
    // Remove active class from all buttons and contents
    tabBtns.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));
    
    // Add active class to clicked button and corresponding content
    btn.classList.add('active');
    document.querySelector(`[data-content="${targetTab}"]`).classList.add('active');
  });
});

// ===== Publication Filtering =====
const filterBtns = document.querySelectorAll('.filter-btn');
const pubCards = document.querySelectorAll('.pub-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;
    
    // Update active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Filter publications
    pubCards.forEach(card => {
      if (filter === 'all') {
        card.style.display = 'block';
      } else if (filter === 'journal') {
        card.style.display = card.dataset.type === 'journal' ? 'block' : 'none';
      } else {
        card.style.display = card.dataset.year === filter ? 'block' : 'none';
      }
      
      // Reset animation
      if (card.style.display === 'block') {
        card.style.animation = 'none';
        setTimeout(() => {
          card.style.animation = 'fadeInUp 0.5s ease-out';
        }, 10);
      }
    });
  });
});

// ===== Smooth Scroll for Anchors =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      const navHeight = navbar.offsetHeight;
      const targetPosition = target.offsetTop - navHeight - 20;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ===== Back to Top Button =====
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ===== Scroll Reveal Animation =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements for scroll reveal
document.querySelectorAll('.pub-card, .news-item, .timeline-item, .exp-card, .skill-category, .contact-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// ===== Scroll Indicator Click =====
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
  scrollIndicator.addEventListener('click', () => {
    document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
  });
}

// ===== Dynamic Greeting =====
function updateGreeting() {
  const hour = new Date().getHours();
  const greetingEl = document.querySelector('.hero-greeting');
  
  if (greetingEl) {
    if (hour < 12) {
      greetingEl.textContent = 'Good morning, I\'m';
    } else if (hour < 18) {
      greetingEl.textContent = 'Good afternoon, I\'m';
    } else {
      greetingEl.textContent = 'Good evening, I\'m';
    }
  }
}

updateGreeting();

// ===== Stats Counter Animation =====
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current) + '+';
  }, 16);
}

// Trigger counter animation when stats come into view
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.animated) {
      const numbers = entry.target.querySelectorAll('.stat-number');
      numbers.forEach(num => {
        const value = parseInt(num.textContent);
        if (!isNaN(value)) {
          animateCounter(num, value);
        }
      });
      entry.target.dataset.animated = 'true';
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
  statsObserver.observe(heroStats);
}

