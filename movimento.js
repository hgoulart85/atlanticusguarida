/* Atlanticus Guarida · movimento discreto (identidade 2.2) */
(function(){
  var calma = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var raiz = document.documentElement;

  /* 1. Logótipo: a casa desenha-se numa só linha e as ondas assentam (uma vez por sessão) */
  var logo = document.querySelector('.topo .logo svg');
  if (logo && !calma) {
    var visto = false;
    try { visto = sessionStorage.getItem('ag-logo') === '1'; sessionStorage.setItem('ag-logo','1'); } catch(e) {}
    if (!visto) logo.classList.add('desenhar');
  }

  /* 2. Títulos escritos progressivamente: elementos com data-escrever */
  function escrever(h, atraso){
    var texto = h.textContent.replace(/\s+/g,' ').trim();
    h.setAttribute('aria-label', texto);
    var letras = [];
    (function walk(node){
      [].slice.call(node.childNodes).forEach(function(n){
        if (n.nodeType === 3) {
          var frag = document.createDocumentFragment();
          n.textContent.split('').forEach(function(c){
            var s = document.createElement('span'); s.className = 'ch'; s.textContent = c; s.setAttribute('aria-hidden','true');
            frag.appendChild(s); letras.push(s);
          });
          n.parentNode.replaceChild(frag, n);
        } else if (n.nodeType === 1) { walk(n); }
      });
    })(h);
    var cursor = document.createElement('span'); cursor.className = 'cursor'; cursor.setAttribute('aria-hidden','true');
    h.classList.add('a-escrever');
    var i = 0;
    function passo(){
      if (i < letras.length) {
        letras[i].classList.add('on');
        letras[i].parentNode.insertBefore(cursor, letras[i].nextSibling);
        var c = letras[i].textContent; i++;
        setTimeout(passo, (c === ',' || c === '.') ? 260 : 48 + Math.random()*36);
      } else {
        setTimeout(function(){ cursor.classList.add('fim'); setTimeout(function(){ cursor.remove(); h.classList.remove('a-escrever'); }, 600); }, 900);
      }
    }
    setTimeout(passo, atraso);
  }
  function prepararEscrita(){
    [].slice.call(document.querySelectorAll('[data-escrever]')).forEach(function(h){
      if (calma || h.dataset.feito) return; h.dataset.feito = '1';
      escrever(h, parseInt(h.getAttribute('data-escrever'),10) || 300);
    });
  }

  /* 3. Títulos de secção: palavras a surgir e traço turquesa a desenhar-se */
  function prepararTitulos(){
    var hs = [].slice.call(document.querySelectorAll('.h2:not([data-feito])'));
    if (!hs.length) return;
    var io = ('IntersectionObserver' in window) ? new IntersectionObserver(function(ent){
      ent.forEach(function(x){ if (x.isIntersecting) { x.target.classList.add('ver'); io.unobserve(x.target); } });
    }, {threshold:0.4}) : null;
    hs.forEach(function(h){
      h.setAttribute('data-feito','1');
      if (h.closest('.indisponivel')) return;
      h.classList.add('traco');
      if (calma || !io || h.getBoundingClientRect().top < window.innerHeight*0.9) { h.classList.add('ver'); return; }
      var k = 0;
      (function walk(node){
        [].slice.call(node.childNodes).forEach(function(n){
          if (n.nodeType === 3) {
            var frag = document.createDocumentFragment();
            n.textContent.split(/(\s+)/).forEach(function(p){
              if (p === '' || /^\s+$/.test(p)) { frag.appendChild(document.createTextNode(p)); return; }
              var s = document.createElement('span'); s.className = 'pal'; s.style.transitionDelay = (k++*80)+'ms'; s.textContent = p; frag.appendChild(s);
            });
            n.parentNode.replaceChild(frag, n);
          } else if (n.nodeType === 1 && n.tagName !== 'BR') { walk(n); }
        });
      })(h);
      h.style.setProperty('--atraso', (k*80+250)+'ms');
      h.classList.add('palavras');
      io.observe(h);
    });
  }

  /* 4. Sublinhados que se desenham quando o bloco aparece */
  function prepararSublinhados(){
    var ss = [].slice.call(document.querySelectorAll('.sub-din:not(.ver)'));
    if (calma || !('IntersectionObserver' in window)) { ss.forEach(function(s){ s.classList.add('ver'); }); return; }
    var io = new IntersectionObserver(function(ent){
      ent.forEach(function(x){ if (x.isIntersecting) { x.target.classList.add('ver'); io.unobserve(x.target); } });
    }, {threshold:0.6});
    ss.forEach(function(s){ if (s.getBoundingClientRect().top < window.innerHeight*0.85) s.classList.add('ver'); else io.observe(s); });
  }

  function tudo(){ prepararEscrita(); prepararTitulos(); prepararSublinhados(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', tudo); else tudo();
  /* as fichas são geradas pelo imoveis.js: voltar a passar depois de carregar */
  window.addEventListener('load', function(){ setTimeout(tudo, 50); });
})();
