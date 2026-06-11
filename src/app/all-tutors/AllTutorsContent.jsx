
"use client";

import TutorCard from "@/components/TutorCard";
import { useEffect, useState } from "react";

const AllTutorPage = () => {
  const [tutors, setTutors] = useState([]);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const fetchTutors = async () => {
      let url = `https://tutor-finding-server.vercel.app/tutors?search=${search}`;

      if (startDate && endDate) {
        url += `&startDate=${startDate}&endDate=${endDate}`;
      }

      const res = await fetch(url);

      if (!res.ok) {
        throw new Error("Failed to fetch tutors");
      }

      const data = await res.json();
      setTutors(data);
    };

    fetchTutors();
  }, [search, startDate, endDate]);

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-5">
        All Tutors
      </h1>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search tutor by name..."
          className="border p-2 rounded w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <input
          type="date"
          className="border p-2 rounded"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <input
          type="date"
          className="border p-2 rounded"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      {/* Tutors */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5">
        {tutors.map((tutor) => (
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