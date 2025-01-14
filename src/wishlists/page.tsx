import { useEffect } from 'react'
import { useStore } from '../store/store'
import Layout from '../layout';
import ProductCard from '../components/cards/ProductCard';

const Wishlists = () => {
  const {wishlists, setWishLists} = useStore();
  useEffect(() => {
      (async function () {
           const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/wishlists`);
           const data = await res.json();
           setWishLists(data);
      })()
  }, []);

  return (
    <Layout>
         <div className="mt-[3rem] px-[1.5rem] mb-[1rem]">
              <div className='flex items-center justify-between w-full'>
              <h1 className='lg:text-[8rem] text-[4rem] text-black'>All Wishlists</h1>
              </div>

              <div className='lg:grid flex flex-col grid-cols-3 gap-[1rem]'>
                   {wishlists.length > 0 ? (
                      <>
                        {wishlists.map((wishlist) => (
                        <ProductCard product={wishlist.productId}/>
                         ))}
                      </>
                   ) : (
                       <div>
                            No products.
                       </div>
                   )}
              </div>


         </div>
    </Layout>
  )
}

export default Wishlists