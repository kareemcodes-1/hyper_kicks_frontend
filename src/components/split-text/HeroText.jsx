import React from 'react'
import gsap from 'gsap';
import { useEffect } from 'react';
import SplitText from './animate-text';

const HeroText = () => {
    
//   useEffect(() => {

 
//     let heroHeading = new SplitText(".hero-heading", {type: "chars"});
 
//     let heroDescription = new SplitText(".hero-desc", {type: "lines"});

//     gsap.from(heroHeading.chars, {
//       yPercent: 100,
//       duration: 1,
//       stagger: 0.040,
//       // ease: "back.out"
//     });

//     gsap.fromTo(".hero-img", 
//       { clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)", scale: 1.5, ease: "power3.inOut",  duration: 2, opacity: 0.2 },
//       { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)", scale: 1,  ease: "power3.inOut", duration: 2, opacity: 1 }
//     );

//     gsap.from(heroDescription.lines, {duration: 1.5, delay: 0.2, x: -200, autoAlpha: 0, ease: "power3.inOut", stagger: 0.05});
    
// }, []);

  return (
    <div className="overflow-hidden">
<h1 className="text-[6rem] sm:text-[9rem] md:text-[12rem] lg:text-[20rem] lg:mt-[1.2rem] mt-[3.5rem] lg:h-[20rem] lg:leading-[25rem]  relative text-black hero-heading">
  HYPERKICKS
 </h1>
</div>
  )
}

export default HeroText