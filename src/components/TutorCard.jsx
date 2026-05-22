

// import { Button } from "@heroui/react";
// import { FiExternalLink } from "react-icons/fi";
// import Image from "next/image";
// import { LuMapPin } from "react-icons/lu";
// import { FaRegCalendar } from "react-icons/fa6";
// import Link from "next/link";

// const TutorCard = ({ tutor }) => {
//   const { _id, imageUrl, fee, tutorName, experience, location } = tutor;

//   return (
//     <div className="border rounded-xl overflow-hidden">
      
//       <Image
//         className="w-full h-64 object-cover"
//         alt={tutorName}
//         src={imageUrl}
//         height={400}
//         width={400}
//       />

//       <div className="p-3">
//         <div className="flex items-center gap-1 text-gray-500">
//           <LuMapPin />
//           <span>{location}</span>
//         </div>

//         <div className="flex justify-between mt-2">
//           <div>
//             <h2 className="text-xl font-bold">{tutorName}</h2>

//             <div className="flex gap-1 items-center text-gray-500">
//               <FaRegCalendar />
//               {experience}
//             </div>
//           </div>

//           <div>
//             <h3 className="text-2xl font-bold">$ {fee}</h3>
//           </div>
//         </div>

//         <Link href={`/tutors/${_id}`}>
//           <Button
//             variant="ghost"
//             className="mt-3 text-cyan-500"
//           >
//             <FiExternalLink />
//             See Details
//           </Button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default TutorCard;
import { Button } from "@heroui/react";
import { FiExternalLink } from "react-icons/fi";
import Image from "next/image";
import { LuMapPin } from "react-icons/lu";
import { FaRegCalendar } from "react-icons/fa6";
import Link from "next/link";

const TutorCard = ({ tutor }) => {
  const {
    _id,
    tutorName,
    photoURL,
    subject,
    availableDays,
    hourlyFee,
    institution,
    experience,
    location,
    teachingMode,
    sessionStartDate,
  } = tutor;

  return (
    <div className="border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300 bg-white">
      
      {/* Tutor Image */}
      <div className="relative w-full h-64">
        <Image
          src={
            photoURL ||
            "https://via.placeholder.com/400x300.png?text=No+Image"
          }
          alt={tutorName || "Tutor"}
          fill
          className="object-cover"
        />
      </div>

      {/* Card Content */}
      <div className="p-4">

        {/* Subject + Mode */}
        <div className="flex justify-between items-center">
          <span className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-sm font-medium">
            {subject}
          </span>

          <span className="text-sm text-gray-500">
            {teachingMode}
          </span>
        </div>

        {/* Name */}
        <h2 className="text-2xl font-bold mt-3">
          {tutorName}
        </h2>

        {/* Institution */}
        <p className="text-gray-500">
          {institution}
        </p>

        {/* Location */}
        <div className="flex items-center gap-2 text-gray-500 mt-3">
          <LuMapPin />
          <span>{location}</span>
        </div>

        {/* Experience */}
        <div className="flex items-center gap-2 text-gray-500 mt-2">
          <FaRegCalendar />
          <span>{experience}</span>
        </div>

        {/* Available Days */}
        <p className="mt-2 text-sm text-gray-600">
          <span className="font-semibold">Available:</span>{" "}
          {availableDays}
        </p>

        {/* Session Start */}
        <p className="text-sm text-gray-600 mt-1">
          <span className="font-semibold">Start Date:</span>{" "}
          {sessionStartDate}
        </p>

        {/* Fee */}
        <div className="mt-4 flex justify-between items-center">
          <h3 className="text-2xl font-bold text-cyan-600">
            ৳ {hourlyFee}/hr
          </h3>

          <Link href={`/tutors/${_id}`}>
            <Button
              variant="ghost"
              className="text-cyan-500"
            >
              <FiExternalLink />
              See Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TutorCard;