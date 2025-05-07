/**
 * Anpadh Cafe - Main JavaScript
 * 
 * This file contains the core functionality for the Anpadh Cafe website
 * including mobile navigation, animations, and shared components.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile navigation
    initMobileNav();
    
    // Initialize animations
    initAnimations();
    
    // Initialize any other functionality
    initMiscFunctions();
});

/**
 * Mobile Navigation Functionality
 */
function initMobileNav() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    const closeBtn = document.querySelector('.close-btn');
    
    // Create overlay element
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);
    
    // Open mobile menu
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileNav.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    }
    
    // Close mobile menu
    if (closeBtn) {
        closeBtn.addEventListener('click', closeMobileMenu);
    }
    
    // Close menu when clicking overlay
    overlay.addEventListener('click', closeMobileMenu);
    
    // Close menu when pressing escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });
    
    // Close mobile menu function
    function closeMobileMenu() {
        mobileNav.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
    
    // Add active class to current page link in mobile nav
    const currentPage = window.location.pathname.split('/').pop();
    const mobileNavLinks = document.querySelectorAll('.mobile-nav ul li a');
    
    mobileNavLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
}

/**
 * Scroll Animations
 */
function initAnimations() {
    // Add fade-in animation to elements when they come into view
    const fadeElements = document.querySelectorAll('.section-header, .welcome-content, .featured-item, .testimonial-item, .value-item, .menu-item, .contact-card');
    
    // Create observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target); // Stop observing once animation applied
            }
        });
    }, {
        root: null, // Use viewport
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: '0px 0px -50px 0px' // Slight offset to trigger earlier
    });
    
    // Observe each element
    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Miscellaneous Functions
 */
function initMiscFunctions() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            // Only process if it's a proper anchor link
            if (targetId !== '#' && document.querySelector(targetId)) {
                e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                const headerOffset = 80; // Adjust based on header height
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active state to header nav based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu li a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}
