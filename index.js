import{a as f,i as m}from"./assets/vendor-CLTxG5yw.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function r(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(s){if(s.ep)return;s.ep=!0;const a=r(s);fetch(s.href,a)}})();f.defaults.baseURL="https://energyflow.b.goit.study/api/";const F=async()=>{const{data:e}=await f.get("quote");return e};let y;const M=async(e="Muscles",t=1)=>{y=window.innerWidth<=767?8:12;const{data:r}=await f.get(`filters?filter=${e}&page=${t}&limit=${y}`);return r},C=async(e,t,r=1,i="")=>{y=window.innerWidth<=1439?8:9;const s=e.includes(" ")?"bodypart":e,{data:a}=await f.get(`exercises?${s.toLowerCase()}=${t}&keyword=${i}&page=${r}&limit=${y}`);return a},T=async e=>{const{data:t}=await f.get(`exercises/${e}`);return console.log(t),t},g="/EnergyFlow/assets/sprite-Cr8MNOq0.svg",o={quoteBlock:document.getElementById("quote"),exerciseList:document.querySelector(".exercise-list"),pagination:document.querySelector(".pagination"),filterList:document.querySelector(".filter-list"),categoryContainer:document.querySelector(".category-container"),exerciseSearchForm:document.querySelector(".exercise-search-form"),backdrop:document.querySelector(".backdrop"),mobileMenu:document.querySelector(".mobile-menu"),mobileMenuBtn:document.querySelector(".mobile-menu-btn"),closeMobileMenuBtn:document.querySelector(".close-btn")},P=async()=>{let e=localStorage.getItem("DailyQuote"),t=e?JSON.parse(e):null;const r={text:o.quoteBlock.querySelector(".quote-text"),author:o.quoteBlock.querySelector(".author-name")};if(!t||Date.now()-t.dateStamp>864e5)try{const{author:s,quote:a}=await F();t={author:s,quote:a,dateStamp:Date.now()},localStorage.setItem("DailyQuote",JSON.stringify(t))}catch{m.error({title:"Error",message:"Failed to fetch Daily Quote"}),m.info({title:"Info!",message:"Default quote was setting up!"}),t={author:"EnergyFlow",quote:"Stay active"}}r.text&&r.author&&(r.text.textContent=t.quote,r.author.textContent=t.author)},n={query:"",category:"",searchTarget:""},q=[...o.filterList.querySelectorAll("button[data-filter]")],p=e=>e?e[0].toUpperCase()+e.slice(1):"",L=async(e,t)=>{try{const{results:r,totalPages:i,page:s}=await M(e,t),a=r.map(({imgUrl:l,name:c,filter:d})=>`
          <li class="exercise-item" style="--img: url(${l})">
            <h3 class="exercise-subtitle">${p(c)}</h3>
            <p class="exercise-name">${d}</p>
          </li>
          `).join("");o.exerciseList.innerHTML=a,o.categoryContainer.innerHTML="",o.exerciseSearchForm.classList.add("hidden"),document.querySelector(".search-input").value="",x(s,i),w(s)}catch({message:r}){m.error({title:"Error",message:`Failet to fetch exercisec: ${r}`})}},x=(e=0,t=0,r=3)=>{const i=Math.floor(r/2);let s=e-i,a=e+i;s<1&&(s=1,a=r),a>t&&(a=t,s=t-r+1),s<1&&(s=1);const l=[];for(let u=s;u<=a;u++)l.push(u);const c=[];//! Left "..."
if(s>1){c.push(1);//! First page
c.push("...");//! Spacer
}//! Main pages
c.push(...l);//! Right "..."
if(a<t){c.push("...");//! Spacer
c.push(t);//! Last page
}const d=c.map(u=>`<li class="pages_list-item">
                <button type="button" class="pages_list-btn">${u}</button>
            </li>`).join("");o.pagination.innerHTML=d,[...document.querySelectorAll(".pages_list-btn")].forEach(u=>{u.textContent.trim()==="..."&&u.classList.add("disabled")})},v=async({category:e,query:t,currentPage:r,searchTarget:i})=>{try{const{results:s,totalPages:a,page:l}=await C(e,t,r,i);let c=s.map(({target:u,rating:h,burnedCalories:b,bodyPart:$,time:S,name:E,_id:B})=>{const k=String(h.toFixed(1));return`
            <li class="exercise-info" data-id=${B}>
              <button class="startBtn" type="button">Start
                <svg class="exercise-arrow-icon">
                  <use href="${g}#icon-arrow"></use>
                </svg>
              </button>
              <p class="info-label">Workout</p>
              <span class="info-ranking">${k}
                <svg>
                  <use href="${g}#icon-star"></use>
                </svg>
              </span>
                <div class="info-wrapper">
                  <svg class="exercise-icon">
                    <use href="${g}#icon-man"></use>
                  </svg>
                  <h2 class="info-title">${E}</h2>
                </div>
                  <ul class="info-list">
                    <li class="info-item">Burned calories: <span>${b} / ${S} min</span></li>
                    <li class="info-item">Body part: <span>${p($)}</span></li>
                    <li class="info-item">Target: <span>${p(u)}</span></li>
                  </ul>
            </li>
    `}).join("");o.categoryContainer.innerHTML=`<span class="exercise-category">${p(n.query)}</span>`;let d;return c.trim()===""?(d=!0,c='<h3 class="unsucces-title">Unfortunately, <span>no results</span> were found. You may want to consider other search options to find the exercise you are looking for. Our range is wide and you have the opportunity to find more options that suit your needs.</h3>'):d=!1,o.exerciseList.innerHTML=c,d?x():x(l,a),w(l),d}catch{m.error({title:"Error",message:"Failed to fetch information about exercises"})}},O=async e=>{try{const{name:t,bodyPart:r,target:i,rating:s,equipment:a,popularity:l,burnedCalories:c,description:d,gifUrl:u}=await T(e),h=String(s.toFixed(1)),b=`
    <div class="modal-window">
      <button type="button" class="close-modal-btn">
        <svg>
          <use href="${g}#icon-close"></use>
        </svg>
      </button>

      <div class="gif-wrapper">
        <img
          src=${u}
          alt=${p(t)}
          class="modal-gif"
        />
      </div>
      <div class="text-wrapper">
        <h2 class="modal-title">${p(t)}</h2>
        <p class="modal-rating">
          ${h}
          <svg>
            <use href="${g}#icon-star"></use>
          </svg>
        </p>

        <ul class="stats-list">
          <li class="stats-item">
            Target
            <span>${p(i)}</span>
          </li>
          <li class="stats-item">
            Body Part
            <span>${p(r)}</span>
          </li>
          <li class="stats-item">
            Equipment
            <span>${p(a)}</span>
          </li>
          <li class="stats-item">
            Popularity
            <span>${l}</span>
          </li>
          <li class="stats-item">
            Burned Calories
            <span>${c}/3 min</span>
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
                <use href="${g}#icon-heart"></use>
              </svg>
            </button>
          </li>
          <li>
            <button type="button" class="rating-btn">Give a rating</button>
          </li>
        </ul>
      </div>
    </div>
  `;o.backdrop.innerHTML=b}catch{m.error({title:"Error",message:"Failed to fetch current exercise"}),setTimeout(()=>{o.backdrop.classList.add("hidden")},0)}},w=e=>{[...document.querySelectorAll(".pages_list-btn")].forEach(r=>{const i=parseFloat(r.textContent),s=parseFloat(e);i===s?(r.classList.add("active"),r.disabled=!0):(r.classList.remove("active"),r.disabled=!1)})};P();L();o.pagination.addEventListener("click",e=>{if(e.target.classList.contains("pages_list-btn")){const t=parseFloat(e.target.textContent);document.querySelector(".exercise-info")?v({category:n.category,query:n.query,currentPage:t,searchTarget:n.searchTarget}):L(n.query,t)}});o.filterList.addEventListener("click",e=>{const t=e.target.dataset.filter;n.query=e.target.textContent.trim(),t&&(q.forEach(r=>{r.classList.remove("active"),r.disabled=!1}),e.target.classList.add("active"),e.target.disabled=!0,L(n.query))});o.exerciseList.addEventListener("click",async e=>{const t=e.target.closest(".exercise-item");if(t&&(n.query=t.children[0].textContent.toLowerCase(),n.category=t.children[1].textContent,q.forEach(i=>{i.disabled=!1}),await v({category:n.category,query:n.query}),o.exerciseSearchForm.classList.remove("hidden")),e.target.closest(".startBtn")){const i=e.target.closest(".exercise-info").dataset.id;await O(i),o.backdrop.classList.remove("hidden"),document.body.classList.add("noScroll")}});o.exerciseSearchForm.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(o.exerciseSearchForm);n.searchTarget=Object.fromEntries(t).search.toLowerCase(),await v({category:n.category,query:n.query,searchTarget:n.searchTarget})||o.exerciseSearchForm.reset()});o.backdrop.addEventListener("click",e=>{(e.target.closest(".close-modal-btn")||e.target.classList.contains("backdrop"))&&(o.backdrop.classList.add("hidden"),document.body.classList.remove("noScroll"))});document.body.addEventListener("keydown",e=>{!o.backdrop.classList.contains("hidden")&&e.code==="Escape"&&(o.backdrop.classList.add("hidden"),document.body.classList.remove("noScroll"))});o.mobileMenuBtn.addEventListener("click",()=>{o.mobileMenu.classList.remove("hidden")});o.closeMobileMenuBtn.addEventListener("click",()=>{o.mobileMenu.classList.add("hidden")});
//# sourceMappingURL=index.js.map
