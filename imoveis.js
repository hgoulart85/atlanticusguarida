/* Funções comuns às páginas da Atlanticus Guarida. Não é preciso editar. */
var AG = (function(){
  var B = window.AG_BASE || '';
  var calma = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var MESES=['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
  function dataPT(iso){var p=iso.split('-');return (+p[2])+' de '+MESES[+p[1]-1]+' de '+p[0];}
  function emVigor(ex){ if(!ex) return false; return new Date()<=new Date(ex.ate+'T23:59:59'); }
  function el(tag,cls,html){var e=document.createElement(tag); if(cls) e.className=cls; if(html!=null) e.innerHTML=html; return e;}
  function src(f,ext){ return B+'img/'+f+'.'+ext; }
  function pic(f,alt,extra){return '<picture'+(extra||'')+'><source srcset="'+src(f,'webp')+'" type="image/webp"><img src="'+src(f,'jpg')+'" alt="'+alt+'" loading="lazy" decoding="async"></picture>';}
  var seta='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>';
  var icWa='<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M12 2.2A9.7 9.7 0 0 0 3.7 16.9L2.4 21.6l4.8-1.3A9.7 9.7 0 1 0 12 2.2zm0 17.7a8 8 0 0 1-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1 1 12 19.9zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8 1c-.1.2-.3.2-.5.1a6.5 6.5 0 0 1-3.2-2.8c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11.2 11.2 0 0 0 4.3 3.8c1.6.7 2.2.7 3 .6.5-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1l-.5-.3z"/></svg>';
  var icMail='<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><rect x="3" y="5.5" width="18" height="13" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M3.8 7l8.2 6 8.2-6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>';
  function nomeCompleto(im){ return im.titulo+' na '+im.local.split(',')[0]; }
  function linkWa(texto){ return 'https://wa.me/'+CONTACTO.whatsapp+'?text='+encodeURIComponent(texto); }
  function linkMail(assunto){ return 'mailto:'+CONTACTO.email+'?subject='+encodeURIComponent(assunto); }
  function textoWa(im){ return 'Olá, tenho interesse na '+nomeCompleto(im)+(im.pagina?' (atlanticusguarida.pt/'+im.pagina+'/)':'')+' e gostava de saber mais.'; }
  function canais(im){
    return '<div class="canais-grid"><a class="canal" href="'+linkWa(im?textoWa(im):'Olá, tenho interesse num dos imóveis da Atlanticus Guarida e gostava de saber mais.')+'" target="_blank" rel="noopener" aria-label="WhatsApp (abre noutra janela)"><span class="ic">'+icWa+'</span><span class="tx"><b>WhatsApp</b></span></a><a class="canal" title="'+CONTACTO.email+'" href="'+(im?linkMail(nomeCompleto(im)+', '+im.local):'mailto:'+CONTACTO.email)+'"><span class="ic">'+icMail+'</span><span class="tx"><b>Email</b></span></a></div>';
  }

  /* ficha: opts.nivel ('h1' ou 'h3'), opts.paginaPropria (true na página da casa) */
  function ficha(im,opts){
    opts=opts||{};
    var venda=(im.lista||'venda')==='venda', ex=emVigor(im.exclusivo);
    var a=el('article','imovel rv'); a.id='imovel-'+im.id;
    var n=im.fotos.length, alt=nomeCompleto(im);
    var g='<div class="galeria"><div class="palco" tabindex="0" role="region" aria-roledescription="galeria" aria-label="Fotografias da '+im.titulo+' (use as setas do teclado)">'+pic(im.fotos[0],alt+', fotografia 1 de '+n,' class="atual"')+
      '<button type="button" class="seta ant" aria-label="Fotografia anterior">'+seta+'</button><button type="button" class="seta prox" aria-label="Fotografia seguinte"><span style="display:grid;transform:scaleX(-1)">'+seta+'</span></button>'+
      '<span class="conta" aria-live="polite">1 / '+n+'</span></div><div class="tira">';
    im.fotos.forEach(function(f,k){ g+='<button type="button" class="th" data-k="'+k+'" aria-label="Fotografia '+(k+1)+' de '+n+'"'+(k===0?' aria-current="true"':'')+'><picture><source srcset="'+src(f+'-t','webp')+'" type="image/webp"><img src="'+src(f+'-t','jpg')+'" alt="" loading="lazy"></picture></button>'; });
    g+='</div></div>';
    var h=opts.nivel||'h3';
    var f='<div class="ficha"><div class="estado">'+im.estado.map(function(e,k){return '<span class="chip'+(k===0?' cheio':'')+'">'+e+'</span>';}).join('')+'</div>'+
      '<'+h+'>'+im.titulo+'</'+h+'><p class="loc">'+im.local+'</p>'+(im.preco?'<p class="preco">'+im.preco+'</p>':'')+'<dl class="dados">'+
      im.dados.map(function(d){return '<dt>'+d[0]+'</dt><dd>'+d[1]+'</dd>';}).join('')+'</dl><p class="desc">'+im.desc+'</p>';
    var pag = im.pagina && !opts.paginaPropria ? '<a class="lk-pagina" href="'+B+im.pagina+'/">Ver a página da moradia</a>' : '';
    if(!venda){ /* em arrendamento: sem contactos */ }
    else if(ex){
      f+='<p class="mediacao">Comercializada em exclusivo pela '+im.exclusivo.mediadora+' até '+dataPT(im.exclusivo.ate)+'. Os pedidos de informação seguem diretamente para a mediadora.</p>';
      var b=im.exclusivo.anuncio?'<a class="btn" href="'+im.exclusivo.anuncio+'" target="_blank" rel="noopener">Ver o anúncio na '+im.exclusivo.mediadora+'</a>':'';
      if(b||pag) f+='<div class="acoes">'+b+pag+'</div>';
    } else if(opts.paginaPropria){
      f+='<div class="acoes"><a class="btn" href="'+linkWa(textoWa(im))+'" target="_blank" rel="noopener">Falar por WhatsApp</a><a class="lk" href="'+linkMail(nomeCompleto(im)+', '+im.local)+'">Enviar email</a></div>';
    } else {
      f+='<div class="acoes"><a class="btn" href="'+linkMail(nomeCompleto(im)+', '+im.local)+'">Pedir informações</a>'+pag+'</div>';
    }
    f+='</div>';
    a.innerHTML=g+f;
    return a;
  }

  function galeria(a,im){
    var n=im.fotos.length, alt=nomeCompleto(im);
    var palco=a.querySelector('.palco'), conta=a.querySelector('.conta'), ths=[].slice.call(a.querySelectorAll('.th')), atual=0;
    function ir(k){
      k=(k+n)%n; if(k===atual) return;
      var velho=palco.querySelector('picture.atual');
      var novo=document.createElement('div'); novo.innerHTML=pic(im.fotos[k],alt+', fotografia '+(k+1)+' de '+n,' class="atual sai"'); novo=novo.firstChild;
      palco.insertBefore(novo,palco.querySelector('.seta'));
      var img=novo.querySelector('img'); img.loading='eager';
      function mostrar(){ requestAnimationFrame(function(){ novo.classList.remove('sai'); velho.classList.remove('atual'); velho.classList.add('sai'); setTimeout(function(){ if(velho.parentNode) velho.parentNode.removeChild(velho); }, calma?0:600); }); }
      if(img.complete) mostrar(); else { img.onload=mostrar; img.onerror=mostrar; }
      ths[atual].removeAttribute('aria-current'); ths[k].setAttribute('aria-current','true');
      ths[k].scrollIntoView({block:'nearest',inline:'nearest',behavior:calma?'auto':'smooth'});
      atual=k; conta.textContent=(k+1)+' / '+n;
    }
    a.querySelector('.ant').addEventListener('click',function(){ir(atual-1);});
    a.querySelector('.prox').addEventListener('click',function(){ir(atual+1);});
    ths.forEach(function(b){ b.addEventListener('click',function(){ ir(+b.getAttribute('data-k')); }); });
    palco.addEventListener('keydown',function(e){ if(e.key==='ArrowLeft'){ir(atual-1);e.preventDefault();} if(e.key==='ArrowRight'){ir(atual+1);e.preventDefault();} });
    var x0=null; palco.addEventListener('touchstart',function(e){x0=e.touches[0].clientX;},{passive:true});
    palco.addEventListener('touchend',function(e){ if(x0===null) return; var dx=e.changedTouches[0].clientX-x0; if(Math.abs(dx)>40) ir(atual+(dx<0?1:-1)); x0=null; });
  }

  /* antes e depois: raiz é a secção que contém .lista, .ecra, .seg e a legenda */
  function comparador(raiz,pares){
    if(!raiz || !pares.length) return;
    var ecra=raiz.querySelector('.ecra'), leg=raiz.querySelector('figcaption'), selo=ecra.querySelector('.selo');
    var bAntes=raiz.querySelector('.seg [data-m="antes"]'), bDepois=raiz.querySelector('.seg [data-m="depois"]');
    var listaP=raiz.querySelector('.lista'), botoes=[], grupos={};
    pares.forEach(function(p,k){
      if(!grupos[p[1]]){ var d=el('div'); d.innerHTML='<h3>'+p[1]+'</h3><ul></ul>'; listaP.appendChild(d); grupos[p[1]]=d.querySelector('ul'); }
      var li=el('li'), b=el('button',null,p[2]); b.type='button'; b.setAttribute('aria-pressed',k===0?'true':'false');
      b.addEventListener('click',function(){ escolher(k,true); }); li.appendChild(b); grupos[p[1]].appendChild(li); botoes.push(b);
    });
    var depois=true, atualP=-1;
    function momento(dep){
      depois=dep; ecra.classList.toggle('antes',!dep);
      bAntes.setAttribute('aria-pressed',!dep); bDepois.setAttribute('aria-pressed',dep);
      selo.textContent=dep?'Depois · 2025':'Antes · 2024';
      var p=pares[atualP]; ecra.setAttribute('aria-label',p[1]+', '+p[2].toLowerCase()+', '+(dep?'depois da transformação (2025)':'antes da transformação (2024)'));
    }
    function escolher(k,demo){
      if(k===atualP) return; atualP=k; var p=pares[k];
      botoes.forEach(function(b,i){ b.setAttribute('aria-pressed',i===k?'true':'false'); });
      ecra.classList.add('troca');
      [['.antes-img',p[3]],['.depois',p[4]]].forEach(function(s){ var pc=ecra.querySelector(s[0]); pc.querySelector('source').srcset=src(s[1],'webp'); pc.querySelector('img').src=src(s[1],'jpg'); });
      leg.textContent=p[1]+', '+p[2].toLowerCase();
      if(demo && !calma){ momento(false); void ecra.offsetWidth; ecra.classList.remove('troca'); setTimeout(function(){ if(atualP===k) momento(true); },900); }
      else { momento(true); void ecra.offsetWidth; ecra.classList.remove('troca'); }
    }
    bAntes.addEventListener('click',function(){momento(false);});
    bDepois.addEventListener('click',function(){momento(true);});
    ecra.addEventListener('click',function(){momento(!depois);});
    escolher(0,false);
    if(!calma && 'IntersectionObserver' in window){
      var vista=new IntersectionObserver(function(e){ if(e[0].isIntersecting){ vista.disconnect(); ecra.classList.add('troca'); momento(false); void ecra.offsetWidth; ecra.classList.remove('troca'); setTimeout(function(){ momento(true); },1300); } },{threshold:0.55});
      vista.observe(ecra);
    }
  }

  function menu(){
    var m=document.querySelector('.menu'); if(!m) return;
    [].forEach.call(m.querySelectorAll('a'),function(x){x.addEventListener('click',function(){m.removeAttribute('open');});});
    document.addEventListener('keydown',function(e){ if(e.key==='Escape' && m.open){ m.removeAttribute('open'); m.querySelector('summary').focus(); } });
  }
  function revelar(){
    var rvs=[].slice.call(document.querySelectorAll('.rv'));
    if(calma || !('IntersectionObserver' in window)){ rvs.forEach(function(r){r.classList.add('ver');}); return; }
    var io=new IntersectionObserver(function(ent){ ent.forEach(function(x){ if(x.isIntersecting){ x.target.classList.add('ver'); io.unobserve(x.target); } }); },{threshold:0.12,rootMargin:'0px 0px -8% 0px'});
    rvs.forEach(function(r){ if(r.getBoundingClientRect().top<window.innerHeight) r.classList.add('ver'); else io.observe(r); });
  }
  return {ficha:ficha,galeria:galeria,comparador:comparador,menu:menu,revelar:revelar,emVigor:emVigor,dataPT:dataPT,canais:canais,nomeCompleto:nomeCompleto};
})();
