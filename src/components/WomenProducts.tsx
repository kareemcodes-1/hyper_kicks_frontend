import { useEffect, useRef } from 'react'
import gsap from "gsap";
import ScrollTrigger from "gsap-trial/ScrollTrigger";
import SplitText from "gsap-trial/SplitText";
import { useStore } from '../store/store';
import WomenProductsSwiper from './swiper/WomenProductsSwiper';

gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollTrigger);

const WomenProducts = () => {

  const ref = useRef<HTMLHeadingElement | null>(null);
  const {collections} = useStore();

  useEffect(() => {

    if (!collections.length) return;
    
    if(ref.current){
      let womenCollectionHeading = new SplitText(".women-heading", {type: "chars"})

    gsap.from(womenCollectionHeading.chars, {
        scrollTrigger: {
            trigger: ".women-heading",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            // scrub: true,
            // markers: true,
        },
        yPercent: 100,
        stagger: 0.025,
        duration: 0.7
    })
    }
}, [ref.current])


  return (
    <section className=" pb-[2rem]">
      <div className="mx-[1.5rem]">
        <div className='overflow-hidden'>
        <h2 className="lg:text-[11rem] text-[3rem] text-black mb-[.5rem] women-heading lg:leading-[10rem]" ref={ref}>
          {collections[1]?.name} COLLECTION
        </h2>
        </div>

        <WomenProductsSwiper />
      </div>
    </section>
  )
}

export default WomenProducts