import '../sass/styles.scss';
import '../sass/cookie-policy.scss';
import { translations } from './translations';

window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag('consent', 'default', {
  ad_storage: 'denied',
  analytics_storage: 'denied',
});

/* MENU SHOW */
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('show');
    });
  }
};
showMenu('nav-toggle', 'nav-menu');

/* CHIUSURA MENU */
document.addEventListener('click', (e) => {
  const nav = document.getElementById('nav-menu');
  const toggle = document.getElementById('nav-toggle');

  if (nav && toggle) {
    if (!nav.contains(e.target) && !toggle.contains(e.target)) {
      nav.classList.remove('show');
    }
  }
});

const navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    const nav = document.getElementById('nav-menu');
    if (nav) {
      nav.classList.remove('show');
    }
  });
});

/* SHOW SCROLL TOP */
function scrollTop() {
  const scrollTop = document.getElementById('scroll-top');
  if (!scrollTop) return;
  if (this.scrollY >= 560) scrollTop.classList.add('show-scroll');
  else scrollTop.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollTop);

/* SCROLL TOP ANIMATION */
const scrollTopBtn = document.getElementById('scroll-top');

if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', (e) => {
    e.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
}

/* SELECT NAV ANIMATION */
document.querySelectorAll('.nav__link').forEach((link) => {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href')?.substring(1);
    if (targetId) {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
  });
});

/*----- SCROLL SECTIONS ACTIVE LINK -----*/
const sections = document.querySelectorAll('section');
const navLinks2 = document.querySelectorAll('.nav__link');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 50;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      current = section.getAttribute('id');
    }
  });

  navLinks2.forEach((link) => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

/*----- COPYRIGHT YEAR -----*/

const currentYearElement = document.getElementById('currentYear');
if (currentYearElement) {
  currentYearElement.textContent = new Date().getFullYear();
}

/*----- EMAIL-----*/
const apiUrl = import.meta.env.VITE_API_URL;
const contactForm = document.getElementById('contactForm');
const spinnerContainer = document.querySelector('.spinner-container');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const responseMessage = document.getElementById('responseMessage');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const submitButton = document.querySelector('.contact__button');

    if (!nameInput || !emailInput || !messageInput || !responseMessage) return;

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    const params = { name, email, message };

    if (!params.name || !params.email || !params.message) {
      responseMessage.textContent =
        'Please fill in all fields before submitting!';
      responseMessage.className = 'response-message warning';
      responseMessage.style.display = 'block';

      setTimeout(() => {
        responseMessage.style.display = 'none';
      }, 4000);
      return;
    }

    submitButton.disabled = true;
    spinnerContainer.style.display = 'flex';

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })
      .then((response) => response.json())
      .then((data) => {
        submitButton.disabled = false;
        spinnerContainer.style.display = 'none';

        if (data.success) {
          responseMessage.textContent = 'Message sent successfully!';
          responseMessage.className = 'response-message success';
          responseMessage.style.display = 'block';

          contactForm.reset();

          setTimeout(() => {
            responseMessage.style.display = 'none';
          }, 4000);
        } else {
          if (data.error === 'Too many requests, please try again later') {
            responseMessage.textContent =
              'You are sending too many requests. Please try again later.';
          } else {
            responseMessage.textContent =
              'Error sending message. Try again later';
          }
          responseMessage.className = 'response-message error';
          responseMessage.style.display = 'block';

          setTimeout(() => {
            responseMessage.style.display = 'none';
          }, 4000);
        }
      })
      .catch((error) => {
        submitButton.disabled = false;
        spinnerContainer.style.display = 'none';

        responseMessage.textContent = 'Error sending message. Try again later';
        responseMessage.className = 'response-message error';
        responseMessage.style.display = 'block';

        setTimeout(() => {
          responseMessage.style.display = 'none';
        }, 4000);
      });
  });
}

function checkCookieConsent() {
  const consent = localStorage.getItem('cookieConsent');
  const banner = document.getElementById('cookieBanner');

  if (!banner) return;

  if (consent === 'accepted') {
    banner.style.display = 'none';
    loadGoogleAnalytics();
  } else if (consent === null) {
    if (typeof gsap !== 'undefined' && typeof Expo !== 'undefined') {
      startOverlayAnimation();
    } else {
      showCookieBanner();
    }
  }
}

