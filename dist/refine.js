(() => {
  const svg = (body, cls='') => `<svg class="${cls}" viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="2.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
  const icons = [
    '<circle cx="40" cy="40" r="27"/><path d="m51 27-6 18-17 8 6-19Z"/><circle cx="40" cy="40" r="3"/><path d="M40 7v5m0 56v5M7 40h5m56 0h5"/>',
    '<rect x="12" y="12" width="40" height="51" rx="6"/><path d="M23 25h19M23 35h19M23 45h9"/><rect x="37" y="38" width="32" height="28" rx="5"/><path d="m49 45 11 7-11 7Z"/>',
    '<path d="M13 65h56M20 57V43h11v14m8 0V33h11v24m8 0V20h11v37M17 31l16-12 11 5L65 8m-12 0h12v12"/>',
    '<path d="M12 14h38a7 7 0 0 1 7 7v19a7 7 0 0 1-7 7H30L18 57V47h-6a6 6 0 0 1-6-6V20a6 6 0 0 1 6-6Z"/><path d="M30 23c-8-10-18 3 0 14 18-11 8-24 0-14Z"/><circle cx="61" cy="47" r="8"/><path d="M46 70v-5c0-15 29-15 29 0v5Z"/>',
    '<path d="M34 15c-14-12-24 3-20 13-13 6-11 22 1 25-4 14 10 23 20 12V16m0 13H24m11 14H20m15 13h-9"/><circle cx="55" cy="43" r="23"/><path d="m41 51 6-17 6 17m-10-5h8m8-12v17m-3-17h6m-6 17h6"/>'
  ];
  document.querySelectorAll('#diagnostics details').forEach((d,i) => {
    d.querySelector('summary').insertAdjacentHTML('afterbegin',svg(icons[i],'direction-icon'));
  });
  const zoneSymbols = [
    '<rect x="9" y="13" width="17" height="17" rx="4"/><rect x="49" y="7" width="17" height="17" rx="4" transform="rotate(15 57 15)"/><rect x="15" y="52" width="17" height="17" rx="4" transform="rotate(-12 23 60)"/><rect x="55" y="49" width="17" height="17" rx="4"/><path d="m34 30 6 5m-1 11 5-4" stroke-dasharray="2 5"/>',
    '<circle cx="14" cy="59" r="8"/><circle cx="65" cy="19" r="8"/><path d="M22 59h14V40m12-10h17v-3"/><path d="m33 29 4-5m8 18 5-4"/><path d="M36 40V30h12" stroke-dasharray="3 6" opacity=".6"/>',
    '<path d="M24 19h31M19 25v31m43-31v31M25 62h30M25 25l30 31"/><rect x="9" y="9" width="18" height="18" rx="5"/><rect x="53" y="9" width="18" height="18" rx="5"/><rect x="9" y="53" width="18" height="18" rx="5"/><rect x="53" y="53" width="18" height="18" rx="5"/>',
    '<path d="m21 40 19-20 19 20-19 21Z"/><path d="M40 20v41M21 40h38"/><circle cx="40" cy="14" r="7"/><circle cx="15" cy="40" r="7"/><circle cx="65" cy="40" r="7"/><circle cx="40" cy="67" r="7"/><path d="M64 5v12m-6-6h12M12 62v10m-5-5h10"/>'
  ];
  document.querySelectorAll('.zone-tab').forEach((button,i)=>{
    button.querySelector('i').remove();
    button.insertAdjacentHTML('afterbegin',svg(zoneSymbols[i],'zone-symbol'));
  });
  document.querySelectorAll('main > section .eyebrow').forEach(label=>{
    const text=label.textContent.trim();
    const match=text.match(/^(\d+)\s*\/\s*(.+)$/);
    if(match){label.replaceChildren();const number=document.createElement('span');number.className='section-number';number.textContent=match[1];const title=document.createElement('span');title.className='section-label';title.textContent=match[2][0]+match[2].slice(1).toLocaleLowerCase('ru');label.append(number,title)}
    else if(text==='КОНЕЦ ПЕРВОЙ ГЛАВЫ')label.textContent='Конец первой главы';
  });

  const quiz=document.querySelector('#quiz-form');
  const fields=[...quiz.querySelectorAll('fieldset')];
  const resultButton=document.querySelector('#result-button');
  const status=document.querySelector('#progress-label');
  status.setAttribute('aria-live','polite');
  const steps=document.createElement('ol');steps.className='step-indicators';steps.setAttribute('aria-label','Шаги теста');
  steps.innerHTML=fields.map((_,i)=>`<li aria-label="Вопрос ${i+1}"><span>${i+1}</span></li>`).join('');
  document.querySelector('#progress').after(steps);
  const navigation=document.createElement('div');navigation.className='quiz-navigation';
  navigation.innerHTML='<button type="button" class="button step-back">Назад</button><button type="button" class="button primary step-next">Дальше</button>';
  quiz.append(navigation);navigation.append(resultButton);
  const back=navigation.querySelector('.step-back'),next=navigation.querySelector('.step-next');
  let step=0;
  fields.forEach(field=>{field.querySelector('legend').textContent=field.querySelector('legend').textContent.replace(/^\d+\.\s*/,'');field.querySelector('legend').tabIndex=-1;field.querySelectorAll('input').forEach(input=>input.required=false)});
  function render(focus=false){
    fields.forEach((field,i)=>field.hidden=i!==step);
    status.textContent=`Вопрос ${step+1} из 6`;
    [...steps.children].forEach((li,i)=>{const answered=!!fields[i].querySelector('input:checked');li.classList.toggle('answered',answered);li.classList.toggle('current',i===step);li.setAttribute('aria-label',`Вопрос ${i+1}${answered?', отвечен':''}`);if(i===step)li.setAttribute('aria-current','step');else li.removeAttribute('aria-current')});
    back.disabled=step===0;next.hidden=step===5;next.disabled=!fields[step].querySelector('input:checked');resultButton.hidden=step!==5;resultButton.textContent='Посмотреть мой результат';resultButton.disabled=quiz.querySelectorAll('input:checked').length!==6;
    if(focus){fields[step].querySelector('legend').focus({preventScroll:true});if(!matchMedia('(prefers-reduced-motion: reduce)').matches)fields[step].animate([{opacity:.6,transform:'translateY(4px)'},{opacity:1,transform:'translateY(0)'}],{duration:200,easing:'ease-out'})}
  }
  next.addEventListener('click',()=>{if(step<5&&fields[step].querySelector('input:checked')){step++;render(true)}});
  back.addEventListener('click',()=>{if(step>0){step--;document.querySelector('#result').hidden=true;render(true)}});
  quiz.addEventListener('change',()=>render());
  quiz.addEventListener('reset',()=>{step=0;setTimeout(()=>render(true),0)});
  quiz.addEventListener('submit',event=>{if(step<5){event.preventDefault();event.stopImmediatePropagation();next.click()}},true);
  render();
})();
