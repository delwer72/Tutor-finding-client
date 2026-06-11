
"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaEdit,
  FaTrash,
  FaBookOpen,
} from "react-icons/fa";

const MyTutorsPage = () => {

  const { data: session } = authClient.useSession();

  const user = session?.user;

  const [tutors, setTutors] = useState([]);

  const [loading, setLoading] = useState(true);

  const [selectedTutor, setSelectedTutor] =
    useState(null);

  // ===================================
  // FETCH MY TUTORS
  // ===================================

  useEffect(() => {

    if (!user?.email) return;

    fetch(
      `http://localhost:5000/my-tutors?email=${user.email}`
    )
      .then((res) => res.json())
      .then((data) => {

        setTutors(data);

        setLoading(false);

      })
      .catch((error) => {

        console.log(error);

        setLoading(false);

      });

  }, [user]);

  // ===================================
  // DELETE TUTOR
  // ===================================

  const handleDelete = async (id) => {

    const confirmDelete = confirm(
      "Are you sure you want to delete this tutor?"
    );

    if (!confirmDelete) return;

    try {

      const res = await fetch(
        `http://localhost:5000/tutors/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (data.deletedCount > 0) {

        toast.success(
          "Tutor Deleted Successfully"
        );

        const remainingTutors =
          tutors.filter(
            (tutor) => tutor._id !== id
          );

        setTutors(remainingTutors);
      }

    } catch (error) {

      console.log(error);

      toast.error("Failed To Delete Tutor");

    }
  };

  // ===================================
  // UPDATE TUTOR
  // ===================================

  const handleUpdateTutor = async (e) => {

    e.preventDefault();

    const form = e.target;

    const updatedTutor = {

      tutorName: form.tutorName.value,

      subject: form.subject.value,

      hourlyFee: Number(
        form.hourlyFee.value
      ),

      totalSlot: Number(
        form.totalSlot.value
      ),

      availableTime:
        form.availableTime.value,

      location: form.location.value,
    };

    try {

      const res = await fetch(
        `https://tutor-finding-server.vercel.app/tutors/${selectedTutor._id}`,
        {
          method: "PATCH",

          headers: {
            "content-type":
              "application/json",
          },

          body: JSON.stringify(
            updatedTutor
          ),
        }
      );

      const data = await res.json();

      if (data.modifiedCount > 0) {

        toast.success(
          "Tutor Updated Successfully"
        );

        const updatedList = tutors.map(
          (tutor) => {

            if (
              tutor._id ===
              selectedTutor._id
            ) {

              return {
                ...tutor,
                ...updatedTutor,
              };
            }

            return tutor;
          }
        );

        setTutors(updatedList);

        document
          .getElementById(
            "update_modal"
          )
          .close();
      }

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed To Update Tutor"
      );
    }
  };

  // ===================================
  // LOADING
  // ===================================

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-3xl font-bold">
        Loading...
      </div>
    );
  }

  // ===================================
  // EMPTY STATE
  // ===================================

  if (tutors.length === 0) {

    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-5">

        <div className="bg-white shadow-xl rounded-3xl p-10 max-w-lg border">

          <div className="w-24 h-24 mx-auto rounded-full bg-cyan-100 flex items-center justify-center mb-6">

            <FaBookOpen className="text-4xl text-cyan-500" />

          </div>

          <h1 className="text-4xl font-bold mb-4">
            No Tutors Added Yet
          </h1>

          <p className="text-gray-500 text-lg">
            Start your journey by adding
            your first tutor.
          </p>

        </div>

      </div>
    );
  }

  return (

    <div className="max-w-7xl mx-auto px-5 py-12">

      {/* HEADER */}

      <div className="mb-10 text-center">

        <h1 className="text-5xl font-bold text-gray-800">
          My Tutors
        </h1>

        <p className="text-gray-500 mt-3 text-lg">
          Manage your added tutors
          easily
        </p>

      </div>

      {/* TABLE */}

      <div className="overflow-x-auto bg-white rounded-3xl shadow-xl border">

        <table className="table-auto w-full border-collapse">

          {/* TABLE HEAD */}

          <thead className="bg-cyan-500 text-white text-base">

            <tr>

              <th>No</th>

              <th>Tutor Name</th>

              <th>Subject</th>

              <th>Fee</th>

              <th>Slot</th>

              <th>Time</th>

              <th>Location</th>

              <th>Actions</th>

            </tr>

          </thead>

          {/* TABLE BODY */}

          <tbody>

  {tutors.map((tutor, index) => (

    <tr
      key={tutor._id}
      className="hover:bg-cyan-50 transition duration-200"
    >

      <td className="border px-4 py-4 text-center font-bold">
        {index + 1}
      </td>

      <td className="border px-4 py-4 font-semibold">
        {tutor.tutorName}
      </td>

      <td className="border px-4 py-4">
        {tutor.subject}
      </td>

      <td className="border px-4 py-4 text-cyan-600 font-semibold">
        ৳ {tutor.hourlyFee}
      </td>

      <td className="border px-4 py-4 text-center">
        {tutor.totalSlot}
      </td>

      <td className="border px-4 py-4">
        {tutor.availableTime}
      </td>

      <td className="border px-4 py-4">
        {tutor.location}
      </td>

      <td className="border px-4 py-4">

        <div className="flex gap-3 justify-center">

          {/* UPDATE BUTTON */}

          <button
            onClick={() => {

              setSelectedTutor(tutor);

              document
                .getElementById("update_modal")
                .showModal();
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl"
          >
            Update
          </button>

          {/* DELETE BUTTON */}

          <button
            onClick={() => handleDelete(tutor._id)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
          >
            Delete
          </button>

        </div>

      </td>

    </tr>
  ))}

</tbody>

        </table>

      </div>

      {/* ================================= */}
      {/* UPDATE MODAL */}
      {/* ================================= */}

      <dialog
        id="update_modal"
        className="modal"
      >

        <div className="modal-box max-w-3xl rounded-3xl">

          <h3 className="font-bold text-3xl mb-8 text-center">
            Update Tutor
          </h3>

          {selectedTutor && (

            <form
              onSubmit={
                handleUpdateTutor
              }
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >

              {/* Tutor Name */}

              <div>

                <label className="font-medium block mb-2">
                  Tutor Name
                </label>

                <input
                  type="text"
                  name="tutorName"
                  defaultValue={
                    selectedTutor.tutorName
                  }
                  className="w-full border px-4 py-3 rounded-xl outline-none focus:border-cyan-500"
                />

              </div>

              {/* Subject */}

              <div>

                <label className="font-medium block mb-2">
                  Subject
                </label>

                <input
                  type="text"
                  name="subject"
                  defaultValue={
                    selectedTutor.subject
                  }
                  className="w-full border px-4 py-3 rounded-xl outline-none focus:border-cyan-500"
                />

              </div>

              {/* Fee */}

              <div>

                <label className="font-medium block mb-2">
                  Hourly Fee
                </label>

                <input
                  type="number"
                  name="hourlyFee"
                  defaultValue={
                    selectedTutor.hourlyFee
                  }
                  className="w-full border px-4 py-3 rounded-xl outline-none focus:border-cyan-500"
                />

              </div>

              {/* Slot */}

              <div>

                <label className="font-medium block mb-2">
                  Total Slot
                </label>

                <input
                  type="number"
                  name="totalSlot"
                  defaultValue={
                    selectedTutor.totalSlot
                  }
                  className="w-full border px-4 py-3 rounded-xl outline-none focus:border-cyan-500"
                />

              </div>

              {/* Time */}

              <div>

                <label className="font-medium block mb-2">
                  Time Slot
                </label>

                <input
                  type="text"
                  name="availableTime"
                  defaultValue={
                    selectedTutor.availableTime
                  }
                  className="w-full border px-4 py-3 rounded-xl outline-none focus:border-cyan-500"
                />

              </div>

              {/* Location */}

              <div>

                <label className="font-medium block mb-2">
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  defaultValue={
                    selectedTutor.location
                  }
                  className="w-full border px-4 py-3 rounded-xl outline-none focus:border-cyan-500"
                />

              </div>

              {/* BUTTONS */}

              <div className="md:col-span-2 flex gap-4 justify-end pt-4">

                <button
                  type="button"
                  onClick={() =>
                    document
                      .getElementById(
                        "update_modal"
                      )
                      .close()
                  }
                  className="px-6 py-3 rounded-xl bg-gray-200 hover:bg-gray-300"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white"
                >
                  Save Changes
                </button>

              </div>

            </form>
          )}

        </div>

      </dialog>

    </div>
  );
};

export default MyTutorsPage;


