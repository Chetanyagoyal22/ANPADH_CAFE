/**
 * Anpadh Cafe - Testimonials JavaScript
 * 
 * This file contains the functionality specific to the testimonials page
 * including testimonial display, submission, and rating functionality.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Load testimonials data
    loadTestimonials();
    
    // Initialize rating selection
    initRatingSelection();
    
    // Initialize testimonial form submission
    initTestimonialForm();
});

/**
 * Sample testimonials data 
 * These are predefined testimonials that represent real customer experiences
 */
const testimonials = [
    {
        name: "Priya Sharma",
        location: "Dehradun",
        rating: 5,
        text: "The food at Anpadh Cafe reminds me of my mother's cooking. Their thalis are absolutely incredible and the portions are so generous! I'm a regular customer now and I don't think I'll ever get tired of their food."
    },
    {
        name: "Rahul Gupta",
        location: "Student at DIT University",
        rating: 4,
        text: "As a college student, finding affordable and delicious food is a challenge. Anpadh Cafe is a blessing! The Regular Thali at ₹120 is my go-to meal. Great quantity and amazing taste at a budget-friendly price."
    },
    {
        name: "Meera Joshi",
        location: "Local Resident",
        rating: 5,
        text: "I've been coming to Anpadh Cafe since they opened in 2015. The consistency in their food quality is remarkable. Their Paneer Parantha with curd is simply divine. The staff is always welcoming and the ambiance feels like home."
    },
    {
        name: "Vikram Singh",
        location: "Tourist",
        rating: 5,
        text: "During my visit to Dehradun, I was looking for authentic local food. A friend recommended Anpadh Cafe, and it exceeded my expectations! The Special Thali gave me a taste of real North Indian cuisine. Will definitely revisit when I'm in town again."
    },
    {
        name: "Ananya Patel",
        location: "Office Worker",
        rating: 4,
        text: "Perfect lunch spot near my workplace. The Rajma Chawal combo is my favorite - reminds me of home-cooked meals. Service is quick which is great for my short lunch breaks. Highly recommend for anyone looking for homestyle food."
    },
    {
        name: "Deepak Rawat",
        location: "Pondha",
        rating: 5,
        text: "Arun bhaiya's passion for food is evident in every dish served at Anpadh Cafe. As a neighbor, I've witnessed the growth of this cafe from a small food stall to the beloved eatery it is today. Their weekend Halwa-Poori is a must-try!"
    }
];

/**
 * Load and display testimonials
 */
function loadTestimonials() {
    const testimonialsContainer = document.getElementById('testimonials-container');
    
    if (!testimonialsContainer) return;
    
    // Clear container
    testimonialsContainer.innerHTML = '';
    
    // Add testimonials to container
    testimonials.forEach(testimonial => {
        const testimonialElement = createTestimonialElement(testimonial);
        testimonialsContainer.appendChild(testimonialElement);
    });
}

/**
 * Create testimonial HTML element
 */
function createTestimonialElement(testimonial) {
    // Create testimonial card element
    const testimonialCard = document.createElement('div');
    testimonialCard.classList.add('testimonial-card');
    
    // Create star rating HTML
    let starsHTML = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= testimonial.rating) {
            starsHTML += '<i class="fas fa-star"></i>';
        } else if (i - 0.5 <= testimonial.rating) {
            starsHTML += '<i class="fas fa-star-half-alt"></i>';
        } else {
            starsHTML += '<i class="far fa-star"></i>';
        }
    }
    
    // Set testimonial content
    testimonialCard.innerHTML = `
        <div class="testimonial-header">
            <div class="testimonial-avatar">
                <i class="fas fa-user"></i>
            </div>
            <div class="testimonial-meta">
                <h3>${testimonial.name}</h3>
                <div class="location">${testimonial.location}</div>
            </div>
        </div>
        <div class="testimonial-rating">
            <div class="star-rating">
                ${starsHTML}
            </div>
        </div>
        <div class="testimonial-text">
            <i class="fas fa-quote-left"></i>
            <p>${testimonial.text}</p>
        </div>
    `;
    
    return testimonialCard;
}

/**
 * Initialize star rating selection
 */
function initRatingSelection() {
    const stars = document.querySelectorAll('.star-rating-select i');
    const ratingInput = document.getElementById('rating');
    
    if (!stars.length || !ratingInput) return;
    
    // Add click event to stars
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = this.getAttribute('data-rating');
            ratingInput.value = rating;
            
            // Update stars appearance
            updateStarRating(stars, rating);
        });
        
        // Add hover effect
        star.addEventListener('mouseenter', function() {
            const rating = this.getAttribute('data-rating');
            
            // Add hover class to this and previous stars
            stars.forEach(s => {
                const starRating = s.getAttribute('data-rating');
                if (starRating <= rating) {
                    s.classList.add('hover');
                } else {
                    s.classList.remove('hover');
                }
            });
        });
    });
    
    // Remove hover effect when mouse leaves container
    const ratingContainer = document.querySelector('.star-rating-select');
    if (ratingContainer) {
        ratingContainer.addEventListener('mouseleave', function() {
            stars.forEach(s => s.classList.remove('hover'));
            
            // Restore selected rating
            const selectedRating = ratingInput.value;
            updateStarRating(stars, selectedRating);
        });
    }
}

/**
 * Update star rating appearance
 */
function updateStarRating(stars, rating) {
    stars.forEach(star => {
        const starRating = star.getAttribute('data-rating');
        
        // Clear existing classes
        star.classList.remove('fas', 'far');
        
        // Set appropriate class based on rating
        if (starRating <= rating) {
            star.classList.add('fas');
        } else {
            star.classList.add('far');
        }
    });
}

/**
 * Initialize testimonial form submission
 */
function initTestimonialForm() {
    const testimonialForm = document.getElementById('testimonialForm');
    
    if (!testimonialForm) return;
    
    testimonialForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value;
        const location = document.getElementById('location').value || 'Visitor';
        const rating = parseInt(document.getElementById('rating').value) || 5;
        const text = document.getElementById('testimonial').value;
        
        // Validate form
        if (!name || !text) {
            alert('Please fill out your name and testimonial.');
            return;
        }
        
        if (rating < 1) {
            alert('Please select a rating.');
            return;
        }
        
        // Show success message
        alert('Thank you for sharing your experience! Your testimonial will be reviewed and posted soon.');
        
        // Reset form
        testimonialForm.reset();
        
        // Reset star rating display
        const stars = document.querySelectorAll('.star-rating-select i');
        stars.forEach(star => {
            star.classList.remove('fas');
            star.classList.add('far');
        });
        
        // Here we would normally send this data to the server
        // Since this is a frontend-only implementation, we just acknowledge the submission
        console.log('New testimonial:', { name, location, rating, text });
    });
}
