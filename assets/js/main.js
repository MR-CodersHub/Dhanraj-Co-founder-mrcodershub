/**
 * DHANRAJ S — Personal Portfolio JavaScript
 * Co-Founder & Head of Operations, MR CODERS HUB
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initStatsCounter();
  initExpertiseFilters();
  initContactForm();
  initScrollTop();
  initActiveNav();
  initProjectModals();
});

/* ==========================================================================
   EXPERTISE FILTER TABS
   ========================================================================== */
function initExpertiseFilters() {
  const filterBtns = document.querySelectorAll('.exp-tab-btn');
  const cards = document.querySelectorAll('.expertise-card');
  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.transition = 'all 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 30);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   MOBILE NAVIGATION
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  
  if (!toggleBtn || !drawer) return;

  const closeDrawer = () => {
    drawer.classList.remove('open');
    toggleBtn.classList.remove('active');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  const openDrawer = () => {
    drawer.classList.add('open');
    toggleBtn.classList.add('active');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };
  
  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  // Close when clicking nav links or buttons in mobile drawer
  const drawerInteractiveElements = drawer.querySelectorAll('.nav-link, .btn');
  drawerInteractiveElements.forEach(el => {
    el.addEventListener('click', () => {
      closeDrawer();
    });
  });

  // Close when clicking outside the drawer
  document.addEventListener('click', (e) => {
    if (drawer.classList.contains('open') && !drawer.contains(e.target) && !toggleBtn.contains(e.target)) {
      closeDrawer();
    }
  });

  // Close on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });

  // Reset if screen resized to desktop view
  window.addEventListener('resize', () => {
    if (window.innerWidth > 991 && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/* ==========================================================================
   ACTIVE NAVIGATION & SCROLL HIGHLIGHT
   ========================================================================== */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.main-nav .nav-link, .mobile-drawer .nav-link');

  if (sections.length === 0) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset + 120;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}` || link.getAttribute('href') === `index.html#${sectionId}`) {
            link.classList.add('active');
          } else if (link.getAttribute('href')?.startsWith('#')) {
            link.classList.remove('active');
          }
        });
      }
    });
  });
}

/* ==========================================================================
   STATS COUNTER ANIMATION
   ========================================================================== */
function initStatsCounter() {
  const statContainers = document.querySelectorAll('.hero-stats, .about-stats-row, .achievements-stats-grid, .venture-metrics-panel');
  if (!statContainers.length) return;

  const animateContainer = (container) => {
    const numbers = container.querySelectorAll('.stat-number, .about-stat-number, .achieve-num, .vstat-number');
    numbers.forEach(stat => {
      const targetText = stat.innerText.trim();
      const rawDigits = targetText.replace(/[^0-9]/g, '');
      const targetNum = parseInt(rawDigits, 10);
      if (isNaN(targetNum)) return;
      
      const prefix = targetText.startsWith('$') ? '$' : '';
      let suffix = '';
      if (targetText.includes('M+') || (targetText.includes('M') && targetText.includes('+'))) suffix = 'M+';
      else if (targetText.includes('K+') || (targetText.includes('K') && targetText.includes('+'))) suffix = 'K+';
      else if (targetText.includes('%')) suffix = '%';
      else if (targetText.includes('+')) suffix = '+';
      
      const hasComma = targetText.includes(',');
      let start = 0;
      const duration = 1400;
      const stepTime = Math.max(Math.floor(duration / 60), 16);
      const stepInc = Math.max(Math.ceil(targetNum / 45), 1);
      
      const timer = setInterval(() => {
        start += stepInc;
        if (start >= targetNum) {
          stat.innerText = prefix + (hasComma ? targetNum.toLocaleString() : targetNum) + suffix;
          clearInterval(timer);
        } else {
          stat.innerText = prefix + (hasComma ? start.toLocaleString() : start) + suffix;
        }
      }, stepTime);
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        entry.target.classList.add('counted');
        animateContainer(entry.target);
      }
    });
  }, { threshold: 0.3 });

  statContainers.forEach(c => observer.observe(c));
}

/* ==========================================================================
   PROJECT MODALS (INTERACTIVE CASE STUDY VIEWER)
   ========================================================================== */
