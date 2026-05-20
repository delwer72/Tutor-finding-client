

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20 px-6 md:px-16 py-16">

      <div className="max-w-7xl mx-auto">

        {/* Brand */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            MEDIQUEUE
          </h1>

          <p className="mt-3 max-w-xl text-gray-400">
            A smart tutor booking platform that helps students connect with
            expert tutors, schedule sessions, and learn efficiently without conflicts.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Services */}
          <div>
            <h3 className="text-white mb-4 font-semibold">SERVICES</h3>
            <ul className="space-y-2 text-sm">
              <li>Find Tutors</li>
              <li>Book Sessions</li>
              <li>Online Learning</li>
              <li>Skill Development</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white mb-4 font-semibold">QUICK LINKS</h3>
            <ul className="space-y-2 text-sm">
              <li>Home</li>
              <li>Tutors</li>
              <li>My Bookings</li>
              <li>Profile</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white mb-4 font-semibold">SUPPORT</h3>
            <ul className="space-y-2 text-sm">
              <li>Help Center</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white mb-4 font-semibold">CONTACT</h3>
            <ul className="space-y-2 text-sm">
              <li>📞 +880 12340000</li>
              <li>📧 support@mediqueue.com</li>
              <li>📍 Dhaka, Bangladesh</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">

          <p className="text-sm text-gray-400">
            © 2026 Tutor Finder. All rights reserved.
          </p>

          <div className="flex gap-5 mt-4 md:mt-0 text-white text-lg">
            <span className="cursor-pointer hover:text-blue-400">X</span>
            <span className="cursor-pointer hover:text-blue-400">in</span>
            <span className="cursor-pointer hover:text-blue-400">f</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;