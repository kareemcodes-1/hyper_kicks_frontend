
import FadeContent from "../lib/fade-content"
import SplitText from "../lib/split-text"



const CTA = () => {
  return (
    <div className="lg:block hidden mb-[5rem] mt-[1.5rem] relative text-black overflow-hidden">
    <div className="lg:container-1">

      {/* <AnimatedContent
  distance={150}
  direction="vertical"
  reverse={false}
  config={{ tension: 80, friction: 20 }}
  initialOpacity={0.2}
  animateOpacity
  // scale={1.1}
  threshold={0.4}
>
<div className="text-center mx-[1.5rem] font-medium lg:text-[5rem] text-[2.8rem] overflow-hidden">
        VENTURE AWAITS WITH THE LATEST EXCLUSIVE ADIDAS SNEAKER COLLECTION
</div>
</AnimatedContent> */}
      <div className="overflow-hidden text-center">
      <SplitText
  text="VENTURE AWAITS WITH THE LATEST EXCLUSIVE ADIDAS SNEAKER COLLECTION"
  className="text-center mx-[1.5rem] font-medium lg:text-[5rem] text-[2.8rem] overflow-hidden"
  delay={20}
  // @ts-ignore
  easing="easeOutCubic"
  threshold={0.1}
  rootMargin="-50px"
   />
      </div>

      <div className="absolute lg:top-0 top-[-4rem] z-[-1]">
      <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
        <img
          src={"/p.jpg"}
          alt=""
          className="w-[15rem] h-[15rem] object-cover"
        />
        </FadeContent>
      </div>
    
      <div className="absolute bottom-0 right-0 z-[-1]">
      <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
        <img
          src={"/p2.webp"}
          alt=""
          className="w-[15rem] h-[15rem] object-cover rotate-[20deg]"
        />
      </FadeContent>
      </div>
    </div>
    </div>
  )
}

export default CTA