export function swipers() {
  const DEFAULT_DELAY = 5000;
  const heroSlides = document.querySelectorAll(".hero-swiper .swiper-slide");

  const heroSwiper = new Swiper(".hero-swiper", {
    effect: "fade",
    loop: true,
    speed: 800,
    allowTouchMove: false,
    autoplay: { delay: DEFAULT_DELAY, disableOnInteraction: false },

    pagination: {
      el: ".hero-swiper-pagination",
      type: "bullets",
      clickable: true,
      renderBullet(index, className) {
        const { title = "", desc = "" } = heroSlides[index].dataset;
        return `
        <span class="${className}">
          <span class="progress"><span class="progress__line"></span></span>
          <div class="progress__meta">
            <div class="progress__title">${title}</div>
            <div class="progress__desc">${desc}</div>
          </div>
        </span>`;
      },
    },

    on: {
      init(sw) {
        updateTiming(sw);
        controlVideos(sw); // ► запустить / остановить
      },
      slideChange(sw) {
        updateTiming(sw);
        controlVideos(sw);
      },
      slideChangeTransitionEnd(sw) {
        startProgress(sw);
      },
    },
  });

  /* ---------- управление длительностью ---------- */
  function updateTiming(sw) {
    const activeSlide = sw.slides[sw.activeIndex];
    let delay = DEFAULT_DELAY;

    const video = activeSlide.querySelector("video");
    if (video) {
      if (video.readyState >= 1) {
        delay = video.duration * 1000;
      } else {
        video.addEventListener(
          "loadedmetadata",
          () => {
            sw.params.autoplay.delay = video.duration * 1000;
            sw.autoplay.start();
            startProgress(sw);
          },
          { once: true }
        );
      }
    }
    sw.params.autoplay.delay = delay;
  }

  /* ---------- включаем видео только на активном слайде ---------- */
  function controlVideos(sw) {
    sw.slides.forEach((slide, idx) => {
      const vid = slide.querySelector("video");
      if (!vid) return;

      if (idx === sw.activeIndex) {
        vid.currentTime = 0; // начинаем с начала
        vid.play().catch(() => {}); // Safari iOS mute-autoplay OK
      } else {
        vid.pause();
        vid.currentTime = 0; // «чистим» кадр
      }
    });
  }

  /* ---------- прогресс-бар ---------- */
  function startProgress(sw) {
    const bullets = sw.pagination.bullets;
    bullets.forEach((b) => {
      const bar = b.querySelector(".progress__line");
      bar.style.animation = "none";
      void bar.offsetWidth; // reset
    });
    const active = bullets[sw.realIndex].querySelector(".progress__line");
    active.style.animation = `fill ${sw.params.autoplay.delay}ms linear forwards`;
  }

  const catSwiper = new Swiper(".cats-swiper", {
    speed: 800,
    // freeMode: true,

    mousewheel: {
      forceToAxis: true,
    },

    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 6,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 6,
      },
    },

    navigation: {
      prevEl: ".cats-swiper__prev",
      nextEl: ".cats-swiper__next",
    },
  });

  const aboutSwiper = new Swiper(".aboutSwiper", {
    spaceBetween: 15,
    slidesPerView: 3,
    loop: true,
    freeMode: true,
    watchSlidesProgress: true,
    speed: 800,
    autoplay: { delay: DEFAULT_DELAY, disableOnInteraction: false },
    breakpoints: {
      768: {
        slidesPerView: 5,
        spaceBetween: 15,
      },
      1025: {
        slidesPerView: 7,
        spaceBetween: 15,
      },
    },
  });
  const aboutSwiper2 = new Swiper(".aboutSwiper2", {
    spaceBetween: 15,
    loop: true,
    speed: 800,
    autoplay: { delay: DEFAULT_DELAY, disableOnInteraction: false },
    navigation: {
      nextEl: ".gallery-next",
      prevEl: ".gallery-prev",
    },
    thumbs: {
      swiper: aboutSwiper,
    },
  });

  document.querySelectorAll('.productsSwiper').forEach((swiperEl, index) => {
    const paginationEl = swiperEl
      .closest('.products-card')
      .querySelector('.products-pagination');

    new Swiper(swiperEl, {
      pagination: {
        el: paginationEl,
        clickable: true,
      },
    });
  });

  const missionSwiper = new Swiper(".missionSwiper", {
    spaceBetween: 15,
    slidesPerView: 1,
    autoHeight: true,
    freeMode: true,
    watchSlidesProgress: true,
  });
  const missionSwiper2 = new Swiper(".missionSwiper2", {
    spaceBetween: 15,
    autoHeight: true,
    navigation: {
      nextEl: ".mission-next",
      prevEl: ".mission-prev",
    },
    pagination: {
      el: ".mission-pagination",
      type: "fraction",
      renderFraction: function (currentClass, totalClass) {
        return '<span class="' + currentClass + '"></span>' +
              '-' +
              '<span class="' + totalClass + '"></span>';
      },
      formatFractionCurrent: function (number) {
        return number < 10 ? '0' + number : number;
      },
      formatFractionTotal: function (number) {
        return number < 10 ? '0' + number : number;
      }
    },
    thumbs: {
      swiper: missionSwiper,
    },
  });

  document.querySelectorAll('.standardsSwiper').forEach((swiperEl) => {
    const swiperId = swiperEl.dataset.swiperId;

    const nextBTN = document.querySelector(`[data-swiper-next="${swiperId}"]`);
    const prevBTN = document.querySelector(`[data-swiper-prev="${swiperId}"]`);

    const slidesCount = swiperEl.querySelectorAll('.swiper-slide').length;
    const useInitialSlide = slidesCount > 4 ? 2 : slidesCount > 2 ? 1 : 0;

    const standardsSwiper = new Swiper(swiperEl, {
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: false,
      slidesPerView: 1.2,

      navigation: {
        nextEl: nextBTN,
        prevEl: prevBTN,
      },
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 50,
        modifier: 6,
        slideShadows : false,
	    },
      breakpoints: {
        768: {
          slidesPerView: 2.5,
          centeredSlides: true,
          initialSlide: useInitialSlide,
        },
        1025: {
          slidesPerView: 3.33,
          centeredSlides: true,
          initialSlide: useInitialSlide,
        },
      },
    });
  });
};
