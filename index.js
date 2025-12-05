import{a as m}from"./assets/vendor-2s9xPmg-.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function a(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=a(s);fetch(s.href,r)}})();m.defaults.baseURL="https://energyflow.b.goit.study/api/";const k=async()=>{const{data:t}=await m.get("quote");return t};let y;const M=async(t="Muscles",e=1)=>{y=window.innerWidth<=767?8:12;const{data:a}=await m.get(`filters?filter=${t}&page=${e}&limit=${y}`);return a},O=async(t,e,a=1,i="")=>{y=window.innerWidth<=1439?8:9;const s=t.includes(" ")?"bodypart":t,{data:r}=await m.get(`exercises?${s.toLowerCase()}=${e}&keyword=${i}&page=${a}&limit=${y}`);return r},U=async t=>{const{data:e}=await m.get(`exercises/${t}`);return e},f="/EnergyFlow/assets/sprite-Cr8MNOq0.svg",n={quoteBlock:document.getElementById("quote"),exerciseList:document.querySelector(".exercise-list"),pagination:document.querySelector(".pagination"),filterList:document.querySelector(".filter-list"),categoryContainer:document.querySelector(".category-container"),exerciseSearchForm:document.querySelector(".exercise-search-form"),backdrop:document.querySelector(".backdrop")},T=async()=>{let t=localStorage.getItem("DailyQuote"),e=t?JSON.parse(t):null;if(!e||Date.now()-e.dateStamp>864e5){const{author:i,quote:s}=await k();e={author:i,quote:s,dateStamp:Date.now()},localStorage.setItem("DailyQuote",JSON.stringify(e))}n.quoteBlock.children[1].textContent=e.quote,n.quoteBlock.children[2].textContent=e.author};let g,h,u,x;const S=[...n.filterList.querySelectorAll("button[data-filter]")],L=async(t,e)=>{const{results:a,totalPages:i,page:s}=await M(t,e);u=a.map(({imgUrl:r,name:o,filter:l})=>`
          <li class="exercise-item" style="--img: url(${r})">
            <h3 class="exercise-subtitle">${o[0].toUpperCase()+o.slice(1)}</h3>
            <p class="exercise-name">${l}</p>
          </li>
          `).join(""),n.exerciseList.innerHTML=u,n.categoryContainer.innerHTML="",n.exerciseSearchForm.classList.add("hidden"),v(s,i),q(s)},v=(t=0,e=0,a=3)=>{const i=Math.floor(a/2);let s=t-i,r=t+i;s<1&&(s=1,r=a),r>e&&(r=e,s=e-a+1),s<1&&(s=1);const o=[];for(let c=s;c<=r;c++)o.push(c);const l=[];//! Left "..."
if(s>1){l.push(1);//! First page
l.push("...");//! Spacer
}//! Main pages
l.push(...o);//! Right "..."
if(r<e){l.push("...");//! Spacer
l.push(e);//! Last page
}const d=l.map(c=>`<li class="pages_list-item">
                <button type="button" class="pages_list-btn">${c}</button>
            </li>`).join("");n.pagination.innerHTML=d,[...document.querySelectorAll(".pages_list-btn")].forEach(c=>{c.textContent.trim()==="..."&&c.classList.add("disabled")})},$=async({category:t,query:e,currentPage:a,searchTarget:i})=>{const{results:s,totalPages:r,page:o}=await O(t,e,a,i);u=s.map(({target:c,rating:b,burnedCalories:p,bodyPart:w,time:E,name:B,_id:P})=>{const F=String(b.toFixed(1)),C={bodyPart:w[0].toUpperCase()+w.slice(1),target:c[0].toUpperCase()+c.slice(1)};return`
            <li class="exercise-info" data-id=${P}>
              <button class="startBtn" type="button">Start
                <svg class="exercise-arrow-icon">
                  <use href="${f}#icon-arrow"></use>
                </svg>
              </button>
              <p class="info-label">Workout</p>
              <span class="info-ranking">${F}
                <svg>
                  <use href="${f}#icon-star"></use>
                </svg>
              </span>
                <div class="info-wrapper">
                  <svg class="exercise-icon">
                    <use href="${f}#icon-man"></use>
                  </svg>
                  <h2 class="info-title">${B}</h2>
                </div>
                  <ul class="info-list">
                    <li class="info-item">Burned calories: <span>${p} / ${E} min</span></li>
                    <li class="info-item">Body part: <span>${C.bodyPart}</span></li>
                    <li class="info-item">Target: <span>${C.target}</span></li>
                  </ul>
            </li>
    `}).join("");const l=e[0].toUpperCase()+e.slice(1);n.categoryContainer.innerHTML=`<span class="exercise-category">${l}</span>`;let d;return u.trim()===""?(d=!0,u='<h3 class="unsucces-title">Unfortunately, <span>no results</span> were found. You may want to consider other search options to find the exercise you are looking for. Our range is wide and you have the opportunity to find more options that suit your needs.</h3>'):d=!1,n.exerciseList.innerHTML=u,d?v():v(o,r),q(o),d},I=async t=>{const{name:e,bodyPart:a,target:i,rating:s,equipment:r,popularity:o,burnedCalories:l,description:d,gifUrl:c}=await U(t),b=String(s.toFixed(1)),p={name:e[0].toUpperCase()+e.slice(1),target:i[0].toUpperCase()+i.slice(1),bodyPart:a[0].toUpperCase()+a.slice(1),equipment:r[0].toUpperCase()+r.slice(1)};u=`
    <div class="modal-window">
      <button type="button" class="close-modal-btn">
        <svg>
          <use href="${f}#icon-close"></use>
        </svg>
      </button>

      <div class="gif-wrapper">
        <img
          src=${c}
          alt=${p.name}
          class="modal-gif"
        />
      </div>
      <div class="text-wrapper">
        <h2 class="modal-title">${p.name}</h2>
        <p class="modal-rating">
          ${b}
          <svg>
            <use href="${f}#icon-star"></use>
          </svg>
        </p>

        <ul class="stats-list">
          <li class="stats-item">
            Target
            <span>${p.target}</span>
          </li>
          <li class="stats-item">
            Body Part
            <span>${p.bodyPart}</span>
          </li>
          <li class="stats-item">
            Equipment
            <span>${p.equipment}</span>
          </li>
          <li class="stats-item">
            Popular
            <span>${o}</span>
          </li>
          <li class="stats-item">
            Burned Calories
            <span>${l}/3 min</span>
          </li>
        </ul>

        <p class="modal-description">
        ${d}
        </p>

        <ul class="btns-list">
          <li>
            <button type="button" class="favorite-btn">
              Add to favorites
              <svg>
                <use href="${f}#icon-heart"></use>
              </svg>
            </button>
          </li>
          <li>
            <button type="button" class="rating-btn">Give a rating</button>
          </li>
        </ul>
      </div>
    </div>
  `,n.backdrop.innerHTML=u},q=t=>{[...document.querySelectorAll(".pages_list-btn")].forEach(a=>{const i=parseFloat(a.textContent),s=parseFloat(t);i===s?(a.classList.add("active"),a.disabled=!0):(a.classList.remove("active"),a.disabled=!1)})};T();L();n.pagination.addEventListener("click",t=>{if(t.target.classList.contains("pages_list-btn")){const e=parseFloat(t.target.textContent);document.querySelector(".exercise-info")?$({category:h,query:g,currentPage:e,searchTarget:x}):L(g,e)}});n.filterList.addEventListener("click",t=>{const e=t.target.dataset.filter;g=t.target.textContent.trim(),e&&(S.forEach(a=>{a.classList.remove("active"),a.disabled=!1}),t.target.classList.add("active"),t.target.disabled=!0,L(g))});n.exerciseList.addEventListener("click",t=>{const e=t.target.closest(".exercise-item");if(e&&(g=e.children[0].textContent.toLowerCase(),h=e.children[1].textContent,S.forEach(i=>{i.disabled=!1}),$({category:h,query:g}),n.exerciseSearchForm.classList.remove("hidden")),t.target.closest(".startBtn")){n.backdrop.classList.remove("hidden");const i=t.target.closest(".exercise-info").dataset.id;I(i)}});n.exerciseSearchForm.addEventListener("submit",async t=>{t.preventDefault();const e=new FormData(n.exerciseSearchForm);x=Object.fromEntries(e).search.toLowerCase(),await $({category:h,query:g,searchTarget:x})||t.target.reset()});n.backdrop.addEventListener("click",t=>{t.target.closest(".close-modal-btn")&&(n.backdrop.classList.add("hidden"),document.style="pointer-event: none")});
//# sourceMappingURL=index.js.map
