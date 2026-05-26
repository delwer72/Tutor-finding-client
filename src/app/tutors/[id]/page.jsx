
"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { LuMapPin } from "react-icons/lu";
import { FaRegCalendar } from "react-icons/fa6";
import { MdOutlineAccessTime } from "react-icons/md";
import { PiBookOpenTextLight } from "react-icons/pi";
import { HiOutlineAcademicCap } from "react-icons/hi2";

const TutorDetailsPage = () => {

  const { id } = useParams();

  const { data: session } = authClient.useSession();

  const user = session?.user;

  const [tutor, setTutor] = useState(null);

  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    studentName: "",
    studentEmail: "",
    date: "",
    time: "",
  });

  // =========================================
  // FETCH SINGLE TUTOR
  // =========================================

  useEffect(() => {

    const fetchTutor = async () => {

      try {

        const res = await fetch(
          `http://localhost:5000/tutors/${id}`
        );

        const data = await res.json();

        setTutor(data);

      } catch (error) {

        console.log(error);

        toast.error("Failed to load tutor");

      } finally {

        setLoading(false);

      }
    };

    if (id) {
      fetchTutor();
    }

  }, [id]);

  // =========================================
  // INPUT CHANGE
  // =========================================

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =========================================
  // OPEN MODAL
  // =========================================

  const openBookingModal = () => {

    if (!user) {

      toast.error("Please login first");

      return;
    }

    setModalOpen(true);

    setFormData({
      studentName: user?.name || "",
      studentEmail: user?.email || "",
      date: "",
      time: "",
    });
  };

  // =========================================
  // BOOKING SUBMIT
  // =========================================

  const handleBooking = async (e) => {

    e.preventDefault();

    try {

      const bookingData = {

        tutorId: tutor?._id,

        tutorName: tutor?.tutorName,

        studentName: formData.studentName,

        studentEmail: formData.studentEmail,

        date: formData.date,

        time: formData.time,

      };

      console.log("Booking Data:", bookingData);

      const res = await fetch(
        "http://localhost:5000/bookings",
        {
          method: "POST",

          headers: {
            "content-type": "application/json",
          },

          body: JSON.stringify(bookingData),
        }
      );

      const data = await res.json();

      console.log(data);

      // SUCCESS
      if (data.success) {

        toast.success("Booking Successful 🎉");

        setModalOpen(false);

        // RESET FORM
        setFormData({
          studentName: user?.name || "",
          studentEmail: user?.email || "",
          date: "",
          time: "",
        });

      } else {

        toast.error(data.error || "Booking Failed");

      }

    } catch (error) {

      console.log(error);

      toast.error("Something went wrong");

    }
  };

  // =========================================
  // LOADING
  // =========================================

  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center text-3xl font-bold">
        Loading...
      </div>
    );
  }

  if (!tutor) {

    return (
      <div className="min-h-screen flex items-center justify-center text-3xl font-bold">
        Tutor Not Found
      </div>
    );
  }

  // =========================================
  // TUTOR DATA
  // =========================================

  const {
    tutorName,
    image,
    subject,
    availableDays,
    availableTime,
    hourlyFee,
    totalSlot,
    sessionStartDate,
    institution,
    experience,
    location,
    teachingMode,
  } = tutor;

  const safeImage =
    image && image.startsWith("http")
      ? image
      : "https://i.ibb.co/4pDNDk1/avatar.png";

  return (

    <div className="bg-gray-50 min-h-screen py-10">

      <div className="max-w-6xl mx-auto px-5">

        {/* MAIN CARD */}

        <div className="grid lg:grid-cols-3 gap-10 bg-white rounded-3xl overflow-hidden shadow-lg border">

          {/* IMAGE */}

          <div className="relative h-[500px]">

            <Image
              src={safeImage}
              alt={tutorName}
              fill
              className="object-cover"
            />

          </div>

          {/* CONTENT */}

          <div className="p-8 space-y-5">

            <div>

              <span className="bg-cyan-100 text-cyan-600 px-4 py-1 rounded-full text-sm font-medium">
                {subject}
              </span>

              <h1 className="text-4xl font-bold mt-4">
                {tutorName}
              </h1>

              <p className="text-gray-500 mt-2">
                {institution}
              </p>

            </div>

            <div className="space-y-3 text-gray-600">

              <div className="flex items-center gap-2">
                <LuMapPin />
                {location}
              </div>

              <div className="flex items-center gap-2">
                <FaRegCalendar />
                {experience}
              </div>

              <div className="flex items-center gap-2">
                <MdOutlineAccessTime />
                {availableTime}
              </div>

              <div className="flex items-center gap-2">
                <HiOutlineAcademicCap />
                {availableDays}
              </div>

              <div className="flex items-center gap-2">
                <PiBookOpenTextLight />
                {teachingMode}
              </div>

            </div>

            <div className="pt-4 border-t">

              <h2 className="text-3xl font-bold text-cyan-600">
                ৳ {hourlyFee}/hr
              </h2>

              <p className="mt-2 text-gray-600">
                Total Slots: {totalSlot}
              </p>

              <p className="text-gray-600">
                Session Start: {sessionStartDate}
              </p>

            </div>

            <button
              onClick={openBookingModal}
              className="w-full py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl font-semibold transition"
            >
              Book Now
            </button>

          </div>

        </div>

      </div>

      {/* =========================================
          BOOKING MODAL
      ========================================= */}

      {modalOpen && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-5">

          <div className="bg-white w-full max-w-lg rounded-2xl overflow-hidden">

            {/* HEADER */}

            <div className="bg-cyan-500 text-white p-5 flex items-center justify-between">

              <h2 className="text-xl font-bold">
                Book Session
              </h2>

              <button
                onClick={() => setModalOpen(false)}
                className="text-2xl"
              >
                ✕
              </button>

            </div>

            {/* FORM */}

            <form
              onSubmit={handleBooking}
              className="p-6 space-y-5"
            >

              {/* STUDENT NAME */}

              <div>

                <label className="block mb-2 font-medium">
                  Student Name
                </label>

                <input
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  readOnly
                  className="w-full border p-3 rounded-lg bg-gray-100"
                />

              </div>

              {/* EMAIL */}

              <div>

                <label className="block mb-2 font-medium">
                  Student Email
                </label>

                <input
                  type="email"
                  name="studentEmail"
                  value={formData.studentEmail}
                  readOnly
                  className="w-full border p-3 rounded-lg bg-gray-100"
                />

              </div>

              {/* DATE */}

              <div>

                <label className="block mb-2 font-medium">
                  Session Date
                </label>

                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full border p-3 rounded-lg"
                  required
                />

              </div>

              {/* TIME */}

              <div>

                <label className="block mb-2 font-medium">
                  Preferred Time
                </label>

                <input
                  type="text"
                  name="time"
                  placeholder="Example: 7 PM"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full border p-3 rounded-lg"
                  required
                />

              </div>

              {/* BUTTONS */}

              <div className="flex justify-end gap-3 pt-3">

                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2 rounded-lg bg-gray-200"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white"
                >
                  Confirm Booking
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
};

export default TutorDetailsPage;