/**
 * Anpadh Cafe - Menu JavaScript
 * 
 * This file contains the functionality specific to the menu page
 * including category filtering and item display.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize menu tabs
    initMenuTabs();
});

/**
 * Menu Tab Filtering Functionality
 */
function initMenuTabs() {
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuItems = document.querySelectorAll('.menu-item');
    const menuCategories = document.querySelectorAll('.menu-category');
    
    // Add click event to each tab
    menuTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            menuTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Get selected category
            const category = this.getAttribute('data-category');
            
            // Filter menu items based on category
            if (category === 'all') {
                // Show all categories
                menuCategories.forEach(cat => {
                    cat.style.display = 'block';
                });
                
                // Show all items 
                menuItems.forEach(item => {
                    item.style.display = 'block';
                });
            } else {
                // Hide all categories first
                menuCategories.forEach(cat => {
                    if (cat.id === category) {
                        cat.style.display = 'block';
                    } else {
                        cat.style.display = 'none';
                    }
                });
                
                // Show only items matching the category
                menuItems.forEach(item => {
                    const itemCategory = item.getAttribute('data-category');
                    if (itemCategory === category) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            }
            
            // Scroll to the top of the menu section
            document.querySelector('.menu-section').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
    
    // Add hover effect to menu items
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    // Optional: Add click to show full description for mobile
    if (window.innerWidth < 768) {
        menuItems.forEach(item => {
            item.addEventListener('click', function() {
                // Toggle a class for expanded view on mobile
                this.classList.toggle('expanded');
            });
        });
    }
}

/**
 * Menu Search Functionality (optional enhancement)
 */
function initMenuSearch() {
    // Could be implemented if a search feature is needed
    // This would allow users to search for menu items by name or ingredients
    
    // Example implementation:
    const searchInput = document.getElementById('menuSearch');
    const menuItems = document.querySelectorAll('.menu-item');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            
            menuItems.forEach(item => {
                const itemName = item.querySelector('h3').textContent.toLowerCase();
                const itemDesc = item.querySelector('p').textContent.toLowerCase();
                
                if (itemName.includes(searchTerm) || itemDesc.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
}
