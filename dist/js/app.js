import { swipers } from './swipers.js';
import { gsapInit } from './gsapInit.js';
import { gsapProduct } from './gsapProduct.js';
gsapProduct

var header = document.querySelector("header");
var sectionTop = document.querySelector('.section-top');
const body = document.body;

function addPadTop(header, section) {
  let headerHeight = header.offsetHeight;
  section.style.marginTop = `${headerHeight}px`;
}

document.addEventListener("DOMContentLoaded", () => {
  if (sectionTop && header) {
    addPadTop(header, sectionTop)
  }

  function isDesktop() {
    return window.innerWidth >= 1025;
  }

  // Инициализация AOS
  AOS.init({
    duration: 600, // Длительность анимации в миллисекундах
    easing: "ease-in-out", // Тип анимации
    once: false, // Анимация срабатывает только один раз
  });

  //header scroll listener and fucking burger
  if (header) {
    let burger = header.querySelector(".burger");

    burger?.addEventListener("click", function () {
      header.classList.toggle("menu-active");
      body.classList.toggle("menu-active");
    });

    // Проверяем поддержку requestAnimationFrame для кроссбраузерности
    const raf =
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      };

    // Функция для проверки положения скролла
    function checkScroll() {
      if (window.scrollY > 0) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }

    // Обработчик прокрутки
    function onScroll() {
      raf(checkScroll);
    }

    // Добавляем слушатель события скролла
    window.addEventListener("scroll", onScroll);

    // Проверяем начальное положение при загрузке страницы
    checkScroll();

    const headerLinks = document.querySelectorAll(".menu__nav-link");

    headerLinks.forEach((link) => {
      link.addEventListener("click", function () {
        header.classList.remove("menu-active");
        body.classList.remove("menu-active");
      });
    });
  }

  if (document.querySelector("[data-fancybox]")) {
    Fancybox.bind("[data-fancybox]", {
      // Your custom options
    });
  }

  // Находим все поля с телефоном и добавляем маску
  const telInputs = document.querySelectorAll('input[type="tel"]');
  telInputs.forEach((input) => {
    IMask(input, { mask: "+{7} (000) 000-00-00" });
  });

  // TABBY TABS
  const allTabs = document.querySelectorAll("[data-tabs]");

  if (allTabs.length > 0) {
    allTabs.forEach((tabElement) => {
      const selector = `[data-tabs="${tabElement.getAttribute("data-tabs")}"]`;
      const tabs = new Tabby(selector);
    });
  }

  // Swiper 
  swipers();

  // gsap
  
  gsap.registerPlugin(SplitText, ScrollTrigger);

  if (isDesktop()) {
    gsapProduct();
  }
  
  gsapInit();

  // Mission

  const boxes = document.querySelectorAll(".mission__box");
  const buttons = document.querySelectorAll(".mission__button");
  const images = document.querySelectorAll(".mission__img");

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.8, // срабатывает, когда 50% блока видно
  };

  const deactivateAll = () => {
    buttons.forEach(btn => btn.classList.remove("active"));
    images.forEach(img => img.classList.remove("active"));
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const index = Array.from(boxes).indexOf(entry.target);
        if (index !== -1) {
          deactivateAll();
          buttons[index].classList.add("active");
          images[index].classList.add("active");
        }
      }
    });
  }, options);

  boxes.forEach(box => observer.observe(box));

  // Modals

  const modalWrapper = document.querySelector('.modals');

  if(modalWrapper) {
    const modal = modalWrapper.querySelector('.modal');

    const openModal = () => {
      document.body.style.overflow = 'hidden';
      modalWrapper.style.opacity = 1;
      modalWrapper.style.pointerEvents = 'all';
      gsap.fromTo(modal, { x: '100%' }, { x: '0%', duration: 0.5, ease: 'power3.out' });
    };

    const closeModal = () => {
      gsap.to(modal, {
        x: '100%',
        duration: 0.4,
        ease: 'power3.in',
        onComplete: () => {
          document.body.style.overflow = '';
          modal.style.removeProperty('transform');
          modalWrapper.style.opacity = 0;
          modalWrapper.style.pointerEvents = 'none';
        }
      });
    };

    document.querySelectorAll('.management__card').forEach(card => {
      card.addEventListener('click', () => {
        modal.querySelector('.modal__title').textContent = card.dataset.name || '';
        modal.querySelector('.modal__position').textContent = card.dataset.position || '';
        modal.querySelector('.modal__bio').textContent = card.dataset.bio || '';
        modal.querySelector('.modal__edu').textContent = card.dataset.edu || '';

        const competencies = JSON.parse(card.dataset.competencies || '[]');
        const list = modal.querySelector('.modal__competencies');
        list.innerHTML = '';
        competencies.forEach(item => {
          const li = document.createElement('li');
          li.textContent = item;
          list.appendChild(li);
        });

        openModal();
      });
    });

    modalWrapper.addEventListener('click', e => {
      if (e.target === modalWrapper || e.target.classList.contains('modal__close')) {
        closeModal();
      }
    });
  }

  window.addEventListener("resize", () => {
    if (sectionTop && header) {
      addPadTop(header, sectionTop)
    }
  });

  document.addEventListener('tabby', function () {
    // Получаем текущий активный tabpanel
    const activePanel = document.querySelector('.standards__content > [role="tabpanel"]:not([hidden])');

    if (!activePanel) return;

    const swiperEl = activePanel.querySelector('.standardsSwiper');

    if (swiperEl?.swiper) {
      swiperEl.swiper.update();
    }
  });

});