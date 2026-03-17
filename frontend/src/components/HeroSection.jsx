import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RouteAddBlog } from "../helpers/RouteName";

const HeroSection = () => {
  const user = useSelector((state) => state.user);

  return (
    <section className="flex flex-col items-center justify-center text-center px-6 sm:px-10 md:px-16 py-16">
      {!user?.isLoggedIn ? (
        <>
          {/* Guest Hero */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight max-w-3xl">
            Discover Stories That Matter
          </h1>
          <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl">
            Join our community of writers and readers sharing insights,
            experiences, and knowledge across diverse topics.
          </p>
          <Link to="/signup" className="mt-8">
            <button className="px-8 py-3 text-lg font-semibold cursor-pointer bg-[#0f766e] text-white rounded-full shadow-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg hover:scale-105">
              Join Now →
            </button>
          </Link>
        </>
      ) : (
        <>
          {/* Logged-In Hero */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight max-w-3xl">
            Welcome back, {user?.user?.fullName || "Writer"} 👋
          </h1>
          <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl">
            Ready to share your thoughts today? Start writing or explore what
            others are talking about.
          </p>
          <Link to={RouteAddBlog} className="mt-8">
            <button className="px-8 py-3 text-lg font-semibold cursor-pointer bg-blue-600 text-white rounded-full shadow-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg hover:scale-105">
              Create a Blog →
            </button>
          </Link>
        </>
      )}
    </section>
  );
};

export default HeroSection;
