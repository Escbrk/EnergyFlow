import{a as l}from"./assets/vendor-2s9xPmg-.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function i(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(t){if(t.ep)return;t.ep=!0;const r=i(t);fetch(t.href,r)}})();l.defaults.baseURL="https://energyflow.b.goit.study/api/";const $=async()=>{const{data:s}=await l.get("quote");return s},q=async(s="Muscles",e=1)=>{const i=window.innerWidth;let n=null;i<=767?n=8:n=12;const{data:t}=await l.get(`filters?filter=${s}&page=${e}&limit=${n}`);return t},E=async(s,e,i=1)=>{const n=window.innerWidth;let t=null;n<=1439?t=8:t=9;const{data:r}=await l.get(`exercises?${s}=${e}&page=${i}&limit=${t}`);return r},g="/EnergyFlow/assets/sprite-Cv5TkU5H.svg",a={quoteBlock:document.getElementById("quote"),exerciseList:document.querySelector(".exercise-list"),pagination:document.querySelector(".pagination"),filterList:document.querySelector(".filter-list"),categoryContainer:document.querySelector(".category-container")},S=async()=>{let s=localStorage.getItem("DailyQuote"),e=s?JSON.parse(s):null;if(!e||Date.now()-e.date>864e5){const{author:n,quote:t}=await $();e={author:n,quote:t,date:Date.now()},localStorage.setItem("DailyQuote",JSON.stringify(e)),a.quoteBlock.children[1].textContent=e.quote,a.quoteBlock.children[2].textContent=e.author}a.quoteBlock.children[1].textContent=e.quote,a.quoteBlock.children[2].textContent=e.author};let c,f;const m=[...a.filterList.querySelectorAll("button[data-filter]")],p=async(s,e)=>{const{results:i,totalPages:n,page:t}=await q(s,e),r=i.map(({imgUrl:o,name:u,filter:d})=>`
          <li class="exercise-item" style="--img: url(${o})">
            <h3 class="exercise-subtitle">${u}</h3>
            <p class="exercise-name">${d}</p>
          </li>
          `).join("");a.exerciseList.innerHTML=r,a.categoryContainer.innerHTML="",B(n),x(t)},B=s=>{let e="";for(let i=1;i<=s;i++)e+=`<li class="pages_list-item">
                <button type="button" class="pages_list-btn">${i}</button>
              </li>`;a.pagination.innerHTML=e},y=async(s,e,i)=>{const{results:n,totalPages:t,page:r}=await E(s,e,i),o=n.map(({target:u,rating:d,burnedCalories:h,bodyPart:L,time:b,name:v})=>{const w=String(d.toFixed(1)).padEnd(2,0);return`
            <li class="exercise-info">
              <button class="startBtn" type="button">Start
                <svg class="exercise-arrow-icon">
                  <use href="${g}#icon-arrow"></use>
                </svg>
              </button>
              <p class="info-label">Workout</p>
              <span class="info-ranking">${w}
                <svg>
                  <use href="${g}#icon-star"></use>
                </svg>
              </span>
                <div class="info-wrapper">
                  <svg class="exercise-icon">
                    <use href="${g}#icon-man"></use>
                  </svg>
                  <h2 class="info-title">${v}</h2>
                </div>
                  <ul class="info-list">
                    <li class="info-item">Burned calories: <span>${h} / ${b} min</span></li>
                    <li class="info-item">Body part: <span>${L}</span></li>
                    <li class="info-item">Target: <span>${u}</span></li>
                  </ul>
            </li>
    `}).join("");a.categoryContainer.innerHTML=`<span class="exercise-category">${e}</span>`,a.exerciseList.innerHTML=o,x(r)},x=s=>{[...document.querySelectorAll(".pages_list-btn")].forEach(i=>{const n=parseFloat(i.textContent),t=parseFloat(s);n===t?(i.classList.add("active"),i.disabled=!0):(i.classList.remove("active"),i.disabled=!1)})};S();p();a.pagination.addEventListener("click",s=>{if(s.target.classList.contains("pages_list-btn")){const e=parseFloat(s.target.textContent);document.querySelector(".exercise-info")?y(f,c,e):p(c,e)}});a.filterList.addEventListener("click",s=>{const e=s.target.dataset.filter;c=s.target.textContent.trim(),e&&(m.forEach(i=>{i.classList.remove("active"),i.disabled=!1}),s.target.classList.add("active"),s.target.disabled=!0,p(c))});a.exerciseList.addEventListener("click",s=>{const e=s.target.closest(".exercise-item");e&&(c=e.children[0].textContent,f=e.children[1].textContent,m.forEach(i=>{i.disabled=!1}),y(f,c))});
//# sourceMappingURL=index.js.map
