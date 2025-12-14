const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/render-BiJeFw3D.js","assets/vendor-CLTxG5yw.js","assets/vendor-DnveWo0P.css"])))=>i.map(i=>d[i]);
import{a as d,i as g}from"./vendor-CLTxG5yw.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();const q="modulepreload",E=function(r){return"/EnergyFlow/"+r},h={},x=function(t,s,a){let e=Promise.resolve();if(s&&s.length>0){document.getElementsByTagName("link");const n=document.querySelector("meta[property=csp-nonce]"),i=(n==null?void 0:n.nonce)||(n==null?void 0:n.getAttribute("nonce"));e=Promise.allSettled(s.map(c=>{if(c=E(c),c in h)return;h[c]=!0;const m=c.endsWith(".css"),v=m?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${v}`))return;const l=document.createElement("link");if(l.rel=m?"stylesheet":q,m||(l.as="script"),l.crossOrigin="",l.href=c,i&&l.setAttribute("nonce",i),document.head.appendChild(l),m)return new Promise((w,S)=>{l.addEventListener("load",w),l.addEventListener("error",()=>S(new Error(`Unable to preload CSS for ${c}`)))})}))}function o(n){const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=n,window.dispatchEvent(i),!i.defaultPrevented)throw n}return e.then(n=>{for(const i of n||[])i.status==="rejected"&&o(i.reason);return t().catch(o)})};d.defaults.baseURL="https://energyflow.b.goit.study/api/";const L=async()=>{const{data:r}=await d.get("quote");return r};let p;const O=async(r="Muscles",t=1)=>{p=window.innerWidth<=767?8:12;const{data:s}=await d.get(`filters?filter=${r}&page=${t}&limit=${p}`);return s},B=async(r,t,s=1,a="")=>{p=window.innerWidth<=1439?8:9;const e=r.includes(" ")?"bodypart":r,{data:o}=await d.get(`exercises?${e.toLowerCase()}=${t}&keyword=${a}&page=${s}&limit=${p}`);return o},D=async r=>{const{data:t}=await d.get(`exercises/${r}`);return t},b=document.getElementById("quote"),$=async()=>{let r=localStorage.getItem("DailyQuote"),t=r?JSON.parse(r):null;const s={text:b.querySelector(".quote-text"),author:b.querySelector(".author-name")};if(!t||Date.now()-t.dateStamp>864e5)try{const{author:e,quote:o}=await L();t={author:e,quote:o,dateStamp:Date.now()},localStorage.setItem("DailyQuote",JSON.stringify(t))}catch{g.error({title:"Error",message:"Failed to fetch Daily Quote"}),g.info({title:"Info!",message:"Default quote was setting up!"}),t={author:"EnergyFlow",quote:"Stay active"}}s.text&&s.author&&(s.text.textContent=t.quote,s.author.textContent=t.author)};$();const u={mobileMenu:document.querySelector(".mobile-menu"),mobileMenuBtn:document.querySelector(".mobile-menu-btn"),closeMobileMenuBtn:document.querySelector(".close-btn"),exerciseList:document.querySelector(".exercise-list"),categoryContainer:document.querySelector(".category-container"),exerciseSearchForm:document.querySelector(".exercise-search-form"),backdrop:document.querySelector(".backdrop"),pagination:document.querySelector(".pagination"),favList:document.querySelector(".fav-list")};u.mobileMenuBtn.addEventListener("click",()=>{u.mobileMenu.classList.remove("hidden")});u.closeMobileMenuBtn.addEventListener("click",()=>{u.mobileMenu.classList.add("hidden")});const y="/EnergyFlow/assets/sprite-Cr8MNOq0.svg",P=()=>{const t=JSON.parse(localStorage.getItem("Favorites")).map(({name:s,bodyPart:a,burnedCalories:e,time:o,target:n,_id:i})=>`
            <li class="exercise-info" data-id=${i}>
              <button class="startBtn" type="button">Start
                <svg class="exercise-arrow-icon">
                  <use href="${y}#icon-arrow"></use>
                </svg>
              </button>
             <div class="wrapp">
                <p class="info-label">Workout</p>
                 <button type="button">
                    <svg class="info-delete">
                      <use href="${y}#icon-trash"></use>
                    </svg>
                 </button>
             </div>
                <div class="info-wrapper">
                  <svg class="exercise-icon">
                    <use href="${y}#icon-man"></use>
                  </svg>
                  <h2 class="info-title">${s}</h2>
                </div>
                  <ul class="info-list">
                    <li class="info-item">Burned calories: <span>${e} / ${o} min</span></li>
                    <li class="info-item">Body part: <span>${a}</span></li>
                    <li class="info-item">Target: <span>${n}</span></li>
                  </ul>
            </li>
    `).join("");u.favList.innerHTML=t},f=window.location.pathname;document.querySelectorAll(".header-menu-link, .mobile-nav-link").forEach(r=>{const t=r.getAttribute("href").replace("../","");console.log(f),f.endsWith(t)&&r.classList.add("active"),f.endsWith("index.html")||f.endsWith("/")?x(()=>import("./render-BiJeFw3D.js"),__vite__mapDeps([0,1,2])):localStorage.getItem("Favorites")&&(document.querySelector(".empty-wrapper").innerHTML="",P())});export{O as a,D as b,B as g,u as r,y as s};
//# sourceMappingURL=main-9DL81nUm.js.map
