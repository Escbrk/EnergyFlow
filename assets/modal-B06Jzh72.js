import{a as m,i as c}from"./vendor-CLTxG5yw.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function s(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(a){if(a.ep)return;a.ep=!0;const r=s(a);fetch(a.href,r)}})();const i={mobileMenu:document.querySelector(".mobile-menu"),mobileMenuBtn:document.querySelector(".mobile-menu-btn"),closeMobileMenuBtn:document.querySelector(".close-btn"),exerciseList:document.querySelector(".exercise-list"),categoryContainer:document.querySelector(".category-container"),exerciseSearchForm:document.querySelector(".exercise-search-form"),backdrop:document.querySelector(".backdrop"),pagination:document.querySelector(".pagination"),favList:document.querySelector(".fav-list"),emptyWrapper:document.querySelector(".empty-wrapper")},k=location.pathname.split("/").pop()||"index.html";document.querySelectorAll(".header-menu-link, .mobile-nav-link").forEach(e=>{const t=e.getAttribute("href").split("/").pop();k.endsWith(t)&&e.classList.add("active")});i.mobileMenuBtn.addEventListener("click",()=>{i.mobileMenu.classList.remove("hidden")});i.closeMobileMenuBtn.addEventListener("click",()=>{i.mobileMenu.classList.add("hidden")});m.defaults.baseURL="https://energyflow.b.goit.study/api/";const E=async()=>{const{data:e}=await m.get("quote");return e};let h;const T=async(e="Muscles",t=1)=>{h=window.innerWidth<=767?8:12;const{data:s}=await m.get(`filters?filter=${e}&page=${t}&limit=${h}`);return s},N=async(e,t,s=1,o="")=>{h=window.innerWidth<=1439?8:9;const a=e.includes(" ")?"bodypart":e,{data:r}=await m.get(`exercises?${a.toLowerCase()}=${t}&keyword=${o}&page=${s}&limit=${h}`);return r},B=async e=>{const{data:t}=await m.get(`exercises/${e}`);return t},M=async(e,t)=>await m.patch(`exercises/${e}/rating`,t),x=document.getElementById("quote"),F=async()=>{const e=new Date().toISOString().slice(0,10),t=localStorage.getItem("DailyQuote");let s=t?JSON.parse(t):null;const o={text:x.querySelector(".quote-text"),author:x.querySelector(".author-name")};if(!s||e!==s.date)try{const{author:r,quote:n}=await E();s={author:r,quote:n,date:e},localStorage.setItem("DailyQuote",JSON.stringify(s))}catch{c.error({title:"Error",message:"Failed to fetch Daily Quote"}),c.info({title:"Info!",message:"Default quote was setting up!"}),s={author:"EnergyFlow",quote:"Stay active"}}o.text&&o.author&&(o.text.textContent=s.quote,o.author.textContent=s.author)};F();const S={query:"",category:"",searchTarget:"",data:null},y=e=>e?e[0].toUpperCase()+e.slice(1):"",l="/EnergyFlow/assets/sprite-BaYBotVs.svg",q=()=>{const e=JSON.parse(localStorage.getItem("Favorites"))||[],t=e.map(({name:s,bodyPart:o,burnedCalories:a,time:r,target:n,_id:p})=>`
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
                  <h2 class="info-title">${s}</h2>
                </div>
                  <ul class="info-list">
                    <li class="info-item">Burned calories: <span>${a} / ${r} min</span></li>
                    <li class="info-item">Body part: <span>${o}</span></li>
                    <li class="info-item">Target: <span>${n}</span></li>
                  </ul>
            </li>
    `).join("");i.favList&&(i.favList.innerHTML=t,i.emptyWrapper.style.display=e.length===0?"flex":"none")};q();const I=e=>{const s=JSON.parse(localStorage.getItem("Favorites")).filter(({_id:o})=>o!==e);localStorage.setItem("Favorites",JSON.stringify(s)),c.success({title:"Succes",message:"Succesfully deleted from your favorite list"})},O=e=>`
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
    `,w=()=>{i.backdrop.querySelector(".exercise").classList.remove("hidden"),i.backdrop.querySelector(".rating").innerHTML=""},v=()=>{i.backdrop.classList.add("hidden"),document.body.classList.remove("noScroll"),i.backdrop.querySelector(".exercise").innerHTML="",i.backdrop.querySelector(".rating").innerHTML=""};i.backdrop.addEventListener("click",async e=>{var p,b;const t=e.target.closest(".close-modal-btn"),s=e.target.closest(".favorite-btn"),o=e.target.closest(".rating-btn"),a=e.target.closest(".ratingSubmitBtn");let r=(p=e.target.closest(".modal-window"))==null?void 0:p.dataset.id;const n=JSON.parse(localStorage.getItem("Favorites"))||[];if(s)switch(s.dataset.action){case"add":if(n.some(({_id:f})=>f===S.data._id)){c.warning({title:"Warning",message:"Already exist in your favorite list"});return}n.push(S.data),localStorage.setItem("Favorites",JSON.stringify(n)),c.success({title:"Succes",message:"Succesfully added to your favorite list"});break;case"delete":const u=e.target.closest(".modal-window").dataset.id;I(u),q(),v();break}if(t||e.currentTarget.classList.contains("backdrop")){const d=t==null?void 0:t.dataset.modalType;(d==="rating"||e.target.classList.contains("rating"))&&w(),(d==="exercise"||e.target.classList.contains("exercise"))&&v()}if(o&&(i.backdrop.querySelector(".exercise").classList.add("hidden"),i.backdrop.querySelector(".rating").innerHTML=O(r)),a){a.disabled=!0,r=(b=e.target.closest(".rating-window"))==null?void 0:b.dataset.id,e.preventDefault();const d=e.target.closest(".ratingForm"),g=new FormData(d);g.delete("message");const u=Object.fromEntries(g);u.rate=Number(u.rate);try{await M(r,u),w(),v(),c.success({title:"Succes",message:"Rating was succesfully updated!"})}catch(f){c.error({title:"Error",message:f.response.data.message})}finally{a.disabled=!1}}});document.body.addEventListener("keydown",e=>{!i.backdrop.classList.contains("hidden")&&e.code==="Escape"&&(document.querySelector(".rating-window")?w():v())});c.settings({zindex:999999,position:"bottomRight"});const P=async(e,t)=>{try{S.data=await B(e);const{name:s,bodyPart:o,target:a,rating:r,equipment:n,popularity:p,burnedCalories:b,description:d,gifUrl:g,_id:u}=S.data,f=String(r.toFixed(1)),$=t==="available"?`
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
          alt=${y(s)}
          class="modal-gif"
        />
      </div>
      <div class="text-wrapper">
        <h2 class="modal-title">${y(s)}</h2>
        <p class="modal-rating">
          ${f}
          <svg>
            <use href="${l}#icon-star"></use>
          </svg>
        </p>

        <ul class="stats-list">
          <li class="stats-item">
            Target
            <span>${y(a)}</span>
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
          ${$}
          </li>
          <li>
            <button type="button" class="rating-btn">Give a rating</button>
          </li>
        </ul>
      </div>
    </div>
  `;i.backdrop.querySelector(".exercise").innerHTML=L,i.backdrop.classList.remove("hidden"),document.body.classList.add("noScroll")}catch{c.error({title:"Error",message:"Failed to fetch current exercise"}),setTimeout(()=>{i.backdrop.classList.add("hidden")},0)}};export{T as a,N as b,y as c,P as d,I as e,q as f,S as g,i as r,l as s};
//# sourceMappingURL=modal-B06Jzh72.js.map
