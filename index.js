import{a as m,i as f}from"./assets/vendor-CLTxG5yw.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function r(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(s){if(s.ep)return;s.ep=!0;const a=r(s);fetch(s.href,a)}})();m.defaults.baseURL="https://energyflow.b.goit.study/api/";const B=async()=>{const{data:e}=await m.get("quote");return e};let y;const C=async(e="Muscles",t=1)=>{y=window.innerWidth<=767?8:12;const{data:r}=await m.get(`filters?filter=${e}&page=${t}&limit=${y}`);return r},T=async(e,t,r=1,o="")=>{y=window.innerWidth<=1439?8:9;const s=e.includes(" ")?"bodypart":e,{data:a}=await m.get(`exercises?${s.toLowerCase()}=${t}&keyword=${o}&page=${r}&limit=${y}`);return a},P=async e=>{const{data:t}=await m.get(`exercises/${e}`);return t},g="/EnergyFlow/assets/sprite-Cr8MNOq0.svg",i={quoteBlock:document.getElementById("quote"),exerciseList:document.querySelector(".exercise-list"),pagination:document.querySelector(".pagination"),filterList:document.querySelector(".filter-list"),categoryContainer:document.querySelector(".category-container"),exerciseSearchForm:document.querySelector(".exercise-search-form"),backdrop:document.querySelector(".backdrop")},M=async()=>{let e=localStorage.getItem("DailyQuote"),t=e?JSON.parse(e):null;const r={text:i.quoteBlock.querySelector(".quote-text"),author:i.quoteBlock.querySelector(".author-name")};if(!t||Date.now()-t.dateStamp>864e5)try{const{author:s,quote:a}=await B();t={author:s,quote:a,dateStamp:Date.now()},localStorage.setItem("DailyQuote",JSON.stringify(t))}catch{f.error({title:"Error",message:"Failed to fetch Daily Quote"}),f.info({title:"Info!",message:"Default quote was setting up!"}),t={author:"EnergyFlow",quote:"Stay active"}}r.text&&r.author&&(r.text.textContent=t.quote,r.author.textContent=t.author)},n={query:"",category:"",searchTarget:""},q=[...i.filterList.querySelectorAll("button[data-filter]")],p=e=>e?e[0].toUpperCase()+e.slice(1):"",v=async(e,t)=>{try{const{results:r,totalPages:o,page:s}=await C(e,t),a=r.map(({imgUrl:l,name:c,filter:u})=>`
          <li class="exercise-item" style="--img: url(${l})">
            <h3 class="exercise-subtitle">${p(c)}</h3>
            <p class="exercise-name">${u}</p>
          </li>
          `).join("");i.exerciseList.innerHTML=a,i.categoryContainer.innerHTML="",i.exerciseSearchForm.classList.add("hidden"),document.querySelector(".search-input").value="",x(s,o),w(s)}catch({message:r}){f.error({title:"Error",message:`Failet to fetch exercisec: ${r}`})}},x=(e=0,t=0,r=3)=>{const o=Math.floor(r/2);let s=e-o,a=e+o;s<1&&(s=1,a=r),a>t&&(a=t,s=t-r+1),s<1&&(s=1);const l=[];for(let d=s;d<=a;d++)l.push(d);const c=[];//! Left "..."
if(s>1){c.push(1);//! First page
c.push("...");//! Spacer
}//! Main pages
c.push(...l);//! Right "..."
if(a<t){c.push("...");//! Spacer
c.push(t);//! Last page
}const u=c.map(d=>`<li class="pages_list-item">
                <button type="button" class="pages_list-btn">${d}</button>
            </li>`).join("");i.pagination.innerHTML=u,[...document.querySelectorAll(".pages_list-btn")].forEach(d=>{d.textContent.trim()==="..."&&d.classList.add("disabled")})},L=async({category:e,query:t,currentPage:r,searchTarget:o})=>{try{const{results:s,totalPages:a,page:l}=await T(e,t,r,o);let c=s.map(({target:d,rating:h,burnedCalories:b,bodyPart:$,time:S,name:E,_id:F})=>{const k=String(h.toFixed(1));return`
            <li class="exercise-info" data-id=${F}>
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
                    <li class="info-item">Target: <span>${p(d)}</span></li>
                  </ul>
            </li>
    `}).join("");i.categoryContainer.innerHTML=`<span class="exercise-category">${p(n.query)}</span>`;let u;return c.trim()===""?(u=!0,c='<h3 class="unsucces-title">Unfortunately, <span>no results</span> were found. You may want to consider other search options to find the exercise you are looking for. Our range is wide and you have the opportunity to find more options that suit your needs.</h3>'):u=!1,i.exerciseList.innerHTML=c,u?x():x(l,a),w(l),u}catch{f.error({title:"Error",message:"Failed to fetch information about exercises"})}},O=async e=>{try{const{name:t,bodyPart:r,target:o,rating:s,equipment:a,popularity:l,burnedCalories:c,description:u,gifUrl:d}=await P(e),h=String(s.toFixed(1)),b=`
    <div class="modal-window">
      <button type="button" class="close-modal-btn">
        <svg>
          <use href="${g}#icon-close"></use>
        </svg>
      </button>

      <div class="gif-wrapper">
        <img
          src=${d}
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
        ${u}
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
  `;i.backdrop.innerHTML=b}catch{f.error({title:"Error",message:"Failed to fetch current exercise"}),setTimeout(()=>{i.backdrop.classList.add("hidden")},0)}},w=e=>{[...document.querySelectorAll(".pages_list-btn")].forEach(r=>{const o=parseFloat(r.textContent),s=parseFloat(e);o===s?(r.classList.add("active"),r.disabled=!0):(r.classList.remove("active"),r.disabled=!1)})};M();v();i.pagination.addEventListener("click",e=>{if(e.target.classList.contains("pages_list-btn")){const t=parseFloat(e.target.textContent);document.querySelector(".exercise-info")?L({category:n.category,query:n.query,currentPage:t,searchTarget:n.searchTarget}):v(n.query,t)}});i.filterList.addEventListener("click",e=>{const t=e.target.dataset.filter;n.query=e.target.textContent.trim(),t&&(q.forEach(r=>{r.classList.remove("active"),r.disabled=!1}),e.target.classList.add("active"),e.target.disabled=!0,v(n.query))});i.exerciseList.addEventListener("click",async e=>{const t=e.target.closest(".exercise-item");if(t&&(n.query=t.children[0].textContent.toLowerCase(),n.category=t.children[1].textContent,q.forEach(o=>{o.disabled=!1}),await L({category:n.category,query:n.query}),i.exerciseSearchForm.classList.remove("hidden")),e.target.closest(".startBtn")){const o=e.target.closest(".exercise-info").dataset.id;await O(o),i.backdrop.classList.remove("hidden"),document.body.classList.add("noScroll")}});i.exerciseSearchForm.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(i.exerciseSearchForm);n.searchTarget=Object.fromEntries(t).search.toLowerCase(),await L({category:n.category,query:n.query,searchTarget:n.searchTarget})||i.exerciseSearchForm.reset()});i.backdrop.addEventListener("click",e=>{(e.target.closest(".close-modal-btn")||e.target.classList.contains("backdrop"))&&(i.backdrop.classList.add("hidden"),document.body.classList.remove("noScroll"))});document.body.addEventListener("keydown",e=>{!i.backdrop.classList.contains("hidden")&&e.code==="Escape"&&(i.backdrop.classList.add("hidden"),document.body.classList.remove("noScroll"))});
//# sourceMappingURL=index.js.map
