export function gsapInit() {
  document.querySelectorAll(".heading").forEach((heading) => {
    const split = SplitText.create(heading, { type: "chars" });

    gsap.from(split.chars, {
      y: 20,
      autoAlpha: 0,
      stagger: 0.05,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: heading,
        start: "top 80%",
        // toggleActions: "play reverse play reverse",
        toggleActions: "play none none none", 
        once: true 
      }
    });

  });

  const scrollTriggerConfig = {
    start: "top bottom",
    end: "bottom 20%",
    anticipatePin: 1,
    toggleActions: "play none none reverse",
  };

  gsap.utils.toArray(".up").forEach(element => {
    gsap.fromTo(element,
      { yPercent: 60, opacity: 0 },
      {
        duration: 1.2,
        opacity: 1,
        yPercent: 0,
        ease: "power2.out",
        scrollTrigger: { trigger: element, ...scrollTriggerConfig }
      }
    );
  });
  
  gsap.utils.toArray(".flip").forEach(element => {
    gsap.fromTo(element,
      { rotationX: 90, opacity: 0 },
      {
        duration: 1.2,
        rotationX: 0,
        opacity: 1,
        ease: "power2.out",
        scrollTrigger: { trigger: element, ...scrollTriggerConfig }
      }
    );
  });
  
  gsap.utils.toArray(".fade-left").forEach(element => {
    gsap.fromTo(element,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: { trigger: element, ...scrollTriggerConfig }
      }
    );
  });
  
  gsap.utils.toArray(".fade-right").forEach(element => {
    gsap.fromTo(element,
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: { trigger: element, ...scrollTriggerConfig }
      }
    );
  });

  gsap.utils.toArray(".scale-in").forEach(element => {
    gsap.fromTo(element,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: { trigger: element, ...scrollTriggerConfig }
      }
    );
  });
}