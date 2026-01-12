import{a as h,i as m}from"./vendor-CLTxG5yw.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function a(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(t){if(t.ep)return;t.ep=!0;const r=a(t);fetch(t.href,r)}})();const i={mobileMenu:document.querySelector(".mobile-menu"),mobileMenuBtn:document.querySelector(".mobile-menu-btn"),closeMobileMenuBtn:document.querySelector(".close-btn"),exerciseList:document.querySelector(".exercise-list"),categoryContainer:document.querySelector(".category-container"),exerciseSearchForm:document.querySelector(".exercise-search-form"),backdrop:document.querySelector(".backdrop"),pagination:document.querySelector(".pagination"),favList:document.querySelector(".fav-list"),emptyWrapper:document.querySelector(".empty-wrapper"),quoteWrapper:document.querySelector(".quote-wrapper"),footerForm:document.querySelector(".footer-form"),filterList:document.querySelector(".filter-list"),scrollToTop:document.querySelector(".scroll-to-top")},f={query:void 0,category:"",searchTarget:"",data:null,currentPage:location.pathname.split("/").pop()||"index.html"};document.querySelectorAll(".header-menu-link, .mobile-nav-link").forEach(e=>{const s=e.getAttribute("href").split("/").pop();f.currentPage.endsWith(s)&&e.classList.add("active")});i.mobileMenuBtn.addEventListener("click",()=>{i.mobileMenu.classList.remove("hidden"),document.body.classList.add("noScroll")});i.closeMobileMenuBtn.addEventListener("click",()=>{i.mobileMenu.classList.add("hidden"),document.body.classList.remove("noScroll")});h.defaults.baseURL="https://energyflow.b.goit.study/api/";const I=async()=>{const{data:e}=await h.get("quote");return e};let w;const H=async(e="Muscles",s=1)=>{w=window.innerWidth<=767?8:12;const{data:a}=await h.get(`filters?filter=${e}&page=${s}&limit=${w}`);return a},N=async(e,s,a=1,o="")=>{w=window.innerWidth<=1439?8:9;const t=e.includes(" ")?"bodypart":e,{data:r}=await h.get(`exercises?${t.toLowerCase()}=${s}&keyword=${o}&page=${a}&limit=${w}`);return r},O=async e=>{const{data:s}=await h.get(`exercises/${e}`);return s},D=async(e,s)=>await h.patch(`exercises/${e}/rating`,s),U=async e=>await h.post("subscription",e),B=()=>'<span class="loader"></span>',C=()=>'<span class="quote-loader"></span>',T=document.getElementById("quote"),W=async()=>{const e=new Date().toISOString().slice(0,10),s=localStorage.getItem("DailyQuote");let a=s?JSON.parse(s):null;const o={text:T.querySelector(".quote-text"),author:T.querySelector(".author-name")},t=!a||e!==a.date;if(i.quoteWrapper.innerHTML=C(),t)try{const{author:r,quote:n}=await I();a={author:r,quote:n,date:e},localStorage.setItem("DailyQuote",JSON.stringify(a))}catch{m.error({title:"Error",message:"Failed to fetch Daily Quote"}),m.info({title:"Info!",message:"Default quote was setting up!"}),a={author:"EnergyFlow",quote:"Stay active"}}o.text&&o.author&&(i.quoteWrapper.innerHTML=`
    <p class="quote-text">${a.quote}</p>
    <p class="author-name">${a.author}</p>
    `)};W();const u="/EnergyFlow/assets/sprite-CIXSDLkL.svg",b=e=>e?e[0].toUpperCase()+e.slice(1):"",q=(e=0,s=0,a=3)=>{const o=Math.floor(a/2);let t=e-o,r=e+o;t<1&&(t=1,r=a),r>s&&(r=s,t=s-a+1),t<1&&(t=1);const n=[];for(let d=t;d<=r;d++)n.push(d);const c=[];//! Left "..."
if(t>1){c.push(1);//! First page
if(t>2){c.push("...");//! Spacer
}}//! Main pages
c.push(...n);//! Right "..."
if(r<s){c.push("...");//! Spacer
if(r<s-1){c.push(s);//! Last page
}}const p=c.map(d=>`<li class="pages_list-item">
                <button type="button" class="pages_list-btn">${d}</button>
            </li>`).join("");i.pagination.innerHTML=p,[...document.querySelectorAll(".pages_list-btn")].forEach(d=>{d.textContent.trim()==="..."&&d.classList.add("disabled")})},P=e=>{const s=window.innerWidth<=767?8:12,a=JSON.parse(localStorage.getItem("favorites"))||[],o=a.length,t=Math.ceil(o/s),r=(e-1)*s,n=r+s;return q(e,t),a.slice(r,n)},E=e=>{[...document.querySelectorAll(".pages_list-btn")].forEach(a=>{const o=parseFloat(a.textContent),t=parseFloat(e);o===t?(a.classList.add("active"),a.disabled=!0):(a.classList.remove("active"),a.disabled=!1)})},A=async(e,s)=>{i.exerciseSearchForm.classList.add("hidden"),i.exerciseList.innerHTML=`<li>${B()}</li>`;try{const{results:a,totalPages:o,page:t}=await H(e,s),r=a.map(({imgUrl:n,name:c,filter:p})=>`
          <li class="exercise-item" style="--img: url(${n})">
            <h3 class="exercise-subtitle">${b(c)}</h3>
            <p class="exercise-name">${p}</p>
          </li>
          `).join("");if(!a.length)throw new Error;i.exerciseList.innerHTML=r,i.categoryContainer.innerHTML="",document.querySelector(".search-input").value="",q(t,o),E(t)}catch({message:a}){i.exerciseList.innerHTML="",m.error({title:"Error",message:`Failet to fetch exercises ${a}`})}},R=async({category:e,query:s,currentPage:a,searchTarget:o})=>{i.exerciseList.innerHTML=`<li>${B()}</li>`;try{const{results:t,totalPages:r,page:n}=await N(e,s,a,o);let c=t.map(({target:d,rating:v,burnedCalories:S,bodyPart:g,time:y,name:l,_id:x})=>{const F=String(v.toFixed(1));return`
            <li class="exercise-info" data-id=${x}>
              <button class="startBtn" type="button">Start
                <svg class="exercise-arrow-icon">
                  <use href="${u}#icon-arrow"></use>
                </svg>
              </button>
              <p class="info-label">Workout</p>
              <span class="info-ranking">${F}
                <svg>
                  <use href="${u}#icon-star"></use>
                </svg>
              </span>
                <div class="info-wrapper">
                  <svg class="exercise-icon">
                    <use href="${u}#icon-man"></use>
                  </svg>
                  <h2 class="info-title">${l}</h2>
                </div>
                  <ul class="info-list">
                    <li class="info-item">Burned calories: <span>${S} / ${y} min</span></li>
                    <li class="info-item">Body part: <span>${b(g)}</span></li>
                    <li class="info-item">Target: <span>${b(d)}</span></li>
                  </ul>
            </li>
    `}).join("");i.categoryContainer.innerHTML=`<span class="exercise-category">${b(f.query)}</span>`;let p;return c.trim()===""?(p=!0,c='<h3 class="unsucces-title">Unfortunately, <span>no results</span> were found. You may want to consider other search options to find the exercise you are looking for. Our range is wide and you have the opportunity to find more options that suit your needs.</h3>'):p=!1,i.exerciseList.innerHTML=c,p?q():q(n,r),E(n),p}catch(t){console.log(t),m.error({title:"Error",message:"Failed to fetch information about exercises"}),i.exerciseList.innerHTML="",i.exerciseSearchForm.style.display="none"}};let $=1;const M=e=>{const s=e.map(({name:a,bodyPart:o,burnedCalories:t,time:r,target:n,_id:c})=>`
            <li class="exercise-info" data-id=${c}>
              <button class="startBtn" type="button" >Start
                <svg class="exercise-arrow-icon">
                  <use href="${u}#icon-arrow"></use>
                </svg>
              </button>
             <div class="wrapp">
                <p class="info-label">Workout</p>
                 <button type="button" class="deleteBtn">
                    <svg class="info-delete">
                      <use href="${u}#icon-trash"></use>
                    </svg>
                 </button>
             </div>
                <div class="info-wrapper">
                  <svg class="exercise-icon">
                    <use href="${u}#icon-man"></use>
                  </svg>
                  <h2 class="info-title">${a}</h2>
                </div>
                  <ul class="info-list">
                    <li class="info-item">Burned calories: <span>${t} / ${r} min</span></li>
                    <li class="info-item">Body part: <span>${o}</span></li>
                    <li class="info-item">Target: <span>${n}</span></li>
                  </ul>
            </li>
    `).join("");i.favList&&(i.favList.innerHTML=s,i.emptyWrapper.style.display=e.length===0?"flex":"none",E($))};f.currentPage!=="index.html"&&M(P($));i.pagination.addEventListener("click",e=>{if(e.target.classList.contains("pages_list-btn")){const s=parseFloat(e.target.textContent);if(isNaN(s))return;const a=document.querySelector(".exercise-info"),o=document.querySelector(".exercises-section"),t=document.querySelector(".fav-wrapper");o&&(o.scrollIntoView(),a?R({category:f.category,query:f.query,currentPage:s,searchTarget:f.searchTarget}):A(f.query,s)),t&&(t.scrollIntoView(),$=s,M(P($)))}});const J=e=>{const a=JSON.parse(localStorage.getItem("Favorites")).filter(({_id:o})=>o!==e);localStorage.setItem("Favorites",JSON.stringify(a)),m.success({title:"Succes",message:"Succesfully deleted from your favorite list"})},_=e=>`
        <div class="rating-window" data-id=${e}>
          <button type="button" class="close-modal-btn" data-modal-type="rating">
            <svg>
              <use href="${u}#icon-close"></use>
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
                      <use href="${u}#icon-star">1</use>
                    </svg>
                  </label>
                  <label class="rating-star-label">
                  <input type="radio" name="rate" value="2" required class="visually-hidden">
                    <svg class="rating-icon">
                      <use href="${u}#icon-star">1</use>
                    </svg>
                  </label>
                  <label class="rating-star-label">
                  <input type="radio" name="rate" value="3" required class="visually-hidden">
                    <svg class="rating-icon">
                      <use href="${u}#icon-star">1</use>
                    </svg>
                  </label>
                  <label class="rating-star-label">
                  <input type="radio" name="rate" value="4" required class="visually-hidden">
                    <svg class="rating-icon">
                      <use href="${u}#icon-star">1</use>
                    </svg>
                  </label>
                  <label class="rating-star-label">
                  <input type="radio" name="rate" value="5" required class="visually-hidden">
                    <svg class="rating-icon">
                      <use href="${u}#icon-star">1</use>
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
    `,k=()=>{i.backdrop.querySelector(".exercise").classList.remove("hidden"),i.backdrop.querySelector(".rating").innerHTML=""},L=()=>{i.backdrop.classList.add("hidden"),document.body.classList.remove("noScroll"),i.backdrop.querySelector(".exercise").innerHTML="",i.backdrop.querySelector(".rating").innerHTML=""},Q=e=>{if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e))throw new Error("Please enter a valid email address")};i.backdrop.addEventListener("click",async e=>{var p,d,v,S;const s=e.target.closest(".close-modal-btn"),a=e.target.closest(".favorite-btn"),o=e.target.closest(".rating-btn"),t=e.target.closest(".rating-star-label"),r=e.target.closest(".ratingSubmitBtn");let n=(p=e.target.closest(".modal-window"))==null?void 0:p.dataset.id;const c=JSON.parse(localStorage.getItem("favorites"))||[];if(a)switch(a.dataset.action){case"add":if(c.some(({_id:x})=>x===f.data._id)){m.warning({title:"Warning",message:"Already exist in your favorite list"});return}c.push(f.data),localStorage.setItem("favorites",JSON.stringify(c)),m.success({title:"Succes",message:"Succesfully added to your favorite list"});break;case"delete":const l=e.target.closest(".modal-window").dataset.id;J(l),M(),L();break}if(s||e.currentTarget.classList.contains("backdrop")){const g=s==null?void 0:s.dataset.modalType;(g==="rating"||e.target.classList.contains("rating"))&&k(),(g==="exercise"||e.target.classList.contains("exercise"))&&L()}if(o&&(i.backdrop.querySelector(".exercise").classList.add("hidden"),i.backdrop.querySelector(".rating").innerHTML=_(n)),r){r.disabled=!0,n=(d=e.target.closest(".rating-window"))==null?void 0:d.dataset.id,e.preventDefault();const g=e.target.closest(".ratingForm"),y=new FormData(g);y.delete("message");const l=Object.fromEntries(y);l.rate=Number(l.rate);try{Q(l.email),await D(n,l),k(),L(),m.success({title:"Succes",message:"Rating was succesfully updated!"})}catch(x){m.error({title:"Error",message:((S=(v=x.response)==null?void 0:v.data)==null?void 0:S.message)||x.message||"Someting went wrong!"})}finally{r.disabled=!1}}if(t){if(e.target.tagName==="INPUT")return;const g=t.querySelector("input").value;document.querySelector(".rating-count").innerHTML=g;const y=[...document.querySelectorAll(".rating-icon")];y.forEach(l=>l.style.fill="#1b1b1b33");for(let l=0;l<g;l++)y[l].style.fill="#eea10c"}});document.body.addEventListener("keydown",e=>{!i.backdrop.classList.contains("hidden")&&e.code==="Escape"&&(document.querySelector(".rating-window")?k():L())});m.settings({zindex:999999,position:"bottomRight"});const z=async(e,s)=>{try{f.data=await O(e);const{name:a,bodyPart:o,target:t,rating:r,equipment:n,popularity:c,burnedCalories:p,description:d,gifUrl:v,_id:S}=f.data,g=String(r.toFixed(1)),y=s==="available"?`
            <button type="button" class="favorite-btn" data-action="add">
              Add to favorites
              <svg>
                <use href="${u}#icon-heart"></use>
              </svg>
            </button>`:`<button type="button" class="favorite-btn" data-action="delete">
              Remove from
              <svg>
                <use href="${u}#icon-heart"></use>
              </svg>
            </button>`,l=`
    <div class="modal-window" data-id="${S}" >
      <button type="button" class="close-modal-btn" data-modal-type="exercise">
        <svg>
          <use href="${u}#icon-close"></use>
        </svg>
      </button>

      <div class="gif-wrapper">
        <img
          src=${v}
          alt=${b(a)}
          class="modal-gif"
        />
      </div>
      <div class="text-wrapper">
        <h2 class="modal-title">${b(a)}</h2>
        <p class="modal-rating">
          ${g}
          <svg>
            <use href="${u}#icon-star"></use>
          </svg>
        </p>

        <ul class="stats-list">
          <li class="stats-item">
            Target
            <span>${b(t)}</span>
          </li>
          <li class="stats-item">
            Body Part
            <span>${b(o)}</span>
          </li>
          <li class="stats-item">
            Equipment
            <span>${b(n)}</span>
          </li>
          <li class="stats-item">
            Popularity
            <span>${c}</span>
          </li>
          <li class="stats-item">
            Burned Calories
            <span>${p}/3 min</span>
          </li>
        </ul>

        <p class="modal-description">
        ${d}
        </p>

        <ul class="btns-list">
          <li>
          ${y}
          </li>
          <li>
            <button type="button" class="rating-btn">Give a rating</button>
          </li>
        </ul>
      </div>
    </div>
  `;i.backdrop.querySelector(".exercise").innerHTML=l,i.backdrop.classList.remove("hidden"),document.body.classList.add("noScroll")}catch{m.error({title:"Error",message:"Failed to fetch current exercise"}),setTimeout(()=>{i.backdrop.classList.add("hidden")},0)}};export{i as a,R as b,z as c,Q as d,q as e,J as f,f as g,M as h,A as r,U as s};
//# sourceMappingURL=modal-O4ME6c9T.js.map
