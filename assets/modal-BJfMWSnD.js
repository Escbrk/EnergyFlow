import{a as u,i as c}from"./vendor-CLTxG5yw.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function o(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(t){if(t.ep)return;t.ep=!0;const a=o(t);fetch(t.href,a)}})();const n={mobileMenu:document.querySelector(".mobile-menu"),mobileMenuBtn:document.querySelector(".mobile-menu-btn"),closeMobileMenuBtn:document.querySelector(".close-btn"),exerciseList:document.querySelector(".exercise-list"),categoryContainer:document.querySelector(".category-container"),exerciseSearchForm:document.querySelector(".exercise-search-form"),backdrop:document.querySelector(".backdrop"),pagination:document.querySelector(".pagination"),favList:document.querySelector(".fav-list"),emptyWrapper:document.querySelector(".empty-wrapper")},w=location.pathname.split("/").pop()||"index.html";document.querySelectorAll(".header-menu-link, .mobile-nav-link").forEach(e=>{const s=e.getAttribute("href").split("/").pop();w.endsWith(s)&&e.classList.add("active")});n.mobileMenuBtn.addEventListener("click",()=>{n.mobileMenu.classList.remove("hidden")});n.closeMobileMenuBtn.addEventListener("click",()=>{n.mobileMenu.classList.add("hidden")});u.defaults.baseURL="https://energyflow.b.goit.study/api/";const $=async()=>{const{data:e}=await u.get("quote");return e};let m;const M=async(e="Muscles",s=1)=>{m=window.innerWidth<=767?8:12;const{data:o}=await u.get(`filters?filter=${e}&page=${s}&limit=${m}`);return o},k=async(e,s,o=1,i="")=>{m=window.innerWidth<=1439?8:9;const t=e.includes(" ")?"bodypart":e,{data:a}=await u.get(`exercises?${t.toLowerCase()}=${s}&keyword=${i}&page=${o}&limit=${m}`);return a},L=async e=>{const{data:s}=await u.get(`exercises/${e}`);return s},f=document.getElementById("quote"),E=async()=>{let e=localStorage.getItem("DailyQuote"),s=e?JSON.parse(e):null;const o={text:f.querySelector(".quote-text"),author:f.querySelector(".author-name")};if(!s||Date.now()-s.dateStamp>864e5)try{const{author:t,quote:a}=await $();s={author:t,quote:a,dateStamp:Date.now()},localStorage.setItem("DailyQuote",JSON.stringify(s))}catch{c.error({title:"Error",message:"Failed to fetch Daily Quote"}),c.info({title:"Info!",message:"Default quote was setting up!"}),s={author:"EnergyFlow",quote:"Stay active"}}o.text&&o.author&&(o.text.textContent=s.quote,o.author.textContent=s.author)};E();const l={query:"",category:"",searchTarget:"",data:null},d=e=>e?e[0].toUpperCase()+e.slice(1):"",p="/EnergyFlow/assets/sprite-BaYBotVs.svg";n.backdrop.addEventListener("click",e=>{const s=e.target.closest(".close-modal-btn"),o=e.target.closest(".favorite-btn"),i=JSON.parse(localStorage.getItem("Favorites"))||[];if(o){const t=o.dataset.action;if(t==="add"){const a=i.some(({_id:r})=>r===l.data._id);if(a&&a.length!==0){c.warning({title:"Warning",message:"Already exist in your favorite list"});return}i.push(l.data),localStorage.setItem("Favorites",JSON.stringify(i)),c.success({title:"Succes",message:"Succesfully added to your favorite list"})}if(t==="delete"){const a=i.some(({_id:r})=>r===l.data._id);if(a&&a.length!==0){const r=i.filter(({_id:g})=>g!==l.data._id);localStorage.setItem("Favorites",JSON.stringify(r)),c.success({title:"Succes",message:"Succesfully deleted from your favorite list"}),n.backdrop.classList.add("hidden")}}}(s||e.target.classList.contains("backdrop"))&&(n.backdrop.classList.add("hidden"),document.body.classList.remove("noScroll"))});c.settings({zindex:999999,position:"bottomRight"});const I=async(e,s)=>{try{l.data=await L(e);const{name:o,bodyPart:i,target:t,rating:a,equipment:r,popularity:g,burnedCalories:y,description:b,gifUrl:h,_id:v}=l.data,S=String(a.toFixed(1)),x=s==="available"?`
            <button type="button" class="favorite-btn" data-action="add">
              Add to favorites
              <svg>
                <use href="${p}#icon-heart"></use>
              </svg>
            </button>`:`<button type="button" class="favorite-btn" data-action="delete">
              Remove
              <svg>
                <use href="${p}#icon-heart-broken"></use>
              </svg>
            </button>`,q=`
    <div class="modal-window" data-id="${v}">
      <button type="button" class="close-modal-btn">
        <svg>
          <use href="${p}#icon-close"></use>
        </svg>
      </button>

      <div class="gif-wrapper">
        <img
          src=${h}
          alt=${d(o)}
          class="modal-gif"
        />
      </div>
      <div class="text-wrapper">
        <h2 class="modal-title">${d(o)}</h2>
        <p class="modal-rating">
          ${S}
          <svg>
            <use href="${p}#icon-star"></use>
          </svg>
        </p>

        <ul class="stats-list">
          <li class="stats-item">
            Target
            <span>${d(t)}</span>
          </li>
          <li class="stats-item">
            Body Part
            <span>${d(i)}</span>
          </li>
          <li class="stats-item">
            Equipment
            <span>${d(r)}</span>
          </li>
          <li class="stats-item">
            Popularity
            <span>${g}</span>
          </li>
          <li class="stats-item">
            Burned Calories
            <span>${y}/3 min</span>
          </li>
        </ul>

        <p class="modal-description">
        ${b}
        </p>

        <ul class="btns-list">
          <li>
          ${x}
          </li>
          <li>
            <button type="button" class="rating-btn">Give a rating</button>
          </li>
        </ul>
      </div>
    </div>
  `;n.backdrop.innerHTML=q,n.backdrop.classList.remove("hidden"),document.body.classList.add("noScroll")}catch{c.error({title:"Error",message:"Failed to fetch current exercise"}),setTimeout(()=>{n.backdrop.classList.add("hidden")},0)}};export{M as a,k as b,d as c,I as d,l as g,n as r,p as s};
//# sourceMappingURL=modal-BJfMWSnD.js.map
