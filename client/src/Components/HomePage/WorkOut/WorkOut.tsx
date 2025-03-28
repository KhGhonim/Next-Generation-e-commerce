import left from "../../../assets/left.avif";
import mid from "../../../assets/mid.avif";
import right from "../../../assets/right.avif";

function WorkOut() {
  return (
    <section className="w-full pt-10 h-dvh SectionS relative flex flex-col lg:flex-row p-5 overflow-hidden">
      <div className="lg:w-1/4   h-full flex justify-evenly max-lg:items-start lg:items-center flex-col">
        <div className="w-64 h-64 lg:h-80 rounded-4xl">
          <img
            className="w-full h-full rounded-4xl object-cover"
            src={right}
            alt=""
          />
        </div>

        <div className="text-center w-full hidden lg:block">
          <h3 className="text-sm stick-regular">
            Performance driven gear for men - but for summer heat and winter
            cold
          </h3>
        </div>
      </div>
      <div className="lg:w-2/4 z-30  h-full flex justify-center items-center flex-col max-lg:absolute max-lg:top-1/2 max-lg:left-1/2 max-lg:transform max-lg:-translate-x-1/2 max-lg:-translate-y-1/2">
        <div className="w-96 max-lg:w-64 max-lg:h-64 h-[30rem] rounded-4xl">
          <img
            className="w-full h-full rounded-4xl object-cover"
            src={mid}
            alt=""
          />
        </div>
      </div>
      <div className="lg:w-1/4   h-full flex justify-evenly items-end lg:items-center flex-col-reverse">
        <div className="w-64 h-80 rounded-4xl">
          <img
            className="w-full h-full rounded-4xl object-cover"
            src={left}
            alt=""
          />
        </div>

        <div className="text-center w-full hidden lg:block">
          <h3 className="text-sm stick-regular">
            Stay warm, stay fit. Our winter workout wear bleds insulation with
            flexebility to keep you going in the toughest conditions.
          </h3>
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-lg:-rotate-90  text-center text-7xl font-bold stick-bold">
        <h1 className="text-[200px] lg:text-[350px] leading-[300px] text-zinc-400 text-center">
          Dress Up
        </h1>
      </div>
    </section>
  );
}

export default WorkOut;
