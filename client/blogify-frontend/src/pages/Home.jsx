const Home = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-amber-300 flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-2xl text-center animate-fadeIn">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-800 mb-4 leading-tight">
          Welcome to <span className="text-blue-600">Blogify</span>
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-gray-700 mb-8">
          Your personal space to write, edit, and share your thoughts with style and simplicity.
        </p>
        <a
          href="/dashboard"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg shadow-md transition duration-300"
        >
          Get Started
        </a>
      </div>
    </div>
  );
};

export default Home;
