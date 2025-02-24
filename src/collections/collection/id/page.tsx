import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Layout from '../../../layout';
import { Collection} from '../../../types/types';
import ProductCard from '../../../components/cards/ProductCard';
import { HiOutlineAdjustmentsVertical } from "react-icons/hi2";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useStore } from '../../../store/store';
import FilterModal from '../../../components/modals/FilterModal';

const CollectionPage = () => {

    const {id} = useParams();
    const [collection, setCollection] = useState<Collection | null>(null);
    const {handleSort, products, setProducts, resetFilter} = useStore();
    const [openSortDropDown, setOpenSortDropDown] = useState<boolean>(false);
    const [openFilterModal, setOpenFilterModal] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async function () {
          const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/collections/collection/${id}`);
          const data = await res.json();
          setCollection(data);
        })();

        (async function () {
          try {
            setLoading(true);
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/collections/products/collection/${id}`, {
              method: "GET",
              headers: {
                'Content-Type': 'application/json',
              }
            });
            const data = await res.json();
            setProducts(data);
          } catch (error) {
            console.log(error);
            setLoading(false);
          }finally{
            setLoading(false);
          }
        })();
    }, []);


      // const filteredProducts = products.filter((product) => product.collectionId.name.toLowerCase() === collection?.name.toLowerCase());


  return (
    <Layout>
         {openFilterModal && <FilterModal openFilterModal={openFilterModal} closeModal={() => setOpenFilterModal(false)}/>}
         <div className="mt-[3rem] px-[1.5rem] mb-[1rem]">
              <div className='flex lg:items-center items-start lg:flex-row flex-col justify-between w-full'>
              <h1 className='lg:text-[8rem] text-black text-[4rem]'>{collection?.name} Collection</h1>


              <div className='flex items-center gap-[.5rem] relative'>
              <button type="button" className='border border-black rounded-[10rem] py-[.8rem] px-[1rem] flex items-center gap-[.5rem]' onClick={() => setOpenSortDropDown(!openSortDropDown)}>Sort <MdOutlineKeyboardArrowDown style={{width: "1.5rem", height: "1.5rem"}}/></button>
              <button type="button" className='border border-black rounded-[10rem] py-[.8rem] px-[1rem] flex items-center gap-[.5rem] ' onClick={() => setOpenFilterModal(true)}>Filter <HiOutlineAdjustmentsVertical style={{width: "1.5rem", height: "1.5rem"}}/></button>

              {openSortDropDown && (
            <div className="absolute left-0 top-[3.5rem] mt-2 w-[13rem] bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <ul className="flex flex-col text-[.925rem]">
                  <button className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-start" type='button'>Popularity</button>
                  <button className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-start" type='button' onClick={() => handleSort('latest')}>Latest</button>
                  <button className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-start" type='button' onClick={() => handleSort('low_to_high')}>Price:Low to High</button>
                  <button className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-start" type='button' onClick={() => handleSort('high_to_low')}>Price:High to Low</button>
                  <button className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-start" type='button' onClick={resetFilter} >Reset</button>
              </ul>
            </div>
             )}
              </div>
              </div>

              <div className='lg:grid flex items-start flex-col grid-cols-3 gap-[1rem] lg:mt-0 mt-[2rem]'>
                   {products.length > 0 ? (
                      <>
                        {products.filter((product) => product.collectionId.name.toLowerCase() === collection?.name.toLowerCase()).map((product) => (
                        <ProductCard loading={loading} product={product}/>
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

export default CollectionPage