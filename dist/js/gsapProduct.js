export function gsapProduct() {
  // попытка 1
  // const tl = gsap.timeline({
  //   scrollTrigger: {
  //     trigger: ".product",
  //     start: "top top",
  //     end: "bottom+=100% top",
  //     scrub: true,       
  //     pin: true,           
  //   }
  // });

  // tl.to(".product__hero", {
  //   width: "50vw",
  //   objectPosition: "left center",
  //   ease: "none"
  // }, 0);

  // tl.from(".product__details", {
  //   opacity: 0,
  //   y: 100,
  //   ease: "none"
  // }, 0.2);

  // попытка 2

  // const tl = gsap.timeline({
  //   scrollTrigger: {
  //     trigger: ".product",
  //     start: "top top",
  //     end: "+=50%",
  //     scrub: true,
  //     pin: true,
  //     anticipatePin: 1
  //   }
  // });

  // // Фото уходит влево и сжимается
  // tl.to(".product__hero", {
  //   width: "50vw",
  //   // x: -100,
  //   // scale: 0.9,
  //   ease: "power2.out"
  // }, 0);

  // // Контент появляется снизу (можно — справа, как на референсе)
  // tl.from(".product__details", {
  //   y: 100,
  //   opacity: 0,
  //   ease: "power2.out"
  // }, 0.2);

  // попытка 3

  // Анимация изображения
  // gsap.to(".product__hero", {
  //   scrollTrigger: {
  //     trigger: ".product",
  //     start: "top top", // или "top center" для более позднего старта
  //     toggleActions: "play reverse play reverse"
  //     // toggleActions: "play none none none",
  //   },
  //   width: "50vw",
  //   duration: 0.8,
  //   ease: "power2.out"
  // });

  // // Появление контента
  // gsap.from(".product__details", {
  //   scrollTrigger: {
  //     trigger: ".product",
  //     start: "top top",
  //     toggleActions: "play reverse play reverse"
  //     // toggleActions: "play none none none",
  //   },
  //   opacity: 0,
  //   y: 100,
  //   duration: 0.8,
  //   ease: "power3.out",
  //   delay: 0.1
  // });

  // попытка 4

  // ScrollTrigger.matchMedia({
  // "(min-width: 1024px)": function () {
  //     let tl = gsap.timeline({
  //       scrollTrigger: {
  //         trigger: ".product",
  //         start: "top top",
  //         end: "+=200%", // регулируется в зависимости от длины контента
  //         scrub: true,
  //         pin: true,
  //         anticipatePin: 1,
  //       }
  //     });

  //     // Фото уменьшается и смещается влево
  //     tl.to(".product__hero", {
  //       width: "50vw",
  //       height: "87vh",
  //       x: "0vw", // т.к. будет в абсолюте слева
  //       ease: "none"
  //     }, 0);

  //     // Контент появляется справа (если хотите — можно ещё from)
  //     tl.fromTo(".product__details", {
  //       opacity: 0,
  //       y: 100,
  //     }, {
  //       opacity: 1,
  //       y: 0,
  //       ease: "none"
  //     }, 0.1);
  //   }
  // });

  // попытка 5 

  // // Анимация сжатия и закрепления изображения
  // gsap.to(".product__hero", {
  //   scrollTrigger: {
  //     trigger: ".product",
  //     start: "top top",
  //     end: "top+=1", // срабатывает сразу
  //     // toggleActions: "play reverse play reverse"
  //     toggleActions: "play none none none",
  //   },
  //   width: "50vw",
  //   height: "87vh",
  //   ease: "power3.out",
  //   duration: 0.5
  // });

  // // Пин всей секции на время скролла деталей
  // ScrollTrigger.create({
  //   trigger: ".product",
  //   start: "top top",
  //   end: () => "+=" + document.querySelector(".product__details").offsetHeight,
  //   pin: true,
  //   pinSpacing: true,
  // });

  // попытка 6
  // // Анимация левого блока 
  // gsap.to(".product__hero", {
  //   scrollTrigger: {
  //     trigger: ".product",
  //     start: "top top",
  //     toggleActions: "play reverse play reverse"
  //   },
  //   width: "50vw",
  //   duration: 1,
  //   ease: "power3.out"
  // });

  // // Анимация правого блока (контент)
  // gsap.from('#product-details', {
  //   scrollTrigger: {
  //     trigger: '#product-details',
  //     start: 'top 80%',
  //     toggleActions: "play reverse play reverse"
  //   },
  //   opacity: 0,
  //   y: 40,
  //   duration: 1,
  //   delay: 0.2,
  //   ease: 'power3.out'
  // });

  // // 1. Анимация width: 100vw → 50vw
  // gsap.to(".product__hero", {
  //   scrollTrigger: {
  //     trigger: ".product",
  //     start: "top top",
  //     end: "+=100vh", // ширина изменяется на первом экране
  //     scrub: true
  //   },
  //   width: "50vw",
  //   ease: "none"
  // });

  // // 2. Анимация translateY: смещение вниз после ширины
  // gsap.to(".product__hero", {
  //   scrollTrigger: {
  //     trigger: "#product-details",
  //     start: "top bottom",       // когда блок начинает входить
  //     end: "bottom bottom",      // до конца блока
  //     scrub: true
  //   },
  //   y: () => {
  //     const hero = document.querySelector('.product__hero');
  //     const details = document.getElementById('product-details');
  //     const distance = details.offsetTop - hero.offsetTop;
  //     return distance;
  //   },
  //   ease: "none"
  // });

  // полу рабочий вариант

  // const hero = document.querySelector(".product__hero");
  // const details = document.querySelector(".product__details");

  // gsap.to(hero, {
  //   scrollTrigger: {
  //     trigger: hero,
  //     start: "top top",
  //     end: () => `+=${details.scrollHeight + 90}`,
  //     anticipatePin: 1,
  //     toggleActions: "play reverse play reverse"
  //   },
  //   width: "50vw",
  //   duration: 0.1,
  //   ease: "power2.out"
  // });

  // gsap.from("#product-details", {
  //   scrollTrigger: {
  //     trigger: "#product-details",
  //     start: "top bottom",
  //     toggleActions: "play reverse play reverse",
  //   },
  //   opacity: 0,
  //   y: "100vh",
  //   duration: 0.5,
  //   delay: 0.5,
  //   ease: "power3.out"
  // });

  // gsap.to("#product-details", {
  //   scrollTrigger: {
  //     trigger: "#product-details",
  //     start: "top bottom",
  //     toggleActions: "play reverse play reverse",
  //   },
  //   opacity: 1,
  //   y: "18vh",
  //   duration: 1,
  //   delay: 1,
  //   ease: "power3.out"
  // });

  // кулл варик

  const hero = document.querySelector(".product__hero");
  const details = document.querySelector(".product__details");

  // Уменьшение hero
  gsap.to(hero, {
    scrollTrigger: {
      trigger: hero,
      start: "top top",
      end: () => `+=${details?.scrollHeight + 90}`,
      anticipatePin: 1,
      toggleActions: "play none none reverse"
    },
    width: "50vw",
    ease: "power3.out"
  });

  // Один общий timeline для деталей
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#product-details",
      start: "top bottom",
      end: "top 30%",
      scrub: true, // <-- плавный возврат
      toggleActions: "play none none reverse"
    }
  });

  tl.fromTo("#product-details", 
    {
      y: "100vh",
      ease: "power3.out",
    }, 
    {
      y: "0",
      ease: "power3.out",
      duration: 1,
      delay: 1,
    }
  );

}