// ==========================================
// 1. DOM Elements Selection
// ==========================================
const menuIcon = document.querySelector('#menu-icon');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section');
const visitBtn = document.querySelector('.visit-btn');
const contactMeBtn = document.querySelector('#contact-me-btn');
const inputContainer = document.querySelector('.contact .input-box');
const sendMsgBtn = document.querySelector('.contact .btn');
const emailInput = document.querySelector('.contact input[type="email"]');
const slides = document.querySelectorAll('.slide');

// ==========================================
// 2. Mobile Navigation Dropdown Toggle
// ==========================================
menuIcon.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Close menu when clicking navigation links
navItems.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// ==========================================
// 3. ScrollSpy: Highlight Active Navbar Link
// ==========================================
window.addEventListener('scroll', () => {
  let currentSectionId = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSectionId = section.getAttribute('id');
    }
  });

  navItems.forEach(link => {
    if (link.getAttribute('href') === `#${currentSectionId}`) {
      link.style.color = '#ffffff';
      link.style.fontWeight = '600';
    } else {
      link.style.color = 'rgba(255, 255, 255, 0.7)';
      link.style.fontWeight = '300';
    }
  });
});

// ==========================================
// 4. External Link Redirection & Navigation Buttons
// ==========================================
if (visitBtn) {
  visitBtn.addEventListener('click', () => {
    window.open('https://github.com/LansiPuaka', '_blank');
  });
}

if (contactMeBtn) {
  contactMeBtn.addEventListener('click', () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// ==========================================
// 5. Dynamic Typing Effect for Hero Title
// ==========================================
const roleSpan = document.querySelector('.info-box span');
if (roleSpan) {
  const roles = ['Tech Expert', 'Content Creator', 'UI/UX Designer', 'Web Creator'];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      roleSpan.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      roleSpan.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentRole.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
  }

  typeEffect();
}

// ==========================================
// 6. Contact Form Validation & Status Feedback
// ==========================================
const statusMsg = document.createElement('p');
statusMsg.style.fontSize = '0.9rem';
statusMsg.style.fontWeight = '500';
statusMsg.style.marginTop = '0.5rem';
statusMsg.style.textAlign = 'center';
statusMsg.style.minHeight = '1.2rem';

if (inputContainer) {
  inputContainer.appendChild(statusMsg);
}

if (sendMsgBtn && emailInput) {
  sendMsgBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const emailValue = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailValue) {
      statusMsg.style.color = '#ff6b6b';
      statusMsg.textContent = 'Please enter an email address.';
    } else if (!emailRegex.test(emailValue)) {
      statusMsg.style.color = '#ff6b6b';
      statusMsg.textContent = 'Please enter a valid email address.';
    } else {
      statusMsg.style.color = '#51cf66';
      statusMsg.textContent = 'Thank you! Your message has been sent.';
      emailInput.value = '';

      setTimeout(() => {
        statusMsg.textContent = '';
      }, 4000);
    }
  });
}

// ==========================================
// 7. Auto Image Slider Logic
// ==========================================
let currentSlideIndex = 0;
const slideInterval = 3000; // 3 seconds per image transition

function showNextSlide() {
  if (slides.length === 0) return;

  slides[currentSlideIndex].classList.remove('active');
  currentSlideIndex = (currentSlideIndex + 1) % slides.length;
  slides[currentSlideIndex].classList.add('active');
}

if (slides.length > 0) {
  setInterval(showNextSlide, slideInterval);
}

// ==========================================
// 8. Dynamically Created Back-To-Top Button
// ==========================================
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
backToTopBtn.style.position = 'fixed';
backToTopBtn.style.bottom = '2rem';
backToTopBtn.style.right = '2rem';
backToTopBtn.style.width = '3rem';
backToTopBtn.style.height = '3rem';
backToTopBtn.style.borderRadius = '50%';
backToTopBtn.style.background = 'rgba(255, 255, 255, 0.1)';
backToTopBtn.style.backdropFilter = 'blur(8px)';
backToTopBtn.style.color = '#ffffff';
backToTopBtn.style.border = '1px solid rgba(255, 255, 255, 0.2)';
backToTopBtn.style.fontSize = '1.2rem';
backToTopBtn.style.cursor = 'pointer';
backToTopBtn.style.display = 'none';
backToTopBtn.style.zIndex = '1000';
backToTopBtn.style.alignItems = 'center';
backToTopBtn.style.justifyContent = 'center';
backToTopBtn.style.transition = 'all 0.3s ease';

document.body.appendChild(backToTopBtn);

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTopBtn.style.display = 'flex';
  } else {
    backToTopBtn.style.display = 'none';
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});