// Perspace site · shared behaviour: nav on scroll, reveal on scroll, count-ups, one-shot triggers
(function(){
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const nav = document.getElementById('nav');
  if (nav) { const f = () => nav.classList.toggle('sc', scrollY > 20); addEventListener('scroll', f, {passive:true}); f(); }
  function countUp(el){
    const to = +el.dataset.count, suf = el.dataset.suffix || '', pre = el.dataset.prefix || '';
    const fmt = n => pre + n.toLocaleString('en-US') + suf;
    if (RM) { el.textContent = fmt(to); return; }
    const t0 = performance.now(), d = 1400;
    (function step(t){ const k = Math.min(1,(t-t0)/d); el.textContent = fmt(Math.round(to*(1-Math.pow(1-k,3)))); if (k<1) requestAnimationFrame(step); })(t0);
  }
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    if (e.target.dataset.count !== undefined) countUp(e.target);
    io.unobserve(e.target);
  }), {threshold:.2});
  document.querySelectorAll('.rv,[data-count],[data-trigger]').forEach(el => io.observe(el));
  window.PS = { RM, countUp };
})();
(function(){const n=document.getElementById('nav'),b=n&&n.querySelector('.mnu');if(!b)return;
b.addEventListener('click',()=>{const o=n.classList.toggle('open');b.setAttribute('aria-expanded',o)});
n.querySelectorAll('.links a').forEach(a=>a.addEventListener('click',()=>{n.classList.remove('open');b.setAttribute('aria-expanded','false')}));})();
