// import { useEffect, useRef, useState } from 'react'
import { useEffect, useRef} from "react";
import SplitText from "gsap/SplitText";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Marquee from "react-fast-marquee";
// import AnimatedContent from "../lib/animated-content";
// import SplitText from "../lib/split-text";

gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  // const [hovered, setHovered] = useState<boolean>(false);

  // function handleMouseEnter() {
  //   setHovered(true);
  // }

  // function handleMouseLeave() {
  //   setHovered(false);
  // }

  useEffect(() => {
    let heroHeading = new SplitText(".hero-heading", { type: "chars" });
    gsap.from(heroHeading.chars, {
      yPercent: 200,
      duration: 1,
      stagger: 0.09,
      // ease: "back.out"
    });
  }, []);

  const ref = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (ref) {
      gsap.fromTo(
        ref.current,
        { scale: 1.3, opacity: 0 }, // Start state
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          delay: 1,
          ease: "easeInOut",
          // scrollTrigger: {
          //   trigger: ref.current,
          //   start: "top 80%",
          //   end: "bottom 20%",
          //   toggleActions: "play none none reverse",
          //   markers: false,
          // },
        }
      );
    }
  }, [ref]);

  // function handleScrollDown() {
  //   document
  //     .querySelector(".mens-collection")
  //     ?.scrollIntoView({ behavior: "smooth" });
  // }

  return (
    <>
      <div className="flex flex-col items-start lg:mt-0 mt-[1.5rem] lg:px-[2rem] px-[1rem]">
        {/* <SplitText
          text="HYPERKICKS"
          className="bebas text-[5.5rem] w-full sm:text-[9rem] md:text-[12rem] lg:text-[22rem] lg:mt-[1.2rem] mt-[3.5rem] lg:h-[20rem] h-[8rem] lg:leading-[25rem]  relative text-black hero-heading"
          delay={100}
          animationFrom={{ transform: "translate3d(0,50px,0)" }}
          animationTo={{ transform: "translate3d(0,0,0)" }}
          // easing="easeOutCubic"
          threshold={0.1}
          rootMargin="0px"
        /> */}
        <h1 className="text-[5.5rem] text-center w-full sm:text-[9rem] md:text-[12rem] lg:text-[21rem] lg:mt-[1.2rem] mt-[3.5rem] lg:h-[20rem] h-[8rem] lg:leading-[25rem]  relative text-black hero-heading overflow-hidden">
          HYPERKICKS{" "}
          <sup className="lg:block hidden text-[2rem]" style={{ top: "-6em" }}>
            ™
          </sup>
        </h1>
        {/* </AnimatedContent> */}
        {/* </div> */}

        <div className="flex lg:items-start items-start lg:flex-row flex-col gap-[1rem] mt-[1rem] w-full">
          <div className="lg:h-[80vh] h-[50vh] w-full overflow-hidden border border-black">
            <img
              src="https://cdn.prod.website-files.com/5ff5c4fcf7154c1c91f670a0/688eefe57c3dce84eb7c369b_adidas-adizero-goukana-fw25-mood%20(27).jpg"
              alt=""
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* <div className="overflow-hidden">
            <AnimatedContent
              distance={190}
              delay={1400}
              direction="horizontal"
              reverse={true}
              config={{ tension: 80, friction: 30 }}
              initialOpacity={0}
              animateOpacity
              // scale={1.1}
              threshold={0.5}
            >
              <p className="lg:text-[1.2rem] text-[1rem] lg:w-[400px] w-full hero-desc bebas overflow-hidden">
                Discover the perfect blend of style, comfort, and performance
                with our premium collection of sneakers, our shoes are designed
                to provide ultimate support and durability. Crafted with
                precision, each pair reflects quality craftsmanship and
                cutting-edge design.
              </p>

              <button
                onClick={handleScrollDown}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                type="button"
                className="mt-[1rem] bg-[#ddb31b] flex items-center justify-center border border-black text-black h-[2.2rem] px-4 rounded-[10rem] w-[10rem] cursor-pointer bebas text-[1.3rem]"
              >
                {hovered ? (
                  <Marquee autoFill>&nbsp; SCROLL DOWN </Marquee>
                ) : (
                  "SCROLL DOWN"
                )}
              </button>
            </AnimatedContent>

      
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Hero;
