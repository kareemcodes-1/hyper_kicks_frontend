import { useEffect } from 'react'
import { useStore } from '../store/store';
import ProductCard from './cards/ProductCard';

const OtherProducts = () => {
     const {products, setProducts } = useStore();
    
     useEffect(() => {
           (async function () {
             try {
               const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/products`);
               if (!res.ok) throw new Error("Failed to fetch products");
               const data = await res.json();
               setProducts(data);
             } catch (error) {
               console.error("Error fetching products:", error);
             }
           })();
         
       }, []);

       const slicedProducts = products.slice(0, 6);

  return (
    <div>
        <h1 className='lg:text-[7rem] text-[3.5rem] text-black'>You may also like</h1>
        <div className='lg:grid flex flex-col items-start justify-center lg:grid-cols-3 gap-[1rem]'>
        {slicedProducts.map((product) => (
            <ProductCard product={product}/>
        ))}
        </div>
    </div>
  )
}

export default OtherProducts