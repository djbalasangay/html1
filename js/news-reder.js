// js/news-render.js
(function () {
  if (typeof LYCEUM_NEWS_DATA === 'undefined') {
    console.warn('News data not found (js/news-data.js).');
    return;
  }

  const all = Array.isArray(LYCEUM_NEWS_DATA) ? LYCEUM_NEWS_DATA.slice() : [];
  // sort newest first
  all.sort((a,b)=> new Date(b.date) - new Date(a.date));

  const featuredTarget = document.getElementById('newsFeatured');
  const gridTarget = document.getElementById('newsGrid');

  // take first 2 as featured (if less available, use what's there)
  const featured = all.slice(0,2);
  const rest = all.slice(2);

  function createFeaturedCard(item){
    const a = document.createElement('a');
    a.className = 'featured-wide';
    a.href = `news.html#${encodeURIComponent(item.id)}`;

    const img = document.createElement('img');
    img.className = 'fw-image';
    img.src = item.image || 'images/default-news.jpg';
    img.alt = item.title || '';

    const body = document.createElement('div');
    body.className = 'fw-body';

    const h = document.createElement('h3');
    h.className = 'fw-title';
    h.textContent = item.title;

    const p = document.createElement('p');
    p.className = 'fw-summary';
    p.textContent = item.summary;

    const meta = document.createElement('p');
    meta.className = 'fw-meta muted';
    meta.textContent = `${item.category || 'General'} • ${new Date(item.date).toLocaleDateString()}`;

    body.appendChild(h);
    body.appendChild(p);
    body.appendChild(meta);

    a.appendChild(img);
    a.appendChild(body);
    return a;
  }

  function createGridCard(item){
    const div = document.createElement('article');
    div.className = 'news-card';

    const img = document.createElement('img');
    img.className = 'n-img';
    img.src = item.image || 'images/default-news.jpg';
    img.alt = item.title || '';

    const body = document.createElement('div');
    body.className = 'n-body';

    const h = document.createElement('h4');
    h.className = 'n-title';
    h.textContent = item.title;

    const p = document.createElement('p');
    p.className = 'n-summary';
    p.textContent = item.summary;

    const meta = document.createElement('p');
    meta.className = 'n-meta muted';
    meta.textContent = `${item.category || 'General'} • ${new Date(item.date).toLocaleDateString()}`;

    // wrap grid card with link
    const wrap = document.createElement('a');
    wrap.href = `news.html#${encodeURIComponent(item.id)}`;
    wrap.appendChild(img);
    wrap.appendChild(body);

    body.appendChild(h);
    body.appendChild(p);
    body.appendChild(meta);

    div.appendChild(wrap);
    return div;
  }

  // render featured
  if (featuredTarget) {
    featuredTarget.innerHTML = '';
    featured.forEach(item => {
      featuredTarget.appendChild(createFeaturedCard(item));
    });
  }

  // render grid
  if (gridTarget) {
    gridTarget.innerHTML = '';
    rest.forEach(item => {
      gridTarget.appendChild(createGridCard(item));
    });

    // if there are no rest items (e.g., only 2 news total), show the featured set as grid too
    if (rest.length === 0 && featured.length > 0) {
      featured.forEach(item => {
        gridTarget.appendChild(createGridCard(item));
      });
    }
  }

})();