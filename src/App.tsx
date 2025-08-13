import { useEffect } from "react"
import Hero from "./components/Hero"
import MenProducts from "./components/MenProducts"
import WomenProducts from "./components/WomenProducts"
import Lenis from "lenis";
import 'lenis/dist/lenis.css'
import Collections from "./components/Collections"
import Layout from "./layout"
import { useStore } from "./store/store"
// import GetNow from "./components/get-now";
// import CTA from "./components/cta";
import News from "./components/News";


function App() {

  const { setProducts, setCollections } = useStore();

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
    });
    
    // Listen for the scroll event and log the event data
    lenis.on('scroll', () => {
    });
  }, []);

  useEffect(() => {
      (async function fetchProductsAndCollections() {
        try {
          const [productsRes, collectionsRes] = await Promise.all([
            fetch(`${import.meta.env.VITE_SERVER_URL}/api/products`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              }
            }),
            fetch(`${import.meta.env.VITE_SERVER_URL}/api/collections`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              }
            }),
          ]);
  
          const productsData = await productsRes.json();
          const collectionsData = await collectionsRes.json();
  
          setProducts(productsData);
          setCollections(collectionsData);
        } catch (error) {
          console.error("Failed to fetch products or collections", error);
        }
      })();
    }, []);

  return (
    
    <Layout>
         <Hero />
         <Collections />
         <MenProducts />
         <WomenProducts />
         {/* <GetNow /> */}
         <News />
    </Layout>
  )

}

export default App
