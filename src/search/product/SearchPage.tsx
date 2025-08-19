import { useStore } from '../../store/store'
import Layout from '../../layout';
import ProductCard from '../../components/cards/ProductCard';
import OtherProducts from '../../components/other-products';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SearchPage = () => {

    
    const {setProducts, products} = useStore();

    let [searchParams] = useSearchParams();
    const value = searchParams.get("q");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      (async function (){
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/products`);
            const data = await res.json();
            setProducts(data);
        } catch (error) {
            console.log(error);
        }finally{
          setLoading(false);
        }
       })()
    }, [value]);

    const filteredProducts = products.filter((product) => 
      product.name.toLowerCase().includes(value.replace(/-/g, " ").toLowerCase())
    );
    

  return (
    <Layout>
        <div className='mt-[5rem] mb-[1rem] px-[2rem]'>
            <h1 className='lg:text-[5rem] text-[3.5rem]'>{filteredProducts.length} Results found.</h1>
            <div className='lg:grid flex flex-col grid-cols-3 gap-[1rem]'>
              {filteredProducts.map((product) => (
                   loading ? <Skeleton className="!h-[500px] !w-full"/> : <ProductCard product={product}/>
             ))}
            </div>


             <OtherProducts />
        </div>
    </Layout>
  )
}

export default SearchPage