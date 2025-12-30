import{r as a,g as n,l as x,a as B,c as f,b as C,s as m,d as M,e as k}from"./assets/modal-B_pcS1He.js";import{i as p}from"./assets/vendor-CLTxG5yw.js";const g=(e=0,s=0,t=3)=>{const i=Math.floor(t/2);let r=e-i,l=e+i;r<1&&(r=1,l=t),l>s&&(l=s,r=s-t+1),r<1&&(r=1);const d=[];for(let c=r;c<=l;c++)d.push(c);const o=[];//! Left "..."
if(r>1){o.push(1);//! First page
o.push("...");//! Spacer
}//! Main pages
o.push(...d);//! Right "..."
if(l<s){o.push("...");//! Spacer
o.push(s);//! Last page
}const u=o.map(c=>`<li class="pages_list-item">
                <button type="button" class="pages_list-btn">${c}</button>
            </li>`).join("");a.pagination.innerHTML=u,[...document.querySelectorAll(".pages_list-btn")].forEach(c=>{c.textContent.trim()==="..."&&c.classList.add("disabled")})};a.pagination.addEventListener("click",e=>{if(e.target.classList.contains("pages_list-btn")){const s=parseFloat(e.target.textContent),t=document.querySelector(".exercise-info"),i=document.querySelector(".exercises-section");i&&i.scrollIntoView(),t?h({category:n.category,query:n.query,currentPage:s,searchTarget:n.searchTarget}):y(n.query,s)}});const L=e=>{[...document.querySelectorAll(".pages_list-btn")].forEach(t=>{const i=parseFloat(t.textContent),r=parseFloat(e);i===r?(t.classList.add("active"),t.disabled=!0):(t.classList.remove("active"),t.disabled=!1)})},y=async(e,s)=>{a.exerciseSearchForm.classList.add("hidden"),a.exerciseList.innerHTML=`<li>${x()}</li>`;try{const{results:t,totalPages:i,page:r}=await B(e,s),l=t.map(({imgUrl:d,name:o,filter:u})=>`
          <li class="exercise-item" style="--img: url(${d})">
            <h3 class="exercise-subtitle">${f(o)}</h3>
            <p class="exercise-name">${u}</p>
          </li>
          `).join("");if(!t.length)throw new Error;a.exerciseList.innerHTML=l,a.categoryContainer.innerHTML="",document.querySelector(".search-input").value="",g(Number(r),i),L(r)}catch({message:t}){a.exerciseList.innerHTML="",p.error({title:"Error",message:`Failet to fetch exercises ${t}`})}},h=async({category:e,query:s,currentPage:t,searchTarget:i})=>{a.exerciseList.innerHTML=`<li>${x()}</li>`;try{const{results:r,totalPages:l,page:d}=await C(e,s,t,i);let o=r.map(({target:c,rating:E,burnedCalories:q,bodyPart:w,time:S,name:F,_id:T})=>{const $=String(E.toFixed(1));return`
            <li class="exercise-info" data-id=${T}>
              <button class="startBtn" type="button">Start
                <svg class="exercise-arrow-icon">
                  <use href="${m}#icon-arrow"></use>
                </svg>
              </button>
              <p class="info-label">Workout</p>
              <span class="info-ranking">${$}
                <svg>
                  <use href="${m}#icon-star"></use>
                </svg>
              </span>
                <div class="info-wrapper">
                  <svg class="exercise-icon">
                    <use href="${m}#icon-man"></use>
                  </svg>
                  <h2 class="info-title">${F}</h2>
                </div>
                  <ul class="info-list">
                    <li class="info-item">Burned calories: <span>${q} / ${S} min</span></li>
                    <li class="info-item">Body part: <span>${f(w)}</span></li>
                    <li class="info-item">Target: <span>${f(c)}</span></li>
                  </ul>
            </li>
    `}).join("");a.categoryContainer.innerHTML=`<span class="exercise-category">${f(n.query)}</span>`;let u;return o.trim()===""?(u=!0,o='<h3 class="unsucces-title">Unfortunately, <span>no results</span> were found. You may want to consider other search options to find the exercise you are looking for. Our range is wide and you have the opportunity to find more options that suit your needs.</h3>'):u=!1,a.exerciseList.innerHTML=o,u?g():g(d,l),L(d),u}catch(r){console.log(r),p.error({title:"Error",message:"Failed to fetch information about exercises"}),a.exerciseList.innerHTML="",a.exerciseSearchForm.style.display="none"}},b=document.querySelector(".filter-list"),v=[...b.querySelectorAll("button[data-filter]")];b.addEventListener("click",e=>{const s=e.target.dataset.filter;n.query=e.target.textContent.trim(),s&&(v.forEach(t=>{t.classList.remove("active"),t.disabled=!1}),e.target.classList.add("active"),e.target.disabled=!0,g(),y(n.query))});y(n.query);a.exerciseList.addEventListener("click",async e=>{const s=e.target.closest(".exercise-item");if(s&&(n.query=s.children[0].textContent.toLowerCase(),n.category=s.children[1].textContent,v.forEach(i=>{i.disabled=!1}),g(),await h({category:n.category,query:n.query}),a.exerciseSearchForm.classList.remove("hidden")),e.target.closest(".startBtn")){const i=e.target.closest(".exercise-info").dataset.id,r=e.currentTarget.dataset.type;await M(i,r),a.backdrop.classList.remove("hidden"),document.body.classList.add("noScroll")}});a.exerciseSearchForm.addEventListener("submit",async e=>{e.preventDefault();const s=new FormData(a.exerciseSearchForm);n.searchTarget=Object.fromEntries(s).search.toLowerCase(),g(),await h({category:n.category,query:n.query,searchTarget:n.searchTarget})||a.exerciseSearchForm.reset()});a.footerForm.addEventListener("submit",async e=>{e.preventDefault();const s=e.currentTarget,t=new FormData(s),i=Object.fromEntries(t);try{const r=await k(i);p.success({title:"Succes",message:r.data.message}),s.reset()}catch(r){p.error({title:"Error",message:r.response.data.message})}});
//# sourceMappingURL=index.js.map
