/* ======================================================
   Green Day Italia — case study page
   Vanilla JS: header state, reveal on scroll, counter,
   mobile menu, lightbox galleria. Nessuna dipendenza esterna.
   ====================================================== */
(function () {
  "use strict";

  /* ---------- anno corrente nel footer ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- header: stato "scrolled" + progress bar ---------- */
  var header = document.getElementById("siteHeader");
  var progressFill = document.getElementById("progressFill");

  function onScroll() {
    if (header) {
      header.classList.toggle("scrolled", window.scrollY > 12);
    }
    if (progressFill) {
      var doc = document.documentElement;
      var scrollTop = window.scrollY || doc.scrollTop;
      var scrollHeight = (doc.scrollHeight - doc.clientHeight) || 1;
      var pct = Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100));
      progressFill.style.width = pct + "%";
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- menu mobile ---------- */
  var navToggle = document.getElementById("navToggle");
  var mobileMenu = document.getElementById("mobileMenu");

  if (navToggle && mobileMenu) {
    navToggle.addEventListener("click", function () {
      var isOpen = mobileMenu.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    mobileMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mobileMenu.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ---------- contatore numerico animato ---------- */
  var counters = document.querySelectorAll("[data-count]");
  function animateCounter(el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    var duration = 1200;
    var start = null;

    function step(timestamp) {
      if (!start) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    }
    window.requestAnimationFrame(step);
  }

  if ("IntersectionObserver" in window && counters.length) {
    var counterObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach(function (el) { counterObserver.observe(el); });
  } else {
    counters.forEach(function (el) {
      el.textContent = el.getAttribute("data-count");
    });
  }

  /* ---------- lightbox galleria ---------- */
  var galleryItems = Array.prototype.slice.call(document.querySelectorAll(".gallery-item"));
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightboxImg");
  var lightboxCounter = document.getElementById("lightboxCounter");
  var lightboxClose = document.getElementById("lightboxClose");
  var lightboxPrev = document.getElementById("lightboxPrev");
  var lightboxNext = document.getElementById("lightboxNext");
  var currentIndex = 0;

  var images = galleryItems.map(function (item) {
    var img = item.querySelector("img");
    return { src: img.getAttribute("src"), alt: img.getAttribute("alt") || "" };
  });

  function openLightbox(index) {
    if (!lightbox || !images.length) return;
    currentIndex = (index + images.length) % images.length;
    updateLightbox();
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function updateLightbox() {
    var data = images[currentIndex];
    if (!data) return;
    lightboxImg.setAttribute("src", data.src);
    lightboxImg.setAttribute("alt", data.alt);
    if (lightboxCounter) {
      lightboxCounter.textContent = (currentIndex + 1) + " / " + images.length;
    }
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  }

  galleryItems.forEach(function (item, index) {
    item.addEventListener("click", function () { openLightbox(index); });
  });

  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener("click", function () { openLightbox(currentIndex - 1); });
  if (lightboxNext) lightboxNext.addEventListener("click", function () { openLightbox(currentIndex + 1); });

  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener("keydown", function (e) {
    if (!lightbox || !lightbox.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") openLightbox(currentIndex - 1);
    if (e.key === "ArrowRight") openLightbox(currentIndex + 1);
  });
})();
