
import { useEffect } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import SplitText from "gsap-trial/SplitText";

gsap.registerPlugin(SplitText);


const MenuModal = ({
  closeModal,
  openMenuModal,
}: {
  closeModal: () => void;
  openMenuModal: boolean;
}) => {

    useEffect(() => {
        if(openMenuModal){
            const navLinks = new SplitText(document.querySelectorAll('.nav-links'), {type: "lines"});
            gsap.from(navLinks.lines, {
                yPercent: 100,
                stagger: 0.1,
                duration: 0.8,
                ease: "power3.inOut"
            })
        }
    }, [openMenuModal]);

  return createPortal(
    <div
      className={`fixed top-0 right-0 h-screen w-full bg-white shadow-lg z-[100] transform transition-transform duration-300 ${
        openMenuModal ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="">
          <div
            className="absolute right-[1rem] top-[1rem] text-[2rem] cursor-pointer bebas"
            onClick={closeModal}
          >
            CLOSE
          </div>
        </div>
      <div className="flex items-start flex-col p-[1rem] mt-[10rem] gap-[1rem]">
          <ul className="flex flex-col text-[3rem]">
               <li className="overflow-hidden"><a href="/" className="nav-links">HOME</a></li>
               <li className="overflow-hidden"><a href="/products" className="nav-links">PRODUCTS</a></li>
               <li className="overflow-hidden"><a href="/orders" className="nav-links">ORDERS</a></li>
          </ul>
      </div>
    </div>,
    document.body
  );
};

export default MenuModal;
