var S=[].slice.call(document.querySelectorAll('.s')),k=0,D=document.getElementById('dots'),R=document.documentElement;
function gear(el){var n=18,a=[],r1=100,r2=118,i,t;for(i=0;i<n;i++){t=i/n*6.2832;var w=3.1416/n;[[r2,t-w*.35],[r2,t+w*.35],[r1,t+w*.7],[r1,t+w*1.3]].forEach(function(p){a.push((150+Math.cos(p[1])*p[0]*1.25).toFixed(1)+','+(150+Math.sin(p[1])*p[0]*1.25).toFixed(1))})}
el.innerHTML='<svg viewBox="0 0 300 300" fill="none" stroke="currentColor" stroke-width="1.6"><polygon points="'+a.join(' ')+'"/><circle cx="150" cy="150" r="92"/><circle cx="150" cy="150" r="70" stroke-dasharray="3 7"/></svg>'}
[].forEach.call(document.querySelectorAll('.gear'),gear);
S.forEach(function(_,i){var d=document.createElement('i');d.onclick=function(){go(i)};D.appendChild(d)});
var cvc='255,255,255';
function go(i){i=Math.max(0,Math.min(S.length-1,i));if(i==k&&S[k].classList.contains('on'))return;var o=S[k];S.forEach(function(s){s.classList.remove('out')});if(o.classList.contains('on')){o.classList.remove('on');o.classList.add('out');setTimeout(function(){o.classList.remove('out')},1300)}
k=i;S[k].classList.add('on');S[k].classList.remove('out');
[].forEach.call(D.children,function(d,j){d.classList.toggle('on',j==k)});
document.getElementById('pb').style.width=((k+1)/S.length*100)+'%';document.getElementById('n').textContent=(k+1)+' / '+S.length;
var lg=document.getElementById('lg');lg.style.opacity=k==0?0:1;lg.style.transform=k==0?'scale(.4)':'none';
cvc=S[k].classList.contains('l')?'23,38,79':'207,180,96';try{history.replaceState(null,'','#s'+(k+1))}catch(e){}}
function fit(){R.style.setProperty('--k',Math.min(innerWidth/1280,(innerHeight-60)/720))}
addEventListener('resize',fit);fit();
document.getElementById('nx').onclick=function(){go(k+1)};document.getElementById('pv').onclick=function(){go(k-1)};
document.getElementById('fs').onclick=function(){document.fullscreenElement?document.exitFullscreen():R.requestFullscreen&&R.requestFullscreen()};
addEventListener('keydown',function(e){var c=e.key;if(c=='ArrowRight'||c=='PageDown'||c==' '||c=='ArrowDown')go(k+1);else if(c=='ArrowLeft'||c=='PageUp'||c=='ArrowUp')go(k-1);else if(c=='Home')go(0);else if(c=='End')go(S.length-1)});
var x0=null;addEventListener('touchstart',function(e){x0=e.touches[0].clientX},{passive:true});
addEventListener('touchend',function(e){if(x0===null)return;var d=e.changedTouches[0].clientX-x0;if(Math.abs(d)>50)go(d<0?k+1:k-1);x0=null});
addEventListener('wheel',function(e){if(Math.abs(e.deltaY)>40&&!go.t){go(k+(e.deltaY>0?1:-1));go.t=setTimeout(function(){go.t=0},1200)}},{passive:true});
addEventListener('mousemove',function(e){R.style.setProperty('--mx',(e.clientX/innerWidth-.5).toFixed(3));R.style.setProperty('--my',(e.clientY/innerHeight-.5).toFixed(3));
var t=e.target.closest&&e.target.closest('.cd,.person');if(t){var r=t.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;t.style.transform='perspective(700px) rotateY('+(x*-12)+'deg) rotateX('+(y*10)+'deg) translateZ(8px)'}});
addEventListener('mouseout',function(e){var t=e.target.closest&&e.target.closest('.cd,.person');if(t)t.style.transform=''});
var h=parseInt((location.hash||'').slice(2));go(h>0&&h<=S.length?h-1:0);
var cv=document.getElementById('cv'),cx=cv.getContext('2d'),P=[],W,H,m={x:-999,y:-999};
function rs(){W=cv.width=innerWidth;H=cv.height=innerHeight}rs();addEventListener('resize',rs);
for(var i=0;i<55;i++)P.push({x:Math.random()*2000,y:Math.random()*1200,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35});
addEventListener('mousemove',function(e){m.x=e.clientX;m.y=e.clientY});
(function f(){cx.clearRect(0,0,W,H);P.forEach(function(p,i){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;cx.fillStyle='rgba('+cvc+',.45)';cx.beginPath();cx.arc(p.x,p.y,2,0,6.3);cx.fill();
for(var j=i+1;j<P.length;j++){var q=P[j],d=Math.hypot(p.x-q.x,p.y-q.y);if(d<120){cx.strokeStyle='rgba('+cvc+','+(.2*(1-d/120))+')';cx.beginPath();cx.moveTo(p.x,p.y);cx.lineTo(q.x,q.y);cx.stroke()}}
var dm=Math.hypot(p.x-m.x,p.y-m.y);if(dm<150){cx.strokeStyle='rgba(37,132,198,'+(.5*(1-dm/150))+')';cx.beginPath();cx.moveTo(p.x,p.y);cx.lineTo(m.x,m.y);cx.stroke()}});requestAnimationFrame(f)})();
if('serviceWorker' in navigator&&location.protocol!=='file:'){addEventListener('load',function(){navigator.serviceWorker.register('sw.js').catch(function(){})})}
/* Q&A extras */
(function(){
document.querySelectorAll('.qt').forEach(function(el){var w=el.textContent.trim().split(/\s+/);el.innerHTML=w.map(function(x,i){return '<span class="w" style="--d:'+i+'">'+x+'</span>'}).join(' ')});
var tid=null,cur=null;
function fmt(s){return('0'+Math.floor(s/60)).slice(-2)+':'+('0'+s%60).slice(-2)}
function stop(){clearInterval(tid);tid=null;if(cur)cur.classList.remove('run')}
function reset(b){b.dataset.l=b.dataset.t;b.textContent=fmt(+b.dataset.t);b.classList.remove('end','run')}
function tmr(b){if(!b)return;if(cur&&cur!==b){stop();reset(cur)}cur=b;if(tid){stop();return}
if(b.classList.contains('end')||!+b.dataset.l)reset(b);if(b.dataset.l===undefined)b.dataset.l=b.dataset.t;b.classList.add('run');
tid=setInterval(function(){var l=+b.dataset.l-1;b.dataset.l=l;b.textContent=fmt(l);if(l<=0){stop();b.classList.add('end')}},1000)}
document.querySelectorAll('.tm').forEach(function(b){b.onclick=function(){tmr(b)}});
var og=go;go=function(i){stop();if(cur)reset(cur);og(i)};
var ov=document.getElementById('ov'),g=null,h='';
S.forEach(function(s,i){var ax=s.dataset.ax||i==0||i==S.length-1;if(ax){h+=(g?'</div>':'')+'<h3>'+(s.dataset.ax?s.dataset.n+' · ':'')+s.dataset.t+'</h3><div class="og">';g=1;if(!s.dataset.ax){h+='<button class="oi" data-i="'+i+'"><b>'+s.dataset.n+'</b><span>'+s.dataset.t+'</span></button>'}}
else h+='<button class="oi" data-i="'+i+'"><b>'+s.dataset.n+'</b><span>'+s.dataset.t+'</span></button>'});
ov.innerHTML=h+'</div>';
ov.onclick=function(e){var b=e.target.closest('.oi');if(b){go(+b.dataset.i);ov.classList.remove('open')}else ov.classList.remove('open')};
function tog(){ov.classList.toggle('open');[].forEach.call(ov.querySelectorAll('.oi'),function(b){b.classList.toggle('on',+b.dataset.i==k)})}
document.getElementById('ovb').onclick=tog;
addEventListener('keydown',function(e){var c=e.key.toLowerCase();if(c=='t'||c=='ط')tmr(S[k].querySelector('.tm'));else if(c=='o'||c=='خ')tog();else if(c=='f'||c=='ب')document.getElementById('fs').click();else if(c=='escape')ov.classList.remove('open')})})();
