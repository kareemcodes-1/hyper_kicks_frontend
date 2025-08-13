import React, { useEffect, useRef } from 'react'
import SplitText from 'gsap/SplitText';
import gsap from 'gsap';

gsap.registerPlugin(SplitText)

const News = () => {

   const ref = useRef<HTMLDivElement | null>(null);
  

  useEffect(() => {

    if(ref.current){
      let latestNewsHeading = new SplitText(".men-heading", {type: "chars"})

      gsap.from(latestNewsHeading.chars, {
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
  }, [ref.current])

  return (
    <section className='my-[2rem] lg:px-[1.5rem] px-[1rem]'>
        <div className='overflow-hidden'>
            <h1 className="lg:text-[11rem] text-[3rem] text-black mb-[.5rem] men-heading lg:leading-[10rem]" ref={ref}>Latest News</h1>
        </div>
        <div className='lg:grid flex flex-col grid-cols-2 gap-[.5rem]'>
            <div className='bg-black lg:px-[1rem] p-[2rem] flex items-center justify-center'>
                <h2 className="lg:text-[3.2rem] text-[2rem] text-white azert-mono">"Torn Edges. Timeless Shape" - New Balance 2002R Protection Pack</h2>
            </div>
             <div className='lg:h-[50rem] h-[30rem] w-full border border-black'>
                 <img src="https://cdn.prod.website-files.com/5ff5c4fcf7154c1c91f670a0/686d3d52860186697529f44d_nb-protection-featured.jpg" alt="" className='w-full h-full object-cover'/>
             </div>

             <div className='lg:h-[50rem] h-[30rem] w-full border border-black'>
                 <img src="https://cdn.prod.website-files.com/5ff5c4fcf7154c1c91f670a0/6881d398a0a8d11916882f27_new-balance-abzorb-2000-featured.jpg" alt="" className='w-full h-full object-cover'/>
             </div>

            <div className=' p-[1rem] flex items-end justify-end'>
                <h2 className="lg:text-[5.5rem] text-[3rem] text-black bebas text-end">
A SNEAKER SOCIETY & CULTURE STORE CURATED BY SNEAKER HEADS</h2>
            </div>

        </div>
    </section>
  )
}

export default News