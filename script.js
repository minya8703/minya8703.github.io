// ===== Slide Navigation =====
const slidesWrapper = document.getElementById('slidesWrapper');
const dots = document.querySelectorAll('.dot');
const arrowLeft = document.getElementById('arrowLeft');
const arrowRight = document.getElementById('arrowRight');
const totalSlides = 4;
let currentSlide = 0;

function goToSlide(index) {
    if (index < 0 || index >= totalSlides) return;
    currentSlide = index;
    slidesWrapper.style.transform = `translateX(-${currentSlide * 100}vw)`;

    // Update dots
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });

    // Update arrows
    arrowLeft.classList.toggle('hidden', currentSlide === 0);
    arrowRight.classList.toggle('hidden', currentSlide === totalSlides - 1);
}

// Dot click
dots.forEach(dot => {
    dot.addEventListener('click', () => {
        goToSlide(parseInt(dot.dataset.slide));
    });
});

// Arrow click
arrowLeft.addEventListener('click', () => goToSlide(currentSlide - 1));
arrowRight.addEventListener('click', () => goToSlide(currentSlide + 1));

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    // Don't navigate if modal is open
    if (document.querySelector('.modal-overlay.active')) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay.active').forEach(modal => {
                modal.classList.remove('active');
                document.body.style.overflow = 'hidden';
            });
        }
        return;
    }

    if (e.key === 'ArrowLeft') {
        goToSlide(currentSlide - 1);
    } else if (e.key === 'ArrowRight') {
        goToSlide(currentSlide + 1);
    }
});

// Touch swipe support
let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;
let touchEndY = 0;

slidesWrapper.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
}, { passive: true });

slidesWrapper.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;

    const diffX = touchStartX - touchEndX;
    const diffY = Math.abs(touchStartY - touchEndY);

    // Only swipe if horizontal movement is dominant and significant
    if (Math.abs(diffX) > 50 && Math.abs(diffX) > diffY) {
        if (diffX > 0) {
            goToSlide(currentSlide + 1);
        } else {
            goToSlide(currentSlide - 1);
        }
    }
}, { passive: true });

// Mouse wheel horizontal navigation (on slides that aren't scrollable / at scroll boundaries)
slidesWrapper.addEventListener('wheel', (e) => {
    if (document.querySelector('.modal-overlay.active')) return;

    const slide = document.getElementById(`slide-${currentSlide}`);
    const atTop = slide.scrollTop === 0;
    const atBottom = slide.scrollTop + slide.clientHeight >= slide.scrollHeight - 2;

    // If the slide has scrollable content and we're in the middle, let it scroll normally
    if (slide.scrollHeight > slide.clientHeight + 5 && !atTop && !atBottom) {
        return;
    }

    // At boundaries, navigate slides
    if (e.deltaY > 15 && atBottom) {
        goToSlide(currentSlide + 1);
    } else if (e.deltaY < -15 && atTop) {
        goToSlide(currentSlide - 1);
    }
}, { passive: true });

// ===== Competency card click to navigate =====
document.querySelectorAll('.competency-card[data-slide-target]').forEach(card => {
    card.addEventListener('click', () => {
        const target = parseInt(card.dataset.slideTarget);
        goToSlide(target);
    });
});

// ===== Modal open/close =====
document.querySelectorAll('.card-detail-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const modalId = btn.dataset.modal;
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'auto';
        }
    });
});

document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
        const modal = btn.closest('.modal-overlay');
        modal.classList.remove('active');
        document.body.style.overflow = 'hidden';
    });
});

document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.classList.remove('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Initialize
goToSlide(0);
