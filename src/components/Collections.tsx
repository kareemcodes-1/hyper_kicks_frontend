import { useEffect, useState } from 'react'
import { useStore } from '../store/store'
import CollectionCard from './cards/CollectionCard';


const Collections = () => {

    const {collections, setCollections} = useStore();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        (async function () {
            try {
                setIsLoading(true);
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/collections`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await res.json();
            setCollections(data);
            } catch (error) {
                console.log(error);
            }
        })().finally(() => {
            setIsLoading(false);
        });

        
    }, []);

  return (
     <div className='lg:grid flex flex-col grid-cols-3 mt-[2rem] lg:gap-0 gap-[1rem] mx-[1.5rem] overflow-hidden'>
          {collections.length > 0 ? (
              collections.map((collection) => (
                <CollectionCard collection={collection} key={collection._id} isLoading={isLoading}/>
              ))
          ): (
            <div>
                <h1>No Collections...</h1>
            </div>
          )}
     </div>
  )
}

export default Collections;