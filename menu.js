(() => {
 const source=document.querySelector('#menu-data');if(!source)return;
 const products=JSON.parse(source.textContent);const byId=new Map(products.map(p=>[p.id,p]));
 const dialog=document.querySelector('#product-dialog');let opener;
 const labels={cake:'CAKE / ケーキ',baked:'BAKED SWEETS / 焼き菓子',gift:'GIFT / ギフト'};
 function open(id,button){const p=byId.get(id);if(!p)return;opener=button;const img=document.querySelector('#product-dialog-image');img.src=p.image;img.alt=p.name;document.querySelector('#product-dialog-title').textContent=p.name;document.querySelector('#product-dialog-category').textContent=labels[p.category];document.querySelector('#product-dialog-description').textContent=p.description;document.querySelector('#product-dialog-price').textContent='¥'+p.price.toLocaleString('ja-JP')+'（税込）';dialog.showModal();}
 document.querySelectorAll('[data-product]').forEach(button=>button.addEventListener('click',()=>open(button.dataset.product,button)));
 dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
 dialog.addEventListener('close',()=>opener?.focus());
 const search=document.querySelector('#menu-search');if(!search)return;
 const buttons=[...document.querySelectorAll('[data-filter]')],cards=[...document.querySelectorAll('.menu-card')];let filter='all';
 const normalize=s=>s.normalize('NFKC').toLowerCase().replaceAll('いちご','苺').replaceAll('チョコ','ショコラ');
 function render(){const terms=normalize(search.value).trim().split(/\s+/).filter(Boolean);let count=0;for(const card of cards){const category=filter==='all'||(filter==='fruit'?card.dataset.fruit==='true':card.dataset.category===filter);const match=terms.every(t=>normalize(card.dataset.search).includes(t));card.hidden=!(category&&match);if(!card.hidden)count++;}buttons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter===filter)));document.querySelector('#menu-count').textContent=count+'品のお菓子';document.querySelector('.menu-empty').hidden=count!==0;}
 buttons.forEach(b=>b.addEventListener('click',()=>{filter=b.dataset.filter;render();}));search.addEventListener('input',render);document.querySelector('#menu-reset').addEventListener('click',()=>{filter='all';search.value='';render();search.focus();});render();
})();
