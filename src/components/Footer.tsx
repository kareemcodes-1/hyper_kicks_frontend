import { useStore } from "../store/store";


const Footer = () => {

    const {collections} = useStore();

  return (
    <div className='bg-black w-full lg:grid grid-cols-2'>
      <h1 className=" text-[5rem] lg:px-0 px-[.5rem] xs:text-[4rem] lg:text-[15rem] lg:leading-[15rem] text-white overflow-hidden">
         DROP US A LINE
       </h1>


          <div className='border border-l text-white grid grid-cols-2'>
                    <div className='border border-white p-[1rem]'>
                         <h1 className='text-[3rem]'>LOCATION</h1>
                        
                        <div>
                        <p>
                             Abuja lagos nigeria
                         </p>
                         <p>
                             Abuja lagos nigeria
                         </p>
                         <p>
                             Abuja lagos nigeria
                         </p>
                        </div>
                    </div>

                    <div className='border border-white p-[1rem]'>
                         <h1 className='text-[3rem]'>CONTACT</h1>
                        
                        <div>
                        <p>
                             Abuja lagos nigeria
                         </p>
                         <p>
                             Abuja lagos nigeria
                         </p>
                         <p>
                             Abuja lagos nigeria
                         </p>
                        </div>
                    </div>

                    <div className='border border-white p-[1rem]'>
                         <h1 className='text-[3rem]'>STALK US</h1>
                        
                        <div className="flex flex-col gap-[.5rem]">
                        <p className="text-[1.3rem]">
                             Instagram
                         </p>
                         <p className="text-[1.3rem]">
                             Facebook
                         </p>
                         <p className="text-[1.3rem]">
                             Linkedin
                         </p>
                        </div>
                    </div>
                    <div className='border border-white p-[1rem]'>
                         <h1 className='text-[3rem]'>SHOP</h1>
                        
                        <div className="flex flex-col gap-[.5rem]">
                          {collections.map((collection) => (
                              <p className="text-[1.3rem]">
                                {collection.name}
                              </p>
                          ))}
                        </div>
                    </div>
          </div>
    </div>
  )
}

export default Footer;