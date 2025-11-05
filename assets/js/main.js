// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'var(--white)';
        navbar.style.backdropFilter = 'none';
    }
});


// Hero_section//

// Hero Carousel Functionality
class HeroCarousel {
    constructor() {
        this.slides = document.querySelectorAll('.carousel-slide');
        this.indicators = document.querySelectorAll('.indicator');
        this.prevBtn = document.getElementById('carousel-prev');
        this.nextBtn = document.getElementById('carousel-next');
        this.currentSlide = 0;
        this.slideInterval = null;
        this.autoSlideDelay = 5000; // 5 seconds
        
        this.init();
    }
    
    init() {
        // Event listeners
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Indicator clicks
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Start auto-slide
        this.startAutoSlide();
        
        // Pause on hover
        const carousel = document.querySelector('.hero-carousel');
        carousel.addEventListener('mouseenter', () => this.stopAutoSlide());
        carousel.addEventListener('mouseleave', () => this.startAutoSlide());
    }
    
    showSlide(index) {
        // Hide all slides
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Show current slide
        this.slides[index].classList.add('active');
        this.indicators[index].classList.add('active');
        
        this.currentSlide = index;
    }
    
    nextSlide() {
        let next = this.currentSlide + 1;
        if (next >= this.slides.length) {
            next = 0;
        }
        this.showSlide(next);
    }
    
    prevSlide() {
        let prev = this.currentSlide - 1;
        if (prev < 0) {
            prev = this.slides.length - 1;
        }
        this.showSlide(prev);
    }
    
    goToSlide(index) {
        this.showSlide(index);
    }
    
    startAutoSlide() {
        this.stopAutoSlide(); // Clear existing interval
        this.slideInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoSlideDelay);
    }
    
    stopAutoSlide() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
        }
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HeroCarousel();
});

// pROPERTY DESCRIPTION SECTION//
// Scroll animations for project description
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe animated elements
    document.querySelectorAll('.unit-card, .feature-item, .price-card').forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HeroCarousel();
    initScrollAnimations();
});







// Enhanced scroll animations for amenities
function initAmenitiesAnimations() {
    const amenityObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe amenity categories and cards
    document.querySelectorAll('.amenity-category, .amenity-card').forEach(el => {
        el.style.animationPlayState = 'paused';
        amenityObserver.observe(el);
    });
}

// Update DOMContentLoaded event
document.addEventListener('DOMContentLoaded', () => {
    new HeroCarousel();
    initScrollAnimations();
    initAmenitiesAnimations();
});







// Stacked Gallery Functionality
class StackedGallery {
    constructor() {
        this.photos = document.querySelectorAll('.stacked-photo');
        this.indicators = document.querySelectorAll('.gallery-indicators .indicator');
        this.prevBtn = document.getElementById('gallery-prev');
        this.nextBtn = document.getElementById('gallery-next');
        this.currentPhoto = 0;
        this.totalPhotos = this.photos.length;
        this.autoRotateInterval = null;
        this.rotationDelay = 5000; // 5 seconds
        
        this.init();
    }
    
    init() {
        // Event listeners
        this.prevBtn.addEventListener('click', () => this.prevPhoto());
        this.nextBtn.addEventListener('click', () => this.nextPhoto());
        
        // Indicator clicks
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToPhoto(index));
        });
        
        // Update total photos counter
        document.getElementById('total-photos').textContent = this.totalPhotos;
        
        // Start auto-rotation
        this.startAutoRotate();
        
        // Pause on hover
        const gallery = document.querySelector('.photo-stack');
        gallery.addEventListener('mouseenter', () => this.stopAutoRotate());
        gallery.addEventListener('mouseleave', () => this.startAutoRotate());
        
        // Show first photo
        this.updateGallery();
    }
    
    updateGallery() {
        // Remove active class from all photos and indicators
        this.photos.forEach(photo => photo.classList.remove('active'));
        this.indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Add active class to current photo and indicator
        this.photos[this.currentPhoto].classList.add('active');
        this.indicators[this.currentPhoto].classList.add('active');
        
        // Update photo counter
        document.getElementById('current-photo').textContent = this.currentPhoto + 1;
        
        // Update stack order with smooth transitions
        this.updateStackOrder();
    }
    
    updateStackOrder() {
        this.photos.forEach((photo, index) => {
            const distance = (index - this.currentPhoto + this.totalPhotos) % this.totalPhotos;
            
            // Reset all photos first
            photo.style.zIndex = this.totalPhotos - distance;
            photo.style.opacity = Math.max(0, 1 - (distance * 0.2));
            photo.style.transform = `translateY(${distance * 20}px) rotateX(${distance * 5}deg) scale(${1 - (distance * 0.05)})`;
            photo.style.transitionDelay = `${distance * 0.1}s`;
        });
        
        // Ensure active photo is on top with full opacity
        this.photos[this.currentPhoto].style.zIndex = this.totalPhotos + 1;
        this.photos[this.currentPhoto].style.opacity = '1';
        this.photos[this.currentPhoto].style.transform = 'translateY(0) rotateX(0) scale(1)';
    }
    
    nextPhoto() {
        this.currentPhoto = (this.currentPhoto + 1) % this.totalPhotos;
        this.updateGallery();
        this.restartAutoRotate();
    }
    
    prevPhoto() {
        this.currentPhoto = (this.currentPhoto - 1 + this.totalPhotos) % this.totalPhotos;
        this.updateGallery();
        this.restartAutoRotate();
    }
    
    goToPhoto(index) {
        this.currentPhoto = index;
        this.updateGallery();
        this.restartAutoRotate();
    }
    
    startAutoRotate() {
        this.stopAutoRotate();
        this.autoRotateInterval = setInterval(() => {
            this.nextPhoto();
        }, this.rotationDelay);
    }
    
    stopAutoRotate() {
        if (this.autoRotateInterval) {
            clearInterval(this.autoRotateInterval);
        }
    }
    
    restartAutoRotate() {
        this.stopAutoRotate();
        this.startAutoRotate();
    }
}

