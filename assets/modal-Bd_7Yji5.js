import{a as m,i as c}from"./vendor-CLTxG5yw.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function a(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(s){if(s.ep)return;s.ep=!0;const r=a(s);fetch(s.href,r)}})();const i={mobileMenu:document.querySelector(".mobile-menu"),mobileMenuBtn:document.querySelector(".mobile-menu-btn"),closeMobileMenuBtn:document.querySelector(".close-btn"),exerciseList:document.querySelector(".exercise-list"),categoryContainer:document.querySelector(".category-container"),exerciseSearchForm:document.querySelector(".exercise-search-form"),backdrop:document.querySelector(".backdrop"),pagination:document.querySelector(".pagination"),favList:document.querySelector(".fav-list"),emptyWrapper:document.querySelector(".empty-wrapper")},k=location.pathname.split("/").pop()||"index.html";document.querySelectorAll(".header-menu-link, .mobile-nav-link").forEach(e=>{const t=e.getAttribute("href").split("/").pop();k.endsWith(t)&&e.classList.add("active")});i.mobileMenuBtn.addEventListener("click",()=>{i.mobileMenu.classList.remove("hidden")});i.closeMobileMenuBtn.addEventListener("click",()=>{i.mobileMenu.classList.add("hidden")});m.defaults.baseURL="https://energyflow.b.goit.study/api/";const E=async()=>{const{data:e}=await m.get("quote");return e};let h;const T=async(e="Muscles",t=1)=>{h=window.innerWidth<=767?8:12;const{data:a}=await m.get(`filters?filter=${e}&page=${t}&limit=${h}`);return a},N=async(e,t,a=1,o="")=>{h=window.innerWidth<=1439?8:9;const s=e.includes(" ")?"bodypart":e,{data:r}=await m.get(`exercises?${s.toLowerCase()}=${t}&keyword=${o}&page=${a}&limit=${h}`);return r},B=async e=>{const{data:t}=await m.get(`exercises/${e}`);return t},M=async(e,t)=>await m.patch(`exercises/${e}/rating`,t),x=document.getElementById("quote"),F=async()=>{const e=new Date().toISOString().slice(0,10),t=localStorage.getItem("DailyQuote");let a=t?JSON.parse(t):null;const o={text:x.querySelector(".quote-text"),author:x.querySelector(".author-name")};if(!a||e!==a.date)try{const{author:r,quote:n}=await E();a={author:r,quote:n,date:e},localStorage.setItem("DailyQuote",JSON.stringify(a))}catch{c.error({title:"Error",message:"Failed to fetch Daily Quote"}),c.info({title:"Info!",message:"Default quote was setting up!"}),a={author:"EnergyFlow",quote:"Stay active"}}o.text&&o.author&&(o.text.textContent=a.quote,o.author.textContent=a.author)};F();const S={query:"",category:"",searchTarget:"",data:null},y=e=>e?e[0].toUpperCase()+e.slice(1):"",l="/EnergyFlow/assets/sprite-BaYBotVs.svg",$=()=>{const e=JSON.parse(localStorage.getItem("Favorites"))||[],t=e.map(({name:a,bodyPart:o,burnedCalories:s,time:r,target:n,_id:p})=>`
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
                  <h2 class="info-title">${a}</h2>
                </div>
                  <ul class="info-list">
                    <li class="info-item">Burned calories: <span>${s} / ${r} min</span></li>
                    <li class="info-item">Body part: <span>${o}</span></li>
                    <li class="info-item">Target: <span>${n}</span></li>
                  </ul>
            </li>
    `).join("");i.favList&&(i.favList.innerHTML=t,i.emptyWrapper.style.display=e.length===0?"flex":"none")};$();const I=e=>{const a=JSON.parse(localStorage.getItem("Favorites")).filter(({_id:o})=>o!==e);localStorage.setItem("Favorites",JSON.stringify(a)),c.success({title:"Succes",message:"Succesfully deleted from your favorite list"})},O=e=>`
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

              <div class="radio-elements">
                  <label>
                  <input type="radio" name="rate" value="1" required class="visually-hidden">
                    <svg>
                      <use href="${l}#icon-star">1</use>
                    </svg>
                  </label>
                  <label>
                  <input type="radio" name="rate" value="2" required class="visually-hidden">
                    <svg>
                      <use href="${l}#icon-star">1</use>
                    </svg>
                  </label>
                  <label>
                  <input type="radio" name="rate" value="3" required class="visually-hidden">
                    <svg>
                      <use href="${l}#icon-star">1</use>
                    </svg>
                  </label>
                  <label>
                  <input type="radio" name="rate" value="4" required class="visually-hidden">
                    <svg>
                      <use href="${l}#icon-star">1</use>
                    </svg>
                  </label>
                  <label>
                  <input type="radio" name="rate" value="5" required class="visually-hidden">
                    <svg>
                      <use href="${l}#icon-star">1</use>
                    </svg>
                  </label>
              </div>
            </div>
            <label for="email"></label>
            <input type="email" name="email" id="email" class="rating-email-input" placeholder="Email" required/>

            <label for="message"></label>
            <textarea name="message" id="message" class="rating-message-input" placeholder="Your comment"></textarea>

            <button type="submit" class="ratingSubmitBtn">Send</button>
          </form>
        </div>
    `,w=()=>{i.backdrop.querySelector(".exercise").classList.remove("hidden"),i.backdrop.querySelector(".rating").innerHTML=""},v=()=>{i.backdrop.classList.add("hidden"),document.body.classList.remove("noScroll"),i.backdrop.querySelector(".exercise").innerHTML="",i.backdrop.querySelector(".rating").innerHTML=""};i.backdrop.addEventListener("click",async e=>{var p,b;const t=e.target.closest(".close-modal-btn"),a=e.target.closest(".favorite-btn"),o=e.target.closest(".rating-btn"),s=e.target.closest(".ratingSubmitBtn");let r=(p=e.target.closest(".modal-window"))==null?void 0:p.dataset.id;const n=JSON.parse(localStorage.getItem("Favorites"))||[];if(a)switch(a.dataset.action){case"add":if(n.some(({_id:f})=>f===S.data._id)){c.warning({title:"Warning",message:"Already exist in your favorite list"});return}n.push(S.data),localStorage.setItem("Favorites",JSON.stringify(n)),c.success({title:"Succes",message:"Succesfully added to your favorite list"});break;case"delete":const u=e.target.closest(".modal-window").dataset.id;I(u),$(),v();break}if(t||e.currentTarget.classList.contains("backdrop")){const d=t==null?void 0:t.dataset.modalType;(d==="rating"||e.target.classList.contains("rating"))&&w(),(d==="exercise"||e.target.classList.contains("exercise"))&&v()}if(o&&(i.backdrop.querySelector(".exercise").classList.add("hidden"),i.backdrop.querySelector(".rating").innerHTML=O(r)),s){s.disabled=!0,r=(b=e.target.closest(".rating-window"))==null?void 0:b.dataset.id,e.preventDefault();const d=e.target.closest(".ratingForm"),g=new FormData(d);g.delete("message");const u=Object.fromEntries(g);u.rate=Number(u.rate);try{await M(r,u),w(),v(),c.success({title:"Succes",message:"Rating was succesfully updated!"})}catch(f){c.error({title:"Error",message:f.response.data.message})}finally{s.disabled=!1}}});document.body.addEventListener("keydown",e=>{!i.backdrop.classList.contains("hidden")&&e.code==="Escape"&&(document.querySelector(".rating-window")?w():v())});c.settings({zindex:999999,position:"bottomRight"});const P=async(e,t)=>{try{S.data=await B(e);const{name:a,bodyPart:o,target:s,rating:r,equipment:n,popularity:p,burnedCalories:b,description:d,gifUrl:g,_id:u}=S.data,f=String(r.toFixed(1)),q=t==="available"?`
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
            </button>`,L=`
    <div class="modal-window" data-id="${u}" >
      <button type="button" class="close-modal-btn" data-modal-type="exercise">
        <svg>
          <use href="${l}#icon-close"></use>
        </svg>
      </button>

      <div class="gif-wrapper">
        <img
          src=${g}
          alt=${y(a)}
          class="modal-gif"
        />
      </div>
      <div class="text-wrapper">
        <h2 class="modal-title">${y(a)}</h2>
        <p class="modal-rating">
          ${f}
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
            <span>${b}/3 min</span>
          </li>
        </ul>

        <p class="modal-description">
        ${d}
        </p>

        <ul class="btns-list">
          <li>
          ${q}
          </li>
          <li>
            <button type="button" class="rating-btn">Give a rating</button>
          </li>
        </ul>
      </div>
    </div>
  `;i.backdrop.querySelector(".exercise").innerHTML=L,i.backdrop.classList.remove("hidden"),document.body.classList.add("noScroll")}catch{c.error({title:"Error",message:"Failed to fetch current exercise"}),setTimeout(()=>{i.backdrop.classList.add("hidden")},0)}};export{T as a,N as b,y as c,P as d,I as e,$ as f,S as g,i as r,l as s};
//# sourceMappingURL=modal-Bd_7Yji5.js.map
