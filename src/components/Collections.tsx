import { useEffect, useRef, useState } from "react";
import { useStore } from "../store/store";
import gsap from "gsap";
import { MdArrowOutward } from "react-icons/md";
import { Link } from "react-router";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Skeleton from "react-loading-skeleton";

gsap.registerPlugin(ScrollTrigger);

function Collections() {
  const { collections, setCollections } = useStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]); // Create an array of refs

  useEffect(() => {
    setIsLoading(true);
    fetch(`${import.meta.env.VITE_SERVER_URL}/api/collections`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setCollections(data))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    // Iterate through each image ref and apply animation individually
    imageRefs.current.forEach((ref) => {
      if (ref) {
        gsap.fromTo(
          ref,
          { scale: 1.3 }, // Start state
          {
            scale: 1,
            duration: 1,
            delay: 0.54,
            ease: "easeInOut",
            scrollTrigger: {
              trigger: ref,
              start: "top 100%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
              markers: false,
            },
          }
        );
      }
    });
  }, [collections]);

  return (
    <div className="lg:grid flex flex-col lg:grid-cols-3 mt-[2rem] lg:gap-0 gap-[1rem] lg:px-[1.5rem] px-[1rem] overflow-hidden">
      {collections.length > 0 &&
        collections.map((collection, index) =>
          isLoading ? (
            <Skeleton className="lg:h-[450px] h-[300px] w-full mr-[1rem] rounded-xl" />
          ) : (
            <div className="lg:h-[500px] h-[300px] relative border border-black overflow-hidden">
              <Link to={`/collections/collection/${collection._id}`}>
                <img
                  src={collection.image}
                  alt={collection.name}
                  ref={(el) => {
                    imageRefs.current[index] = el;
                  }}
                  className="w-full h-full object-cover"
                />

                {/* Black overlay */}
                <div className="absolute inset-0 bg-black opacity-40 hover:opacity-60 transition-opacity duration-300"></div>

                <div className="absolute bottom-[1rem] right-[1rem] text-[3rem] text-white flex items-center justify-center gap-[.3rem] z-10">
                  <h1 className="text-white">{collection.name}</h1>
                  <MdArrowOutward />
                </div>
              </Link>
            </div>
          )
        )}
    </div>
  );
}

export default Collections;
