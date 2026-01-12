import FeaturedPost from "../components/FeaturedPost";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";

const Home = () => {
  return (
    <div>
      <header>
        <Navbar />
      </header>

      <main>
        <HeroSection />
        <FeaturedPost />
        <Newsletter />
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
