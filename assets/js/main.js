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

  if (!nav.contains(e.target) && !toggle.contains(e.target)) {
    nav.classList.remove('show');
  }
});

const navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    const nav = document.getElementById('nav-menu');
    nav.classList.remove('show');
  });
});

/* SHOW SCROLL TOP */
function scrollTop() {
  const scrollTop = document.getElementById('scroll-top');
  if (this.scrollY >= 560) scrollTop.classList.add('show-scroll');
  else scrollTop.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollTop);

/* SCROLL TOP ANIMATION */
const scrollTopBtn = document.getElementById('scroll-top');

scrollTopBtn.addEventListener('click', (e) => {
  e.preventDefault();

  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});

/* SELECT NAV ANIMATION */
document.querySelectorAll('.nav__link').forEach((link) => {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    targetElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  });
});

/*----- MIX IT UP -----*/

const mixer = mixitup('.portfolio__container', {
  animation: {
    duration: 600,
  },
});

/*----- LINK ACTIVE PORTFOLIO -----*/
const activePortfolio = document.querySelectorAll('.portfolio__item');

function activeLink() {
  if (activePortfolio) {
    activePortfolio.forEach((link) =>
      link.classList.remove('active-portfolio'),
    );
    this.classList.add('active-portfolio');
  }
}
activePortfolio.forEach((link) => link.addEventListener('click', activeLink));

/*----- EMAIL JS -----*/

document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const responseMessage = document.getElementById('responseMessage');
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  const params = { name, email, message };

  if (!params.name || !params.email || !params.message) {
    responseMessage.textContent =
      'Please fill in all fields before submitting!';
    responseMessage.className = 'response-message error';
    responseMessage.style.display = 'block';

    setTimeout(() => {
      responseMessage.style.display = 'none';
    }, 4000);
    return;
  }

  emailjs
    .send('service_z4wztpm', 'template_snnvpxu', params, 'MM9_gOQwNfsMp_7mr')
    .then(
      (response) => {
        responseMessage.textContent = 'Message sent successfully!';
        responseMessage.className = 'response-message success';
        responseMessage.style.display = 'block';

        document.getElementById('contactForm').reset();

        setTimeout(() => {
          responseMessage.style.display = 'none';
        }, 4000);
      },
      (error) => {
        responseMessage.textContent = 'Error sending message. Try again.';
        responseMessage.className = 'response-message error';
        responseMessage.style.display = 'block';

        setTimeout(() => {
          responseMessage.style.display = 'none';
        }, 4000);
      },
    );
});

/*----- ANIMATIONS -----*/

//OVERLAY
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
//IMG
homeTl.from(
  '.home__img',
  {
    opacity: 0,
    x: 60,
  },
  0.9,
);

//INFORMATION
homeTl
  .from(
    '.home__information',
    {
      opacity: 0,
      y: 25,
      duration: 3,
    },
    2.3,
  )

  .from(
    '.anime-text',
    {
      opacity: 0,
      y: 25,
      duration: 3,
      stagger: 0.3,
    },
    2.3,
  );

//NAV ITEM
homeTl
  .from(
    '.nav__logo',
    {
      opacity: 0,
      y: 25,
      duration: 3,
    },
    3.2,
  )

  .from(
    '.nav__item',
    {
      opacity: 0,
      y: 25,
      duration: 3,
      stagger: 0.2,
    },
    2.3,
  )

  //SOCIAL
  .from(
    '.home__social-icon',
    {
      opacity: 0,
      y: 25,
      duration: 3,
      stagger: 0.2,
    },
    4,
  );

/*----- ABOUT -----*/
let aboutTl = gsap.timeline({
  defaults: {
    duration: 2.5,
    ease: 'expo.out',
  },
  scrollTrigger: {
    trigger: '.about',
    start: 'top bottom',
    end: 'top 70%',
    //markers: true,
  },
});

//TITLE
aboutTl
  .from('.about__title', {
    opacity: 0,
    duration: 3.5,
    y: 25,
  })

  //IMG
  .from(
    '.about__img',
    {
      opacity: 0,
      duration: 2.5,
      x: 60,
    },
    '<0.6',
  )

  //INFORMATION
  .from(
    '.about__text',
    {
      opacity: 0,
      duration: 3.5,
      y: 25,
      ease: 'expo.out',
    },
    '<0.4',
  );

/*----- PORTFOLIO -----*/
let portfolioTl = gsap.timeline({
  defaults: {
    duration: 2,
    ease: 'expo.out',
  },
  scrollTrigger: {
    trigger: '.portfolio',
    start: 'top bottom',
    end: 'top 70%',
  },
});

//TITLE
portfolioTl.from('.portfolio__title', {
  opacity: 0,
  duration: 2.5,
  y: 25,
});

//NAV
portfolioTl.from(
  '.portfolio__nav',
  {
    opacity: 0,
    duration: 2,
    x: -50,
  },
  '<0.4',
);

//ITEMS
portfolioTl.from(
  '.portfolio__content',
  {
    opacity: 0,
    duration: 2.5,
    y: 25,
    stagger: 0.2,
  },
  '<0.6',
);

/*----- CONTACT ME -----*/
let contactTl = gsap.timeline({
  defaults: {
    duration: 2.5,
    ease: 'expo.out',
  },
  scrollTrigger: {
    trigger: '.contact',
    start: 'top bottom',
    end: 'top 70%',
  },
});

//TITLE
contactTl.from('.contact__title', {
  opacity: 0,
  duration: 3.5,
  y: 25,
});

//CONTACT CONTENT
contactTl.from(
  '.contact__content',
  {
    opacity: 0,
    duration: 3.5,
    y: 25,
    stagger: 0.2,
  },
  '<0.4',
);

//FORM
contactTl.from(
  '.contact__form',
  {
    opacity: 0,
    duration: 3.5,
    y: 25,
  },
  '<0.4',
);
