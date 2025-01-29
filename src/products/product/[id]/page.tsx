import { useEffect, useState } from 'react'
import {useNavigate, useParams } from 'react-router'
import { CartItem, Product } from '../../../types/types';
import Layout from '../../../layout';
import { useStore } from '../../../store/store';
import toast from "react-hot-toast";
import MarqueeCartBtn from '../../../components/MarqueeCartBtn';
import OtherProducts from '../../../components/other-products';

const ProductPage = () => {
   
   const {id} = useParams();
   const {addToCart, cart, setOpenCartModal, userInfo} = useStore();
   const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
   const [loading, setLoading] = useState<boolean>(false);
   const [selectedSize, setSelectedSize] = useState<string>('');
   const navigate = useNavigate();

   useEffect(() => {
       (async function (){
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/products/product/${id}`);
            const data = await res.json();
            setProduct(data);
        } catch (error) {
            console.log(error);
        }
       })()
   }, []);

   const [product, setProduct] = useState<Product | null>(null);

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
                    {product?.images.map((image) => (
                        <img src={image} alt={product.name} className='border border-black w-[5rem] h-[5rem] object-cover' />
                    ))}
                </aside>
                <div>
                     {product?.images.map((image) => (
                        <img src={image} alt={product.name} className='border border-black h-[25rem] w-[30rem] object-cover' />
                    ))}
                </div>
                <div className='lg:w-[50%] w-full'>
                    <h1 className='lg:text-[4.5rem] text-[3.5rem]'>{product?.name}</h1>
                    <span className='text-[1.5rem]'>${product?.price}</span>
                    <div className='flex items-center gap-[.5rem] my-[1rem]'>
                         {product?.sizes.map((size) => (
                             <div onClick={() => {setSelectedSizes([...selectedSizes, size]); selectSize(size)}} className={`${selectedSize === size ? 'bg-black text-white' : 'border border-black'} cursor-pointer rounded-[10rem] h-[1.5rem] flex items-center justify-center p-[1rem]`}>{size}</div>
                         ))}
                    </div>

                    <div className='flex items-center gap-[1rem] w-full'>
                         <MarqueeCartBtn handleAddToCart={handleAddToCart} loading={loading}/>
                        <button type="button" className='lg:block hidden bg-transparent border border-black text-black py-2 px-4 h-[2.5rem] rounded-[10rem] w-full' onClick={() => addToWishlist(product)}>ADD TO WISHLIST</button>
                        <button type="button" className='lg:hidden block bg-transparent border border-black text-black py-2 px-4 h-[2.5rem] rounded-[10rem] w-full' onClick={() => addToWishlist(product)}>WISHLIST</button>
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