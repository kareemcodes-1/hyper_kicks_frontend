// import { useEffect, useRef, useState } from 'react'
import { useEffect, useState } from "react";
// import SplitText from "gsap-trial/SplitText";
// import gsap from "gsap";
import Marquee from "react-fast-marquee";

// gsap.registerPlugin(SplitText);

const Hero = () => {
  const [hovered, setHovered] = useState<boolean>(false);

  function handleMouseEnter() {
    setHovered(true);
  }

  function handleMouseLeave() {
    setHovered(false);
  }

  useEffect(() => {
    // let heroHeading = new SplitText(".hero-heading", { type: "chars" });

    // let heroDescription = new SplitText(".hero-desc", { type: "lines" });

    // gsap.from(heroHeading.chars, {
    //   yPercent: 200,
    //   duration: 1,
    //   stagger: 0.04,
    //   // ease: "back.out"
    // });

    // gsap.fromTo(
    //   ".hero-img",
    //   {
    //     clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
    //     scale: 1.5,
    //     ease: "power3.inOut",
    //     duration: 2,
    //     opacity: 0.2,
    //   },
    //   {
    //     clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
    //     scale: 1,
    //     ease: "power3.inOut",
    //     duration: 2,
    //     opacity: 1,
    //   }
    // );

    // gsap.from(heroDescription.lines, {
    //   duration: 1.5,
    //   delay: 0.2,
    //   x: -200,
    //   autoAlpha: 0,
    //   ease: "power3.inOut",
    //   stagger: 0.05,
    // });
  }, []);

  function handleScrollDown() {
    document
      .querySelector(".mens-collection")
      ?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <div className="flex flex-col items-start lg:px-[2rem] px-[1rem]">
        <div className="overflow-hidden w-full">
          <h1 className="text-[5.5rem] w-full sm:text-[9rem] md:text-[12rem] lg:text-[22rem] lg:mt-[1.2rem] mt-[3.5rem] lg:h-[20rem] h-[8rem] lg:leading-[25rem]  relative text-black hero-heading">
            HYPERKICKS
          </h1>
        </div>

        <div className="flex lg:items-start items-start lg:flex-row flex-col gap-[1rem] mt-[1rem] w-full">
          <div className="h-[15rem] lg:w-[55rem] w-full overflow-hidden">
            <img
              src="https://cdn.prod.website-files.com/5ff5c4fcf7154c1c91f670a0/67af1309adea0deb3475774b_veja-panenka-sneaker-mood%20(8).jpg"
              alt=""
              className="w-full h-full object-cover hero-img border"
            />
          </div>
          <div className="overflow-hidden ">
            <p className="lg:text-[1.2rem] text-[1rem] lg:w-[400px] w-full hero-desc bebas">
              Discover the perfect blend of style, comfort, and performance with
              our premium collection of sneakers, our shoes are designed to
              provide ultimate support and durability. Crafted with precision,
              each pair reflects quality craftsmanship and cutting-edge design.
            </p>

            {/* <div onClick={handleScrollDown} className="mt-[1rem] hero-desc">
              <div className="flex items-center text-[.8rem] font-medium cursor-pointer">
                (SCROLL DOWN{" "}
                <IoIosArrowRoundDown
                  style={{ width: "1.2rem", height: "1.2rem" }}
                />
                )
              </div>
            </div> */}
            <div className="overflow-hidden hero-desc ">
              <button
                onClick={handleScrollDown}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                type="button"
                className="mt-[1rem] bg-[#ddb31b] flex items-center justify-center border border-black text-black h-[2.2rem] px-4 rounded-[10rem] w-[10rem] cursor-pointer"
              >
                {hovered ? (
                  <Marquee autoFill>&nbsp; SCROLL DOWN </Marquee>
                ) : (
                  "SCROLL DOWN"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
