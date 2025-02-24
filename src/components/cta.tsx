

const CTA = () => {
  return (
    <div className="lg:block hidden mb-[5rem] mt-[-1.5rem] relative text-black overflow-hidden">
    <div className="lg:container-1">
      <div className="text-center mx-[1.5rem] font-medium lg:text-[5rem] text-[2.8rem]">
        VENTURE AWAITS WITH THE LATEST EXCLUSIVE ADIDAS SNEAKER COLLECTION
      </div>
    
      <div className="absolute lg:top-0 top-[-4rem] z-[-1]">
        <img
          src={"/p.jpg"}
          alt=""
          className="w-[15rem] h-[15rem] object-cover"
        />
      </div>
    
      <div className="absolute bottom-0 right-0 z-[-1]">
        <img
          src={"/p2.webp"}
          alt=""
          className="w-[15rem] h-[15rem] object-cover rotate-[20deg]"
        />
      </div>
    </div>
    </div>
  )
}

export default CTA