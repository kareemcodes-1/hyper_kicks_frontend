import  {useState } from 'react'
import Marquee from "react-fast-marquee";
import {loadStripe, Stripe} from '@stripe/stripe-js';
import { useStore } from '../store/store';
import Loading from './loading';
import { useNavigate } from 'react-router';

const MarqueeCheckoutBtn = () => {

    const [hovered, setHovered] = useState<boolean>(false);
    const {cart, userInfo} = useStore();
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    function handleMouseEnter(){
        setHovered(true);
    }

    function handleMouseLeave(){
        setHovered(false);
    }


      const handleCheckout = async () => {
        if(userInfo){
        setLoading(true);
        const stripe: Stripe | null = await loadStripe('pk_test_51Qav8tDmmBNQcKWYVvijetAK83TC7GPPM9yu9Vco1HxR8CyBJymfgflvLMIV2Bu49Q6QHjWirrLbW6qXt5jt6FnX00uf7OkJhc');
          try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/stripe/checkout`, {
              method: "POST",
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({products: cart, userInfo})
             });
      
             const session = await res.json();
      
             const result = stripe?.redirectToCheckout({
               sessionId: session.id
             });
             
  
             if((await result)?.error){
              setLoading(false);
              console.log((await result)?.error)
             }
          } catch (error) {
              console.log(error);
              setLoading(false);
          }
        }else{
          navigate('/login');
        }
      }
    

  return (
    <button onClick={handleCheckout}  onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} type="button" className='bg-[#ddb31b] border border-black text-black h-[2.2rem] px-4 rounded-[10rem] w-full cursor-pointer'>
        {loading ? <Loading /> : hovered ? <Marquee autoFill>&nbsp; PROCEED TO CHECKOUT </Marquee> : 'CHECKOUT'}
    </button>
  )
}

export default MarqueeCheckoutBtn