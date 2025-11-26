// news manager: seed + localStorage + render + filter (works across index & news pages)
(function(){
  const LS = 'lyceum_news_v2';
  const defaultNews = [
    {id:1, title:'Lyceum High Shines at TASSAA 2025', summary:'Champions in Volleyball (Girls), Badminton (B&G), Table Tennis (B&G) and cultural awards.', category:'Sports', date:new Date().toISOString()},
    {id:2, title:'Delegates at PCNE XI', summary:'Lyceum delegates joined PCNE XI to renew mission and evangelization.', category:'Evangelization', date:new Date().toISOString()},
    {id:3, title:'Free PhilHealth Konsulta', summary:'Community health outreach and free eye check-ups.', category:'Outreach', date:new Date().toISOString()}
  ];

  function load(){
    try {
      const raw = localStorage.getItem(LS);
      return raw ? JSON.parse(raw) : defaultNews;
    } catch(e){ localStorage.removeItem(LS); return defaultNews; }
  }
  function save(arr){ localStorage.setItem(LS, JSON.stringify(arr)); }

  function renderList(targetEl){
    const arr = load().slice().sort((a,b)=> new Date(b.date)-new Date(a.date));
    targetEl.innerHTML = '';
    arr.forEach(item=>{
      const art = document.createElement('article');
      art.className = 'news-card';
      art.innerHTML = `<h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.summary)}</p><p class="muted small">${escapeHtml(item.category)} • ${new Date(item.date).toLocaleString()}</p>`;
      targetEl.appendChild(art);
    });
  }

  function escapeHtml(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;'); }

  // render on index page
  const indexList = document.getElementById('newsList');
  if(indexList) renderList(indexList);

  // render on news page grid
  const newsGrid = document.getElementById('newsGrid');
  if(newsGrid){
    renderList(newsGrid);
    // filtering
    document.querySelectorAll('.news-filter').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        document.querySelectorAll('.news-filter').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        const f = btn.dataset.filter;
        const arr = load().slice().sort((a,b)=> new Date(b.date)-new Date(a.date));
        newsGrid.innerHTML = '';
        arr.filter(it => f==='all' || it.category === f).forEach(item=>{
          const art = document.createElement('article');
          art.className = 'news-card';
          art.innerHTML = `<h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.summary)}</p><p class="muted small">${escapeHtml(item.category)} • ${new Date(item.date).toLocaleString()}</p>`;
          newsGrid.appendChild(art);
        });
      });
    });
  }

  // admin form (index)
  const addForm = document.getElementById('addNewsForm');
  if(addForm){
    addForm.addEventListener('submit', e=>{
      e.preventDefault();
      const title = document.getElementById('nTitle').value.trim();
      const summary = document.getElementById('nSummary').value.trim();
      const category = document.getElementById('nCategory').value || 'General';
      if(!title || !summary) return alert('Please fill title and summary.');
      const arr = load();
      arr.push({id:Date.now(), title, summary, category, date: new Date().toISOString()});
      save(arr);
      renderList(indexList);
      addForm.reset();
      const det = document.getElementById('adminAdd'); if(det) det.open = false;
    });
  }

  // clear button
  const clearBtn = document.getElementById('clearNews');
  if(clearBtn) clearBtn.addEventListener('click', ()=>{
    if(confirm('Clear local news?')){ localStorage.removeItem(LS); if(indexList) renderList(indexList); if(newsGrid) renderList(newsGrid); }
  });

  // auto-promote (rotate last to top every 12s)
  setInterval(()=>{
    const arr = load();
    if(arr.length>1){
      const last = arr.pop();
      last.date = new Date().toISOString();
      arr.unshift(last);
      save(arr);
      if(indexList) renderList(indexList);
      if(newsGrid) renderList(newsGrid);
    }
  },12000);

})();