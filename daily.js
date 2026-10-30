// Genera 5 imágenes nuevas llamando a tu propia página. Uso: node daily.js
const B=process.env.BASE_URL||'http://localhost:3000',h={'Content-Type':'application/json','x-clave':process.env.APP_PASSWORD||''};
const post=async(u,b)=>{const r=await fetch(B+u,{method:'POST',headers:h,body:JSON.stringify(b)}),j=await r.json();if(!r.ok)throw new Error(j.error);return j};
const f=new Date().toLocaleDateString('sv-SE'),c='Variadas (mezcla)',ideas=await post('/api/ideas',{categoria:c,n:5});
for(const [i,idea] of ideas.entries()){await post('/api/imagen',{idea,categoria:c,estilo:i%5,fecha:f});console.log('Imagen',i+1,'lista')}
