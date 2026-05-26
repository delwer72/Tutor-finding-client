
// "use client";

// import { useState } from "react";
// import { toast } from "react-toastify";

// const AddTutorPage = () => {
//   const [loading, setLoading] = useState(false);

//   const handleAddTutor = async (e) => {
//     e.preventDefault();

//     setLoading(true);

//     const form = e.target;

//     const tutorData = {
//       tutorName: form.tutorName.value,
//       image: form.image.value,
//       subject: form.subject.value,
//       availableDays: form.availableDays.value,
//       availableTime: form.availableTime.value,
//       hourlyFee: parseInt(form.hourlyFee.value),
//       totalSlot: parseInt(form.totalSlot.value),
//       sessionStartDate: form.sessionStartDate.value,
//       institution: form.institution.value,
//       experience: form.experience.value,
//       location: form.location.value,
//       teachingMode: form.teachingMode.value,
//     };

//     try {
//       const res = await fetch("http://localhost:5000/tutors", {
//         method: "POST",
//         headers: {
//           "content-type": "application/json",
//         },
//         body: JSON.stringify(tutorData),
//       });

//       const data = await res.json();

//       if (data.insertedId) {
//         toast.success("Tutor Added Successfully");
//         form.reset();
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Failed To Add Tutor");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-5xl mx-auto px-5 py-10">
//       <div className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
//         <h1 className="text-4xl font-bold text-center mb-10">
//           Add Tutor
//         </h1>

//         <form
//           onSubmit={handleAddTutor}
//           className="grid grid-cols-1 md:grid-cols-2 gap-6"
//         >
//           {/* Tutor Name */}
//           <div>
//             <label className="block mb-2 font-semibold">
//               Tutor Name
//             </label>
//             <input
//               type="text"
//               name="tutorName"
//               placeholder="Enter Tutor Name"
//               required
//               className="w-full border rounded-xl px-4 py-3 outline-none"
//             />
//           </div>

//           {/* Image */}
//           <div>
//             <label className="block mb-2 font-semibold">
//               Photo URL
//             </label>
//             <input
//               type="text"
//               name="image"
//               placeholder="Enter Photo URL"
//               required
//               className="w-full border rounded-xl px-4 py-3 outline-none"
//             />
//           </div>

//           {/* Subject */}
//           <div>
//             <label className="block mb-2 font-semibold">
//               Subject
//             </label>
//             <select
//               name="subject"
//               required
//               className="w-full border rounded-xl px-4 py-3 outline-none"
//             >
//               <option value="">Select Subject</option>
//               <option value="Mathematics">Mathematics</option>
//               <option value="Physics">Physics</option>
//               <option value="Chemistry">Chemistry</option>
//               <option value="English">English</option>
//               <option value="Biology">Biology</option>
//             </select>
//           </div>

//           {/* Available Days */}
//           <div>
//             <label className="block mb-2 font-semibold">
//               Available Days
//             </label>
//             <input
//               type="text"
//               name="availableDays"
//               placeholder="Sun - Thu"
//               required
//               className="w-full border rounded-xl px-4 py-3 outline-none"
//             />
//           </div>

//           {/* Available Time */}
//           <div>
//             <label className="block mb-2 font-semibold">
//               Available Time
//             </label>
//             <input
//               type="text"
//               name="availableTime"
//               placeholder="5 PM - 8 PM"
//               required
//               className="w-full border rounded-xl px-4 py-3 outline-none"
//             />
//           </div>

//           {/* Hourly Fee */}
//           <div>
//             <label className="block mb-2 font-semibold">
//               Hourly Fee
//             </label>
//             <input
//               type="number"
//               name="hourlyFee"
//               placeholder="Enter Hourly Fee"
//               required
//               className="w-full border rounded-xl px-4 py-3 outline-none"
//             />
//           </div>

//           {/* Total Slot */}
//           <div>
//             <label className="block mb-2 font-semibold">
//               Total Slot
//             </label>
//             <input
//               type="number"
//               name="totalSlot"
//               placeholder="Enter Total Slot"
//               required
//               className="w-full border rounded-xl px-4 py-3 outline-none"
//             />
//           </div>

//           {/* Session Start Date */}
//           <div>
//             <label className="block mb-2 font-semibold">
//               Session Start Date
//             </label>
//             <input
//               type="date"
//               name="sessionStartDate"
//               required
//               className="w-full border rounded-xl px-4 py-3 outline-none"
//             />
//           </div>

//           {/* Institution */}
//           <div>
//             <label className="block mb-2 font-semibold">
//               Institution
//             </label>
//             <input
//               type="text"
//               name="institution"
//               placeholder="Enter Institution Name"
//               required
//               className="w-full border rounded-xl px-4 py-3 outline-none"
//             />
//           </div>

//           {/* Experience */}
//           <div>
//             <label className="block mb-2 font-semibold">
//               Experience
//             </label>
//             <input
//               type="text"
//               name="experience"
//               placeholder="5 Years Experience"
//               required
//               className="w-full border rounded-xl px-4 py-3 outline-none"
//             />
//           </div>

//           {/* Location */}
//           <div>
//             <label className="block mb-2 font-semibold">
//               Location
//             </label>
//             <input
//               type="text"
//               name="location"
//               placeholder="Dhaka"
//               required
//               className="w-full border rounded-xl px-4 py-3 outline-none"
//             />
//           </div>

