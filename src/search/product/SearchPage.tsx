import { useStore } from '../../store/store'
import Layout from '../../layout';
import ProductCard from '../../components/cards/ProductCard';
import OtherProducts from '../../components/other-products';

const SearchPage = () => {

    const {filteredProducts} = useStore();

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