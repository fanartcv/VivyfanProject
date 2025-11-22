// ====================================
// VIVY: FLUORITE EYE'S SONG - SCRIPT
// ====================================


document.addEventListener("DOMContentLoaded", ()=> {

        // ====================================
        // MOBILE MENU
        // ====================================
        const menuBtn=document.getElementById("menu-btn");
        const navLinks=document.getElementById("nav-links");

        if (menuBtn && navLinks) {
            menuBtn.addEventListener("click", ()=> {
                    const expanded=menuBtn.getAttribute("aria-expanded")==="true";
                    menuBtn.setAttribute("aria-expanded", String( !expanded));
                    navLinks.classList.toggle("active");

                    // Animate hamburger
                    menuBtn.textContent=navLinks.classList.contains("active") ? "✕" : "☰";
                });
        }


        // ====================================
        // SMOOTH SCROLL
        // ====================================
        document.querySelectorAll('a[href^="#"]').forEach((anchor)=> {
                anchor.addEventListener("click", function (e) {
                        const target=document.querySelector(this.getAttribute("href"));
                        if ( !target) return;

                        e.preventDefault();

                        target.scrollIntoView({
                            behavior: "smooth", block: "start"
                        });

                    // Close mobile menu
                    if (navLinks && navLinks.classList.contains("active")) {
                        navLinks.classList.remove("active");

                        if (menuBtn) {
                            menuBtn.setAttribute("aria-expanded", "false");
                            menuBtn.textContent="☰";
                        }
                    }
                });
        });


    // ====================================
    // READ MORE TOGGLE (STORY)
    // ====================================
    const aboutToggle=document.getElementById("aboutToggle");
    const moreText=document.getElementById("moreText");

    if (aboutToggle && moreText) {
        aboutToggle.addEventListener("click", ()=> {
                const expanded=aboutToggle.getAttribute("aria-expanded")==="true";
                aboutToggle.setAttribute("aria-expanded", String( !expanded));
                moreText.hidden=expanded;
                aboutToggle.textContent=expanded ? "Read More" : "Read Less";
            });
    }


    // ====================================
    // TESTIMONIALS SLIDER
    // ====================================
    const testiList=document.querySelector(".testimonial-list");
    const testiCards=document.querySelectorAll(".testimonial-card");
    const prevBtn=document.querySelector(".testi-nav.prev");
    const nextBtn=document.querySelector(".testi-nav.next");
    const dotsWrap=document.querySelector(".testi-dots");

    let currentTesti=0;
    let testiAutoplay=null;
    const totalTesti=testiCards.length || 0;


    // Build dots
    if (dotsWrap && totalTesti > 0) {
        for (let i=0; i < totalTesti; i++) {
            const dot=document.createElement("button");
            dot.type="button";
            dot.className="testi-dot" + (i===0 ? " active" : "");
            dot.dataset.index=String(i);

            dot.setAttribute("aria-label", `View testimony $ {
                    i + 1
                }

                `);

            dot.addEventListener("click", ()=> {
                    goToTesti(i);
                    restartAutoplay();
                });
            dotsWrap.appendChild(dot);
        }
    }


    function updateDots() {
        const dots=document.querySelectorAll(".testi-dot");
        dots.forEach((d, idx)=> d.classList.toggle("active", idx===currentTesti));
    }


    function goToTesti(index) {
        if ( !testiList) return;
        currentTesti=(index + totalTesti) % totalTesti;

        testiList.scrollTo({
            left: currentTesti * testiList.clientWidth,
            behavior: "smooth",
        });
    updateDots();
}


if (prevBtn) {
    prevBtn.addEventListener("click", ()=> {
            goToTesti(currentTesti - 1);
            restartAutoplay();
        });
}

if (nextBtn) {
    nextBtn.addEventListener("click", ()=> {
            goToTesti(currentTesti + 1);
            restartAutoplay();
        });
}


function startAutoplay() {
    if (testiAutoplay) clearInterval(testiAutoplay);

    testiAutoplay=setInterval(()=> {
            goToTesti(currentTesti + 1);
        }

        , 5000);
}

function restartAutoplay() {
    startAutoplay();
}

if (totalTesti > 0) startAutoplay();


// ====================================
// CONTACT FORM
// ====================================
const form=document.getElementById("contact-form");
const status=document.getElementById("form-status");

if (form) {
    form.addEventListener("submit", (e)=> {
            e.preventDefault();
            status.textContent="Transmitting to Archive...";

            const submitBtn=form.querySelector('button[type="submit"]');
            if (submitBtn) submitBtn.disabled=true;

            setTimeout(()=> {
                    status.textContent="✓ Message transmitted successfully.";
                    form.reset();
                    if (submitBtn) submitBtn.disabled=false;
                    setTimeout(()=> (status.textContent=""), 4000);
                }

                , 1500);
        });
}


// ====================================
// SCROLL TO TOP BUTTON
// ====================================
const scrollTopBtn=document.getElementById("scrollTopBtn");

if (scrollTopBtn) {
    window.addEventListener("scroll", ()=> {
            if (window.scrollY > 300) {
                scrollTopBtn.style.display="block";
            }

            else {
                scrollTopBtn.style.display="none";
            }
        });


    scrollTopBtn.addEventListener("click", ()=> {
            window.scrollTo({
                top: 0, behavior: "smooth"
            });
    });
}


// ====================================
// SCROLL REVEAL ANIMATIONS
// ====================================
const revealElements=document.querySelectorAll(".char-card, .music-card, .timeline-item, .story-text, .story-visual"
);

const revealOnScroll=()=> {
    revealElements.forEach((el)=> {
            const rect=el.getBoundingClientRect();
            const isVisible=rect.top < window.innerHeight - 100;

            if (isVisible) {
                el.style.opacity="1";
                el.style.transform="translateY(0)";
            }
        });
}

;

// Initial styles
revealElements.forEach((el)=> {
        el.style.opacity="0";
        el.style.transform="translateY(30px)";
        el.style.transition="opacity 0.6s ease, transform 0.6s ease";
    });

window.addEventListener("scroll", revealOnScroll);
revealOnScroll(); // Run on load


// ====================================
// NAVBAR BACKGROUND ON SCROLL
// ====================================
const header=document.querySelector("header");

window.addEventListener("scroll", ()=> {
        if (window.scrollY > 50) {
            header.style.background="rgba(5, 5, 8, 0.98)";
        }

        else {
            header.style.background="rgba(10, 10, 18, 0.9)";
        }
    });


// ====================================
// CHARACTER CARD HOVER EFFECT
// ====================================
const charCards=document.querySelectorAll(".char-card");

charCards.forEach((card)=> {
        card.addEventListener("mouseenter", ()=> {
                // Add subtle sound effect class or visual feedback
                card.style.borderColor="var(--primary)";
            });

        card.addEventListener("mouseleave", ()=> {
                card.style.borderColor="rgba(0, 212, 255, 0.2)";
            });
    });


// ====================================
// MUSIC CARD WAVE ANIMATION TOGGLE
// ====================================
const musicCards=document.querySelectorAll(".music-card");

musicCards.forEach((card)=> {
        const waves=card.querySelectorAll(".music-waves span");

        card.addEventListener("mouseenter", ()=> {
                waves.forEach((wave)=> {
                        wave.style.animationPlayState="running";
                    });
            });

        card.addEventListener("mouseleave", ()=> {
                // Keep playing for visual appeal
            });
    });


// ====================================
// TYPING EFFECT FOR HERO (Optional)
// ====================================
const heroSubtitle=document.querySelector(".hero-subtitle");

if (heroSubtitle) {
    const originalText=heroSubtitle.textContent;
    heroSubtitle.textContent="";

    let charIndex=0;

    function typeText() {
        if (charIndex < originalText.length) {
            heroSubtitle.textContent +=originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeText, 50);
        }
    }

    // Start typing after hero animation
    setTimeout(typeText, 1500);
}


// ====================================
// PARALLAX BACKGROUND EFFECT
// ====================================
const bgParticles=document.getElementById("particles");

if (bgParticles) {
    window.addEventListener("scroll", ()=> {
            const scrolled=window.scrollY;

            bgParticles.style.transform=`translateY($ {
                    scrolled * 0.3
                }

                px)`;
        });
}


console.log("✨ Vivy: Fluorite Eye's Song - Website Initialized");
console.log("「私は歌でみんなを幸せにする」");
});