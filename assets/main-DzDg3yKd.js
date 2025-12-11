const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/render-C0ttoK4m.js","assets/vendor-CLTxG5yw.js","assets/vendor-DnveWo0P.css"])))=>i.map(i=>d[i]);
import{a as d,i as g}from"./vendor-CLTxG5yw.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();const q="modulepreload",E=function(o){return"/EnergyFlow/"+o},h={},x=function(t,s,a){let e=Promise.resolve();if(s&&s.length>0){document.getElementsByTagName("link");const n=document.querySelector("meta[property=csp-nonce]"),i=(n==null?void 0:n.nonce)||(n==null?void 0:n.getAttribute("nonce"));e=Promise.allSettled(s.map(c=>{if(c=E(c),c in h)return;h[c]=!0;const m=c.endsWith(".css"),v=m?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${v}`))return;const l=document.createElement("link");if(l.rel=m?"stylesheet":q,m||(l.as="script"),l.crossOrigin="",l.href=c,i&&l.setAttribute("nonce",i),document.head.appendChild(l),m)return new Promise((w,S)=>{l.addEventListener("load",w),l.addEventListener("error",()=>S(new Error(`Unable to preload CSS for ${c}`)))})}))}function r(n){const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=n,window.dispatchEvent(i),!i.defaultPrevented)throw n}return e.then(n=>{for(const i of n||[])i.status==="rejected"&&r(i.reason);return t().catch(r)})};d.defaults.baseURL="https://energyflow.b.goit.study/api/";const L=async()=>{const{data:o}=await d.get("quote");return o};let f;const O=async(o="Muscles",t=1)=>{f=window.innerWidth<=767?8:12;const{data:s}=await d.get(`filters?filter=${o}&page=${t}&limit=${f}`);return s},B=async(o,t,s=1,a="")=>{f=window.innerWidth<=1439?8:9;const e=o.includes(" ")?"bodypart":o,{data:r}=await d.get(`exercises?${e.toLowerCase()}=${t}&keyword=${a}&page=${s}&limit=${f}`);return r},D=async o=>{const{data:t}=await d.get(`exercises/${o}`);return t},b=document.getElementById("quote"),$=async()=>{let o=localStorage.getItem("DailyQuote"),t=o?JSON.parse(o):null;const s={text:b.querySelector(".quote-text"),author:b.querySelector(".author-name")};if(!t||Date.now()-t.dateStamp>864e5)try{const{author:e,quote:r}=await L();t={author:e,quote:r,dateStamp:Date.now()},localStorage.setItem("DailyQuote",JSON.stringify(t))}catch{g.error({title:"Error",message:"Failed to fetch Daily Quote"}),g.info({title:"Info!",message:"Default quote was setting up!"}),t={author:"EnergyFlow",quote:"Stay active"}}s.text&&s.author&&(s.text.textContent=t.quote,s.author.textContent=t.author)};$();const u={mobileMenu:document.querySelector(".mobile-menu"),mobileMenuBtn:document.querySelector(".mobile-menu-btn"),closeMobileMenuBtn:document.querySelector(".close-btn"),exerciseList:document.querySelector(".exercise-list"),categoryContainer:document.querySelector(".category-container"),exerciseSearchForm:document.querySelector(".exercise-search-form"),backdrop:document.querySelector(".backdrop"),pagination:document.querySelector(".pagination"),favList:document.querySelector(".fav-list")};u.mobileMenuBtn.addEventListener("click",()=>{u.mobileMenu.classList.remove("hidden")});u.closeMobileMenuBtn.addEventListener("click",()=>{u.mobileMenu.classList.add("hidden")});const p="/EnergyFlow/assets/sprite-Cr8MNOq0.svg",P=()=>{const t=JSON.parse(localStorage.getItem("Favorites")).map(({name:s,bodyPart:a,burnedCalories:e,time:r,target:n,_id:i})=>`
            <li class="exercise-info" data-id=${i}>
              <button class="startBtn" type="button">Start
                <svg class="exercise-arrow-icon">
                  <use href="${p}#icon-arrow"></use>
                </svg>
              </button>
             <div class="wrapp">
                <p class="info-label">Workout</p>
                 <button type="button">
                    <svg class="info-delete">
                      <use href="${p}#icon-trash"></use>
                    </svg>
                 </button>
             </div>
                <div class="info-wrapper">
                  <svg class="exercise-icon">
                    <use href="${p}#icon-man"></use>
                  </svg>
                  <h2 class="info-title">${s}</h2>
                </div>
                  <ul class="info-list">
                    <li class="info-item">Burned calories: <span>${e} / ${r} min</span></li>
                    <li class="info-item">Body part: <span>${a}</span></li>
                    <li class="info-item">Target: <span>${n}</span></li>
                  </ul>
            </li>
    `).join("");u.favList.innerHTML=t},y=window.location.pathname;document.querySelectorAll(".header-menu-link, .mobile-nav-link").forEach(o=>{const t=o.getAttribute("href").replace("../","");y.endsWith(t)&&o.classList.add("active"),y.endsWith("index.html")||y.endsWith("/")?x(()=>import("./render-C0ttoK4m.js"),__vite__mapDeps([0,1,2])):localStorage.getItem("Favorites")&&(document.querySelector(".empty-wrapper").innerHTML="",P())});export{O as a,D as b,B as g,u as r,p as s};
//# sourceMappingURL=main-DzDg3yKd.js.map
