// ===== ULTRA-FANCY ACADEMIC PORTFOLIO JAVASCRIPT =====

// ===== Custom Cursor =====
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

if (window.innerWidth > 768) {
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
      cursorFollower.style.left = e.clientX + 'px';
      cursorFollower.style.top = e.clientY + 'px';
    }, 100);
  });

  // Cursor hover effects
  const hoverElements = document.querySelectorAll('a, button, .pub, .stat, .research-tag');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
    });
  });
}

// ===== Mobile Navigation =====
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
  });

  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    });
  });
}

// ===== Navbar Scroll Effect =====
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// ===== Typing Effect =====
const typedElement = document.getElementById('typed');
if (typedElement) {
  const phrases = [
    'Computer Vision Researcher',
    'PhD Student at UBC',
    'Deep Learning Engineer',
    'Medical Imaging Specialist',
    'AI Agent Developer'
  ];
  
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      typedElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typedElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typingSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 500;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

// ===== Animated Counter =====
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  
  function updateCounter() {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start) + '+';
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target + '+';
    }
  }
  
  updateCounter();
}

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const navHeight = nav.offsetHeight;
      const targetPosition = target.offsetTop - navHeight - 20;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
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
      entry.target.classList.add('visible');
      
      // Animate counter when stats section is visible
      if (entry.target.classList.contains('stat-num') && entry.target.dataset.target) {
        animateCounter(entry.target, parseInt(entry.target.dataset.target));
      }
    }
  });
}, observerOptions);

// Observe elements for scroll reveal
document.querySelectorAll('.pub, .fade-in, .timeline-item, .stat-num').forEach(el => {
  observer.observe(el);
});

// ===== Experience Tabs =====
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    const targetTab = button.dataset.tab;
    
    // Remove active class from all buttons and panels
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabPanels.forEach(panel => panel.classList.remove('active'));
    
    // Add active class to clicked button and corresponding panel
    button.classList.add('active');
    document.getElementById(targetTab).classList.add('active');
  });
});

// ===== Back to Top Button =====
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopButton.classList.add('visible');
  } else {
    backToTopButton.classList.remove('visible');
  }
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ===== Parallax Effect for Floating Blobs =====
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const blobs = document.querySelectorAll('.floating-blob');
  
  blobs.forEach((blob, index) => {
    const speed = 0.5 + (index * 0.1);
    const yPos = -(scrolled * speed);
    blob.style.transform = `translateY(${yPos}px)`;
  });
});

// ===== Publication Filter (if needed in future) =====
function filterPublications(filter) {
  const publications = document.querySelectorAll('.pub');
  
  publications.forEach(pub => {
    if (filter === 'all' || pub.dataset.category === filter) {
      pub.style.display = 'grid';
    } else {
      pub.style.display = 'none';
    }
  });
}

// ===== Smooth Page Load =====
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);
});

// ===== Research Tags Interaction =====
const researchTags = document.querySelectorAll('.research-tag');
researchTags.forEach(tag => {
  tag.addEventListener('click', () => {
    // Add a subtle animation when clicked
    tag.style.transform = 'scale(0.95)';
    setTimeout(() => {
      tag.style.transform = 'scale(1)';
    }, 150);
  });
});

// ===== Publication Hover Effects =====
const publications = document.querySelectorAll('.pub');
publications.forEach(pub => {
  pub.addEventListener('mouseenter', () => {
    pub.style.transform = 'translateX(10px)';
  });
  
  pub.addEventListener('mouseleave', () => {
    pub.style.transform = 'translateX(0)';
  });
});

// ===== Social Links Animation =====
const socialLinks = document.querySelectorAll('.social-links a');
socialLinks.forEach(link => {
  link.addEventListener('mouseenter', () => {
    link.style.transform = 'translateX(10px) scale(1.05)';
  });
  
  link.addEventListener('mouseleave', () => {
    link.style.transform = 'translateX(0) scale(1)';
  });
});

// ===== Timeline Animation =====
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateX(0)';
      }, index * 100);
    }
  });
}, { threshold: 0.1 });

timelineItems.forEach(item => {
  timelineObserver.observe(item);
});

// ===== Stats Counter Animation =====
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = parseInt(entry.target.dataset.target);
      if (target) {
        animateCounter(entry.target, target);
      }
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num[data-target]').forEach(stat => {
  statsObserver.observe(stat);
});

// ===== Enhanced Scroll Effects =====
let ticking = false;

function updateScrollEffects() {
  const scrolled = window.pageYOffset;
  const rate = scrolled * -0.5;
  
  // Parallax for hero background
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    heroBg.style.transform = `translateY(${rate}px)`;
  }
  
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(updateScrollEffects);
    ticking = true;
  }
});

// ===== Keyboard Navigation =====
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    // Close mobile menu if open
    if (navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    }
  }
});

// ===== Performance Optimization =====
// Debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
  // Scroll-based animations here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// ===== Initialize Everything =====
document.addEventListener('DOMContentLoaded', () => {
  // Add loading animation
  document.body.classList.add('loaded');
  
  // Initialize any other components
  console.log('🚀 Ultra-Fancy Academic Portfolio Loaded!');
});