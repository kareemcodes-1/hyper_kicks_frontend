import { useStore } from '../../store/store'
import Layout from '../../layout';
import ProductCard from '../../components/cards/ProductCard';

const SearchPage = () => {

    const {filteredProducts} = useStore();
    console.log(filteredProducts);

  return (
    <Layout>
        <div className='mt-[5rem] mb-[1rem] px-[2rem]'>
            <h1 className='text-[5rem]'>{filteredProducts.length} Results found.</h1>
            {filteredProducts.map((product) => (
                  <ProductCard product={product} key={product._id}/>
             ))}
        </div>
    </Layout>
  )
}

export default SearchPage