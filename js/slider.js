// Slider with dots and touch support
(function(){
  const slider = document.querySelector('.slider');
  if(!slider) return;
  const slides = Array.from(slider.querySelectorAll('.slide'));
  const dotsContainer = document.getElementById('mainDots') || document.querySelector('.slider-dots');
  let idx = 0, timer;

  // create dots
  slides.forEach((s,i)=>{
    const dot = document.createElement('span');
    dot.className = 'dot' + (i===0? ' active':'');
    dot.addEventListener('click', ()=> show(i));
    dotsContainer.appendChild(dot);
  });

  const dots = Array.from(dotsContainer.querySelectorAll('.dot'));

  function show(i){
    slides.forEach(s=>s.classList.remove('active'));
    dots.forEach(d=>d.classList.remove('active'));
    slides[i].classList.add('active');
    dots[i].classList.add('active');
    idx = i;
  }

  function next(){
    show((idx+1) % slides.length);
  }

  timer = setInterval(next, 4000);

  // touch support
  let startX = 0;
  slider.addEventListener('touchstart', e => startX = e.touches[0].clientX);
  slider.addEventListener('touchend', e => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    if(Math.abs(diff) > 40){
      if(diff > 0) next(); else show((idx-1+slides.length)%slides.length);
    }
  });
})();