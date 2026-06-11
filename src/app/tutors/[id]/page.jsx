
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
    phone: "",
    date: "",
    time: "",
  });

  useEffect(() => {
    const fetchTutor = async () => {
      try {
        const res = await fetch(
          `https://tutor-finding-server.vercel.app/tutors/${id}`
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const openBookingModal = () => {
    if (!user) {
      toast.error("Please login first");
      return;
    }
 

    if (tutor.totalSlot <= 0) {
      toast.error(
        "This session is fully booked. You can’t join at the moment."
      );
      return;
    }

    const today = new Date();

    const sessionDate = new Date(
      tutor.sessionStartDate
    );

    if (today < sessionDate) {
      toast.error(
        "Booking is not available yet for this tutor"
      );
      return;
    }

    setModalOpen(true);

    setFormData({
      studentName: user?.name || "",
      studentEmail: user?.email || "",
      phone: "",
      date: "",
      time: "",
    });
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    try {
      const bookingData = {
        tutorId: tutor._id,
        tutorName: tutor.tutorName,

        studentName: formData.studentName,
        studentEmail: formData.studentEmail,

        phone: formData.phone,

        date: formData.date,
        time: formData.time,

        bookingStatus: "Booked",
      };

      const res = await fetch(
        "https://tutor-finding-server.vercel.app/bookings",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(bookingData),
        }
      );

      const data = await res.json();

      if (data.success) {
        toast.success("Booking Successful ");

        setTutor((prev) => ({
          ...prev,
          totalSlot: prev.totalSlot - 1,
        }));

        setModalOpen(false);

        setFormData({
          studentName: user?.name || "",
          studentEmail: user?.email || "",
          phone: "",
          date: "",
          time: "",
        });
      } else {
        toast.error(
          data.error || "Booking Failed"
        );
      }
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-3xl font-bold">
        Loading...
      </div>
    );
  }

  if (!tutor) {
    return (
      <div className="min-h-screen flex justify-center items-center text-3xl font-bold">
        Tutor Not Found
      </div>
    );
  }

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

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid lg:grid-cols-3 gap-10 bg-white rounded-3xl overflow-hidden shadow-lg border">
          <div className="relative h-[500px]">
            <Image
              src={image}
              alt={tutorName}
              fill
                sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          </div>

          <div className="p-8 space-y-5">
            <div>
              <span className="bg-cyan-100 text-cyan-600 px-4 py-1 rounded-full">
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
              <div className="flex gap-2 items-center">
                <LuMapPin />
                {location}
              </div>

              <div className="flex gap-2 items-center">
                <FaRegCalendar />
                {experience}
              </div>

              <div className="flex gap-2 items-center">
                <MdOutlineAccessTime />
                {availableTime}
              </div>

              <div className="flex gap-2 items-center">
                <HiOutlineAcademicCap />
                {availableDays}
              </div>

              <div className="flex gap-2 items-center">
                <PiBookOpenTextLight />
                {teachingMode}
              </div>
            </div>

            <div className="pt-4 border-t">
              <h2 className="text-3xl font-bold text-cyan-600">
                ৳ {hourlyFee}/hr
              </h2>

              <p>Total Slots: {totalSlot}</p>

              <p>
                Session Start: {sessionStartDate}
              </p>
            </div>

            <button
              onClick={openBookingModal}
              className="w-full py-3 bg-cyan-500 text-white rounded-xl"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-5">
          <div className="bg-white w-full max-w-lg rounded-2xl">
            <div className="bg-cyan-500 text-white p-5 flex justify-between">
              <h2 className="text-xl font-bold">
                Book Session
              </h2>

              <button
                onClick={() =>
                  setModalOpen(false)
                }
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={handleBooking}
              className="p-6 space-y-4"
            >
              <input
                value={tutor._id}
                readOnly
                className="w-full border p-3 rounded"
              />

              <input
                value={tutor.tutorName}
                readOnly
                className="w-full border p-3 rounded"
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full border p-3 rounded"
              />

              <input
                value={formData.studentName}
                readOnly
                className="w-full border p-3 rounded bg-gray-100"
              />

              <input
                value={formData.studentEmail}
                readOnly
                className="w-full border p-3 rounded bg-gray-100"
              />

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full border p-3 rounded"
              />

              <input
                type="text"
                name="time"
                placeholder="7 PM"
                value={formData.time}
                onChange={handleChange}
                required
                className="w-full border p-3 rounded"
              />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setModalOpen(false)
                  }
                  className="px-5 py-2 bg-gray-200 rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 bg-cyan-500 text-white rounded"
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