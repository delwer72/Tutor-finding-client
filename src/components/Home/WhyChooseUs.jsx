const WhyChooseUs = () => {
  return (
    <section className="grid md:grid-cols-2 gap-10 items-center py-20 px-4 md:px-10 lg:px-20 bg-base-100">
      
      {/* Image */}
      <div>
        <img
          src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655"
          alt="learning"
          className="w-full h-[400px] object-cover rounded-3xl shadow-2xl"
        />
      </div>

      {/* Content */}
      <div>
        <p className="text-blue-600 font-semibold mb-3 uppercase tracking-wider">
          Why Choose MediQueue
        </p>

        <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
          Smart Learning With Trusted Tutors
        </h2>

        <p className="text-gray-600 mb-8 leading-relaxed">
          MediQueue helps students connect with experienced tutors
          for personalized learning sessions anytime and anywhere.
        </p>

        <div className="space-y-5">
          
          {/* Feature 1 */}
          <div className="flex items-start gap-4">
            <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
              📚
            </div>

            <div>
              <h4 className="font-semibold text-lg">
                Expert Tutors
              </h4>

              <p className="text-gray-500">
                Learn from skilled and verified educators.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex items-start gap-4">
            <div className="bg-green-100 text-green-600 p-3 rounded-full">
              ⏰
            </div>

            <div>
              <h4 className="font-semibold text-lg">
                Flexible Scheduling
              </h4>

              <p className="text-gray-500">
                Easily book sessions based on your free time.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex items-start gap-4">
            <div className="bg-purple-100 text-purple-600 p-3 rounded-full">
              💻
            </div>

            <div>
              <h4 className="font-semibold text-lg">
                Online & Offline Classes
              </h4>

              <p className="text-gray-500">
                Attend classes from home or in-person.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;