// import TutorCard from "@/components/TutorCard.jsx";

// const AllTutorPage = async () => {
//     const res = await fetch('http://localhost:5000/destination')
//     const tutors = await res.json() 


//     return (
//         <div className="max-w-7xl mx-auto">
//             <h1>All Tutors</h1>


//             <div className="grid grid-cols-4 gap-5">
//                 {
//                     tutors.map(tutor => <TutorCard key={tutor._id} tutor={tutor}/>)
//                 }

//             </div>

//         </div>
//     );
// };

// export default AllTutorPage;

import TutorCard from "@/components/TutorCard.jsx";

const AllTutorPage = async () => {
  const res = await fetch("http://localhost:5000/destination");
  const tutors = await res.json();

  // শুধু প্রথম ৬টা data
  const limitedTutors = tutors.slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto">
      <h1>All Tutors</h1>

      <div className="grid grid-cols-3 gap-5">
        {limitedTutors.map((tutor) => (
          <TutorCard
            key={tutor._id}
            tutor={tutor}
          />
        ))}
      </div>
    </div>
  );
};

export default AllTutorPage;