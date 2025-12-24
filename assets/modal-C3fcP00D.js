import{a as m,i as c}from"./vendor-CLTxG5yw.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function r(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(s){if(s.ep)return;s.ep=!0;const i=r(s);fetch(s.href,i)}})();const t={mobileMenu:document.querySelector(".mobile-menu"),mobileMenuBtn:document.querySelector(".mobile-menu-btn"),closeMobileMenuBtn:document.querySelector(".close-btn"),exerciseList:document.querySelector(".exercise-list"),categoryContainer:document.querySelector(".category-container"),exerciseSearchForm:document.querySelector(".exercise-search-form"),backdrop:document.querySelector(".backdrop"),pagination:document.querySelector(".pagination"),favList:document.querySelector(".fav-list"),emptyWrapper:document.querySelector(".empty-wrapper")},w=location.pathname.split("/").pop()||"index.html";document.querySelectorAll(".header-menu-link, .mobile-nav-link").forEach(e=>{const a=e.getAttribute("href").split("/").pop();w.endsWith(a)&&e.classList.add("active")});t.mobileMenuBtn.addEventListener("click",()=>{t.mobileMenu.classList.remove("hidden")});t.closeMobileMenuBtn.addEventListener("click",()=>{t.mobileMenu.classList.add("hidden")});m.defaults.baseURL="https://energyflow.b.goit.study/api/";const $=async()=>{const{data:e}=await m.get("quote");return e};let h;const I=async(e="Muscles",a=1)=>{h=window.innerWidth<=767?8:12;const{data:r}=await m.get(`filters?filter=${e}&page=${a}&limit=${h}`);return r},O=async(e,a,r=1,o="")=>{h=window.innerWidth<=1439?8:9;const s=e.includes(" ")?"bodypart":e,{data:i}=await m.get(`exercises?${s.toLowerCase()}=${a}&keyword=${o}&page=${r}&limit=${h}`);return i},k=async e=>{const{data:a}=await m.get(`exercises/${e}`);return a},E=async(e,a)=>await m.patch(`exercises/${e}/rating`,a),L=document.getElementById("quote"),B=async()=>{const e=new Date().toISOString().slice(0,10),a=localStorage.getItem("DailyQuote");let r=a?JSON.parse(a):null;const o={text:L.querySelector(".quote-text"),author:L.querySelector(".author-name")};if(!r||e!==r.date)try{const{author:i,quote:n}=await $();r={author:i,quote:n,date:e},localStorage.setItem("DailyQuote",JSON.stringify(r))}catch{c.error({title:"Error",message:"Failed to fetch Daily Quote"}),c.info({title:"Info!",message:"Default quote was setting up!"}),r={author:"EnergyFlow",quote:"Stay active"}}o.text&&o.author&&(o.text.textContent=r.quote,o.author.textContent=r.author)};B();const S={query:"",category:"",searchTarget:"",data:null},y=e=>e?e[0].toUpperCase()+e.slice(1):"",l="/EnergyFlow/assets/sprite-BaYBotVs.svg",x=()=>{const e=JSON.parse(localStorage.getItem("Favorites"))||[],a=e.map(({name:r,bodyPart:o,burnedCalories:s,time:i,target:n,_id:p})=>`
            <li class="exercise-info" data-id=${p}>
              <button class="startBtn" type="button" >Start
                <svg class="exercise-arrow-icon">
                  <use href="${l}#icon-arrow"></use>
                </svg>
              </button>
             <div class="wrapp">
                <p class="info-label">Workout</p>
                 <button type="button" class="deleteBtn">
                    <svg class="info-delete">
                      <use href="${l}#icon-trash"></use>
                    </svg>
                 </button>
             </div>
                <div class="info-wrapper">
                  <svg class="exercise-icon">
                    <use href="${l}#icon-man"></use>
                  </svg>
                  <h2 class="info-title">${r}</h2>
                </div>
                  <ul class="info-list">
                    <li class="info-item">Burned calories: <span>${s} / ${i} min</span></li>
                    <li class="info-item">Body part: <span>${o}</span></li>
                    <li class="info-item">Target: <span>${n}</span></li>
                  </ul>
            </li>
    `).join("");t.favList&&(t.favList.innerHTML=a,t.emptyWrapper.style.display=e.length===0?"flex":"none")};x();const M=e=>{const r=JSON.parse(localStorage.getItem("Favorites")).filter(({_id:o})=>o!==e);localStorage.setItem("Favorites",JSON.stringify(r)),c.success({title:"Succes",message:"Succesfully deleted from your favorite list"})},T=e=>`
        <div class="rating-window" data-id=${e}>
          <button type="button" class="close-modal-btn" data-modal-type="rating">
            <svg>
              <use href="${l}#icon-close"></use>
            </svg>
          </button>
          <p class="rating-title">Rating</p>

          <form class="ratingForm">
            <div class="rating-score">
              <span>0.0</span>

              <div>
                  <label><input type="radio" name="rate" value="1" required></label>
                  <label><input type="radio" name="rate" value="2" required></label>
                  <label><input type="radio" name="rate" value="3" required></label>
                  <label><input type="radio" name="rate" value="4" required></label>
                  <label><input type="radio" name="rate" value="5" required></label>
              </div>
            </div>
            <label for="email"></label>
            <input type="email" name="email" id="email" class="rating-email-input" placeholder="Email" required/>

            <label for="message"></label>
            <textarea name="message" id="message" class="rating-message-input" placeholder="Your comment"></textarea>

            <button type="submit" class="ratingSubmitBtn">Send</button>
          </form>
        </div>
    `;t.backdrop.addEventListener("click",async e=>{var p,f,v;const a=e.target.closest(".close-modal-btn"),r=e.target.closest(".favorite-btn"),o=e.target.closest(".rating-btn"),s=e.target.closest(".ratingSubmitBtn");let i=(p=e.target.closest(".modal-window"))==null?void 0:p.dataset.id;const n=JSON.parse(localStorage.getItem("Favorites"))||[];if(r)switch(r.dataset.action){case"add":if(n.some(({_id:b})=>b===S.data._id)){c.warning({title:"Warning",message:"Already exist in your favorite list"});return}n.push(S.data),localStorage.setItem("Favorites",JSON.stringify(n)),c.success({title:"Succes",message:"Succesfully added to your favorite list"});break;case"delete":const u=e.target.closest(".modal-window").dataset.id;M(u),x(),t.backdrop.classList.add("hidden"),document.body.classList.remove("noScroll");break}if(a||e.currentTarget.classList.contains("backdrop")){const d=a==null?void 0:a.dataset.modalType;(d==="rating"||e.target.classList.contains("rating"))&&((f=t.backdrop.querySelector(".exercise"))==null||f.classList.remove("hidden"),t.backdrop.querySelector(".rating").innerHTML=""),(d==="exercise"||e.target.classList.contains("exercise"))&&(t.backdrop.classList.add("hidden"),t.backdrop.querySelector(".exercise").innerHTML="",document.body.classList.remove("noScroll"))}if(o&&(t.backdrop.querySelector(".exercise").classList.add("hidden"),t.backdrop.querySelector(".rating").innerHTML=T(i)),s){s.disabled=!0,i=(v=e.target.closest(".rating-window"))==null?void 0:v.dataset.id,e.preventDefault();const d=e.target.closest(".ratingForm"),g=new FormData(d);g.delete("message");const u=Object.fromEntries(g);u.rate=Number(u.rate);try{await E(i,u),t.backdrop.classList.add("hidden"),t.backdrop.querySelector(".exercise").classList.remove("hidden"),t.backdrop.querySelector(".rating").innerHTML="",t.backdrop.querySelector(".exercise").innerHTML="",document.body.classList.remove("noScroll"),c.success({title:"Succes",message:"Rating was succesfully updated!"})}catch(b){c.error({title:"Error",message:b.response.data.message})}finally{s.disabled=!1}}});document.body.addEventListener("keydown",e=>{!t.backdrop.classList.contains("hidden")&&e.code==="Escape"&&(document.querySelector(".rating-window")?(t.backdrop.querySelector(".exercise").classList.remove("hidden"),t.backdrop.querySelector(".rating").innerHTML=""):(t.backdrop.classList.add("hidden"),document.body.classList.remove("noScroll"),t.backdrop.querySelector(".exercise").innerHTML="",t.backdrop.querySelector(".rating").innerHTML=""))});c.settings({zindex:999999,position:"bottomRight"});const D=async(e,a)=>{try{S.data=await k(e);const{name:r,bodyPart:o,target:s,rating:i,equipment:n,popularity:p,burnedCalories:f,description:v,gifUrl:d,_id:g}=S.data,u=String(i.toFixed(1)),b=a==="available"?`
            <button type="button" class="favorite-btn" data-action="add">
              Add to favorites
              <svg>
                <use href="${l}#icon-heart"></use>
              </svg>
            </button>`:`<button type="button" class="favorite-btn" data-action="delete">
              Remove
              <svg>
                <use href="${l}#icon-heart-broken"></use>
              </svg>
            </button>`,q=`
    <div class="modal-window" data-id="${g}" >
      <button type="button" class="close-modal-btn" data-modal-type="exercise">
        <svg>
          <use href="${l}#icon-close"></use>
        </svg>
      </button>

      <div class="gif-wrapper">
        <img
          src=${d}
          alt=${y(r)}
          class="modal-gif"
        />
      </div>
      <div class="text-wrapper">
        <h2 class="modal-title">${y(r)}</h2>
        <p class="modal-rating">
          ${u}
          <svg>
            <use href="${l}#icon-star"></use>
          </svg>
        </p>

        <ul class="stats-list">
          <li class="stats-item">
            Target
            <span>${y(s)}</span>
          </li>
          <li class="stats-item">
            Body Part
            <span>${y(o)}</span>
          </li>
          <li class="stats-item">
            Equipment
            <span>${y(n)}</span>
          </li>
          <li class="stats-item">
            Popularity
            <span>${p}</span>
          </li>
          <li class="stats-item">
            Burned Calories
            <span>${f}/3 min</span>
          </li>
        </ul>

        <p class="modal-description">
        ${v}
        </p>

        <ul class="btns-list">
          <li>
          ${b}
          </li>
          <li>
            <button type="button" class="rating-btn">Give a rating</button>
          </li>
        </ul>
      </div>
    </div>
  `;t.backdrop.querySelector(".exercise").innerHTML=q,t.backdrop.classList.remove("hidden"),document.body.classList.add("noScroll")}catch{c.error({title:"Error",message:"Failed to fetch current exercise"}),setTimeout(()=>{t.backdrop.classList.add("hidden")},0)}};export{I as a,O as b,y as c,D as d,M as e,x as f,S as g,t as r,l as s};
//# sourceMappingURL=modal-C3fcP00D.js.map
