/* 1) Remembers where a visitor came from (UTM tags, referrer) so the signup form can record it.
   2) When a page is opened straight from your computer (file://), makes internal links open the right file. */
(function(){
  var KEY='signal_src';
  function read(){try{return JSON.parse(sessionStorage.getItem(KEY)||'null');}catch(e){return null;}}
  function write(v){try{sessionStorage.setItem(KEY,JSON.stringify(v));}catch(e){}}
  var p=new URLSearchParams(location.search);
  if(!read()||p.get('utm_source')){
    write({
      utm_source:p.get('utm_source')||'', utm_medium:p.get('utm_medium')||'', utm_campaign:p.get('utm_campaign')||'',
      referrer:document.referrer&&document.referrer.indexOf(location.host)===-1?document.referrer:'',
      landing_page:location.pathname
    });
  }
  window.signalSource=function(){return read()||{};};
  if(location.protocol==='file:'){
    document.addEventListener('DOMContentLoaded',function(){
      [].forEach.call(document.querySelectorAll('a[href]'),function(a){
        var h=a.getAttribute('href');
        if(/^(https?:|mailto:|#)/.test(h))return;
        var parts=h.split('#');
        if(parts[0]===''||/\/$/.test(parts[0])||parts[0]==='.'||parts[0]==='..'){parts[0]=(parts[0]===''?'./':parts[0].replace(/\/?$/,'/'))+'index.html';a.setAttribute('href',parts.join('#'));}
      });
    });
  }
})();
