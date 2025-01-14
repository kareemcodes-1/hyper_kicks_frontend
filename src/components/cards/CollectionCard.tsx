import { useEffect, useRef } from "react";
import { Collection } from "../../types/types";
import { MdArrowOutward } from "react-icons/md";
import { Link } from "react-router";
import gsap from "gsap";
import ScrollTrigger from "gsap-trial/ScrollTrigger";
import SplitText from "gsap-trial/SplitText";

gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollTrigger);

const CollectionCard = ({
  collection,
  isLoading,
}: {
  collection: Collection;
  isLoading: boolean;
}) => {
  
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isLoading && ref.current) {
      gsap.fromTo(
        ref.current,
        { y: "100%" },
        { y: "0", duration: 1, ease: "power3.out", stagger: 0.2, }
      );
    }
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <div className="skeleton lg:h-[450px] h-[300px] w-full"></div>
      ) : (
        <div
          ref={ref}
          className="lg:h-[450px] h-[300px] relative border border-black overflow-hidden"
        >
          <Link to={`/collections/collection/${collection._id}`}>
            <img
              src={collection.image}
              alt={collection.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-[1rem] right-[1rem] text-[3rem] text-white flex items-start gap-[.3rem]">
              <h1>{collection.name}</h1>
              <MdArrowOutward />
            </div>
          </Link>
        </div>
      )}
    </>
  );
};

export default CollectionCard;
