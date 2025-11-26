// simple filter for courses page
(function(){
  const buttons = document.querySelectorAll('.filter-btn');
  const grid = document.getElementById('coursesGrid');
  if(!buttons.length || !grid) return;
  buttons.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      buttons.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      grid.querySelectorAll('.course-card').forEach(card=>{
        if(f === 'all' || card.dataset.type === f) card.style.display = '';
        else card.style.display = 'none';
      });
    });
  });
})();