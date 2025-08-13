import  { useEffect, useRef } from 'react'
import MenProductsSwiper from './swiper/MenProductsSwiper';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import { useStore } from '../store/store';

gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollTrigger);

const MenProducts = () => {

  const {collections} = useStore();
  const ref = useRef<HTMLDivElement | null>(null);
  

  useEffect(() => {

    if (!collections.length) return;

    if(ref.current){
      let menCollectionHeading = new SplitText(ref.current, {type: "chars"})

      gsap.from(menCollectionHeading.chars, {
          scrollTrigger: {
              trigger: ref.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
              // markers: true
          },
          yPercent: 100,
          stagger: 0.025,
          duration: 0.7
      })
    }
  }, [collections])

  return (
    <section className=" pt-[2rem] pb-[1rem] mens-collection" >
      <div className="mx-[1.5rem]">
        {/* <div className='overflow-hidden'> */}
        <h2  className="lg:text-[11rem] text-[3.5rem] text-black mb-[.5rem] men-heading lg:leading-[10rem] overflow-hidden" ref={ref}>
          MENS COLLECTION
        </h2>
        {/* </div> */}


        <MenProductsSwiper/>
      </div>
    </section>
  )
}

export default MenProducts