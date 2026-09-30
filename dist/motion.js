// All content is visible immediately. Only short, local transition feedback.
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
const zonePanel=document.querySelector('#zone-panel');
new MutationObserver(()=>{if(!reducedMotion.matches)zonePanel.animate([{opacity:.7,transform:'translateY(3px)'},{opacity:1,transform:'translateY(0)'}],{duration:220,easing:'ease-out'})}).observe(zonePanel,{childList:true});
