import{a as p,i as l}from"./vendor-CLTxG5yw.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function a(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(t){if(t.ep)return;t.ep=!0;const r=a(t);fetch(t.href,r)}})();const o={mobileMenu:document.querySelector(".mobile-menu"),mobileMenuBtn:document.querySelector(".mobile-menu-btn"),closeMobileMenuBtn:document.querySelector(".close-btn"),exerciseList:document.querySelector(".exercise-list"),categoryContainer:document.querySelector(".category-container"),exerciseSearchForm:document.querySelector(".exercise-search-form"),backdrop:document.querySelector(".backdrop"),pagination:document.querySelector(".pagination"),favList:document.querySelector(".fav-list"),emptyWrapper:document.querySelector(".empty-wrapper")},q=location.pathname.split("/").pop()||"index.html";document.querySelectorAll(".header-menu-link, .mobile-nav-link").forEach(e=>{const s=e.getAttribute("href").split("/").pop();q.endsWith(s)&&e.classList.add("active")});o.mobileMenuBtn.addEventListener("click",()=>{o.mobileMenu.classList.remove("hidden")});o.closeMobileMenuBtn.addEventListener("click",()=>{o.mobileMenu.classList.add("hidden")});p.defaults.baseURL="https://energyflow.b.goit.study/api/";const $=async()=>{const{data:e}=await p.get("quote");return e};let m;const T=async(e="Muscles",s=1)=>{m=window.innerWidth<=767?8:12;const{data:a}=await p.get(`filters?filter=${e}&page=${s}&limit=${m}`);return a},I=async(e,s,a=1,i="")=>{m=window.innerWidth<=1439?8:9;const t=e.includes(" ")?"bodypart":e,{data:r}=await p.get(`exercises?${t.toLowerCase()}=${s}&keyword=${i}&page=${a}&limit=${m}`);return r},k=async e=>{const{data:s}=await p.get(`exercises/${e}`);return s},b=document.getElementById("quote"),E=async()=>{const e=new Date().toISOString().slice(0,10),s=localStorage.getItem("DailyQuote");let a=s?JSON.parse(s):null;const i={text:b.querySelector(".quote-text"),author:b.querySelector(".author-name")};if(!a||e!==a.date)try{const{author:r,quote:n}=await $();a={author:r,quote:n,date:e},localStorage.setItem("DailyQuote",JSON.stringify(a))}catch{l.error({title:"Error",message:"Failed to fetch Daily Quote"}),l.info({title:"Info!",message:"Default quote was setting up!"}),a={author:"EnergyFlow",quote:"Stay active"}}i.text&&i.author&&(i.text.textContent=a.quote,i.author.textContent=a.author)};E();const g={query:"",category:"",searchTarget:"",data:null},u=e=>e?e[0].toUpperCase()+e.slice(1):"",c="/EnergyFlow/assets/sprite-BaYBotVs.svg",v=()=>{const e=JSON.parse(localStorage.getItem("Favorites"))||[],s=e.map(({name:a,bodyPart:i,burnedCalories:t,time:r,target:n,_id:d})=>`
            <li class="exercise-info" data-id=${d}>
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
                  <h2 class="info-title">${a}</h2>
                </div>
                  <ul class="info-list">
                    <li class="info-item">Burned calories: <span>${t} / ${r} min</span></li>
                    <li class="info-item">Body part: <span>${i}</span></li>
                    <li class="info-item">Target: <span>${n}</span></li>
                  </ul>
            </li>
    `).join("");o.favList&&(o.favList.innerHTML=s,o.emptyWrapper.style.display=e.length===0?"flex":"none")};v();const M=e=>{const a=JSON.parse(localStorage.getItem("Favorites")).filter(({_id:i})=>i!==e);localStorage.setItem("Favorites",JSON.stringify(a)),l.success({title:"Succes",message:"Succesfully deleted from your favorite list"})};o.backdrop.addEventListener("click",e=>{var r;const s=e.target.closest(".close-modal-btn"),a=e.target.closest(".favorite-btn"),i=e.target.closest(".rating-btn"),t=JSON.parse(localStorage.getItem("Favorites"))||[];if(a)switch(a.dataset.action){case"add":const d=t.some(({_id:y})=>y===g.data._id);if(d&&d.length!==0){l.warning({title:"Warning",message:"Already exist in your favorite list"});return}t.push(g.data),localStorage.setItem("Favorites",JSON.stringify(t)),l.success({title:"Succes",message:"Succesfully added to your favorite list"});break;case"delete":const f=e.target.closest(".modal-window").dataset.id;M(f),v(),o.backdrop.classList.add("hidden"),document.body.classList.remove("noScroll");break}if(s||e.currentTarget.classList.contains("backdrop"))switch(s==null?void 0:s.dataset.modalType){case"rating":(r=o.backdrop.querySelector(".exercise"))==null||r.classList.remove("hidden"),o.backdrop.querySelector(".rating").innerHTML="";break;case"exercise":o.backdrop.classList.add("hidden"),o.backdrop.querySelector(".exercise").innerHTML="",document.body.classList.remove("noScroll");break}console.log("e.target:",e.target),console.log("currentTarget:",e.currentTarget),e.target.classList.contains("exercise")&&(o.backdrop.classList.add("hidden"),o.backdrop.querySelector(".exercise").innerHTML="",document.body.classList.remove("noScroll")),i&&(o.backdrop.querySelector(".exercise").classList.add("hidden"),o.backdrop.querySelector(".rating").innerHTML=`
        <div class="rating-window">
          <button type="button" class="close-modal-btn" data-modal-type="rating">
            <svg>
              <use href="${c}#icon-close"></use>
            </svg>
          </button>
          <p>Rating</p>
          <p>0.0 * * * * *</p>

          <form>
            <label for="email"></label>
            <input type="email" name="email" id="email" />

            <label for="message"></label>
            <textarea name="message" id="message"></textarea>

            <button type="submit">Send</button>
          </form>
        </div>
    `)});document.body.addEventListener("keydown",e=>{!o.backdrop.classList.contains("hidden")&&e.code==="Escape"&&(document.querySelector(".rating-window")||(o.backdrop.classList.add("hidden"),document.body.classList.remove("noScroll"),o.backdrop.querySelector(".exercise").innerHTML="",o.backdrop.querySelector(".rating").innerHTML=""))});l.settings({zindex:999999,position:"bottomRight"});const O=async(e,s)=>{try{g.data=await k(e);const{name:a,bodyPart:i,target:t,rating:r,equipment:n,popularity:d,burnedCalories:f,description:y,gifUrl:h,_id:S}=g.data,x=String(r.toFixed(1)),L=s==="available"?`
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
            </button>`,w=`
    <div class="modal-window" data-id="${S}" >
      <button type="button" class="close-modal-btn" data-modal-type="exercise">
        <svg>
          <use href="${c}#icon-close"></use>
        </svg>
      </button>

      <div class="gif-wrapper">
        <img
          src=${h}
          alt=${u(a)}
          class="modal-gif"
        />
      </div>
      <div class="text-wrapper">
        <h2 class="modal-title">${u(a)}</h2>
        <p class="modal-rating">
          ${x}
          <svg>
            <use href="${c}#icon-star"></use>
          </svg>
        </p>

        <ul class="stats-list">
          <li class="stats-item">
            Target
            <span>${u(t)}</span>
          </li>
          <li class="stats-item">
            Body Part
            <span>${u(i)}</span>
          </li>
          <li class="stats-item">
            Equipment
            <span>${u(n)}</span>
          </li>
          <li class="stats-item">
            Popularity
            <span>${d}</span>
          </li>
          <li class="stats-item">
            Burned Calories
            <span>${f}/3 min</span>
          </li>
        </ul>

        <p class="modal-description">
        ${y}
        </p>

        <ul class="btns-list">
          <li>
          ${L}
          </li>
          <li>
            <button type="button" class="rating-btn">Give a rating</button>
          </li>
        </ul>
      </div>
    </div>
  `;o.backdrop.querySelector(".exercise").innerHTML=w,o.backdrop.classList.remove("hidden"),document.body.classList.add("noScroll")}catch{l.error({title:"Error",message:"Failed to fetch current exercise"}),setTimeout(()=>{o.backdrop.classList.add("hidden")},0)}};export{T as a,I as b,u as c,O as d,M as e,v as f,g,o as r,c as s};
//# sourceMappingURL=modal-h5SrWlQF.js.map
