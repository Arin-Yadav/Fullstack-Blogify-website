import React from "react";
import CategorySelect from "./CategorySelect";

const HeroSection = () => {
  return (
    <div className="min-h-screen flex flex-col pt-12">
      <CategorySelect />

      <section className="flex flex-col justify-center items-center gap-6 sm:gap-8 px-4 sm:px-8 py-4">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-center max-w-xl md:max-w-2xl">
          Discover Stories That Matter
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-center opacity-90 max-w-lg md:max-w-2xl">
          Join our community of writers and readers sharing insights,
          experiences, and knowledge across diverse topics.
        </p>

        <div className="w-full text-center">
          <a href="#">
            <button className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 text-base sm:text-lg font-bold bg-[#0f766e] text-white rounded-full transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg hover:scale-105 cursor-pointer">
              Explore Articles <span>→</span>
            </button>
          </a>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
