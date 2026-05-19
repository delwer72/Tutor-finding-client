// import BookingCard from "@/components/BookingCard";
// import { DeleteAlert } from "@/components/DeleteAlert";
// import { EditModal } from "@/components/EditModal";
// import { Button } from "@heroui/react";
// import Image from "next/image";
// import { BiEdit } from "react-icons/bi";
// import { FaRegCalendar } from "react-icons/fa6";
// import { LuMapPin } from "react-icons/lu";

// const DestinationDetailsPage = async ({ params }) => {
//   const { id } = await params;

//   const res = await fetch(`http://localhost:5000/destination/${id}`);
//   const destination = await res.json();

//   const { imageUrl, price, destinationName, duration, country, description } =
//     destination;

//   return (
//     <div className="max-w-7xl mx-auto">
//       <div className="flex  items-center gap-3 justify-end mt-5 mb-3">
//         <EditModal destination={destination} />
//         <DeleteAlert destination={destination}/>
//       </div>
//       <Image
//         className="w-full h-100 object-cover"
//         alt={destinationName}
//         src={imageUrl}
//         height={500}
//         width={800}
//       />

//      <div className="flex justify-between">
//        <div className="p-2">
//         <div className="flex items-center gap-1">
//           <LuMapPin /> <span>{country}</span>
//         </div>
//         <div className="flex justify-between">
//           <div>
//             <div>
//               <h2 className="text-xl font-bold">{destinationName}</h2>
//             </div>
//             <div className="flex gap-1 items-center">
//               <FaRegCalendar /> {duration}
//             </div>
//           </div>
//         </div>

//         <h1 className="mt-10 text-2xl font-bold">Overview</h1>

//         <p>{description}</p>
//       </div>


//       <BookingCard destination={destination}/>
//      </div>


//     </div>
//   );
// };

// export default DestinationDetailsPage;

import BookingCard from "@/components/BookingCard";
import { DeleteAlert } from "@/components/DeleteAlert";
import { EditModal } from "@/components/EditModal";
import Image from "next/image";
import { FaRegCalendar } from "react-icons/fa6";
import { LuMapPin } from "react-icons/lu";

const DestinationDetailsPage = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(
    `http://localhost:5000/destination/${id}`,
    {
      cache: "no-store",
    }
  );

  const destination = await res.json();

  const {
    imageUrl,
    destinationName,
    duration,
    country,
    description,
  } = destination;

  return (
    <div className="max-w-7xl mx-auto p-4">
      
      {/* Top Buttons */}
      <div className="flex items-center gap-3 justify-end mt-5 mb-3">
        <EditModal destination={destination} />
        <DeleteAlert destination={destination} />
      </div>

      {/* Image */}
      <Image
        className="w-full h-[500px] object-cover rounded-xl"
        alt={destinationName}
        src={imageUrl}
        height={500}
        width={1200}
      />

      {/* Content */}
      <div className="flex flex-col lg:flex-row justify-between gap-10 mt-8">
        
        {/* Left Side */}
        <div className="flex-1">
          <div className="flex items-center gap-2 text-gray-600">
            <LuMapPin />
            <span>{country}</span>
          </div>

          <h1 className="text-3xl font-bold mt-3">
            {destinationName}
          </h1>

          <div className="flex items-center gap-2 mt-2 text-gray-600">
            <FaRegCalendar />
            <span>{duration}</span>
          </div>

          <h2 className="mt-10 text-2xl font-bold">
            Overview
          </h2>

          <p className="mt-4 text-gray-700 leading-7">
            {description}
          </p>
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-[400px]">
          <BookingCard destination={destination} />
        </div>
      </div>
    </div>
  );
};

export default DestinationDetailsPage;