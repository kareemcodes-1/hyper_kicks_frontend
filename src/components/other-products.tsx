import { useEffect, useState } from 'react'
import { useStore } from '../store/store';
import ProductCard from './cards/ProductCard';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const OtherProducts = () => {
     const {products, setProducts } = useStore();
     const [loading, setLoading] = useState(true);
    
     useEffect(() => {
           (async function () {
             try {
               const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/products`);
               if (!res.ok) throw new Error("Failed to fetch products");
               const data = await res.json();
               setProducts(data);
             } catch (error) {
               console.error("Error fetching products:", error);
             }finally{
              setLoading(false);
             }
           })();
         
       }, []);

       const slicedProducts = products.slice(0, 6);

  return (
    <div className='mt-[3rem]'>
        <h1 className='lg:text-[7rem] text-[3rem] text-black'>You may also like</h1>
        <div className='lg:grid flex flex-col items-start justify-center lg:grid-cols-3 gap-[1rem]'>
        {slicedProducts.map((product) => (
            loading ? <Skeleton className="!h-[500px] !w-full"/> : <ProductCard product={product}/>
        ))}
        </div>
    </div>
  )
}

export default OtherProducts