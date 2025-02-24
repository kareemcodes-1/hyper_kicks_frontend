import Marquee from "react-fast-marquee";

export default function GetNow() {
  return (
    <section className=" get-now mt-[2rem] relative overflow-hidden">
      <div className="get-now-container lg:container-1">
        <video
          src="/sneakerpreview.mp4"
          loop
          autoPlay
          preload="true"
          muted
          className="lg:h-[650px] h-[400px] w-full object-cover"
        ></video>
        <Marquee className="absolute bottom-[11rem] bebas">
          <div className="text-[10rem] text-black">
            100% QUALITY SNEAKERS AVAILABLE
          </div>
        </Marquee>
      </div>
    </section>
  );
}