// Presentation only: quiz state, scoring and existing actions remain in app.js.
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
const revealElements=document.querySelectorAll('.diagnostics>details,.zone-panel,.quiz-card,.paper-note,.story-diagram,.story-text blockquote');
if(!reducedMotion.matches&&'IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}),{threshold:.06});
  revealElements.forEach(element=>{element.classList.add('reveal-ready');observer.observe(element)});
  reducedMotion.addEventListener('change',event=>{if(event.matches){observer.disconnect();revealElements.forEach(element=>element.classList.add('is-visible'))}});
}
const zonePanel=document.querySelector('#zone-panel');
new MutationObserver(()=>{if(!reducedMotion.matches)zonePanel.animate([{opacity:.35,transform:'translateY(5px)'},{opacity:1,transform:'translateY(0)'}],{duration:250,easing:'ease-out'})}).observe(zonePanel,{childList:true});
