/* ==========================================
   Indiana Dance Floor Rentals
   script.js
========================================== */

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if(window.scrollY > 50){

        header.style.background = "rgba(0,0,0,.92)";
        header.style.boxShadow = "0 8px 25px rgba(0,0,0,.35)";

    }else{

        header.style.background = "rgba(0,0,0,.75)";
        header.style.boxShadow = "none";

    }

});


/* -----------------------------
   Fade In Animation
------------------------------*/

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{threshold:.15});


document.querySelectorAll("section").forEach(section=>{

    section.classList.add("hidden");

    observer.observe(section);

});


/* -----------------------------
   Gallery Lightbox
------------------------------*/

const images=document.querySelectorAll(".gallery img");

images.forEach(image=>{

    image.addEventListener("click",()=>{

        const overlay=document.createElement("div");

        overlay.className="lightbox";

        overlay.innerHTML=
        `
        <img src="${image.src}">
        `;

        overlay.onclick=()=>overlay.remove();

        document.body.appendChild(overlay);

    });

});


/* -----------------------------
   Hero Button Animation
------------------------------*/

const buttons=document.querySelectorAll(".button");

buttons.forEach(button=>{

button.addEventListener("mouseenter",()=>{

button.style.transform="translateY(-4px) scale(1.03)";

});

button.addEventListener("mouseleave",()=>{

button.style.transform="translateY(0) scale(1)";

});

});


/* -----------------------------
   Auto Year
------------------------------*/

const year=document.getElementById("year");

if(year){

year.textContent=new Date().getFullYear();

}