//           {/* Teaching Mode */}
//           <div>
//             <label className="block mb-2 font-semibold">
//               Teaching Mode
//             </label>
//             <select
//               name="teachingMode"
//               required
//               className="w-full border rounded-xl px-4 py-3 outline-none"
//             >
//               <option value="">Select Mode</option>
//               <option value="Online">Online</option>
//               <option value="Offline">Offline</option>
//               <option value="Both">Both</option>
//             </select>
//           </div>

//           {/* Submit Button */}
//           <div className="md:col-span-2">
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-black text-white py-4 rounded-xl text-lg font-semibold hover:opacity-90 transition duration-300"
//             >
//               {loading ? "Adding..." : "Add Tutor"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddTutorPage;





"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const AddTutorPage = () => {
  const { data: session } = authClient.useSession();

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleAddTutor = async (e) => {
    e.preventDefault();

    setLoading(true);

    const form = e.target;

    const tutorData = {
      tutorName: form.tutorName.value,
      tutorEmail: session?.user?.email,
      image: session?.user?.image,

      subject: form.subject.value,

      availableDays: form.availableDays.value,

      availableTime: form.availableTime.value,

      hourlyFee: Number(form.hourlyFee.value),

      totalSlot: Number(form.totalSlot.value),

      sessionStartDate: form.sessionStartDate.value,

      experience: form.experience.value,

      location: form.location.value,

      teachingMode: form.teachingMode.value,
    };

    try {
      const res = await fetch("http://localhost:5000/tutors", {
        method: "POST",

        headers: {
          "content-type": "application/json",
        },

        body: JSON.stringify(tutorData),
      });

      const data = await res.json();

      if (data.insertedId || data.acknowledged) {
        toast.success("Tutor Added Successfully");

        form.reset();

        router.push("/my-tutors");
      }
    } catch (error) {
      console.log(error);

      toast.error("Failed To Add Tutor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-5 py-10">

      <div className="bg-white shadow-xl rounded-2xl p-8 border">

        <h1 className="text-4xl font-bold text-center mb-10">
          Add Tutor
        </h1>

        <form
          onSubmit={handleAddTutor}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >

          {/* Tutor Name */}
          <div>
            <label className="block mb-2 font-medium">
              Tutor Name
            </label>

            <input
              type="text"
              name="tutorName"
              required
              placeholder="Enter tutor name"
              className="w-full border rounded-xl px-4 py-3 outline-none"
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block mb-2 font-medium">
              Subject
            </label>

            <select
              name="subject"
              required
              className="w-full border rounded-xl px-4 py-3 outline-none"
            >
              <option value="">Select Subject</option>

              <option value="Mathematics">
                Mathematics
              </option>

              <option value="English">
                English
              </option>

              <option value="Physics">
                Physics
              </option>

              <option value="Chemistry">
                Chemistry
              </option>

              <option value="Biology">
                Biology
              </option>

              <option value="ICT">
                ICT
              </option>
            </select>
          </div>

          {/* Available Days */}
          <div>
            <label className="block mb-2 font-medium">
              Available Days
            </label>

            <input
              type="text"
              name="availableDays"
              required
              placeholder="Sun - Thu"
              className="w-full border rounded-xl px-4 py-3 outline-none"
            />
          </div>

          {/* Available Time */}
          <div>
            <label className="block mb-2 font-medium">
              Time Slot
            </label>

            <input
              type="text"
              name="availableTime"
              required
              placeholder="5 PM - 8 PM"
              className="w-full border rounded-xl px-4 py-3 outline-none"
            />
          </div>

          {/* Hourly Fee */}
          <div>
            <label className="block mb-2 font-medium">
              Hourly Fee
            </label>

            <input
              type="number"
              name="hourlyFee"
              required
              placeholder="Enter fee"
              className="w-full border rounded-xl px-4 py-3 outline-none"
            />
          </div>

          {/* Total Slot */}
          <div>
            <label className="block mb-2 font-medium">
              Total Slot
            </label>

            <input
              type="number"
              name="totalSlot"
              required
              placeholder="Enter total slot"
              className="w-full border rounded-xl px-4 py-3 outline-none"
            />
          </div>

          {/* Session Date */}
          <div>
            <label className="block mb-2 font-medium">
              Session Start Date
            </label>

            <input
              type="date"
              name="sessionStartDate"
              required
              className="w-full border rounded-xl px-4 py-3 outline-none"
            />
          </div>

          {/* Experience */}
          <div>
            <label className="block mb-2 font-medium">
              Experience
            </label>

            <input
              type="text"
              name="experience"
              required
              placeholder="5 Years Experience"
              className="w-full border rounded-xl px-4 py-3 outline-none"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block mb-2 font-medium">
              Location
            </label>

            <input
              type="text"
              name="location"
              required
              placeholder="Dhaka"
              className="w-full border rounded-xl px-4 py-3 outline-none"
            />
          </div>

          {/* Teaching Mode */}
          <div>
            <label className="block mb-2 font-medium">
              Teaching Mode
            </label>

            <select
              name="teachingMode"
              required
              className="w-full border rounded-xl px-4 py-3 outline-none"
            >
              <option value="">Select Mode</option>

              <option value="Online">
                Online
              </option>

              <option value="Offline">
                Offline
              </option>

              <option value="Both">
                Both
              </option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2">

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-4 rounded-xl text-lg font-semibold transition-all duration-300"
            >
              {loading ? "Adding Tutor..." : "Add Tutor"}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTutorPage;