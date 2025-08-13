
import { Collection } from "../../types/types";
import { MdArrowOutward } from "react-icons/md";
import { Link } from "react-router";
import Skeleton from "react-loading-skeleton";
// import ScrollTrigger from "gsap-trial/ScrollTrigger";
// import SplitText from "gsap-trial/SplitText";

// gsap.registerPlugin(SplitText);
// gsap.registerPlugin(ScrollTrigger);

const CollectionCard = ({
  collection,
  isLoading,
  imageRef,
}: {
  collection: Collection;
  isLoading: boolean;
  imageRef: any;
}) => {
  


  return (
    <>
      {isLoading ? (
        <Skeleton className="lg:h-[450px] h-[300px] w-full mr-[1rem] rounded-xl" />
      ) : (
        <div
          className="lg:h-[450px] h-[300px] relative border border-black overflow-hidden"
        >
          <Link to={`/collections/collection/${collection._id}`}>
            <img
              src={collection.image}
              alt={collection.name}
              ref={imageRef}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-[1rem] right-[1rem] text-[3rem] text-white flex items-center justify-center gap-[.3rem]">
              <h1 className="text-white">{collection.name}</h1>
              <MdArrowOutward />
            </div>
          </Link>
        </div>
      )}
    </>
  );
};

export default CollectionCard;
