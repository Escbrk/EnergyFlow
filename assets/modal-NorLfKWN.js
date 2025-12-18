import{a as d,i as c}from"./vendor-CLTxG5yw.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function o(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerPolicy&&(a.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?a.credentials="include":e.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(e){if(e.ep)return;e.ep=!0;const a=o(e);fetch(e.href,a)}})();const i={mobileMenu:document.querySelector(".mobile-menu"),mobileMenuBtn:document.querySelector(".mobile-menu-btn"),closeMobileMenuBtn:document.querySelector(".close-btn"),exerciseList:document.querySelector(".exercise-list"),categoryContainer:document.querySelector(".category-container"),exerciseSearchForm:document.querySelector(".exercise-search-form"),backdrop:document.querySelector(".backdrop"),pagination:document.querySelector(".pagination"),favList:document.querySelector(".fav-list"),emptyWrapper:document.querySelector(".empty-wrapper")},w=location.pathname.split("/").pop()||"index.html";document.querySelectorAll(".header-menu-link, .mobile-nav-link").forEach(t=>{const s=t.getAttribute("href").split("/").pop();w.endsWith(s)&&t.classList.add("active")});i.mobileMenuBtn.addEventListener("click",()=>{i.mobileMenu.classList.remove("hidden")});i.closeMobileMenuBtn.addEventListener("click",()=>{i.mobileMenu.classList.add("hidden")});d.defaults.baseURL="https://energyflow.b.goit.study/api/";const $=async()=>{const{data:t}=await d.get("quote");return t};let p;const M=async(t="Muscles",s=1)=>{p=window.innerWidth<=767?8:12;const{data:o}=await d.get(`filters?filter=${t}&page=${s}&limit=${p}`);return o},k=async(t,s,o=1,r="")=>{p=window.innerWidth<=1439?8:9;const e=t.includes(" ")?"bodypart":t,{data:a}=await d.get(`exercises?${e.toLowerCase()}=${s}&keyword=${r}&page=${o}&limit=${p}`);return a},L=async t=>{const{data:s}=await d.get(`exercises/${t}`);return s},g=document.getElementById("quote"),E=async()=>{let t=localStorage.getItem("DailyQuote"),s=t?JSON.parse(t):null;const o={text:g.querySelector(".quote-text"),author:g.querySelector(".author-name")};if(!s||Date.now()-s.dateStamp>864e5)try{const{author:e,quote:a}=await $();s={author:e,quote:a,dateStamp:Date.now()},localStorage.setItem("DailyQuote",JSON.stringify(s))}catch{c.error({title:"Error",message:"Failed to fetch Daily Quote"}),c.info({title:"Info!",message:"Default quote was setting up!"}),s={author:"EnergyFlow",quote:"Stay active"}}o.text&&o.author&&(o.text.textContent=s.quote,o.author.textContent=s.author)};E();const m={query:"",category:"",searchTarget:"",data:null},l=t=>t?t[0].toUpperCase()+t.slice(1):"",u="/EnergyFlow/assets/sprite-BaYBotVs.svg";c.settings({zindex:999999,position:"bottomRight"});const I=async(t,s)=>{try{m.data=await L(t);const{name:o,bodyPart:r,target:e,rating:a,equipment:n,popularity:f,burnedCalories:y,description:b,gifUrl:h,_id:v}=m.data,S=String(a.toFixed(1)),x=s==="available"?`
            <button type="button" class="favorite-btn" data-action="add">
              Add to favorites
              <svg>
                <use href="${u}#icon-heart"></use>
              </svg>
            </button>`:`<button type="button" class="favorite-btn" data-action="delete">
              Remove
              <svg>
                <use href="${u}#icon-heart-broken"></use>
              </svg>
            </button>`,q=`
    <div class="modal-window" data-id="${v}">
      <button type="button" class="close-modal-btn">
        <svg>
          <use href="${u}#icon-close"></use>
        </svg>
      </button>

      <div class="gif-wrapper">
        <img
          src=${h}
          alt=${l(o)}
          class="modal-gif"
        />
      </div>
      <div class="text-wrapper">
        <h2 class="modal-title">${l(o)}</h2>
        <p class="modal-rating">
          ${S}
          <svg>
            <use href="${u}#icon-star"></use>
          </svg>
        </p>

        <ul class="stats-list">
          <li class="stats-item">
            Target
            <span>${l(e)}</span>
          </li>
          <li class="stats-item">
            Body Part
            <span>${l(r)}</span>
          </li>
          <li class="stats-item">
            Equipment
            <span>${l(n)}</span>
          </li>
          <li class="stats-item">
            Popularity
            <span>${f}</span>
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
  `;i.backdrop.innerHTML=q,i.backdrop.classList.remove("hidden"),document.body.classList.add("noScroll")}catch(o){console.log(o),c.error({title:"Error",message:"Failed to fetch current exercise"}),setTimeout(()=>{i.backdrop.classList.add("hidden")},0)}};i.backdrop.addEventListener("click",t=>{const s=t.target.closest(".close-modal-btn"),o=t.target.closest(".favorite-btn");if(o){const r=o.dataset.action;if(r==="add"){const e=JSON.parse(localStorage.getItem("Favorites"))||[];if(e.some(({_id:n})=>n===m.data._id)){c.warning({title:"Warning",message:"Already exist in your favorite list"});return}e.push(m.data),localStorage.setItem("Favorites",JSON.stringify(e)),c.success({title:"Succes",message:"Succesfully added to your favorite list"})}r==="delete"&&console.log("delete")}(s||t.target.classList.contains("backdrop"))&&(i.backdrop.classList.add("hidden"),document.body.classList.remove("noScroll"))});export{M as a,k as b,l as c,I as d,m as g,i as r,u as s};
//# sourceMappingURL=modal-NorLfKWN.js.map