function startOverlayAnimation() {
  if (typeof gsap === 'undefined' || typeof Expo === 'undefined') return;

  let overlay = gsap.timeline();
  overlay
    .to('.first', 1.5, { top: '-100%', ease: Expo.easeInOut })
    .to('.second', 1.5, { top: '-100%', ease: Expo.easeInOut }, '<=0.2')
    .to('.third', 1.5, { top: '-100%', ease: Expo.easeInOut }, '<=0.2')
    .call(showCookieBanner);
}

function showCookieBanner() {
  const banner = document.getElementById('cookieBanner');
  if (banner) {
    banner.style.display = 'block';
  }
}

function acceptCookies() {
  localStorage.setItem('cookieConsent', 'accepted');
  const banner = document.getElementById('cookieBanner');
  if (banner) {
    banner.style.display = 'none';
  }

  if (typeof gtag === 'function') {
    gtag('consent', 'update', {
      ad_storage: 'granted',
      analytics_storage: 'granted',
    });
  }
  loadGoogleAnalytics();
}

function declineCookies() {
  localStorage.setItem('cookieConsent', 'declined');
  const banner = document.getElementById('cookieBanner');
  if (banner) {
    banner.style.display = 'none';
  }

  if (typeof gtag === 'function') {
    gtag('consent', 'update', {
      ad_storage: 'denied',
      analytics_storage: 'denied',
    });
  }
}

function loadGoogleAnalytics() {
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-EW6439QPSN';
  document.head.appendChild(script);

  script.onload = () => {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', 'G-EW6439QPSN', { anonymize_ip: true });
  };
}

function modifyCookieConsent() {
  localStorage.removeItem('cookieConsent');
  showCookieBanner();
}

window.acceptCookies = acceptCookies;
window.declineCookies = declineCookies;
window.modifyCookieConsent = modifyCookieConsent;
window.addEventListener('load', checkCookieConsent);

/*----- ANIMATIONS -----*/

