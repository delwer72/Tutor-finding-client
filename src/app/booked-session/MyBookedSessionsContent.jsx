"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const MyBookedSessionsPage = () => {

  const { data: session, isPending } =
    authClient.useSession();

  const user = session?.user;

  const [bookings, setBookings] = useState([]);

  const [loading, setLoading] = useState(true);

  // =========================================
  // GET USER BOOKINGS
  // =========================================

  useEffect(() => {

    // session loading
    if (isPending) return;

    // no user
    if (!user?.email) {

      setLoading(false);

      return;
    }

    const fetchBookings = async () => {

      try {

        const res = await fetch(
          `https://tutor-finding-server.vercel.app/bookings/${user.email}`
        );

        const data = await res.json();

        setBookings(data);

      } catch (error) {

        console.log(error);

        toast.error("Failed To Load Bookings");

      } finally {

        setLoading(false);
      }
    };

    fetchBookings();

  }, [user, isPending]);

  // =========================================
  // CANCEL BOOKING
  // =========================================

  const handleCancelBooking = async (id) => {

    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmCancel) return;

    try {

      const res = await fetch(
        `https://tutor-finding-server.vercel.app/bookings/${id}`,
        {
          method: "PATCH",

          headers: {
            "content-type": "application/json",
          },

          body: JSON.stringify({
            status: "cancelled",
          }),
        }
      );

      const data = await res.json();

      if (data.modifiedCount > 0) {

        toast.success("Booking Cancelled");

        // UPDATE UI
        const updatedBookings = bookings.map(
          (booking) => {

            if (booking._id === id) {

              return {
                ...booking,
                status: "cancelled",
              };
            }

            return booking;
          }
        );

        setBookings(updatedBookings);
      }

    } catch (error) {

      console.log(error);

      toast.error("Failed To Cancel Booking");
    }
  };

  // =========================================
  // LOADING STATE
  // =========================================

  if (loading || isPending) {

    return (
      <div className="min-h-screen flex items-center justify-center text-3xl font-bold">

        Loading...

      </div>
    );
  }

  // =========================================
  // EMPTY STATE
  // =========================================

  if (bookings.length === 0) {

    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">

        <h1 className="text-4xl font-bold mb-4">

          No Booked Sessions Found

        </h1>

        <p className="text-gray-500">

          You have not booked any tutor yet.

        </p>

      </div>
    );
  }

  // =========================================
  // MAIN UI
  // =========================================

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">

      {/* HEADING */}

      <div className="mb-10 text-center">

        <h1 className="text-4xl font-bold">

          My Booked Sessions

        </h1>

        <p className="text-gray-500 mt-3">

          Manage your booked tutor sessions

        </p>

      </div>

      {/* TABLE */}

      <div className="overflow-x-auto border rounded-2xl shadow-sm">

        <table className="table w-full">

          {/* TABLE HEAD */}

          <thead className="bg-cyan-500 text-white">

            <tr>

              <th>No</th>

              <th>Tutor Name</th>

              <th>Student Name</th>

              <th>Email</th>

              <th>Status</th>

              <th>Action</th>

            </tr>

          </thead>

          {/* TABLE BODY */}

          <tbody>

            {bookings.map((booking, index) => (

              <tr
                key={booking._id}
                className="hover:bg-gray-50"
              >

                <td>
                  {index + 1}
                </td>

                <td className="font-semibold">
                  {booking.tutorName}
                </td>

                <td>
                  {booking.studentName}
                </td>

                <td>
                  {booking.studentEmail}
                </td>

                {/* STATUS */}

                <td>

                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold
                      
                      ${
                        booking.status === "cancelled"
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }
                    `}
                  >

                    {booking.status}

                  </span>

                </td>

                {/* ACTION */}

                <td>

                  <button
                    disabled={
                      booking.status === "cancelled"
                    }
                    onClick={() =>
                      handleCancelBooking(
                        booking._id
                      )
                    }
                    className={`px-4 py-2 rounded-lg text-white transition
                      
                      ${
                        booking.status === "cancelled"
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-red-500 hover:bg-red-600"
                      }
                    `}
                  >

                    Cancel

                  </button>

                </td>

              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBookedSessionsPage;