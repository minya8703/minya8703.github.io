// Project card toggle
function toggle(card) {
  card.classList.toggle('open');
}

// Image modal
function openImgModal(src, caption) {
  const modal = document.getElementById('imgModal');
  document.getElementById('imgModalSrc').src = src;
  document.getElementById('imgModalCaption').textContent = caption;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeImgModal() {
  document.getElementById('imgModal').classList.remove('active');
  document.body.style.overflow = '';
}

// ESC key closes modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeImgModal();
});

// Intersection Observer for fade-in
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
