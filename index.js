import{a as m,i as $}from"./assets/vendor-CLTxG5yw.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function a(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=a(s);fetch(s.href,i)}})();m.defaults.baseURL="https://energyflow.b.goit.study/api/";const k=async()=>{const{data:t}=await m.get("quote");return t};let y;const M=async(t="Muscles",e=1)=>{y=window.innerWidth<=767?8:12;const{data:a}=await m.get(`filters?filter=${t}&page=${e}&limit=${y}`);return a},O=async(t,e,a=1,r="")=>{y=window.innerWidth<=1439?8:9;const s=t.includes(" ")?"bodypart":t,{data:i}=await m.get(`exercises?${s.toLowerCase()}=${e}&keyword=${r}&page=${a}&limit=${y}`);return i},T=async t=>{const{data:e}=await m.get(`exercises/${t}`);return e},g="/EnergyFlow/assets/sprite-Cr8MNOq0.svg",o={quoteBlock:document.getElementById("quote"),exerciseList:document.querySelector(".exercise-list"),pagination:document.querySelector(".pagination"),filterList:document.querySelector(".filter-list"),categoryContainer:document.querySelector(".category-container"),exerciseSearchForm:document.querySelector(".exercise-search-form"),backdrop:document.querySelector(".backdrop")},D=async()=>{let t=localStorage.getItem("DailyQuote"),e=t?JSON.parse(t):null;const a={text:o.quoteBlock.querySelector(".quote-text"),author:o.quoteBlock.querySelector(".author-name")};if(!e||Date.now()-e.dateStamp>864e5)try{const{author:s,quote:i}=await k();e={author:s,quote:i,dateStamp:Date.now()},localStorage.setItem("DailyQuote",JSON.stringify(e))}catch{$.error({title:"Error",message:"Failed to fetch Daily Quote"}),$.info({title:"Info!",message:"Default quote was setting up!"}),e={author:"EnergyFlow",quote:"Stay active"}}a.text&&a.author&&(a.text.textContent=e.quote,a.author.textContent=e.author)};let p,h,d,b;const S=[...o.filterList.querySelectorAll("button[data-filter]")],u=t=>t?t[0].toUpperCase()+t.slice(1):"",L=async(t,e)=>{const{results:a,totalPages:r,page:s}=await M(t,e);d=a.map(({imgUrl:i,name:c,filter:n})=>`
          <li class="exercise-item" style="--img: url(${i})">
            <h3 class="exercise-subtitle">${u(c)}</h3>
            <p class="exercise-name">${n}</p>
          </li>
          `).join(""),o.exerciseList.innerHTML=d,o.categoryContainer.innerHTML="",o.exerciseSearchForm.classList.add("hidden"),document.querySelector(".search-input").value="",v(s,r),q(s)},v=(t=0,e=0,a=3)=>{const r=Math.floor(a/2);let s=t-r,i=t+r;s<1&&(s=1,i=a),i>e&&(i=e,s=e-a+1),s<1&&(s=1);const c=[];for(let l=s;l<=i;l++)c.push(l);const n=[];//! Left "..."
if(s>1){n.push(1);//! First page
n.push("...");//! Spacer
}//! Main pages
n.push(...c);//! Right "..."
if(i<e){n.push("...");//! Spacer
n.push(e);//! Last page
}const f=n.map(l=>`<li class="pages_list-item">
                <button type="button" class="pages_list-btn">${l}</button>
            </li>`).join("");o.pagination.innerHTML=f,[...document.querySelectorAll(".pages_list-btn")].forEach(l=>{l.textContent.trim()==="..."&&l.classList.add("disabled")})},w=async({category:t,query:e,currentPage:a,searchTarget:r})=>{const{results:s,totalPages:i,page:c}=await O(t,e,a,r);d=s.map(({target:f,rating:l,burnedCalories:x,bodyPart:E,time:B,name:C,_id:F})=>{const P=String(l.toFixed(1));return`
            <li class="exercise-info" data-id=${F}>
              <button class="startBtn" type="button">Start
                <svg class="exercise-arrow-icon">
                  <use href="${g}#icon-arrow"></use>
                </svg>
              </button>
              <p class="info-label">Workout</p>
              <span class="info-ranking">${P}
                <svg>
                  <use href="${g}#icon-star"></use>
                </svg>
              </span>
                <div class="info-wrapper">
                  <svg class="exercise-icon">
                    <use href="${g}#icon-man"></use>
                  </svg>
                  <h2 class="info-title">${C}</h2>
                </div>
                  <ul class="info-list">
                    <li class="info-item">Burned calories: <span>${x} / ${B} min</span></li>
                    <li class="info-item">Body part: <span>${u(E)}</span></li>
                    <li class="info-item">Target: <span>${u(f)}</span></li>
                  </ul>
            </li>
    `}).join(""),o.categoryContainer.innerHTML=`<span class="exercise-category">${u(e)}</span>`;let n;return d.trim()===""?(n=!0,d='<h3 class="unsucces-title">Unfortunately, <span>no results</span> were found. You may want to consider other search options to find the exercise you are looking for. Our range is wide and you have the opportunity to find more options that suit your needs.</h3>'):n=!1,o.exerciseList.innerHTML=d,n?v():v(c,i),q(c),n},I=async t=>{const{name:e,bodyPart:a,target:r,rating:s,equipment:i,popularity:c,burnedCalories:n,description:f,gifUrl:l}=await T(t),x=String(s.toFixed(1));d=`
    <div class="modal-window">
      <button type="button" class="close-modal-btn">
        <svg>
          <use href="${g}#icon-close"></use>
        </svg>
      </button>

      <div class="gif-wrapper">
        <img
          src=${l}
          alt=${u(e)}
          class="modal-gif"
        />
      </div>
      <div class="text-wrapper">
        <h2 class="modal-title">${u(e)}</h2>
        <p class="modal-rating">
          ${x}
          <svg>
            <use href="${g}#icon-star"></use>
          </svg>
        </p>

        <ul class="stats-list">
          <li class="stats-item">
            Target
            <span>${u(r)}</span>
          </li>
          <li class="stats-item">
            Body Part
            <span>${u(a)}</span>
          </li>
          <li class="stats-item">
            Equipment
            <span>${u(i)}</span>
          </li>
          <li class="stats-item">
            Popularity
            <span>${c}</span>
          </li>
          <li class="stats-item">
            Burned Calories
            <span>${n}/3 min</span>
          </li>
        </ul>

        <p class="modal-description">
        ${f}
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
  `,o.backdrop.innerHTML=d},q=t=>{[...document.querySelectorAll(".pages_list-btn")].forEach(a=>{const r=parseFloat(a.textContent),s=parseFloat(t);r===s?(a.classList.add("active"),a.disabled=!0):(a.classList.remove("active"),a.disabled=!1)})};D();L();o.pagination.addEventListener("click",t=>{if(t.target.classList.contains("pages_list-btn")){const e=parseFloat(t.target.textContent);document.querySelector(".exercise-info")?w({category:h,query:p,currentPage:e,searchTarget:b}):L(p,e)}});o.filterList.addEventListener("click",t=>{const e=t.target.dataset.filter;p=t.target.textContent.trim(),e&&(S.forEach(a=>{a.classList.remove("active"),a.disabled=!1}),t.target.classList.add("active"),t.target.disabled=!0,L(p))});o.exerciseList.addEventListener("click",async t=>{const e=t.target.closest(".exercise-item");if(e&&(p=e.children[0].textContent.toLowerCase(),h=e.children[1].textContent,S.forEach(r=>{r.disabled=!1}),await w({category:h,query:p}),o.exerciseSearchForm.classList.remove("hidden")),t.target.closest(".startBtn")){const r=t.target.closest(".exercise-info").dataset.id;await I(r),o.backdrop.classList.remove("hidden")}});o.exerciseSearchForm.addEventListener("submit",async t=>{t.preventDefault();const e=new FormData(o.exerciseSearchForm);b=Object.fromEntries(e).search.toLowerCase(),await w({category:h,query:p,searchTarget:b})||o.exerciseSearchForm.reset()});o.backdrop.addEventListener("click",t=>{t.target.closest(".close-modal-btn")&&o.backdrop.classList.add("hidden")});
//# sourceMappingURL=index.js.map
