import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// @ts-ignore //
import 'swiper/css';

// @ts-ignore //
import 'swiper/css/navigation';

import { Autoplay } from 'swiper/modules';
import { useStore } from "../../store/store";
import ProductCard from "../cards/ProductCard";
import {  Product } from "../../types/types";

export default function WomenProductsSwiper() {

  const { collections} = useStore();

  const [womenCollectionProducts, setWomenCollectionProducts] = useState<Product[]>([]);
  const [position, setPosition] = useState({ x: 0, y: 0 });
    const [hovered, setHovered] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
  
    useEffect(() => {
      const handleMouseMove = (event: MouseEvent) => {
        setPosition({
          x: event.clientX - 56, // Half of the button's width
          y: event.clientY - 20, // Half of the button's height
        });
      };
      
  
      document.addEventListener("mousemove", handleMouseMove);
  
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
      };
    }, []);
  
    function handleMouseOver(){
        setHovered(true);
    }
  
    function handleMouseLeave(){
      setHovered(false);
    }
  

  useEffect(() => {
     if (collections[1]?._id) {
       (async function () {
         try {
          setLoading(true);
           const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/collections/products/collection/${collections[1]._id}`);
           if (!res.ok) throw new Error("Failed to fetch products for collection.");
           const data = await res.json();
           setWomenCollectionProducts(data);
         } catch (error) {
          setLoading(false);
           console.error("Error fetching collection products:", error);
         }finally{
          setLoading(false);
        }
       })();
     }
   }, [collections]);

  return (
    <>
      <button
       className={`drag-btn  ${hovered ? 'opacity-100' : 'opacity-0'} border-black border cursor-grab bg-white transition-opacity duration-500 ease-in-out rounded-[10rem] z-[100] w-[7rem] h-[2.5rem] text-[1.2rem]`}
      style={{
        position: "fixed",
        left: position.x,
        top: position.y,
        pointerEvents: "none",
      }}
  
      >
        DRAG
      </button>

      <Swiper
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        slidesPerView={1}
        loop={true}
        grabCursor={true}
        modules={[Autoplay]}
        className="mySwiper swiper-product-sm"
      >
        {womenCollectionProducts.map((product) => (
                  <SwiperSlide onMouseMove={handleMouseOver} className="cursor-grab" onMouseLeave={handleMouseLeave} key={product._id}>
                  <ProductCard loading={loading} product={product}/>
                </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        slidesPerView={3}
        loop={true}
        grabCursor={true}
        modules={[Autoplay]}
        className="mySwiper !hidden lg:block swiper-product-lg"
      >
        {womenCollectionProducts.map((product) => (
                  <SwiperSlide onMouseMove={handleMouseOver} className="cursor-grab" onMouseLeave={handleMouseLeave} key={product._id}>
                  <ProductCard loading={loading} product={product}/>
                </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
