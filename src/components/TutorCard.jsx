// import { Button, Calendar } from "@heroui/react";
// import { FiExternalLink } from "react-icons/fi";
// import Image from "next/image";
// import { LuMapPin } from "react-icons/lu";
// import { FaRegCalendar } from "react-icons/fa6";
// import Link from "next/link";
// const TutorCard = ({ tutor }) => {
//   const { _id, imageUrl, fee, tutorName, experience, location,subject } = tutor;

//   return (
//     <div className="border">
//       <Image
//         className=""
//         alt={tutorName}
//         src={imageUrl}
//         height={400}
//         width={400}
//       />

//       <div className="p-2">
//         <div className="flex items-center gap-1">
//           <LuMapPin /> <span>{location}</span>
//         </div>
//         <div className="flex justify-between">
//           <div>
//             <div>
//               <h2 className="text-xl font-bold">{tutorName}</h2>
//             </div>
//             <div className="flex gap-1 items-center">
//               <FaRegCalendar /> {experience}
//             </div>
//           </div>

//           <div>
//             <h3 className="text-2xl font-bold">$ {fee}</h3>
//           </div>
//         </div>
//         <Link href={`/tutors/${_id}`}><Button variant="ghost" className={'mt-1 text-cyan-500'}> <FiExternalLink/> Book Now</Button></Link>
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
  const { _id, imageUrl, fee, tutorName, experience, location } = tutor;

  return (
    <div className="border rounded-xl overflow-hidden">
      
      <Image
        className="w-full h-64 object-cover"
        alt={tutorName}
        src={imageUrl}
        height={400}
        width={400}
      />

      <div className="p-3">
        <div className="flex items-center gap-1 text-gray-500">
          <LuMapPin />
          <span>{location}</span>
        </div>

        <div className="flex justify-between mt-2">
          <div>
            <h2 className="text-xl font-bold">{tutorName}</h2>

            <div className="flex gap-1 items-center text-gray-500">
              <FaRegCalendar />
              {experience}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold">$ {fee}</h3>
          </div>
        </div>

        <Link href={`/tutors/${_id}`}>
          <Button
            variant="ghost"
            className="mt-3 text-cyan-500"
          >
            <FiExternalLink />
            See Details
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default TutorCard;
