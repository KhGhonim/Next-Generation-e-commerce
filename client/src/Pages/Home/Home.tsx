import CardsGrid from "../../Components/HomePage/CardsGrid/CardsGrid";
import HeroSection from "../../Components/HomePage/HeroSection/HeroSection";
import LevelUP from "../../Components/HomePage/LevelUP/LevelUP";
import Performance from "../../Components/HomePage/Performance/Performance";
import WorkOut from "../../Components/HomePage/WorkOut/WorkOut";

function Home() {
  return (
    <div>
      <HeroSection />
      <WorkOut />
      <Performance />
      <LevelUP />
      <CardsGrid />
    </div>
  );
}

export default Home;
