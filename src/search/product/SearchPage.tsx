import { useStore } from '../../store/store'
import Layout from '../../layout';
import ProductCard from '../../components/cards/ProductCard';
import OtherProducts from '../../components/other-products';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const SearchPage = () => {

    
    const {setProducts, products} = useStore();

    let [searchParams] = useSearchParams();
    const value = searchParams.get("q");

    useEffect(() => {
      (async function (){
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/products`);
            const data = await res.json();
            setProducts(data);
        } catch (error) {
            console.log(error);
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
            {filteredProducts.map((product) => (
                  <ProductCard product={product} key={product._id}/>
             ))}


             <OtherProducts />
        </div>
    </Layout>
  )
}

export default SearchPage