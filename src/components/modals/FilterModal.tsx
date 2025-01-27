import{ useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion"

import { Slider } from "../../components/ui/slider"
import { Switch } from "../../components/ui/switch"
import { useStore } from '../../store/store';
import { formatCurrency } from '../../lib/formatCurrency';
import gsap from 'gsap';




const FilterModal = ({openFilterModal, closeModal} : {openFilterModal: boolean; closeModal: () => void;}) => {

  const [value, setValue] = useState<number>(0);
  const {collections, handleFilterByPrice, resetFilter, handleFilterByInStock} = useStore();
  const [inStock, setInStock] = useState<boolean>(true);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const modal = ref.current;
  
    if (openFilterModal && modal) {
      // Open animation
      gsap.fromTo(
        modal,
        { x: "100%" },
        { x: 0, duration: 0.7, ease: "power3.inOut" }
      );
    }  else if (!openFilterModal && modal) {
      // Close animation
      gsap.to(modal, {
        x: "100%",
        duration: 0.5,
        ease: "power3.inOut",
      });
    }
  }, [openFilterModal]);


  return createPortal(
      <div ref={ref}
        className={`fixed top-0 right-0 h-screen lg:w-[40%] w-full bg-white shadow-lg p-[1rem] z-[100]`}
      >
          <div className='w-full border-b border-black'>
          <h1 className="text-[2rem]">FILTERS</h1>
          <div onClick={closeModal}
            className="absolute right-[1rem] top-[1rem] text-[1.8rem] cursor-pointer bebas"
          >
            Close
          </div>
          </div>

          <div>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                <AccordionTrigger className='text-[1.5rem]'>PRICE</AccordionTrigger>
                   <AccordionContent>
                   <Slider defaultValue={[0]} max={10000} step={100} onValueChange={(values) => {
                    const maxPrice = values[0];
                     setValue(maxPrice);
                     handleFilterByPrice(maxPrice);}}/>
                   <div className="mt-2 text-center">
                       Price: {formatCurrency(value)}
                    </div>
                   </AccordionContent>
                 </AccordionItem>
              </Accordion>
          </div>

          <div>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                <AccordionTrigger className='text-[1.5rem]'>AVAILIABLITY</AccordionTrigger>
                   <AccordionContent>
                      <div className='flex items-center gap-[3rem]'>
                      <div className='flex items-start gap-[.3rem]'>
                           <Switch defaultChecked={inStock} onClick={() => {setInStock((prevInStock) => !prevInStock); handleFilterByInStock(inStock)}}/>
                           <p>In Stock </p>
                      </div>
                      </div>
                  </AccordionContent>
                 </AccordionItem>
              </Accordion>
          </div>

          <div>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                <AccordionTrigger className='text-[1.5rem]'>SIZE</AccordionTrigger>
                   <AccordionContent>
                       Yes. It adheres to the WAI-ARIA design pattern.
                   </AccordionContent>
                 </AccordionItem>
              </Accordion>
          </div>

          <div>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                <AccordionTrigger className='text-[1.5rem]'>CATEGORIES</AccordionTrigger>
                   <AccordionContent>
                       <div className='flex flex-col gap-[.3rem]'>{collections.map((collection) => (
                            <a href={`collections/collection/${collection._id}`} className='azert-mono text-gray-500'>{collection.name} collection</a>
                       ))}</div>
                   </AccordionContent>
                 </AccordionItem>
              </Accordion>
          </div>

          <button type="button" onClick={resetFilter}>Reset Filter</button>
      </div>,
      document.body
    );
}

export default FilterModal