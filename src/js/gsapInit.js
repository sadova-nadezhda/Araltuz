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
}