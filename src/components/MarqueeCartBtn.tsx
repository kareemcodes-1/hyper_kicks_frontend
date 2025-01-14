import {useState } from 'react'
import Marquee from "react-fast-marquee";
import Loading from './loading';

const MarqueeCartBtn = ({handleAddToCart, loading} : {handleAddToCart : () => void; loading: boolean}) => {

    const [hovered, setHovered] = useState<boolean>(false);

    function handleMouseEnter(){
        setHovered(true);
    }

    function handleMouseLeave(){
        setHovered(false);
    }

    

  return (
    <button disabled={loading} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} type="button" className='bg-[#ddb31b] border border-black text-black py-2 h-[2.5rem] px-4 rounded-[10rem] w-full cursor-pointer' onClick={handleAddToCart}>
        {loading ? <Loading type='black' /> : hovered ? <Marquee autoFill>&nbsp; ADD TO BAG </Marquee> : 'ADD TO BAG'}
    </button>
  )
}

export default MarqueeCartBtn