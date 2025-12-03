import{a as m}from"./assets/vendor-2s9xPmg-.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function r(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(t){if(t.ep)return;t.ep=!0;const i=r(t);fetch(t.href,i)}})();m.defaults.baseURL="https://energyflow.b.goit.study/api/";const P=async()=>{const{data:s}=await m.get("quote");return s};let f;const k=async(s="Muscles",e=1)=>{f=window.innerWidth<=767?8:12;const{data:r}=await m.get(`filters?filter=${s}&page=${e}&limit=${f}`);return r},O=async(s,e,r=1,a="")=>{f=window.innerWidth<=1439?8:9;const t=s.includes(" ")?"bodypart":s,{data:i}=await m.get(`exercises?${t.toLowerCase()}=${e}&keyword=${a}&page=${r}&limit=${f}`);return i},h="/EnergyFlow/assets/sprite-Cv5TkU5H.svg",o={quoteBlock:document.getElementById("quote"),exerciseList:document.querySelector(".exercise-list"),pagination:document.querySelector(".pagination"),filterList:document.querySelector(".filter-list"),categoryContainer:document.querySelector(".category-container"),exerciseSearchForm:document.querySelector(".exercise-search-form")},M=async()=>{let s=localStorage.getItem("DailyQuote"),e=s?JSON.parse(s):null;if(!e||Date.now()-e.date>864e5){const{author:a,quote:t}=await P();e={author:a,quote:t,dateStamp:Date.now()},localStorage.setItem("DailyQuote",JSON.stringify(e)),o.quoteBlock.children[1].textContent=e.quote,o.quoteBlock.children[2].textContent=e.author}o.quoteBlock.children[1].textContent=e.quote,o.quoteBlock.children[2].textContent=e.author};let u,g,p,y;const C=[...o.filterList.querySelectorAll("button[data-filter]")],L=async(s,e)=>{const{results:r,totalPages:a,page:t}=await k(s,e);p=r.map(({imgUrl:i,name:n,filter:l})=>`
          <li class="exercise-item" style="--img: url(${i})">
            <h3 class="exercise-subtitle">${n[0].toUpperCase()+n.slice(1)}</h3>
            <p class="exercise-name">${l}</p>
          </li>
          `).join(""),o.exerciseList.innerHTML=p,o.categoryContainer.innerHTML="",o.exerciseSearchForm.classList.add("hidden"),x(t,a),S(t)},x=(s=0,e=0,r=3)=>{const a=Math.floor(r/2);let t=s-a,i=s+a;t<1&&(t=1,i=r),i>e&&(i=e,t=e-r+1),t<1&&(t=1);const n=[];for(let c=t;c<=i;c++)n.push(c);const l=[];//! Left "..."
if(t>1){l.push(1);//! First page
l.push("...");//! Spacer
}//! Main pages
l.push(...n);//! Right "..."
if(i<e){l.push("...");//! Spacer
l.push(e);//! Last page
}const d=l.map(c=>`<li class="pages_list-item">
                <button type="button" class="pages_list-btn">${c}</button>
            </li>`).join("");o.pagination.innerHTML=d,[...document.querySelectorAll(".pages_list-btn")].forEach(c=>{c.textContent.trim()==="..."&&c.classList.add("disabled")})},w=async({category:s,query:e,currentPage:r,searchTarget:a})=>{const{results:t,totalPages:i,page:n}=await O(s,e,r,a);p=t.map(({target:c,rating:$,burnedCalories:q,bodyPart:b,time:E,name:F})=>{const B=String($.toFixed(1)),v={bodyPart:b[0].toUpperCase()+b.slice(1),target:c[0].toUpperCase()+c.slice(1)};return`
            <li class="exercise-info">
              <button class="startBtn" type="button">Start
                <svg class="exercise-arrow-icon">
                  <use href="${h}#icon-arrow"></use>
                </svg>
              </button>
              <p class="info-label">Workout</p>
              <span class="info-ranking">${B}
                <svg>
                  <use href="${h}#icon-star"></use>
                </svg>
              </span>
                <div class="info-wrapper">
                  <svg class="exercise-icon">
                    <use href="${h}#icon-man"></use>
                  </svg>
                  <h2 class="info-title">${F}</h2>
                </div>
                  <ul class="info-list">
                    <li class="info-item">Burned calories: <span>${q} / ${E} min</span></li>
                    <li class="info-item">Body part: <span>${v.bodyPart}</span></li>
                    <li class="info-item">Target: <span>${v.target}</span></li>
                  </ul>
            </li>
    `}).join("");const l=e[0].toUpperCase()+e.slice(1);o.categoryContainer.innerHTML=`<span class="exercise-category">${l}</span>`;let d;return p.trim()===""?(d=!0,p='<h3 class="unsucces-title">Unfortunately, <span>no results</span> were found. You may want to consider other search options to find the exercise you are looking for. Our range is wide and you have the opportunity to find more options that suit your needs.</h3>'):d=!1,o.exerciseList.innerHTML=p,d?x():x(n,i),S(n),d},S=s=>{[...document.querySelectorAll(".pages_list-btn")].forEach(r=>{const a=parseFloat(r.textContent),t=parseFloat(s);a===t?(r.classList.add("active"),r.disabled=!0):(r.classList.remove("active"),r.disabled=!1)})};M();L();o.pagination.addEventListener("click",s=>{if(s.target.classList.contains("pages_list-btn")){const e=parseFloat(s.target.textContent);document.querySelector(".exercise-info")?w({category:g,query:u,currentPage:e,searchTarget:y}):L(u,e)}});o.filterList.addEventListener("click",s=>{const e=s.target.dataset.filter;u=s.target.textContent.trim(),e&&(C.forEach(r=>{r.classList.remove("active"),r.disabled=!1}),s.target.classList.add("active"),s.target.disabled=!0,L(u))});o.exerciseList.addEventListener("click",s=>{const e=s.target.closest(".exercise-item");e&&(u=e.children[0].textContent.toLowerCase(),g=e.children[1].textContent,C.forEach(r=>{r.disabled=!1}),w({category:g,query:u}),o.exerciseSearchForm.classList.remove("hidden"))});o.exerciseSearchForm.addEventListener("submit",async s=>{s.preventDefault();const e=new FormData(o.exerciseSearchForm);y=Object.fromEntries(e).search.toLowerCase(),await w({category:g,query:u,searchTarget:y})||s.target.reset()});
//# sourceMappingURL=index.js.map
