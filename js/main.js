// ===== DOM ELEMENTS =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');
const successModal = document.getElementById('successModal');

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== MOBILE MENU =====
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== FORM SUBMISSION =====
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Here you would normally send data to server
    // For now, just show success modal
    console.log('Form ', data);
    
    // Show success modal
    successModal.classList.add('active');
    
    // Reset form
    contactForm.reset();
    
    // In production, uncomment this to send 
    /*
    try {
        const response = await fetch('send-mail.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            successModal.classList.add('active');
            contactForm.reset();
        } else {
            alert('Произошла ошибка при отправке. Попробуйте позже.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Произошла ошибка при отправке. Попробуйте позже.');
    }
    */
});

// Close modal function
function closeModal() {
    successModal.classList.remove('active');
}

// Close modal on outside click
successModal.addEventListener('click', (e) => {
    if (e.target === successModal) {
        closeModal();
    }
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.service-card, .advantage-item, .contact-item').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = sectionId;
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== PARALLAX EFFECT (optional) =====
const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if (scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// ===== CONSOLE MESSAGE =====
console.log('%c ANTARES ', 'background: #c0c0c0; color: #1a1a1a; font-size: 20px; font-weight: bold; padding: 10px;');
console.log('%c Конструкторское бюро ', 'color: #c0c0c0; font-size: 12px;');
