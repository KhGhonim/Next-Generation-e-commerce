import Performance1 from "../../../assets/Performance1.avif";
import Performance2 from "../../../assets/Performance2.avif";

function Performance() {
  return (
    <section className="w-full pt-20 lg:pt-28 h-dvh SectionS px-8 lg:px-16 overflow-hidden">
      <div className="w-full h-24 lg:h-32">
        <h6 className="stick-regular text-xs">Our Top Picks</h6>
        <div className="flex flex-col lg:flex-row gap-1.5 justify-between w-full pt-2.5">
          <h1 className="stick-bold text-xl lg:text-5xl lg:w-3/6">
            Top Dress up Gear for Peak Performance!
          </h1>
          <h6 className="stick-regular text-sm hidden lg:block">
            Discover the best of our collections, all in one place
          </h6>
        </div>
      </div>

      <div className="relative lg:pt-3 flex gap-5 lg:gap-10 flex-col lg:flex-row w-full h-full">
        <div className="w-full lg:w-1/2 rounded-3xl h-72 lg:h-full relative overflow-hidden">
          <img
            src={Performance1}
            className="w-full h-full object-cover rounded-4xl"
            alt=""
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/4 w-full h-full">
            <h1 className="stick-bold text-base lg:text-5xl w-4/6 px-5">
              Top Dress up Gear for Peak Performance
            </h1>
            <button className="stick-bold text-xs p-2 px-6 mx-10 mt-3.5 rounded-full bg-transparent border cursor-pointer hover:bg-gray-50 transition-colors duration-300 ease-in-out stick-regular">
              Shop Now
            </button>
          </div>
        </div>
        <div className="w-full lg:w-1/2 rounded-3xl h-72 lg:h-full relative">
          <img
            src={Performance2}
            className="w-full h-full object-cover rounded-4xl"
            alt=""
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/12 w-full h-full">
            <h1 className="stick-bold text-base lg:text-5xl w-4/6 px-5">
              Top Dress up Gear for Peak Performance
            </h1>
            <button className="stick-bold text-xs p-2 px-6 mx-10 mt-3.5 rounded-full bg-transparent border cursor-pointer hover:bg-gray-50 transition-colors duration-300 ease-in-out stick-regular">
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Performance;
