import{a as f}from"./assets/vendor-2s9xPmg-.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function r(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(s){if(s.ep)return;s.ep=!0;const n=r(s);fetch(s.href,n)}})();f.defaults.baseURL="https://energyflow.b.goit.study/api/";const C=async()=>{const{data:t}=await f.get("quote");return t},E=async(t="Muscles",e=1)=>{const r=window.innerWidth;let i=null;r<=767?i=8:i=12;const{data:s}=await f.get(`filters?filter=${t}&page=${e}&limit=${i}`);return s},F=async(t,e,r=1)=>{const i=window.innerWidth;let s=null;i<=1439?s=8:s=9;const{data:n}=await f.get(`exercises?${t}=${e}&page=${r}&limit=${s}`);return n},g="/EnergyFlow/assets/sprite-Cv5TkU5H.svg",o={quoteBlock:document.getElementById("quote"),exerciseList:document.querySelector(".exercise-list"),pagination:document.querySelector(".pagination"),filterList:document.querySelector(".filter-list"),categoryContainer:document.querySelector(".category-container"),exerciseSearchForm:document.querySelector(".exercise-search-form")},B=async()=>{let t=localStorage.getItem("DailyQuote"),e=t?JSON.parse(t):null;if(!e||Date.now()-e.date>864e5){const{author:i,quote:s}=await C();e={author:i,quote:s,dateStamp:Date.now()},localStorage.setItem("DailyQuote",JSON.stringify(e)),o.quoteBlock.children[1].textContent=e.quote,o.quoteBlock.children[2].textContent=e.author}o.quoteBlock.children[1].textContent=e.quote,o.quoteBlock.children[2].textContent=e.author};let c,d,l;const y=[...o.filterList.querySelectorAll("button[data-filter]")],m=async(t,e)=>{const{results:r,totalPages:i,page:s}=await E(t,e);l=r.map(({imgUrl:n,name:a,filter:p})=>`
          <li class="exercise-item" style="--img: url(${n})">
            <h3 class="exercise-subtitle">${a[0].toUpperCase()+a.slice(1)}</h3>
            <p class="exercise-name">${p}</p>
          </li>
          `).join(""),o.exerciseList.innerHTML=l,o.categoryContainer.innerHTML="",o.exerciseSearchForm.classList.add("hidden"),x(i),L(s)},x=t=>{let e="";for(let r=1;r<=t;r++)e+=`<li class="pages_list-item">
                <button type="button" class="pages_list-btn">${r}</button>
              </li>`;o.pagination.innerHTML=e},h=async({category:t,query:e,currentPage:r,searchTarget:i})=>{const{results:s,totalPages:n,page:a}=await F(t,e,r);l=s.filter(({target:u})=>i?i===u:u).map(({target:u,rating:w,burnedCalories:v,bodyPart:b,time:S,name:$})=>{const q=String(w.toFixed(1));return`
            <li class="exercise-info">
              <button class="startBtn" type="button">Start
                <svg class="exercise-arrow-icon">
                  <use href="${g}#icon-arrow"></use>
                </svg>
              </button>
              <p class="info-label">Workout</p>
              <span class="info-ranking">${q}
                <svg>
                  <use href="${g}#icon-star"></use>
                </svg>
              </span>
                <div class="info-wrapper">
                  <svg class="exercise-icon">
                    <use href="${g}#icon-man"></use>
                  </svg>
                  <h2 class="info-title">${$}</h2>
                </div>
                  <ul class="info-list">
                    <li class="info-item">Burned calories: <span>${v} / ${S} min</span></li>
                    <li class="info-item">Body part: <span>${b}</span></li>
                    <li class="info-item">Target: <span>${u}</span></li>
                  </ul>
            </li>
    `}).join("");const p=e[0].toUpperCase()+e.slice(1);o.categoryContainer.innerHTML=`<span class="exercise-category">${p}</span>`,l.trim()===""&&(l='<h2 class="unsucces-title">Unfortunately, <span>no results</span> were found. You may want to consider other search options to find the exercise you are looking for. Our range is wide and you have the opportunity to find more options that suit your needs.</h2>',x(0)),o.exerciseList.innerHTML=l,L(a)},L=t=>{[...document.querySelectorAll(".pages_list-btn")].forEach(r=>{const i=parseFloat(r.textContent),s=parseFloat(t);i===s?(r.classList.add("active"),r.disabled=!0):(r.classList.remove("active"),r.disabled=!1)})};B();m();o.pagination.addEventListener("click",t=>{if(t.target.classList.contains("pages_list-btn")){const e=parseFloat(t.target.textContent);document.querySelector(".exercise-info")?h({category:d,query:c,currentPage:e}):m(c,e)}});o.filterList.addEventListener("click",t=>{const e=t.target.dataset.filter;c=t.target.textContent.trim(),e&&(y.forEach(r=>{r.classList.remove("active"),r.disabled=!1}),t.target.classList.add("active"),t.target.disabled=!0,m(c))});o.exerciseList.addEventListener("click",t=>{const e=t.target.closest(".exercise-item");e&&(c=e.children[0].textContent.toLowerCase(),d=e.children[1].textContent,y.forEach(r=>{r.disabled=!1}),h({category:d,query:c}),o.exerciseSearchForm.classList.remove("hidden"))});o.exerciseSearchForm.addEventListener("submit",t=>{t.preventDefault();const e=new FormData(o.exerciseSearchForm),r=Object.fromEntries(e).search.toLowerCase();h({category:d,query:c,searchTarget:r})});
//# sourceMappingURL=index.js.map
