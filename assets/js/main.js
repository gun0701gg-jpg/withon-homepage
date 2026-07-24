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
    var lightboxImages = document.getElementById('lightbox-images');
    var lightboxCaption = document.getElementById('lightbox-caption');
    var lightboxBackdrop = lightbox.querySelector('.lightbox-backdrop');
    var lightboxClose = lightbox.querySelector('.lightbox-close');

    document.querySelectorAll('[data-lightbox-img]').forEach(function (el) {
      el.addEventListener('click', function () {
        var alt = el.getAttribute('data-lightbox-alt') || '';
        var caption = el.getAttribute('data-lightbox-caption') || alt;
        var srcs = el.getAttribute('data-lightbox-img').split(',').map(function (s) { return s.trim(); });
        lightboxImages.innerHTML = '';
        srcs.forEach(function (src) {
          var img = document.createElement('img');
          img.src = src;
          img.alt = alt;
          lightboxImages.appendChild(img);
        });
        if (lightboxCaption) lightboxCaption.textContent = caption;
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
