import FeaturedPost from "../components/FeaturedPost";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <FeaturedPost />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
