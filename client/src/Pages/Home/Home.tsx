import HeroSection from "../../Components/HomePage/HeroSection/HeroSection";
import Performance from "../../Components/HomePage/Performance/Performance";
import WorkOut from "../../Components/HomePage/WorkOut/WorkOut";

function Home() {
  return (
    <div>
      <HeroSection />
      <WorkOut />
      <Performance />
    </div>
  );
}

export default Home;
