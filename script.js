// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('fa-xmark');
        hamburger.classList.toggle('fa-bars');
    });
}

// Close mobile menu when link is clicked
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('fa-xmark');
            hamburger.classList.add('fa-bars');
        }
    });
});

// Advanced Scroll Animations (Intersection Observer)
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Run once for premium feel
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal-up').forEach(element => {
    observer.observe(element);
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Menu Sticky Image Hover Effect
const menuItems = document.querySelectorAll('.menu-item');
const previewImg = document.getElementById('menu-preview');

if (previewImg) {
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const newSrc = item.getAttribute('data-img');
            if (newSrc && previewImg.src !== newSrc) {
                // Fade out current image
                previewImg.classList.add('fade-out');
                
                // Wait for fade out, then swap source and fade in
                setTimeout(() => {
                    previewImg.src = newSrc;
                    previewImg.classList.remove('fade-out');
                }, 300); // 300ms matches the CSS transition time roughly
            }
            
            // Manage active state for coloring
            menuItems.forEach(el => el.classList.remove('active-item'));
            item.classList.add('active-item');
        });
    });
}
