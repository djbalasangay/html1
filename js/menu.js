// Robust hamburger and mobile menu for all pages
(function(){
  const hamburger = document.getElementById('hamburger') ||
                    document.getElementById('hamburger2') ||
                    document.getElementById('hamburger3') ||
                    document.getElementById('hamburger4') ||
                    document.getElementById('hamburger5') ||
                    document.getElementById('hamburger6');

  // fallback: attach to all hamburger buttons
  document.querySelectorAll('.hamburger').forEach(btn=>{
    btn.addEventListener('click', toggleMenu);
  });

  function toggleMenu(e){
    const menu = document.getElementById('mobileMenu') ||
                 document.getElementById('mobileMenu2') ||
                 document.getElementById('mobileMenu3') ||
                 document.getElementById('mobileMenu4') ||
                 document.getElementById('mobileMenu5') ||
                 document.getElementById('mobileMenu6') ||
                 document.querySelector('.mobile-menu');

    if(!menu) return;
    const isShown = menu.style.display === 'flex';
    menu.style.display = isShown ? 'none' : 'flex';
    menu.setAttribute('aria-hidden', String(!isShown));
    // update aria-expanded on the button that was clicked
    if(e && e.currentTarget) e.currentTarget.setAttribute('aria-expanded', String(!isShown));
  }

  // Close mobile menu when clicking outside
  document.addEventListener('click', (ev) => {
    const menu = document.querySelector('.mobile-menu');
    const hb = ev.target.closest('.hamburger');
    if (!menu) return;
    if (hb) return; // clicked the hamburger, let handler run
    // if click outside the menu and outside hamburger, hide
    if (!ev.target.closest('.mobile-menu') && !ev.target.closest('.hamburger')) {
      menu.style.display = 'none';
      menu.setAttribute('aria-hidden', 'true');
      document.querySelectorAll('.hamburger').forEach(h=>h.setAttribute('aria-expanded','false'));
    }
  });

  // highlight current page link
  document.querySelectorAll('.nav-link, .nav-right a').forEach(a=>{
    const href = a.getAttribute('href');
    if(!href) return;
    const current = location.pathname.split('/').pop() || 'index.html';
    if(href === current || (href === 'index.html' && current === '')) a.classList.add('active-link');
  });
})();