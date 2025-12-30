import{a as m,i as u}from"./vendor-CLTxG5yw.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function a(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=a(s);fetch(s.href,r)}})();const o={mobileMenu:document.querySelector(".mobile-menu"),mobileMenuBtn:document.querySelector(".mobile-menu-btn"),closeMobileMenuBtn:document.querySelector(".close-btn"),exerciseList:document.querySelector(".exercise-list"),categoryContainer:document.querySelector(".category-container"),exerciseSearchForm:document.querySelector(".exercise-search-form"),backdrop:document.querySelector(".backdrop"),pagination:document.querySelector(".pagination"),favList:document.querySelector(".fav-list"),emptyWrapper:document.querySelector(".empty-wrapper"),quoteWrapper:document.querySelector(".quote-wrapper"),footerForm:document.querySelector(".footer-form")},k=location.pathname.split("/").pop()||"index.html";document.querySelectorAll(".header-menu-link, .mobile-nav-link").forEach(e=>{const t=e.getAttribute("href").split("/").pop();k.endsWith(t)&&e.classList.add("active")});o.mobileMenuBtn.addEventListener("click",()=>{o.mobileMenu.classList.remove("hidden"),document.body.classList.add("noScroll")});o.closeMobileMenuBtn.addEventListener("click",()=>{o.mobileMenu.classList.add("hidden"),document.body.classList.remove("noScroll")});m.defaults.baseURL="https://energyflow.b.goit.study/api/";const E=async()=>{const{data:e}=await m.get("quote");return e};let S;const N=async(e="Muscles",t=1)=>{S=window.innerWidth<=767?8:12;const{data:a}=await m.get(`filters?filter=${e}&page=${t}&limit=${S}`);return a},P=async(e,t,a=1,i="")=>{S=window.innerWidth<=1439?8:9;const s=e.includes(" ")?"bodypart":e,{data:r}=await m.get(`exercises?${s.toLowerCase()}=${t}&keyword=${i}&page=${a}&limit=${S}`);return r},B=async e=>{const{data:t}=await m.get(`exercises/${e}`);return t},M=async(e,t)=>await m.patch(`exercises/${e}/rating`,t),W=async e=>await m.post("subscription",e),H=()=>'<span class="loader"></span>',T=()=>'<span class="quote-loader"></span>',$=document.getElementById("quote"),F=async()=>{const e=new Date().toISOString().slice(0,10),t=localStorage.getItem("DailyQuote");let a=t?JSON.parse(t):null;const i={text:$.querySelector(".quote-text"),author:$.querySelector(".author-name")},s=!a||e!==a.date;if(o.quoteWrapper.innerHTML=T(),s)try{const{author:r,quote:n}=await E();a={author:r,quote:n,date:e},localStorage.setItem("DailyQuote",JSON.stringify(a))}catch{u.error({title:"Error",message:"Failed to fetch Daily Quote"}),u.info({title:"Info!",message:"Default quote was setting up!"}),a={author:"EnergyFlow",quote:"Stay active"}}i.text&&i.author&&(o.quoteWrapper.innerHTML=`
    <p class="quote-text">${a.quote}</p>
    <p class="author-name">${a.author}</p>
    `)};F();const q={query:void 0,category:"",searchTarget:"",data:null},y=e=>e?e[0].toUpperCase()+e.slice(1):"",c="/EnergyFlow/assets/sprite-BaYBotVs.svg",L=()=>{const e=JSON.parse(localStorage.getItem("Favorites"))||[],t=e.map(({name:a,bodyPart:i,burnedCalories:s,time:r,target:n,_id:g})=>`
            <li class="exercise-info" data-id=${g}>
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
                    <li class="info-item">Burned calories: <span>${s} / ${r} min</span></li>
                    <li class="info-item">Body part: <span>${i}</span></li>
                    <li class="info-item">Target: <span>${n}</span></li>
                  </ul>
            </li>
    `).join("");o.favList&&(o.favList.innerHTML=t,o.emptyWrapper.style.display=e.length===0?"flex":"none")};L();const I=e=>{const a=JSON.parse(localStorage.getItem("Favorites")).filter(({_id:i})=>i!==e);localStorage.setItem("Favorites",JSON.stringify(a)),u.success({title:"Succes",message:"Succesfully deleted from your favorite list"})},O=e=>`
        <div class="rating-window" data-id=${e}>
          <button type="button" class="close-modal-btn" data-modal-type="rating">
            <svg>
              <use href="${c}#icon-close"></use>
            </svg>
          </button>
          <p class="rating-title">Rating</p>

          <form class="ratingForm">
            <div class="rating-score">
              <p class="rating-count">0</p>

              <div class="radio-elements">
                  <label class="rating-star-label">
                  <input type="radio" name="rate" value="1" required class="visually-hidden">
                    <svg class="rating-icon">
                      <use href="${c}#icon-star">1</use>
                    </svg>
                  </label>
                  <label class="rating-star-label">
                  <input type="radio" name="rate" value="2" required class="visually-hidden">
                    <svg class="rating-icon">
                      <use href="${c}#icon-star">1</use>
                    </svg>
                  </label>
                  <label class="rating-star-label">
                  <input type="radio" name="rate" value="3" required class="visually-hidden">
                    <svg class="rating-icon">
                      <use href="${c}#icon-star">1</use>
                    </svg>
                  </label>
                  <label class="rating-star-label">
                  <input type="radio" name="rate" value="4" required class="visually-hidden">
                    <svg class="rating-icon">
                      <use href="${c}#icon-star">1</use>
                    </svg>
                  </label>
                  <label class="rating-star-label">
                  <input type="radio" name="rate" value="5" required class="visually-hidden">
                    <svg class="rating-icon">
                      <use href="${c}#icon-star">1</use>
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
    `,w=()=>{o.backdrop.querySelector(".exercise").classList.remove("hidden"),o.backdrop.querySelector(".rating").innerHTML=""},h=()=>{o.backdrop.classList.add("hidden"),document.body.classList.remove("noScroll"),o.backdrop.querySelector(".exercise").innerHTML="",o.backdrop.querySelector(".rating").innerHTML=""};o.backdrop.addEventListener("click",async e=>{var b,v;const t=e.target.closest(".close-modal-btn"),a=e.target.closest(".favorite-btn"),i=e.target.closest(".rating-btn"),s=e.target.closest(".rating-star-label"),r=e.target.closest(".ratingSubmitBtn");let n=(b=e.target.closest(".modal-window"))==null?void 0:b.dataset.id;const g=JSON.parse(localStorage.getItem("Favorites"))||[];if(a)switch(a.dataset.action){case"add":if(g.some(({_id:f})=>f===q.data._id)){u.warning({title:"Warning",message:"Already exist in your favorite list"});return}g.push(q.data),localStorage.setItem("Favorites",JSON.stringify(g)),u.success({title:"Succes",message:"Succesfully added to your favorite list"});break;case"delete":const l=e.target.closest(".modal-window").dataset.id;I(l),L(),h();break}if(t||e.currentTarget.classList.contains("backdrop")){const d=t==null?void 0:t.dataset.modalType;(d==="rating"||e.target.classList.contains("rating"))&&w(),(d==="exercise"||e.target.classList.contains("exercise"))&&h()}if(i&&(o.backdrop.querySelector(".exercise").classList.add("hidden"),o.backdrop.querySelector(".rating").innerHTML=O(n)),r){r.disabled=!0,n=(v=e.target.closest(".rating-window"))==null?void 0:v.dataset.id,e.preventDefault();const d=e.target.closest(".ratingForm"),p=new FormData(d);p.delete("message");const l=Object.fromEntries(p);l.rate=Number(l.rate);try{await M(n,l),w(),h(),u.success({title:"Succes",message:"Rating was succesfully updated!"})}catch(f){u.error({title:"Error",message:f.response.data.message})}finally{r.disabled=!1}}if(s){if(e.target.tagName==="INPUT")return;const d=s.querySelector("input").value;document.querySelector(".rating-count").innerHTML=d;const p=[...document.querySelectorAll(".rating-icon")];p.forEach(l=>l.style.fill="#1b1b1b33");for(let l=0;l<d;l++)p[l].style.fill="#eea10c"}});document.body.addEventListener("keydown",e=>{!o.backdrop.classList.contains("hidden")&&e.code==="Escape"&&(document.querySelector(".rating-window")?w():h())});u.settings({zindex:999999,position:"bottomRight"});const A=async(e,t)=>{try{q.data=await B(e);const{name:a,bodyPart:i,target:s,rating:r,equipment:n,popularity:g,burnedCalories:b,description:v,gifUrl:d,_id:p}=q.data,l=String(r.toFixed(1)),f=t==="available"?`
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
    <div class="modal-window" data-id="${p}" >
      <button type="button" class="close-modal-btn" data-modal-type="exercise">
        <svg>
          <use href="${c}#icon-close"></use>
        </svg>
      </button>

      <div class="gif-wrapper">
        <img
          src=${d}
          alt=${y(a)}
          class="modal-gif"
        />
      </div>
      <div class="text-wrapper">
        <h2 class="modal-title">${y(a)}</h2>
        <p class="modal-rating">
          ${l}
          <svg>
            <use href="${c}#icon-star"></use>
          </svg>
        </p>

        <ul class="stats-list">
          <li class="stats-item">
            Target
            <span>${y(s)}</span>
          </li>
          <li class="stats-item">
            Body Part
            <span>${y(i)}</span>
          </li>
          <li class="stats-item">
            Equipment
            <span>${y(n)}</span>
          </li>
          <li class="stats-item">
            Popularity
            <span>${g}</span>
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
          ${f}
          </li>
          <li>
            <button type="button" class="rating-btn">Give a rating</button>
          </li>
        </ul>
      </div>
    </div>
  `;o.backdrop.querySelector(".exercise").innerHTML=x,o.backdrop.classList.remove("hidden"),document.body.classList.add("noScroll")}catch{u.error({title:"Error",message:"Failed to fetch current exercise"}),setTimeout(()=>{o.backdrop.classList.add("hidden")},0)}};export{N as a,P as b,y as c,A as d,W as e,I as f,q as g,L as h,H as l,o as r,c as s};
//# sourceMappingURL=modal-B_pcS1He.js.map
