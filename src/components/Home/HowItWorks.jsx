const HowItWorks = () => {
  return (
    <section className="py-20 px-4 md:px-10 lg:px-20 bg-gray-50 text-center">
      
      <p className="text-blue-600 font-semibold uppercase tracking-wider mb-3">
        How It Works
      </p>

      <h2 className="text-3xl md:text-5xl font-bold mb-14">
        Book Your Tutor In 3 Easy Steps
      </h2>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-8">
        
        {/* Card 1 */}
        <div className="bg-white shadow-xl rounded-3xl p-8 hover:-translate-y-2 transition duration-300 border">
          <div className="text-5xl mb-5">🔍</div>

          <h3 className="text-2xl font-semibold mb-4">
            Search Tutors
          </h3>

          <p className="text-gray-600 leading-relaxed">
            Find tutors based on subject, schedule, and teaching style.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white shadow-xl rounded-3xl p-8 hover:-translate-y-2 transition duration-300 border">
          <div className="text-5xl mb-5">📅</div>

          <h3 className="text-2xl font-semibold mb-4">
            Book Session
          </h3>

          <p className="text-gray-600 leading-relaxed">
            Select your preferred time slot and confirm booking.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white shadow-xl rounded-3xl p-8 hover:-translate-y-2 transition duration-300 border">
          <div className="text-5xl mb-5">🚀</div>

          <h3 className="text-2xl font-semibold mb-4">
            Start Learning
          </h3>

          <p className="text-gray-600 leading-relaxed">
            Join live sessions and improve your academic performance.
          </p>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;