const projectData = {
  mrcodershub: {
    title: 'MR CODERS HUB — EdTech & Developer Ecosystem',
    category: 'EDTECH & TECH ECOSYSTEM',
    image: 'assets/images/project_mrcodershub.jpg',
    description: 'An all-in-one developer learning hub, interactive coding arena, and enterprise LMS designed to empower software developers with hands-on project experience, mentorship, and operationalized training workflows.',
    client: 'MR CODERS HUB In-House',
    role: 'Co-Founder & Head of Operations',
    deliverables: ['System Architecture & Delivery Roadmap', 'Real-time Code Runner Infrastructure', 'Interactive Course Engine', 'Operational SOPs & Community Platform'],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'AWS ECS', 'Tailwind CSS'],
    liveLink: 'https://mrcodershub.com'
  },
  designstudio: {
    title: 'Studio North / Syntax & Form — Creative Tech Platform',
    category: 'DIGITAL PLATFORM & BRANDING',
    image: 'assets/images/project_designstudio.jpg',
    description: 'A high-impact digital presence engineered for a premier design consultancy, integrating streamlined headless content workflows, performance optimization, and disciplined sprint delivery.',
    client: 'Studio North London',
    role: 'Head of Delivery & Tech Architect',
    deliverables: ['Custom Design System Architecture', 'Headless CMS Integration', 'Performance Governance (99+ Lighthouse)', 'Sprint & Delivery Management'],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Sanity.io', 'GSAP', 'Vercel'],
    liveLink: '#'
  },
  aisaas: {
    title: 'Aether AI / Innovate AI — Enterprise Intelligence SaaS',
    category: 'ENTERPRISE SAAS PLATFORM',
    image: 'assets/images/project_aisaas.jpg',
    description: 'A scalable data synthesis and neural workflow orchestration platform built for enterprise decision makers, governed by structured milestone tracking and high-availability architecture.',
    client: 'Innovate AI Inc.',
    role: 'Technical Delivery & Operations Lead',
    deliverables: ['High-throughput Visualization UI', 'Multi-tenant Auth & API Pipeline', 'Milestone Governance & QA Lifecycle', 'Operational Monitoring & Logging'],
    technologies: ['React', 'Python FastAPI', 'Redis', 'Tailwind CSS', 'Chart.js', 'OAuth2'],
    liveLink: '#'
  }
};

function initProjectModals() {
  const modalOverlay = document.getElementById('projectModal');
  const closeBtn = document.querySelector('.modal-close-btn');
  const projectCards = document.querySelectorAll('[data-project-id]');

  if (!modalOverlay) return;

  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const projectId = card.getAttribute('data-project-id');
      const data = projectData[projectId];
      if (!data) return;

      document.getElementById('modalTitle').innerText = data.title;
      document.getElementById('modalCategory').innerText = data.category;
      document.getElementById('modalImage').src = data.image;
      document.getElementById('modalDescription').innerText = data.description;
      document.getElementById('modalClient').innerText = data.client;
      document.getElementById('modalRole').innerText = data.role;
      
      const techContainer = document.getElementById('modalTech');
      techContainer.innerHTML = '';
      data.technologies.forEach(t => {
        const badge = document.createElement('span');
        badge.className = 'tech-badge';
        badge.style.cssText = 'background:#F4F4F5; color:#111; padding:4px 10px; font-size:11px; font-weight:700; border-radius:2px; display:inline-block; margin:2px 4px 2px 0;';
        badge.innerText = t;
        techContainer.appendChild(badge);
      });

      const delivContainer = document.getElementById('modalDeliverables');
      delivContainer.innerHTML = '';
      data.deliverables.forEach(d => {
        const li = document.createElement('li');
        li.style.cssText = 'font-size:13px; color:#4B5563; margin-bottom:6px;';
        li.innerHTML = `• ${d}`;
        delivContainer.appendChild(li);
      });

      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

/* ==========================================================================
   CONTACT FORM & TOAST
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('portfolioContactForm');
  const toast = document.getElementById('contactToast');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = 'SENDING...';
    submitBtn.disabled = true;

    setTimeout(() => {
      form.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      
      showToast('Thank you! Your message has been received. Dhanraj S will get back to you within 24 hours.');
    }, 1000);
  });
}

function showToast(message) {
  let toast = document.getElementById('contactToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'contactToast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<span style="color:#2563EB; font-weight:bold; font-size:16px;">✓</span> <span>${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
}

/* ==========================================================================
   SCROLL TO TOP
   ========================================================================== */
function initScrollTop() {
  const btn = document.querySelector('.back-to-top, .scroll-top-btn');
  if (!btn) return;

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
