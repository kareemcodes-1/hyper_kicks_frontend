import { useEffect, useState } from 'react'
import { useStore } from '../store/store'
import Layout from '../layout';
import ProductCard from '../components/cards/ProductCard';
import OtherProducts from '../components/other-products';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Wishlists = () => {
  const {wishlists, setWishLists} = useStore();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
      (async function () {
          try {
              const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/wishlists`, {
               method: "GET",
               headers: {
                    'Content-Type': 'application/json',
               },
               credentials: "include",
           });
           const data = await res.json();
           setWishLists(data);
          } catch (error) {
               console.log(error);
          }finally{
               setLoading(false)
          }
      })()
  }, []);

  return (
    <Layout>
         <div className="mt-[3.5rem] px-[1.5rem] mb-[1rem]">
              <div className='flex items-center justify-between w-full'>
              <h1 className='lg:text-[8rem] text-[4rem] text-black'>All Wishlists</h1>
              </div>

              <div className='lg:grid flex flex-col grid-cols-3 gap-[1rem]'>
                   {wishlists.length > 0 && (
                      <>
                        {wishlists.map((wishlist) => (
                               loading ? <Skeleton className="!h-[500px] !w-full"/> : <ProductCard product={wishlist.productId}/>
                         ))}
                      </>
                   )}
              </div>

              <OtherProducts />
         </div>
    </Layout>
  )
}

export default Wishlists