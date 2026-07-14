document.addEventListener('DOMContentLoaded', function () {
  var drawer = document.querySelector('.nav-drawer');
  var openBtn = document.querySelector('.menu-btn');
  var closeBtn = document.querySelector('.nav-drawer-close');
  var backdrop = document.querySelector('.nav-drawer-backdrop');

  if (drawer) {
    function openDrawer() {
      drawer.classList.add('open');
    }
    function closeDrawer() {
      drawer.classList.remove('open');
    }

    if (openBtn) openBtn.addEventListener('click', openDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (backdrop) backdrop.addEventListener('click', closeDrawer);
  }

  var lightbox = document.getElementById('facility-lightbox');
  if (lightbox) {
    var lightboxImg = document.getElementById('lightbox-img');
    var lightboxCaption = document.getElementById('lightbox-caption');
    var lightboxBackdrop = lightbox.querySelector('.lightbox-backdrop');
    var lightboxClose = lightbox.querySelector('.lightbox-close');

    document.querySelectorAll('[data-lightbox-img]').forEach(function (el) {
      el.addEventListener('click', function () {
        lightboxImg.src = el.getAttribute('data-lightbox-img');
        lightboxImg.alt = el.getAttribute('data-lightbox-alt') || '';
        if (lightboxCaption) lightboxCaption.textContent = el.getAttribute('data-lightbox-alt') || '';
        lightbox.classList.add('open');
      });
    });

    function closeLightbox() {
      lightbox.classList.remove('open');
    }

    if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  }
});
