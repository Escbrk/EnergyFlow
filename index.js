import{a as g}from"./assets/vendor-2s9xPmg-.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function r(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(t){if(t.ep)return;t.ep=!0;const i=r(t);fetch(t.href,i)}})();g.defaults.baseURL="https://energyflow.b.goit.study/api/";const E=async()=>{const{data:s}=await g.get("quote");return s},F=async(s="Muscles",e=1)=>{const r=window.innerWidth;let n=null;r<=767?n=8:n=12;const{data:t}=await g.get(`filters?filter=${s}&page=${e}&limit=${n}`);return t},B=async(s,e,r=1)=>{const n=window.innerWidth;let t=null;n<=1439?t=8:t=9;const{data:i}=await g.get(`exercises?${s}=${e}&page=${r}&limit=${t}`);return i},m="/EnergyFlow/assets/sprite-Cv5TkU5H.svg",o={quoteBlock:document.getElementById("quote"),exerciseList:document.querySelector(".exercise-list"),pagination:document.querySelector(".pagination"),filterList:document.querySelector(".filter-list"),categoryContainer:document.querySelector(".category-container"),exerciseSearchForm:document.querySelector(".exercise-search-form")},P=async()=>{let s=localStorage.getItem("DailyQuote"),e=s?JSON.parse(s):null;if(!e||Date.now()-e.date>864e5){const{author:n,quote:t}=await E();e={author:n,quote:t,dateStamp:Date.now()},localStorage.setItem("DailyQuote",JSON.stringify(e)),o.quoteBlock.children[1].textContent=e.quote,o.quoteBlock.children[2].textContent=e.author}o.quoteBlock.children[1].textContent=e.quote,o.quoteBlock.children[2].textContent=e.author};let u,p,f;const L=[...o.filterList.querySelectorAll("button[data-filter]")],y=async(s,e)=>{const{results:r,totalPages:n,page:t}=await F(s,e);f=r.map(({imgUrl:i,name:c,filter:l})=>`
          <li class="exercise-item" style="--img: url(${i})">
            <h3 class="exercise-subtitle">${c[0].toUpperCase()+c.slice(1)}</h3>
            <p class="exercise-name">${l}</p>
          </li>
          `).join(""),o.exerciseList.innerHTML=f,o.categoryContainer.innerHTML="",o.exerciseSearchForm.classList.add("hidden"),h(t,n),w(t)},h=(s=0,e=0,r=3)=>{const n=Math.floor(r/2);let t=s-n,i=s+n;t<1&&(t=1,i=r),i>e&&(i=e,t=e-r+1),t<1&&(t=1);const c=[];for(let a=t;a<=i;a++)c.push(a);const l=[];//! Left "..."
if(t>1){l.push(1);//! First page
l.push("...");//! Spacer
}//! Main pages
l.push(...c);//! Right "..."
if(i<e){l.push("...");//! Spacer
l.push(e);//! Last page
}const d=l.map(a=>`<li class="pages_list-item">
                <button type="button" class="pages_list-btn">${a}</button>
            </li>`).join("");o.pagination.innerHTML=d,[...document.querySelectorAll(".pages_list-btn")].forEach(a=>{a.textContent.trim()==="..."&&a.classList.add("disabled")})},x=async({category:s,query:e,currentPage:r,searchTarget:n})=>{const{results:t,totalPages:i,page:c}=await B(s,e,r);f=t.filter(({target:a})=>n?n===a:a).map(({target:a,rating:v,burnedCalories:b,bodyPart:S,time:$,name:q})=>{const C=String(v.toFixed(1));return`
            <li class="exercise-info">
              <button class="startBtn" type="button">Start
                <svg class="exercise-arrow-icon">
                  <use href="${m}#icon-arrow"></use>
                </svg>
              </button>
              <p class="info-label">Workout</p>
              <span class="info-ranking">${C}
                <svg>
                  <use href="${m}#icon-star"></use>
                </svg>
              </span>
                <div class="info-wrapper">
                  <svg class="exercise-icon">
                    <use href="${m}#icon-man"></use>
                  </svg>
                  <h2 class="info-title">${q}</h2>
                </div>
                  <ul class="info-list">
                    <li class="info-item">Burned calories: <span>${b} / ${$} min</span></li>
                    <li class="info-item">Body part: <span>${S}</span></li>
                    <li class="info-item">Target: <span>${a}</span></li>
                  </ul>
            </li>
    `}).join("");const l=e[0].toUpperCase()+e.slice(1);o.categoryContainer.innerHTML=`<span class="exercise-category">${l}</span>`;let d;return f.trim()===""?(d=!0,f='<h3 class="unsucces-title">Unfortunately, <span>no results</span> were found. You may want to consider other search options to find the exercise you are looking for. Our range is wide and you have the opportunity to find more options that suit your needs.</h3>'):d=!1,o.exerciseList.innerHTML=f,d?h():h(c,i),w(c),d},w=s=>{[...document.querySelectorAll(".pages_list-btn")].forEach(r=>{const n=parseFloat(r.textContent),t=parseFloat(s);n===t?(r.classList.add("active"),r.disabled=!0):(r.classList.remove("active"),r.disabled=!1)})};P();y();o.pagination.addEventListener("click",s=>{if(s.target.classList.contains("pages_list-btn")){const e=parseFloat(s.target.textContent);document.querySelector(".exercise-info")?x({category:p,query:u,currentPage:e}):y(u,e)}});o.filterList.addEventListener("click",s=>{const e=s.target.dataset.filter;u=s.target.textContent.trim(),e&&(L.forEach(r=>{r.classList.remove("active"),r.disabled=!1}),s.target.classList.add("active"),s.target.disabled=!0,y(u))});o.exerciseList.addEventListener("click",s=>{const e=s.target.closest(".exercise-item");e&&(u=e.children[0].textContent.toLowerCase(),p=e.children[1].textContent,L.forEach(r=>{r.disabled=!1}),x({category:p,query:u}),o.exerciseSearchForm.classList.remove("hidden"))});o.exerciseSearchForm.addEventListener("submit",async s=>{s.preventDefault();const e=new FormData(o.exerciseSearchForm),r=Object.fromEntries(e).search.toLowerCase();await x({category:p,query:u,searchTarget:r})||s.target.reset()});
//# sourceMappingURL=index.js.map
