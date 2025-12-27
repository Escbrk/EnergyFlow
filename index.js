import{r as a,g as i,l as x,a as B,c as f,b as C,s as m,d as M,e as k}from"./assets/modal-BSw2kMJS.js";import{i as p}from"./assets/vendor-CLTxG5yw.js";const g=(e=0,t=0,s=3)=>{const n=Math.floor(s/2);let r=e-n,l=e+n;r<1&&(r=1,l=s),l>t&&(l=t,r=t-s+1),r<1&&(r=1);const d=[];for(let c=r;c<=l;c++)d.push(c);const o=[];//! Left "..."
if(r>1){o.push(1);//! First page
o.push("...");//! Spacer
}//! Main pages
o.push(...d);//! Right "..."
if(l<t){o.push("...");//! Spacer
o.push(t);//! Last page
}const u=o.map(c=>`<li class="pages_list-item">
                <button type="button" class="pages_list-btn">${c}</button>
            </li>`).join("");a.pagination.innerHTML=u,[...document.querySelectorAll(".pages_list-btn")].forEach(c=>{c.textContent.trim()==="..."&&c.classList.add("disabled")})};a.pagination.addEventListener("click",e=>{if(e.target.classList.contains("pages_list-btn")){const t=parseFloat(e.target.textContent);document.querySelector(".exercise-info")?y({category:i.category,query:i.query,currentPage:t,searchTarget:i.searchTarget}):h(i.query,t)}});const L=e=>{[...document.querySelectorAll(".pages_list-btn")].forEach(s=>{const n=parseFloat(s.textContent),r=parseFloat(e);n===r?(s.classList.add("active"),s.disabled=!0):(s.classList.remove("active"),s.disabled=!1)})},h=async(e,t)=>{a.exerciseSearchForm.classList.add("hidden"),a.exerciseList.innerHTML=`<li>${x()}</li>`;try{const{results:s,totalPages:n,page:r}=await B(e,t),l=s.map(({imgUrl:d,name:o,filter:u})=>`
          <li class="exercise-item" style="--img: url(${d})">
            <h3 class="exercise-subtitle">${f(o)}</h3>
            <p class="exercise-name">${u}</p>
          </li>
          `).join("");if(!s.length)throw new Error;a.exerciseList.innerHTML=l,a.categoryContainer.innerHTML="",document.querySelector(".search-input").value="",g(r,n),L(r)}catch({message:s}){a.exerciseList.innerHTML="",p.error({title:"Error",message:`Failet to fetch exercises ${s}`})}},y=async({category:e,query:t,currentPage:s,searchTarget:n})=>{a.exerciseList.innerHTML=`<li>${x()}</li>`;try{const{results:r,totalPages:l,page:d}=await C(e,t,s,n);let o=r.map(({target:c,rating:E,burnedCalories:w,bodyPart:F,time:T,name:$,_id:q})=>{const S=String(E.toFixed(1));return`
            <li class="exercise-info" data-id=${q}>
              <button class="startBtn" type="button">Start
                <svg class="exercise-arrow-icon">
                  <use href="${m}#icon-arrow"></use>
                </svg>
              </button>
              <p class="info-label">Workout</p>
              <span class="info-ranking">${S}
                <svg>
                  <use href="${m}#icon-star"></use>
                </svg>
              </span>
                <div class="info-wrapper">
                  <svg class="exercise-icon">
                    <use href="${m}#icon-man"></use>
                  </svg>
                  <h2 class="info-title">${$}</h2>
                </div>
                  <ul class="info-list">
                    <li class="info-item">Burned calories: <span>${w} / ${T} min</span></li>
                    <li class="info-item">Body part: <span>${f(F)}</span></li>
                    <li class="info-item">Target: <span>${f(c)}</span></li>
                  </ul>
            </li>
    `}).join("");a.categoryContainer.innerHTML=`<span class="exercise-category">${f(i.query)}</span>`;let u;return o.trim()===""?(u=!0,o='<h3 class="unsucces-title">Unfortunately, <span>no results</span> were found. You may want to consider other search options to find the exercise you are looking for. Our range is wide and you have the opportunity to find more options that suit your needs.</h3>'):u=!1,a.exerciseList.innerHTML=o,u?g():g(d,l),L(d),u}catch(r){console.log(r),p.error({title:"Error",message:"Failed to fetch information about exercises"}),a.exerciseList.innerHTML="",a.exerciseSearchForm.style.display="none"}},b=document.querySelector(".filter-list"),v=[...b.querySelectorAll("button[data-filter]")];b.addEventListener("click",e=>{const t=e.target.dataset.filter;i.query=e.target.textContent.trim(),t&&(v.forEach(s=>{s.classList.remove("active"),s.disabled=!1}),e.target.classList.add("active"),e.target.disabled=!0,g(),h(i.query))});h();a.exerciseList.addEventListener("click",async e=>{const t=e.target.closest(".exercise-item");if(t&&(i.query=t.children[0].textContent.toLowerCase(),i.category=t.children[1].textContent,v.forEach(n=>{n.disabled=!1}),g(),await y({category:i.category,query:i.query}),a.exerciseSearchForm.classList.remove("hidden")),e.target.closest(".startBtn")){const n=e.target.closest(".exercise-info").dataset.id,r=e.currentTarget.dataset.type;await M(n,r),a.backdrop.classList.remove("hidden"),document.body.classList.add("noScroll")}});a.exerciseSearchForm.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(a.exerciseSearchForm);i.searchTarget=Object.fromEntries(t).search.toLowerCase(),g(),await y({category:i.category,query:i.query,searchTarget:i.searchTarget})||a.exerciseSearchForm.reset()});a.footerForm.addEventListener("submit",async e=>{e.preventDefault();const t=e.currentTarget,s=new FormData(t),n=Object.fromEntries(s);try{const r=await k(n);p.success({title:"Succes",message:r.data.message}),t.reset()}catch(r){p.error({title:"Error",message:r.response.data.message})}});
//# sourceMappingURL=index.js.map