if (typeof gsap !== 'undefined') {
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  document.querySelectorAll('.animated-element').forEach((el) => {
    el.style.willChange = 'transform, opacity';
  });

  // OVERLAY
  let overlay = gsap.timeline();
  overlay
    .to('.first', 1.5, { top: '-100%', ease: Expo.easeInOut })
    .to('.second', 1.5, { top: '-100%', ease: Expo.easeInOut }, '<=0.2')
    .to('.third', 1.5, { top: '-100%', ease: Expo.easeInOut }, '<=0.2');

  /*----- HOME -----*/

  let homeTl = gsap.timeline({
    defaults: {
      duration: 2,
      ease: 'expo.out',
    },
  });

  homeTl
    .from('.home__information', { opacity: 0, y: 25, duration: 3 }, 2.3)
    .from('.anime-text', { opacity: 0, y: 25, duration: 3, stagger: 0.3 }, 2.3)
    .from('.nav__logo', { opacity: 0, y: 25, duration: 3 }, 3.2)
    .from('.nav__item', { opacity: 0, y: 25, duration: 3, stagger: 0.2 }, 2.3)
    .from(
      '.home__social-icon',
      { opacity: 0, y: 25, duration: 3, stagger: 0.2 },
      4,
    );

  /*----- ABOUT -----*/
  if (typeof ScrollTrigger !== 'undefined') {
    const aboutSection = document.querySelector('.about');
    if (aboutSection) {
      const aboutTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.about',
          start: 'top center+=100',
          end: 'bottom center',
          toggleActions: 'play reverse play reverse',
          scroller: document.body,
          markers: false,
        },
      });

      aboutTl
        .fromTo(
          '.about__title',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        )
        .fromTo(
          '.about__img',
          { opacity: 0, x: -100 },
          { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' },
          '-=0.4',
        )
        .fromTo(
          '.about__text',
          { opacity: 0, x: 100 },
          { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' },
          '-=0.6',
        );
    }

    /*----- SKILLS -----*/
    const skillsTitle = document.querySelector('.skills__title');
    if (skillsTitle) {
      const skillsTitleTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.skills__title',
          start: 'top center+=200',
          toggleActions: 'play reverse play reverse',
          scroller: document.body,
        },
      });

      skillsTitleTl.fromTo(
        '.skills__title',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      );
    }

    document.querySelectorAll('.skills__category').forEach((category) => {
      const categoryTl = gsap.timeline({
        scrollTrigger: {
          trigger: category,
          start: 'top center+=300',
          toggleActions: 'play reverse play reverse',
          scroller: document.body,
        },
      });

      const categoryTitle = category.querySelector('.skills__category-title');
      if (categoryTitle) {
        categoryTl.fromTo(
          categoryTitle,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        );
      }

      category.querySelectorAll('.skills__item').forEach((item, itemIndex) => {
        categoryTl.fromTo(
          item,
          { opacity: 0, scale: 0.5, rotate: -180 },
          {
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 0.4,
            ease: 'back.out(1.7)',
          },
          `-=${itemIndex ? 0.3 : 0}`,
        );
      });
    });

    /*----- CAREER -----*/
    const timeline = document.querySelector('.career__timeline');
    if (timeline) {
      const timelineHeight = timeline.offsetHeight - 20;

      gsap.to('.career__line', {
        scrollTrigger: {
          trigger: '.career__timeline',
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
          scroller: document.body,
        },
        scaleY: 1,
        ease: 'none',
      });

      gsap.to('.career__ball', {
        scrollTrigger: {
          trigger: '.career__timeline',
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
          scroller: document.body,
        },
        y: timelineHeight,
        ease: 'none',
      });
    }

    document.querySelectorAll('.career__item').forEach((item) => {
      gsap.fromTo(
        item,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: item,
            start: 'top center+=100',
            toggleActions: 'play none none reverse',
            scroller: document.body,
          },
        },
      );
    });

    /*----- CONTACT ME -----*/
    const contactTitle = document.querySelector('.contact__title');
    if (contactTitle) {
      const contactTitleTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.contact__title',
          start: 'top center+=200',
          end: 'bottom center-=680',
          toggleActions: 'play reverse play reverse',
          scroller: document.body,
        },
      });

      // contactTitleTl.fromTo(
      //   '.contact__title',
      //   { opacity: 0, y: 30 },
      //   { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      // );
    }

    const contactContent = document.querySelector('.contact__content');
    if (contactContent) {
      const contactBoxesTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.contact__content',
          start: 'top center+=200',
          end: 'bottom center-=600',
          toggleActions: 'play reverse play reverse',
          scroller: document.body,
        },
      });

      document.querySelectorAll('.contact__box').forEach((box, index) => {
        contactBoxesTl.fromTo(
          box,
          { opacity: 0, y: 50, scale: 0.8 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
          index * 0.2,
        );
      });
    }

    const contactForm = document.querySelector('.contact__form');
    if (contactForm) {
      const formTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.contact__form',
          start: 'top center+=200',
          toggleActions: 'play reverse play reverse',
          scroller: document.body,
        },
      });

      const contactInputs = contactForm.querySelector('.contact__inputs');
      const textAreaInput = contactForm.querySelector('.text-area-input');
      const contactButton = contactForm.querySelector('.contact__button');

      if (contactInputs) {
        formTl.fromTo(
          '.contact__inputs',
          { opacity: 0, x: -50 },
          { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' },
        );
      }

      if (textAreaInput) {
        formTl.fromTo(
          '.text-area-input',
          { opacity: 0, x: 50 },
          { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' },
          '-=0.6',
        );
      }

      if (contactButton) {
        formTl.fromTo(
          '.contact__button',
          { opacity: 0, y: 30, scale: 0.8 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
          '-=0.4',
        );
      }
    }
  }

  document.querySelectorAll('.contact__box').forEach((box) => {
    const icon = box.querySelector('.contact__icon');
    if (icon) {
      const hoverTl = gsap.timeline({ paused: true });

      // hoverTl
      //   .to(box, {
      //     y: -5,
      //     duration: 0.3,
      //     ease: 'power2.out',
      //     boxShadow: '0 6px 8px rgba(174, 190, 205, 0.4)',
      //   })
      //   .to(icon, { scale: 1.2, duration: 0.3, ease: 'power2.out' }, '-=0.3');

      box.addEventListener('mouseenter', () => hoverTl.play());
      box.addEventListener('mouseleave', () => hoverTl.reverse());
    }
  });

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh(true);
      }
    }, 500);
  });

  window.addEventListener('load', () => {
    setTimeout(() => {
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh(true);
      }
    }, 100);
  });
}

//TRANSLATIONS

function setLanguage(lang) {
  document.documentElement.lang = lang;
  localStorage.setItem('siteLang', lang);
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
}

window.setLanguage = setLanguage;

const defaultLang = localStorage.getItem('siteLang') || 'en';
setLanguage(defaultLang);
