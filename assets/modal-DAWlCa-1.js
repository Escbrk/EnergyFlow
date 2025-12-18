import{a as u,i as l}from"./vendor-CLTxG5yw.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function o(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(t){if(t.ep)return;t.ep=!0;const a=o(t);fetch(t.href,a)}})();const r={mobileMenu:document.querySelector(".mobile-menu"),mobileMenuBtn:document.querySelector(".mobile-menu-btn"),closeMobileMenuBtn:document.querySelector(".close-btn"),exerciseList:document.querySelector(".exercise-list"),categoryContainer:document.querySelector(".category-container"),exerciseSearchForm:document.querySelector(".exercise-search-form"),backdrop:document.querySelector(".backdrop"),pagination:document.querySelector(".pagination"),favList:document.querySelector(".fav-list"),emptyWrapper:document.querySelector(".empty-wrapper")},L=location.pathname.split("/").pop()||"index.html";document.querySelectorAll(".header-menu-link, .mobile-nav-link").forEach(e=>{const s=e.getAttribute("href").split("/").pop();L.endsWith(s)&&e.classList.add("active")});r.mobileMenuBtn.addEventListener("click",()=>{r.mobileMenu.classList.remove("hidden")});r.closeMobileMenuBtn.addEventListener("click",()=>{r.mobileMenu.classList.add("hidden")});u.defaults.baseURL="https://energyflow.b.goit.study/api/";const q=async()=>{const{data:e}=await u.get("quote");return e};let p;const I=async(e="Muscles",s=1)=>{p=window.innerWidth<=767?8:12;const{data:o}=await u.get(`filters?filter=${e}&page=${s}&limit=${p}`);return o},O=async(e,s,o=1,i="")=>{p=window.innerWidth<=1439?8:9;const t=e.includes(" ")?"bodypart":e,{data:a}=await u.get(`exercises?${t.toLowerCase()}=${s}&keyword=${i}&page=${o}&limit=${p}`);return a},B=async e=>{const{data:s}=await u.get(`exercises/${e}`);return s},g=document.getElementById("quote"),E=async()=>{let e=localStorage.getItem("DailyQuote"),s=e?JSON.parse(e):null;const o={text:g.querySelector(".quote-text"),author:g.querySelector(".author-name")};if(!s||Date.now()-s.dateStamp>864e5)try{const{author:t,quote:a}=await q();s={author:t,quote:a,dateStamp:Date.now()},localStorage.setItem("DailyQuote",JSON.stringify(s))}catch{l.error({title:"Error",message:"Failed to fetch Daily Quote"}),l.info({title:"Info!",message:"Default quote was setting up!"}),s={author:"EnergyFlow",quote:"Stay active"}}o.text&&o.author&&(o.text.textContent=s.quote,o.author.textContent=s.author)};E();const m={query:"",category:"",searchTarget:"",data:null},d=e=>e?e[0].toUpperCase()+e.slice(1):"",c="/EnergyFlow/assets/sprite-BaYBotVs.svg",y=()=>{const e=JSON.parse(localStorage.getItem("Favorites")),s=e.map(({name:o,bodyPart:i,burnedCalories:t,time:a,target:n,_id:f})=>`
            <li class="exercise-info" data-id=${f}>
              <button class="startBtn" type="button" >Start
                <svg class="exercise-arrow-icon">
                  <use href="${c}#icon-arrow"></use>
                </svg>
              </button>
             <div class="wrapp">
                <p class="info-label">Workout</p>
                 <button type="button" class="deleteBtn">
                    <svg class="info-delete">
                      <use href="${c}#icon-trash"></use>
                    </svg>
                 </button>
             </div>
                <div class="info-wrapper">
                  <svg class="exercise-icon">
                    <use href="${c}#icon-man"></use>
                  </svg>
                  <h2 class="info-title">${o}</h2>
                </div>
                  <ul class="info-list">
                    <li class="info-item">Burned calories: <span>${t} / ${a} min</span></li>
                    <li class="info-item">Body part: <span>${i}</span></li>
                    <li class="info-item">Target: <span>${n}</span></li>
                  </ul>
            </li>
    `).join("");r.favList&&(r.favList.innerHTML=s,r.emptyWrapper.style.display=e.length===0?"flex":"none")};y();const k=e=>{const o=JSON.parse(localStorage.getItem("Favorites")).filter(({_id:i})=>i!==e);localStorage.setItem("Favorites",JSON.stringify(o)),l.success({title:"Succes",message:"Succesfully deleted from your favorite list"})};r.backdrop.addEventListener("click",e=>{const s=e.target.closest(".close-modal-btn"),o=e.target.closest(".favorite-btn"),i=JSON.parse(localStorage.getItem("Favorites"))||[];if(o){const t=o.dataset.action;if(t==="add"){const a=i.some(({_id:n})=>n===m.data._id);if(a&&a.length!==0){l.warning({title:"Warning",message:"Already exist in your favorite list"});return}i.push(m.data),localStorage.setItem("Favorites",JSON.stringify(i)),l.success({title:"Succes",message:"Succesfully added to your favorite list"})}if(t==="delete"){const a=e.target.closest(".modal-window").dataset.id;k(a),y(),r.backdrop.classList.add("hidden"),document.body.classList.remove("noScroll")}}(s||e.target.classList.contains("backdrop"))&&(r.backdrop.classList.add("hidden"),document.body.classList.remove("noScroll"))});document.body.addEventListener("keydown",e=>{!r.backdrop.classList.contains("hidden")&&e.code==="Escape"&&(r.backdrop.classList.add("hidden"),document.body.classList.remove("noScroll"))});l.settings({zindex:999999,position:"bottomRight"});const D=async(e,s)=>{try{m.data=await B(e);const{name:o,bodyPart:i,target:t,rating:a,equipment:n,popularity:f,burnedCalories:b,description:v,gifUrl:h,_id:S}=m.data,$=String(a.toFixed(1)),w=s==="available"?`
            <button type="button" class="favorite-btn" data-action="add">
              Add to favorites
              <svg>
                <use href="${c}#icon-heart"></use>
              </svg>
            </button>`:`<button type="button" class="favorite-btn" data-action="delete">
              Remove
              <svg>
                <use href="${c}#icon-heart-broken"></use>
              </svg>
            </button>`,x=`
    <div class="modal-window" data-id="${S}">
      <button type="button" class="close-modal-btn">
        <svg>
          <use href="${c}#icon-close"></use>
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
          ${$}
          <svg>
            <use href="${c}#icon-star"></use>
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
            <span>${d(n)}</span>
          </li>
          <li class="stats-item">
            Popularity
            <span>${f}</span>
          </li>
          <li class="stats-item">
            Burned Calories
            <span>${b}/3 min</span>
          </li>
        </ul>

        <p class="modal-description">
        ${v}
        </p>

        <ul class="btns-list">
          <li>
          ${w}
          </li>
          <li>
            <button type="button" class="rating-btn">Give a rating</button>
          </li>
        </ul>
      </div>
    </div>
  `;r.backdrop.innerHTML=x,r.backdrop.classList.remove("hidden"),document.body.classList.add("noScroll")}catch{l.error({title:"Error",message:"Failed to fetch current exercise"}),setTimeout(()=>{r.backdrop.classList.add("hidden")},0)}};export{I as a,O as b,d as c,D as d,k as e,y as f,m as g,r,c as s};
//# sourceMappingURL=modal-DAWlCa-1.js.map
