import{a as m,i as f}from"./assets/vendor-CLTxG5yw.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function r(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(s){if(s.ep)return;s.ep=!0;const a=r(s);fetch(s.href,a)}})();m.defaults.baseURL="https://energyflow.b.goit.study/api/";const C=async()=>{const{data:t}=await m.get("quote");return t};let y;const k=async(t="Muscles",e=1)=>{y=window.innerWidth<=767?8:12;const{data:r}=await m.get(`filters?filter=${t}&page=${e}&limit=${y}`);return r},T=async(t,e,r=1,o="")=>{y=window.innerWidth<=1439?8:9;const s=t.includes(" ")?"bodypart":t,{data:a}=await m.get(`exercises?${s.toLowerCase()}=${e}&keyword=${o}&page=${r}&limit=${y}`);return a},P=async t=>{const{data:e}=await m.get(`exercises/${t}`);return e},g="/EnergyFlow/assets/sprite-Cr8MNOq0.svg",i={quoteBlock:document.getElementById("quote"),exerciseList:document.querySelector(".exercise-list"),pagination:document.querySelector(".pagination"),filterList:document.querySelector(".filter-list"),categoryContainer:document.querySelector(".category-container"),exerciseSearchForm:document.querySelector(".exercise-search-form"),backdrop:document.querySelector(".backdrop")},M=async()=>{let t=localStorage.getItem("DailyQuote"),e=t?JSON.parse(t):null;const r={text:i.quoteBlock.querySelector(".quote-text"),author:i.quoteBlock.querySelector(".author-name")};if(!e||Date.now()-e.dateStamp>864e5)try{const{author:s,quote:a}=await C();e={author:s,quote:a,dateStamp:Date.now()},localStorage.setItem("DailyQuote",JSON.stringify(e))}catch{f.error({title:"Error",message:"Failed to fetch Daily Quote"}),f.info({title:"Info!",message:"Default quote was setting up!"}),e={author:"EnergyFlow",quote:"Stay active"}}r.text&&r.author&&(r.text.textContent=e.quote,r.author.textContent=e.author)},n={query:"",category:"",searchTarget:""},q=[...i.filterList.querySelectorAll("button[data-filter]")],p=t=>t?t[0].toUpperCase()+t.slice(1):"",v=async(t,e)=>{try{const{results:r,totalPages:o,page:s}=await k(t,e),a=r.map(({imgUrl:l,name:c,filter:d})=>`
          <li class="exercise-item" style="--img: url(${l})">
            <h3 class="exercise-subtitle">${p(c)}</h3>
            <p class="exercise-name">${d}</p>
          </li>
          `).join("");i.exerciseList.innerHTML=a,i.categoryContainer.innerHTML="",i.exerciseSearchForm.classList.add("hidden"),document.querySelector(".search-input").value="",b(s,o),$(s)}catch({message:r}){f.error({title:"Error",message:`Failet to fetch exercisec: ${r}`})}},b=(t=0,e=0,r=3)=>{const o=Math.floor(r/2);let s=t-o,a=t+o;s<1&&(s=1,a=r),a>e&&(a=e,s=e-r+1),s<1&&(s=1);const l=[];for(let u=s;u<=a;u++)l.push(u);const c=[];//! Left "..."
if(s>1){c.push(1);//! First page
c.push("...");//! Spacer
}//! Main pages
c.push(...l);//! Right "..."
if(a<e){c.push("...");//! Spacer
c.push(e);//! Last page
}const d=c.map(u=>`<li class="pages_list-item">
                <button type="button" class="pages_list-btn">${u}</button>
            </li>`).join("");i.pagination.innerHTML=d,[...document.querySelectorAll(".pages_list-btn")].forEach(u=>{u.textContent.trim()==="..."&&u.classList.add("disabled")})},L=async({category:t,query:e,currentPage:r,searchTarget:o})=>{try{const{results:s,totalPages:a,page:l}=await T(t,e,r,o);let c=s.map(({target:u,rating:h,burnedCalories:x,bodyPart:w,time:S,name:E,_id:F})=>{const B=String(h.toFixed(1));return`
            <li class="exercise-info" data-id=${F}>
              <button class="startBtn" type="button">Start
                <svg class="exercise-arrow-icon">
                  <use href="${g}#icon-arrow"></use>
                </svg>
              </button>
              <p class="info-label">Workout</p>
              <span class="info-ranking">${B}
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
                    <li class="info-item">Burned calories: <span>${x} / ${S} min</span></li>
                    <li class="info-item">Body part: <span>${p(w)}</span></li>
                    <li class="info-item">Target: <span>${p(u)}</span></li>
                  </ul>
            </li>
    `}).join("");i.categoryContainer.innerHTML=`<span class="exercise-category">${p(n.query)}</span>`;let d;return c.trim()===""?(d=!0,c='<h3 class="unsucces-title">Unfortunately, <span>no results</span> were found. You may want to consider other search options to find the exercise you are looking for. Our range is wide and you have the opportunity to find more options that suit your needs.</h3>'):d=!1,i.exerciseList.innerHTML=c,d?b():b(l,a),$(l),d}catch{f.error({title:"Error",message:"Failed to fetch information about exercises"})}},O=async t=>{try{const{name:e,bodyPart:r,target:o,rating:s,equipment:a,popularity:l,burnedCalories:c,description:d,gifUrl:u}=await P(t),h=String(s.toFixed(1)),x=`
    <div class="modal-window">
      <button type="button" class="close-modal-btn">
        <svg>
          <use href="${g}#icon-close"></use>
        </svg>
      </button>

      <div class="gif-wrapper">
        <img
          src=${u}
          alt=${p(e)}
          class="modal-gif"
        />
      </div>
      <div class="text-wrapper">
        <h2 class="modal-title">${p(e)}</h2>
        <p class="modal-rating">
          ${h}
          <svg>
            <use href="${g}#icon-star"></use>
          </svg>
        </p>

        <ul class="stats-list">
          <li class="stats-item">
            Target
            <span>${p(o)}</span>
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
  `;i.backdrop.innerHTML=x}catch{f.error({title:"Error",message:"Failed to fetch current exercise"}),setTimeout(()=>{i.backdrop.classList.add("hidden")},0)}},$=t=>{[...document.querySelectorAll(".pages_list-btn")].forEach(r=>{const o=parseFloat(r.textContent),s=parseFloat(t);o===s?(r.classList.add("active"),r.disabled=!0):(r.classList.remove("active"),r.disabled=!1)})};M();v();i.pagination.addEventListener("click",t=>{if(t.target.classList.contains("pages_list-btn")){const e=parseFloat(t.target.textContent);document.querySelector(".exercise-info")?L({category:n.category,query:n.query,currentPage:e,searchTarget:n.searchTarget}):v(n.query,e)}});i.filterList.addEventListener("click",t=>{const e=t.target.dataset.filter;n.query=t.target.textContent.trim(),e&&(q.forEach(r=>{r.classList.remove("active"),r.disabled=!1}),t.target.classList.add("active"),t.target.disabled=!0,v(n.query))});i.exerciseList.addEventListener("click",async t=>{const e=t.target.closest(".exercise-item");if(e&&(n.query=e.children[0].textContent.toLowerCase(),n.category=e.children[1].textContent,q.forEach(o=>{o.disabled=!1}),await L({category:n.category,query:n.query}),i.exerciseSearchForm.classList.remove("hidden")),t.target.closest(".startBtn")){const o=t.target.closest(".exercise-info").dataset.id;await O(o),i.backdrop.classList.remove("hidden")}});i.exerciseSearchForm.addEventListener("submit",async t=>{t.preventDefault();const e=new FormData(i.exerciseSearchForm);n.searchTarget=Object.fromEntries(e).search.toLowerCase(),await L({category:n.category,query:n.query,searchTarget:n.searchTarget})||i.exerciseSearchForm.reset()});i.backdrop.addEventListener("click",t=>{t.target.closest(".close-modal-btn")&&i.backdrop.classList.add("hidden")});
//# sourceMappingURL=index.js.map
