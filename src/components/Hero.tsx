import { useEffect, useRef, useState } from 'react'
import { IoIosArrowRoundDown } from "react-icons/io";
import { SplitText } from '../lib/split-text';
import { AnimatePresence, motion } from 'framer-motion';
import HeroText from './split-text/HeroText';
// import SplitText from 'gsap/SplitText';
// import gsap from 'gsap';
// // import * as SplitText from '../lib/Split3.min.js';
// import SplitText from '../lib/Split3.min.js';



const Hero = () => {


    function handleScrollDown(){
         document.querySelector('.mens-collection')?.scrollIntoView({behavior: "smooth"});
    }


  return (
    <>
       <div className='flex flex-col items-center px-[1rem]'>
      <HeroText />
      
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