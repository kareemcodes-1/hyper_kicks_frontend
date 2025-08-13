import Marquee from "react-fast-marquee";
import { useStore } from "../store/store";


const Footer = () => {

    const {collections} = useStore();

  return (
    <>
       <Marquee autoFill pauseOnHover className="lg:hidden flex  gap-[1rem] lg:px-0 px-[.5rem] text-[5rem] text-black overflow-hidden">
         <a href="tel:+2347063535374" className="mr-[1rem] lg:hidden">DROP</a>
         <a href="tel:+2347063535374" className="mr-[1rem] lg:hidden">US</a>
         <a href="tel:+2347063535374" className="mr-[1rem] lg:hidden">A</a>
         <a href="tel:+2347063535374" className="mr-[1rem] lg:hidden">CALL</a>
       </Marquee>
    <div className='bg-black w-full lg:grid grid-cols-2'>
      <h1 className="lg:block hidden text-[5rem] lg:px-[1.5rem] px-[1rem] xs:text-[4rem] lg:text-[15rem] lg:leading-[15rem] text-white overflow-hidden">
         DROP US <br /> A LINE
       </h1>


          <div className='border border-l text-white grid grid-cols-2'>
                    <div className='border border-white p-[1rem]'>
                         <h1 className='lg:text-[3rem] text-[2.5rem] text-white'>LOCATION</h1>
                        
                        <div className="lg:text-[1.1rem] text-[.9rem]">
                        <p>
                           Chicago, New York, Austin
                         </p>
                         <p>
                         Phoenix, Dallas, Baltimore
                         </p>
                         <p>
                         Denver, Detroit, Atlanta
                         </p>
                        </div>
                    </div>

                    <div className='border border-white p-[1rem]'>
                         <h1 className='lg:text-[3rem] text-[2.5rem] text-white'>CONTACT</h1>
                        
                        <div className="lg:text-[1.1rem] text-[.9rem]">
                        <p>
                             +1 287 901 3440
                         </p>
                         <p>
                             hyperkicks <br className="lg:hidden block"/> @gmail.com
                         </p>
                         <p>
                         374-666-873
                         </p>
                        </div>
                    </div>

                    <div className='border border-white p-[1rem]'>
                         <h1 className='lg:text-[3rem] text-[2.5rem] text-white'>STALK US</h1>
                        
                        <div className="flex flex-col gap-[.5rem]">
                        <p className="lg:text-[1.1rem] text-[.9rem]">
                             Instagram
                         </p>
                         <p className="lg:text-[1.1rem] text-[.9rem]">
                             Facebook
                         </p>
                         <p className="lg:text-[1.1rem] text-[.9rem]">
                             Linkedin
                         </p>
                        </div>
                    </div>
                    <div className='border border-white p-[1rem]'>
                         <h1 className='lg:text-[3rem] text-[2.5rem] text-white'>COLLECTIONS</h1>
                        
                        <div className="flex flex-col gap-[.5rem]">
                          {collections.map((collection) => (
                              <a href={`/collections/collection/${collection._id}`} className="lg:text-[1.1rem] text-[.9rem]">
                                {collection.name}
                              </a>
                          ))}
                        </div>
                    </div>
          </div>
    </div>
    </>
  )
}

export default Footer;