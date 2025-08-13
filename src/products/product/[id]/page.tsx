import { useEffect, useState } from 'react'
import {useNavigate, useParams } from 'react-router'
import { CartItem, Product } from '../../../types/types';
import Layout from '../../../layout';
import { useStore } from '../../../store/store';
import toast from "react-hot-toast";
import MarqueeCartBtn from '../../../components/MarqueeCartBtn';
import OtherProducts from '../../../components/other-products';
import Skeleton from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";

const ProductPage = () => {
   
   const {id} = useParams();
   const {addToCart, cart, setOpenCartModal, userInfo} = useStore();
   const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
   const [loading, setLoading] = useState<boolean>(false);
   const [selectedSize, setSelectedSize] = useState<string>('');
   const navigate = useNavigate();
   const [productLoading, setProductLoading] = useState<boolean>(true);

   useEffect(() => {
    (async function () {
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/products/product/${id}`);
            const data = await res.json();
            setProduct(data);
        } catch (error) {
            console.log(error);
        }finally{
            setProductLoading(false);
        }
    })();
}, [id]);


   const [product, setProduct] = useState<Product | null>(null);
   console.log(productLoading);

   const handleAddToCart = () => {
      setLoading(true);
      const existingProductInCart = cart.find((item) => item.product._id === product?._id)
       if(product){
           if(!existingProductInCart){
            const data: CartItem = {
                product: {
                    ...product,
                    sizes: selectedSizes,
                },
                quantity: 1
              } 
               setTimeout(() => {
                setLoading(false);
                addToCart(data);
                toast.success('Added to cart');
                setOpenCartModal(true);
               }, 1500)
           }else{
            setLoading(false);
            toast.error('Item already in cart');
           }
       }
   }

   function selectSize(size: string){
      setSelectedSize(size);
   }

   async function addToWishlist(product: Product | null){
       if(!userInfo){
         navigate('/login');
       }else{
          if(product){
              const data = {
                 productId: product._id,
                 userId: userInfo._id
              }
              try {
                const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/wishlists/create`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if(res.ok){
                    toast.success('Added to wishlist');
                }
              } catch (error) {
                console.log(error);
              }
          }
       }
   }
    
  return (
    <Layout>
        <div className='mt-[5rem] mx-[1.5rem] mb-[2rem]' key={product?._id}>
            <div className='mb-[1rem]'><a href="/">Home</a> | <a>{product?.name}</a></div>

            <div className='flex lg:flex-row flex-col items-start gap-[1rem]'>
                <aside className='flex flex-col'>
                   {productLoading ? (
                           <Skeleton className='!w-[5rem] !h-[5rem]' />
                       ) : (
                           product?.images.map((image) => (
                               <img src={image} alt={product.name} className='border border-black w-[5rem] h-[5rem] object-cover' />
                           ))
                       )}
                </aside>
                <div>
                   {productLoading ? (
                           <Skeleton className='!h-[25rem] !w-[30rem]' />
                       ) : (
                           product?.images.map((image) => (
                               <img src={image} alt={product.name} className='border border-black lg:h-[30rem] h-[25rem] lg:w-[35rem] w-full object-cover' />
                           ))
                       )}
                </div>
                <div className='lg:w-[50%] w-full'>
                    <h1 className='lg:text-[5rem] text-[3.5rem]'>{product?.name}</h1>
                    <span className='lg:text-[2rem] text-[1.5rem]'>${product?.price}</span>
                    <p className='text-[1rem] my-[1rem]'>Straight from the archives, it’s the PUMA Palermo. This classic terrace shoe builds on PUMA’s heritage within football, while appealing to today’s sneakerheads and fashion mavens. This execution features a leather base with a suede Formstrip and overlays.</p>
                    <div className='flex items-center gap-[.5rem] my-[1rem]'>
                         {product?.sizes.map((size) => (
                             <div onClick={() => {setSelectedSizes([...selectedSizes, size]); selectSize(size)}} className={`${selectedSize === size ? 'bg-black text-white' : 'border border-black'} cursor-pointer rounded-[10rem] text-[1.5rem] h-[2rem] flex items-center justify-center p-[1.2rem]`}>{size}</div>
                         ))}
                    </div>

                    <div className='flex items-center lg:flex-row flex-col gap-[1rem] w-full'>
                         <MarqueeCartBtn handleAddToCart={handleAddToCart} loading={loading}/>
                        <button type="button" className=' bg-transparent border border-black text-black px-4 h-[3.5rem] rounded-[10rem] w-full bebas text-[2rem] text-center' onClick={() => addToWishlist(product)}>ADD TO WISHLIST</button>
                    </div>
                </div>
            </div>
          
          <div className='mt-[2rem]'>
          <OtherProducts />
          </div>
        </div>
    </Layout>
  )
}

export default ProductPage