import  { useEffect, useRef } from 'react'
import MenProductsSwiper from './swiper/MenProductsSwiper';
// import gsap from "gsap";
// import ScrollTrigger from "gsap-trial/ScrollTrigger";
// import SplitText from "gsap-trial/SplitText";
import { useStore } from '../store/store';

// gsap.registerPlugin(SplitText);
// gsap.registerPlugin(ScrollTrigger);

const MenProducts = () => {

  const {collections} = useStore();
  const ref = useRef<HTMLDivElement | null>(null);
  

  useEffect(() => {

    if (!collections.length) return;

    if(ref.current){
      // let menCollectionHeading = new SplitText(".men-heading", {type: "chars"})

      // gsap.from(menCollectionHeading.chars, {
      //     scrollTrigger: {
      //         trigger: ".men-heading",
      //         start: "top 80%",
      //         end: "bottom 20%",
      //         toggleActions: "play none none reverse",
      //         // markers: true
      //     },
      //     yPercent: 100,
      //     stagger: 0.025,
      //     duration: 0.7
      // })
    }
  }, [ref.current])

  return (
    <section className=" pt-[2rem] pb-[1rem] mens-collection" ref={ref}>
      <div className="mx-[1.5rem]">
        <div className='overflow-hidden'>
        <h2  className="lg:text-[11rem] text-[3rem] text-black mb-[.5rem] men-heading lg:leading-[10rem]">
          {collections[0]?.name} COLLECTION
        </h2>
        </div>


        <MenProductsSwiper/>
      </div>
    </section>
  )
}

export default MenProducts