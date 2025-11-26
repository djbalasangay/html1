// lazy-load images and lightbox with keyboard
(function(){
  const imgs = document.querySelectorAll('.gallery-grid img.lazy');
  imgs.forEach(img=>{
    const src = img.dataset.src;
    if(src) img.src = src;
    img.classList.remove('lazy');
  });

  const galleryImgs = document.querySelectorAll('.gallery-grid img');
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg');
  const lbClose = document.getElementById('lbClose');

  galleryImgs.forEach(img=>{
    img.addEventListener('click', ()=>{
      lbImg.src = img.src;
      lightbox.classList.remove('hidden');
    });
  });

  if(lbClose) lbClose.addEventListener('click', ()=> lightbox.classList.add('hidden'));
  if(lightbox) lightbox.addEventListener('click', (e)=> { if(e.target === lightbox) lightbox.classList.add('hidden'); });

  document.addEventListener('keydown', e=> {
    if(e.key === 'Escape' && lightbox && !lightbox.classList.contains('hidden')) lightbox.classList.add('hidden');
  });
})();