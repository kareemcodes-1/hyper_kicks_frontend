
import FadeContent from "../../lib/fade-content";
import { Product } from "../../types/types";

const ProductCard = ({ product }: { product: Product }) => {
  

  return (
   <>

      <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
     <a
      href={`/products/product/${product._id}`}
      className=" lg:p-0 p-[1.5rem] w-full border border-black border-t h-[520px] flex flex-col gap-0 text-center items-center justify-center relative"
    >
      <div>
        <img
          src={product.images[0]}
          alt="product"
          className="h-[390px] lg:w-[25rem] w-[22rem] top-[1rem] left-[1rem] right-0 object-cover mb-[.5rem] border border-black"
        />
        <div className="flex items-start justify-between pt-[.5rem]">
          <div className="bottom-[1.5rem] left-[.5rem] ">
            <div className="text-start">
              <p className="font-medium text-[2rem] leading-[2.5rem] uppercase mb-2 bebas truncate max-w-[20rem]">
  {product.name}
</p>

            </div>
            <p className="font-medium text-[1.5rem] text-start bebas">
              ${product.price.toFixed(2)}
            </p>
          </div>
          <div className="lg:block hidden border border-black p-[.3rem] rounded-[1rem]">
            {product.collectionId.name}
          </div>
        </div>
      </div>
    </a>
    </FadeContent>
   </>
  );
};

export default ProductCard;
