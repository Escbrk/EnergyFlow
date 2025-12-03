import{a as m}from"./assets/vendor-2s9xPmg-.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function r(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(t){if(t.ep)return;t.ep=!0;const i=r(t);fetch(t.href,i)}})();m.defaults.baseURL="https://energyflow.b.goit.study/api/";const B=async()=>{const{data:s}=await m.get("quote");return s};let f;const P=async(s="Muscles",e=1)=>{f=window.innerWidth<=767?8:12;const{data:r}=await m.get(`filters?filter=${s}&page=${e}&limit=${f}`);return r},k=async(s,e,r=1,o="")=>{f=window.innerWidth<=1439?8:9;const t=s.includes(" ")?"bodypart":s,{data:i}=await m.get(`exercises?${t.toLowerCase()}=${e}&keyword=${o}&page=${r}&limit=${f}`);return i},h="/EnergyFlow/assets/sprite-Cv5TkU5H.svg",n={quoteBlock:document.getElementById("quote"),exerciseList:document.querySelector(".exercise-list"),pagination:document.querySelector(".pagination"),filterList:document.querySelector(".filter-list"),categoryContainer:document.querySelector(".category-container"),exerciseSearchForm:document.querySelector(".exercise-search-form")},O=async()=>{let s=localStorage.getItem("DailyQuote"),e=s?JSON.parse(s):null;if(!e||Date.now()-e.date>864e5){const{author:o,quote:t}=await B();e={author:o,quote:t,dateStamp:Date.now()},localStorage.setItem("DailyQuote",JSON.stringify(e)),n.quoteBlock.children[1].textContent=e.quote,n.quoteBlock.children[2].textContent=e.author}n.quoteBlock.children[1].textContent=e.quote,n.quoteBlock.children[2].textContent=e.author};let u,g,p,y;const v=[...n.filterList.querySelectorAll("button[data-filter]")],L=async(s,e)=>{const{results:r,totalPages:o,page:t}=await P(s,e);p=r.map(({imgUrl:i,name:a,filter:c})=>`
          <li class="exercise-item" style="--img: url(${i})">
            <h3 class="exercise-subtitle">${a[0].toUpperCase()+a.slice(1)}</h3>
            <p class="exercise-name">${c}</p>
          </li>
          `).join(""),n.exerciseList.innerHTML=p,n.categoryContainer.innerHTML="",n.exerciseSearchForm.classList.add("hidden"),x(t,o),b(t)},x=(s=0,e=0,r=3)=>{const o=Math.floor(r/2);let t=s-o,i=s+o;t<1&&(t=1,i=r),i>e&&(i=e,t=e-r+1),t<1&&(t=1);const a=[];for(let l=t;l<=i;l++)a.push(l);const c=[];//! Left "..."
if(t>1){c.push(1);//! First page
c.push("...");//! Spacer
}//! Main pages
c.push(...a);//! Right "..."
if(i<e){c.push("...");//! Spacer
c.push(e);//! Last page
}const d=c.map(l=>`<li class="pages_list-item">
                <button type="button" class="pages_list-btn">${l}</button>
            </li>`).join("");n.pagination.innerHTML=d,[...document.querySelectorAll(".pages_list-btn")].forEach(l=>{l.textContent.trim()==="..."&&l.classList.add("disabled")})},w=async({category:s,query:e,currentPage:r,searchTarget:o})=>{const{results:t,totalPages:i,page:a}=await k(s,e,r,o);p=t.map(({target:l,rating:S,burnedCalories:$,bodyPart:C,time:q,name:E})=>{const F=String(S.toFixed(1));return`
            <li class="exercise-info">
              <button class="startBtn" type="button">Start
                <svg class="exercise-arrow-icon">
                  <use href="${h}#icon-arrow"></use>
                </svg>
              </button>
              <p class="info-label">Workout</p>
              <span class="info-ranking">${F}
                <svg>
                  <use href="${h}#icon-star"></use>
                </svg>
              </span>
                <div class="info-wrapper">
                  <svg class="exercise-icon">
                    <use href="${h}#icon-man"></use>
                  </svg>
                  <h2 class="info-title">${E}</h2>
                </div>
                  <ul class="info-list">
                    <li class="info-item">Burned calories: <span>${$} / ${q} min</span></li>
                    <li class="info-item">Body part: <span>${C}</span></li>
                    <li class="info-item">Target: <span>${l}</span></li>
                  </ul>
            </li>
    `}).join("");const c=e[0].toUpperCase()+e.slice(1);n.categoryContainer.innerHTML=`<span class="exercise-category">${c}</span>`;let d;return p.trim()===""?(d=!0,p='<h3 class="unsucces-title">Unfortunately, <span>no results</span> were found. You may want to consider other search options to find the exercise you are looking for. Our range is wide and you have the opportunity to find more options that suit your needs.</h3>'):d=!1,n.exerciseList.innerHTML=p,d?x():x(a,i),b(a),d},b=s=>{[...document.querySelectorAll(".pages_list-btn")].forEach(r=>{const o=parseFloat(r.textContent),t=parseFloat(s);o===t?(r.classList.add("active"),r.disabled=!0):(r.classList.remove("active"),r.disabled=!1)})};O();L();n.pagination.addEventListener("click",s=>{if(s.target.classList.contains("pages_list-btn")){const e=parseFloat(s.target.textContent);document.querySelector(".exercise-info")?w({category:g,query:u,currentPage:e,searchTarget:y}):L(u,e)}});n.filterList.addEventListener("click",s=>{const e=s.target.dataset.filter;u=s.target.textContent.trim(),e&&(v.forEach(r=>{r.classList.remove("active"),r.disabled=!1}),s.target.classList.add("active"),s.target.disabled=!0,L(u))});n.exerciseList.addEventListener("click",s=>{const e=s.target.closest(".exercise-item");e&&(u=e.children[0].textContent.toLowerCase(),g=e.children[1].textContent,v.forEach(r=>{r.disabled=!1}),w({category:g,query:u}),n.exerciseSearchForm.classList.remove("hidden"))});n.exerciseSearchForm.addEventListener("submit",async s=>{s.preventDefault();const e=new FormData(n.exerciseSearchForm);y=Object.fromEntries(e).search.toLowerCase(),await w({category:g,query:u,searchTarget:y})||s.target.reset()});
//# sourceMappingURL=index.js.map
