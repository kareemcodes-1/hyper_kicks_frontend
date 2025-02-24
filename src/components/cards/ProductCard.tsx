
import { Product } from "../../types/types";
import { Skeleton } from "../ui/skeleton";

const ProductCard = ({ product, loading }: { product: Product, loading: boolean }) => {
  

  return (
   <>
    {loading ? (
        <Skeleton className="h-[500px] w-full mr-[1rem]" />
      ) : (
     <a
      href={`/products/product/${product._id}`}
      className=" lg:p-0 p-[1rem] w-full border border-black border-t h-[500px] flex flex-col gap-0 text-center items-center justify-center relative"
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
              <p className="font-medium text-[2rem] leading-[1rem] uppercase mb-2 bebas">
                {product.name}
              </p>
            </div>
            <p className="font-medium text-[1.5rem] text-start bebas">
              ${product.price.toFixed(2)}
            </p>
          </div>
          <div className="border border-black p-[.3rem] rounded-[1rem]">
            {product.collectionId.name}
          </div>
        </div>
      </div>
    </a>
       )}
   </>
  );
};

export default ProductCard;
