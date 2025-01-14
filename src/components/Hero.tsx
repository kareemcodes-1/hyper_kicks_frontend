import { useEffect } from 'react'
import { IoIosArrowRoundDown } from "react-icons/io";
import SplitText from 'gsap-trial/SplitText';
import gsap from 'gsap';

gsap.registerPlugin(SplitText);

const Hero = () => {

  useEffect(() => {
    let heroHeading = new SplitText(".hero-heading", {type: "chars"});
    let heroDescription = new SplitText(".hero-desc", {type: "lines"});

    gsap.from(heroHeading.chars, {
      yPercent: 100,
      duration: 1,
      stagger: 0.040,
      // ease: "back.out"
    });

    gsap.fromTo(".hero-img", 
      { clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)", scale: 1.5, ease: "power3.inOut",  duration: 2, opacity: 0.2 },
      { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)", scale: 1,  ease: "power3.inOut", duration: 2, opacity: 1 }
    );

    gsap.from(heroDescription.lines, {duration: 1.5, delay: 0.2, x: -200, autoAlpha: 0, ease: "power3.inOut", stagger: 0.05});
    
}, []);

    function handleScrollDown(){
         document.querySelector('.mens-collection')?.scrollIntoView({behavior: "smooth"});
    }


  return (
    <>
       <div className='flex flex-col items-center px-[1rem]'>
       <div className="overflow-hidden">
         <h1 className="text-[6rem] sm:text-[9rem] md:text-[12rem] lg:text-[20rem] lg:mt-0 mt-[3.5rem] lg:h-[20rem] lg:leading-[25rem]  relative text-black hero-heading m-0 p-0">
           HYPERKICKS
          </h1>
      </div>


       <div className='flex lg:items-center items-start lg:flex-row flex-col gap-[1rem]'>
        <div className='h-[15rem] lg:w-[50rem] w-full overflow-hidden'>
        <img src="https://i.pinimg.com/736x/f0/cd/40/f0cd40bf5b8d7d7efee3256b5766522a.jpg" alt="" className='w-full h-full object-cover hero-img'/>
        </div>
        <div className='overflow-hidden'>
        <p className='text-[1rem] lg:w-[400px] w-full hero-desc bebas'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur voluptatem exercitationem commodi odio deserunt quod sapiente debitis suscipit impedit natus. Eius natus doloremque ducimus eos aut dignissimos quam provident a?</p>
        <div onClick={handleScrollDown} className='mt-[1rem] hero-desc'><div className='flex items-center text-[.8rem] font-medium cursor-pointer'>(SCROLL DOWN <IoIosArrowRoundDown style={{width: "1.2rem", height: "1.2rem"}} />)</div></div>
       </div>
       </div>
       </div>
    </>
  )
}

export default Hero