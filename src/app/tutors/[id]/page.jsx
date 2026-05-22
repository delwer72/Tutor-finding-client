"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";

import {
  LuMapPin,
} from "react-icons/lu";
import {
  FaRegCalendar
} from "react-icons/fa6";
import {
  MdOutlineAccessTime
} from "react-icons/md";
import {
  PiBookOpenTextLight
} from "react-icons/pi";
import {
  HiOutlineAcademicCap
} from "react-icons/hi2";

const TutorDetailsPage = () => {
  const { id } = useParams();

  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
  });

  useEffect(() => {
    const fetchTutor = async () => {
      try {
        const res = await fetch(`http://localhost:5000/destination/${id}`);
        const data = await res.json();
        setTutor(data);
      } catch (err) {
        console.log(err);
        toast.error("Failed to load tutor");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchTutor();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleBooking = (e) => {
    e.preventDefault();

    if (!formData.date || !formData.time) {
      toast.error("Please fill all required fields");
      return;
    }

    toast.success("Booking request sent 🎉");
    setModalOpen(false);

    setFormData({
      name: "",
      email: "",
      date: "",
      time: "",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!tutor) return null;

  const {
    tutorName,
    photoURL,
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
    description,
  } = tutor;

  const safeImage =
    photoURL?.trim()
      ? photoURL
      : "https://via.placeholder.com/800x600.png?text=No+Image";

  return (
    <div className="bg-zinc-50 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4">

        {/* BACK STYLE */}
        <button
          onClick={() => history.back()}
          className="mb-6 text-sm font-semibold text-zinc-500 hover:text-amber-500"
        >
          ← Back
        </button>

        {/* MAIN CARD */}
        <div className="grid lg:grid-cols-2 gap-10 bg-white rounded-3xl border shadow-sm overflow-hidden">

          {/* IMAGE */}
          <div className="relative h-[480px]">
            <Image
              src={safeImage}
              alt={tutorName}
              fill
              className="object-cover"
            />
          </div>

          {/* INFO */}
          <div className="p-8 space-y-5">

            <div>
              <span className="text-xs bg-amber-100 text-amber-600 px-3 py-1 rounded-full">
                {subject}
              </span>

              <h1 className="text-3xl font-bold mt-3">
                {tutorName}
              </h1>

              <p className="text-sm text-zinc-500 mt-1">
                {institution}
              </p>
            </div>

            <div className="space-y-2 text-sm text-zinc-600">

              <div className="flex gap-2 items-center">
                <LuMapPin /> {location}
              </div>

              <div className="flex gap-2 items-center">
                <FaRegCalendar /> {experience} Experience
              </div>

              <div className="flex gap-2 items-center">
                <PiBookOpenTextLight /> {teachingMode}
              </div>

              <div className="flex gap-2 items-center">
                <MdOutlineAccessTime /> {availableTime}
              </div>

              <div className="flex gap-2 items-center">
                <HiOutlineAcademicCap /> {availableDays}
              </div>
            </div>

            <h2 className="text-3xl font-bold text-amber-500">
              ৳ {hourlyFee}/hr
            </h2>

            <div className="text-sm text-zinc-600 space-y-1">
              <p><b>Session Start:</b> {sessionStartDate}</p>
              <p><b>Total Slots:</b> {totalSlot}</p>
            </div>

            <button
              onClick={() => setModalOpen(true)}
              className="w-full py-3 bg-amber-500 text-white rounded-xl font-semibold hover:bg-amber-600"
            >
              Book Now
            </button>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="mt-10 bg-white p-6 rounded-2xl border">
          <h2 className="text-xl font-bold mb-2">About Tutor</h2>
          <p className="text-sm text-zinc-600 leading-6">
            {description}
          </p>
        </div>
      </div>

      {/* MODAL (PetDetails style) */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">

          <div className="bg-white w-full max-w-lg rounded-2xl overflow-hidden">

            {/* HEADER */}
            <div className="bg-zinc-900 text-white p-5 flex justify-between">
              <h3 className="font-bold">Book {tutorName}</h3>
              <button onClick={() => setModalOpen(false)}>✕</button>
            </div>

            {/* FORM */}
            <form onSubmit={handleBooking} className="p-5 space-y-4">

              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg text-sm"
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg text-sm"
              />

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg text-sm"
              />

              <input
                type="text"
                name="time"
                placeholder="Preferred Time"
                value={formData.time}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg text-sm"
              />

              <div className="flex justify-end gap-3 pt-3">

                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-sm bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 text-sm bg-amber-500 text-white rounded-lg"
                >
                  Confirm
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