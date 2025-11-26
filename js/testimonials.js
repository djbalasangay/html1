// minimal testimonials slider (used on index if desired)
(function(){
  const cards = document.querySelectorAll('.testi-card');
  if(!cards.length) return;
  let i=0;
  setInterval(()=> {
    cards.forEach(c=>c.classList.remove('active'));
    cards[i%cards.length].classList.add('active');
    i++;
  }, 3600);
})();