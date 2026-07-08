document.addEventListener('DOMContentLoaded', function () {
  var drawer = document.querySelector('.nav-drawer');
  var openBtn = document.querySelector('.menu-btn');
  var closeBtn = document.querySelector('.nav-drawer-close');
  var backdrop = document.querySelector('.nav-drawer-backdrop');

  if (!drawer) return;

  function openDrawer() {
    drawer.classList.add('open');
  }
  function closeDrawer() {
    drawer.classList.remove('open');
  }

  if (openBtn) openBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);
});
