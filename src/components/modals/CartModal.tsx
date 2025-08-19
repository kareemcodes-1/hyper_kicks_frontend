import { createPortal } from "react-dom";
import { useStore } from "../../store/store";
import MarqueeCheckoutBtn from "../MarqueeCheckoutBtn";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const CartModal = () => {
  const { products, cart, incrementQuantity, decrementQuantity, totalAmount, deleteCartItem, deleteAllCartItems, openCartModal, setOpenCartModal } = useStore();
  const ref = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    console.log("openCartModal:", openCartModal);
    const modal = ref.current;
  
    if (openCartModal && modal) {
      // Open animation
      gsap.fromTo(
        modal,
        { x: "100%" },
        { x: 0, duration: 0.7, ease: "power3.inOut" }
      );
    }  else if (!openCartModal && modal) {
      // Close animation
      gsap.to(modal, {
        x: "100%",
        duration: 0.5,
        ease: "power3.inOut",
      });
    }
  }, [openCartModal]);

  const handleClose = () => {
    setOpenCartModal(false); // Update state before animation starts
  };
  

  return createPortal(
    <div
      className={`fixed top-0 right-0 h-screen lg:w-[60%] w-full shadow-lg z-[100] transform transition-transform duration-300
      `}
    >
      <div className="flex h-full bg-white"  ref={ref}>
        <div className="w-[40%] lg:block hidden h-full overflow-y-auto">
          <div className="">
            <h2 className="text-[2.5rem] p-[.5rem]">ANYTHING ELSE?</h2>
          </div>

          <div className="flex flex-col">
            {products.map((product) => (
              <div
                key={product._id}
                className="w-full p-[1rem] border border-black border-t h-[500px] flex flex-col gap-0 text-center items-center justify-center relative"
              >
                <a href={`/products/product/${product._id}`}>
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="h-[380px] w-[18rem] top-[1rem] left-[1rem] right-0  object-cover mb-[.5rem] border border-black"
                  />

                  <div className="flex items-start justify-between pt-[.5rem]">
                    <div className="bottom-[1.5rem] left-[.5rem] ">
                      <div className="text-start">
                        <p className=" text-[2rem] leading-[1.5rem] uppercase mb-2 bebas">
                          {product.name}
                        </p>
                      </div>
                      <p className="font-medium text-[1.5rem] text-start bebas">
                        ${product.price}
                      </p>
                    </div>
                    {/* <div className="border border-black p-[.3rem] rounded-[1rem]">
                      {product.collectionId.name}
                    </div> */}
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:w-[60%] w-full lg:border-l border-black h-full sticky top-0">
          <h1 className="text-[2rem] p-[1rem]">YOUR BAG</h1>
          <div
            className="absolute right-[1rem] top-[1rem] text-[1.8rem] cursor-pointer bebas"
            onClick={handleClose}
          >
            Close
          </div>

          {cart.length > 0 ? (
            cart.map((item) => (
              <div className="flex items-center justify-between w-full p-[1rem]">
                <div className="flex items-start gap-[1rem]">
                  <img
                    src={item.product.images[0]}
                    alt=""
                    className="w-[5rem] h-[5rem] border border-black object-cover"
                  />
  
                  <div>
                    <h1 className="text-[1.5rem]">{item.product.name}</h1>
                    {item.product.sizes.length > 0 && (
                      <div>
                      {/* Sizes: */}
                      {item.product.sizes.map((size) => (
                         <span className="text-[1rem]">{size}</span>
                      ))}
                      </div>
                    )}
                    <span className="text-[1rem] bebas">${item.product.price}</span>
                  </div>
                </div>
  
                <div className="flex items-center gap-[1rem]">
                <div className="rounded-[1rem] flex items-center justify-center w-[4rem] gap-[.5rem] p-[.5rem] h-[2.2rem] border border-black">
                  <button
                    className="text-[1.5rem] azert-mono font-light"
                    onClick={() => decrementQuantity(item.product._id)}
                  >
                    -
                  </button>
                  <div className="text-[1.2rem]">{item.quantity}</div>
                  <button
                    className="text-[1.5rem] azert-mono font-light"
                    onClick={() => incrementQuantity(item.product._id)}
                  >
                    +
                  </button>
                </div>
  
                <Trash className="cursor-pointer text-rose-500" onClick={() => {deleteCartItem(item.product._id); toast.success('Deleted Item');}}/>
                </div>
              </div>
            ))
          ) : (
              <div className="text-center flex items-center justify-center mt-[10rem]">CART IS EMPTY...</div>
          )}

          <div className="absolute bottom-0 w-full">
               <div className="w-full border-t border-black">
                   <div className="py-[.5rem] px-[1rem] flex items-center justify-between">
                    <h2 className="text-[1.5rem]">GRAND TOTAL</h2>

                   <div>
                       <span className="text-[1.3rem]">${totalAmount}</span>
                   </div>
                   </div>
               </div>

               <div className="w-full border-t border-black">
                   <div className="flex items-center justify-between w-full px-[.4rem] py-[1rem] gap-[.5rem]">
                   <button type="button" className='bg-transparent border border-black text-black px-4 h-[3rem] rounded-[10rem] w-full bebas text-[2rem]' 
                   onClick={() => {
                    deleteAllCartItems()
                    toast.success('Deleted Cart');
                   }}>DELETE ALL</button>
                   <MarqueeCheckoutBtn />
                   </div>
               </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default CartModal;
