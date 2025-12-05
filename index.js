import{a as f}from"./assets/vendor-2s9xPmg-.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function a(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=a(s);fetch(s.href,i)}})();f.defaults.baseURL="https://energyflow.b.goit.study/api/";const k=async()=>{const{data:t}=await f.get("quote");return t};let m;const M=async(t="Muscles",e=1)=>{m=window.innerWidth<=767?8:12;const{data:a}=await f.get(`filters?filter=${t}&page=${e}&limit=${m}`);return a},O=async(t,e,a=1,r="")=>{m=window.innerWidth<=1439?8:9;const s=t.includes(" ")?"bodypart":t,{data:i}=await f.get(`exercises?${s.toLowerCase()}=${e}&keyword=${r}&page=${a}&limit=${m}`);return i},U=async t=>{const{data:e}=await f.get(`exercises/${t}`);return e},b="/EnergyFlow/assets/sprite-Cr8MNOq0.svg",n={quoteBlock:document.getElementById("quote"),exerciseList:document.querySelector(".exercise-list"),pagination:document.querySelector(".pagination"),filterList:document.querySelector(".filter-list"),categoryContainer:document.querySelector(".category-container"),exerciseSearchForm:document.querySelector(".exercise-search-form"),backdrop:document.querySelector(".backdrop")},T=async()=>{let t=localStorage.getItem("DailyQuote"),e=t?JSON.parse(t):null;if(!e||Date.now()-e.dateStamp>864e5){const{author:r,quote:s}=await k();e={author:r,quote:s,dateStamp:Date.now()},localStorage.setItem("DailyQuote",JSON.stringify(e))}n.quoteBlock.children[1].textContent=e.quote,n.quoteBlock.children[2].textContent=e.author};let g,y,u,v;const S=[...n.filterList.querySelectorAll("button[data-filter]")],L=async(t,e)=>{const{results:a,totalPages:r,page:s}=await M(t,e);u=a.map(({imgUrl:i,name:o,filter:l})=>`
          <li class="exercise-item" style="--img: url(${i})">
            <h3 class="exercise-subtitle">${o[0].toUpperCase()+o.slice(1)}</h3>
            <p class="exercise-name">${l}</p>
          </li>
          `).join(""),n.exerciseList.innerHTML=u,n.categoryContainer.innerHTML="",n.exerciseSearchForm.classList.add("hidden"),x(s,r),q(s)},x=(t=0,e=0,a=3)=>{const r=Math.floor(a/2);let s=t-r,i=t+r;s<1&&(s=1,i=a),i>e&&(i=e,s=e-a+1),s<1&&(s=1);const o=[];for(let c=s;c<=i;c++)o.push(c);const l=[];//! Left "..."
if(s>1){l.push(1);//! First page
l.push("...");//! Spacer
}//! Main pages
l.push(...o);//! Right "..."
if(i<e){l.push("...");//! Spacer
l.push(e);//! Last page
}const d=l.map(c=>`<li class="pages_list-item">
                <button type="button" class="pages_list-btn">${c}</button>
            </li>`).join("");n.pagination.innerHTML=d,[...document.querySelectorAll(".pages_list-btn")].forEach(c=>{c.textContent.trim()==="..."&&c.classList.add("disabled")})},$=async({category:t,query:e,currentPage:a,searchTarget:r})=>{const{results:s,totalPages:i,page:o}=await O(t,e,a,r);u=s.map(({target:c,rating:h,burnedCalories:p,bodyPart:w,time:E,name:B,_id:P})=>{const F=String(h.toFixed(1)),C={bodyPart:w[0].toUpperCase()+w.slice(1),target:c[0].toUpperCase()+c.slice(1)};return`
            <li class="exercise-info" data-id=${P}>
              <button class="startBtn" type="button">Start
                <svg class="exercise-arrow-icon">
                  <use href="${b}#icon-arrow"></use>
                </svg>
              </button>
              <p class="info-label">Workout</p>
              <span class="info-ranking">${F}
                <svg>
                  <use href="${b}#icon-star"></use>
                </svg>
              </span>
                <div class="info-wrapper">
                  <svg class="exercise-icon">
                    <use href="${b}#icon-man"></use>
                  </svg>
                  <h2 class="info-title">${B}</h2>
                </div>
                  <ul class="info-list">
                    <li class="info-item">Burned calories: <span>${p} / ${E} min</span></li>
                    <li class="info-item">Body part: <span>${C.bodyPart}</span></li>
                    <li class="info-item">Target: <span>${C.target}</span></li>
                  </ul>
            </li>
    `}).join("");const l=e[0].toUpperCase()+e.slice(1);n.categoryContainer.innerHTML=`<span class="exercise-category">${l}</span>`;let d;return u.trim()===""?(d=!0,u='<h3 class="unsucces-title">Unfortunately, <span>no results</span> were found. You may want to consider other search options to find the exercise you are looking for. Our range is wide and you have the opportunity to find more options that suit your needs.</h3>'):d=!1,n.exerciseList.innerHTML=u,d?x():x(o,i),q(o),d},I=async t=>{const{name:e,bodyPart:a,target:r,rating:s,equipment:i,popularity:o,burnedCalories:l,description:d,gifUrl:c}=await U(t),h=String(s.toFixed(1)),p={name:e[0].toUpperCase()+e.slice(1),target:r[0].toUpperCase()+r.slice(1),bodyPart:a[0].toUpperCase()+a.slice(1),equipment:i[0].toUpperCase()+i.slice(1)};u=`
    <div class="container">
    <div class="modal-window">
      <button type="button" class="close-modal-btn">
        <svg>
          <use href="img/svg/sprite.svg#icon-close"></use>
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
          ${h}
          <svg>
            <use href="img/svg/sprite.svg#icon-star"></use>
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
                <use href="img/svg/sprite.svg#icon-heart"></use>
              </svg>
            </button>
          </li>
          <li>
            <button type="button" class="rating-btn">Give a rating</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
  `,n.backdrop.innerHTML=u},q=t=>{[...document.querySelectorAll(".pages_list-btn")].forEach(a=>{const r=parseFloat(a.textContent),s=parseFloat(t);r===s?(a.classList.add("active"),a.disabled=!0):(a.classList.remove("active"),a.disabled=!1)})};T();L();n.pagination.addEventListener("click",t=>{if(t.target.classList.contains("pages_list-btn")){const e=parseFloat(t.target.textContent);document.querySelector(".exercise-info")?$({category:y,query:g,currentPage:e,searchTarget:v}):L(g,e)}});n.filterList.addEventListener("click",t=>{const e=t.target.dataset.filter;g=t.target.textContent.trim(),e&&(S.forEach(a=>{a.classList.remove("active"),a.disabled=!1}),t.target.classList.add("active"),t.target.disabled=!0,L(g))});n.exerciseList.addEventListener("click",t=>{const e=t.target.closest(".exercise-item");if(e&&(g=e.children[0].textContent.toLowerCase(),y=e.children[1].textContent,S.forEach(r=>{r.disabled=!1}),$({category:y,query:g}),n.exerciseSearchForm.classList.remove("hidden")),t.target.closest(".startBtn")){n.backdrop.classList.remove("hidden");const r=t.target.closest(".exercise-info").dataset.id;I(r)}});n.exerciseSearchForm.addEventListener("submit",async t=>{t.preventDefault();const e=new FormData(n.exerciseSearchForm);v=Object.fromEntries(e).search.toLowerCase(),await $({category:y,query:g,searchTarget:v})||t.target.reset()});n.backdrop.addEventListener("click",t=>{t.target.closest(".close-modal-btn")&&n.backdrop.classList.add("hidden")});
//# sourceMappingURL=index.js.map
