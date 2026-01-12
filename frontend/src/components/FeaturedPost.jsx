import React from "react";
import Card from "./Card";

const FeaturedPost = () => {
  const cards = [
    {
      category: "Technology",
      views: "350",
      title: "The Future of Remote Work: Trends for 2026",
      description:
        "Remote work shifted from a temporary necessity to a permanent fixture in our professional lives. As we move into...",
      author: "Arin Yadav",
      date: "Jan 1, 2026",
      id: Math.random(),
    },
    {
      category: "Lifestyle",
      views: "1050",
      title: "Mindful Morning Routines That Actually Work",
      description:
        "Starting your day with intention can completely transform your life. After years of experimenting with different morning routines,",
      author: "Arin Yadav",
      date: "Jan 1, 2026",
      id: Math.random(),
    },
    {
      category: "Lifestyle",
      views: "1050",
      title: "Mindful Morning Routines That Actually Work",
      description:
        "Starting your day with intention can completely transform your life. After years of experimenting with different morning routines,",
      author: "Arin Yadav",
      date: "Jan 1, 2026",
      id: Math.random(),
    },
  ];

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 pt-10">
      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center">
        Featured Stories
      </h3>
      {/* container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto p-4 sm:p-6">
        {cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedPost;