// Update DOMContentLoaded to include gallery
document.addEventListener('DOMContentLoaded', () => {
    new HeroCarousel();
    initScrollAnimations();
    initAmenitiesAnimations();
    new StackedGallery();
});




// Contact Form Functionality
class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.init();
    }
    
    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this.form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            unitType: formData.get('unit-type'),
            message: formData.get('message')
        };
        
        // Basic validation
        if (!data.name || !data.email) {
            this.showMessage('Please fill in all required fields.', 'error');
            return;
        }
        
        // Simulate form submission
        this.showMessage('Thank you for your message! We will contact you soon.', 'success');
        this.form.reset();
        
        // In a real application, you would send the data to a server here
        console.log('Form submitted:', data);
    }
    
    showMessage(message, type) {
        // Remove existing messages
        const existingMessage = this.form.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create new message
        const messageEl = document.createElement('div');
        messageEl.className = `form-message ${type}`;
        messageEl.textContent = message;
        messageEl.style.cssText = `
            padding: 1rem;
            margin: 1rem 0;
            border-radius: 8px;
            text-align: center;
            font-weight: 500;
            background: ${type === 'success' ? '#d4edda' : '#f8d7da'};
            color: ${type === 'success' ? '#155724' : '#721c24'};
            border: 1px solid ${type === 'success' ? '#c3e6cb' : '#f5c6cb'};
        `;
        
        this.form.insertBefore(messageEl, this.form.querySelector('.form-submit'));
        
        // Auto-remove message after 5 seconds
        setTimeout(() => {
            messageEl.remove();
        }, 5000);
    }
}

// Update DOMContentLoaded to include contact form
document.addEventListener('DOMContentLoaded', () => {
    new HeroCarousel();
    initScrollAnimations();
    initAmenitiesAnimations();
    new StackedGallery();
    new ContactForm();
});




// Portfolio Gallery Functionality
class PortfolioGallery {
    constructor() {
        this.filters = document.querySelectorAll('.filter-btn');
        this.galleryItems = document.querySelectorAll('.masonry-item');
        this.lightbox = this.createLightbox();
        this.currentImageIndex = 0;
        this.images = [];
        
        this.init();
    }
    
    init() {
        // Filter functionality
        this.filters.forEach(filter => {
            filter.addEventListener('click', () => this.handleFilter(filter));
        });
        
        // Lightbox functionality
        this.galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => this.openLightbox(index));
        });
        
        // Collect all images for lightbox
        this.collectImages();
    }
    
    handleFilter(clickedFilter) {
        // Update active filter
        this.filters.forEach(filter => filter.classList.remove('active'));
        clickedFilter.classList.add('active');
        
        const filterValue = clickedFilter.dataset.filter;
        
        // Filter items
        this.galleryItems.forEach(item => {
            if (filterValue === 'all' || item.dataset.category === filterValue) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    }
    
    collectImages() {
        this.images = Array.from(this.galleryItems).map(item => ({
            src: item.querySelector('img').src,
            alt: item.querySelector('img').alt,
            caption: item.querySelector('.photo-caption').textContent
        }));
    }
    
    openLightbox(index) {
        this.currentImageIndex = index;
        this.updateLightbox();
        this.lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    closeLightbox() {
        this.lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    nextImage() {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
        this.updateLightbox();
    }
    
    prevImage() {
        this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
        this.updateLightbox();
    }
    
    updateLightbox() {
        const lightboxImg = this.lightbox.querySelector('.lightbox-img');
        const lightboxCaption = this.lightbox.querySelector('.lightbox-caption');
        
        lightboxImg.src = this.images[this.currentImageIndex].src;
        lightboxImg.alt = this.images[this.currentImageIndex].alt;
        
        if (lightboxCaption) {
            lightboxCaption.textContent = this.images[this.currentImageIndex].caption;
        }
    }
    
    createLightbox() {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <button class="lightbox-close">&times;</button>
            <button class="lightbox-nav lightbox-prev">&#8249;</button>
            <button class="lightbox-nav lightbox-next">&#8250;</button>
            <div class="lightbox-content">
                <img class="lightbox-img" src="" alt="">
                <div class="lightbox-caption"></div>
            </div>
        `;
        
        document.body.appendChild(lightbox);
        
        // Event listeners for lightbox
        lightbox.querySelector('.lightbox-close').addEventListener('click', () => this.closeLightbox());
        lightbox.querySelector('.lightbox-prev').addEventListener('click', () => this.prevImage());
        lightbox.querySelector('.lightbox-next').addEventListener('click', () => this.nextImage());
        
        // Close on overlay click
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                this.closeLightbox();
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            
            if (e.key === 'Escape') this.closeLightbox();
            if (e.key === 'ArrowLeft') this.prevImage();
            if (e.key === 'ArrowRight') this.nextImage();
        });
        
        return lightbox;
    }
}

// Update DOMContentLoaded to include portfolio gallery
document.addEventListener('DOMContentLoaded', () => {
    new HeroCarousel();
    initScrollAnimations();
    initAmenitiesAnimations();
    new StackedGallery();
    new ContactForm();
    new PortfolioGallery();
});