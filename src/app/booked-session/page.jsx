"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import {
  Input,
  Label,
  TextField,
  Button,
  Card,
} from "@heroui/react";

const BookingForm = ({ destination }) => {
  const { data: session } = authClient.useSession();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const booking = {
      studentName: formData.get("studentName"),
      phone: formData.get("phone"),

      // auto fields
      tutorName: tutor?.tutorName,
      email: session?.user?.email,

      tutorId: tutor?._id,
      studentId: session?.user?.id,
    };

    try {
      // 1️⃣ Create booking
      const res = await fetch("http://localhost:5000/bookings", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(booking),
      });

      const data = await res.json();

      // 2️⃣ Update tutor slot + status
      await fetch(`http://localhost:5000/destinations/${destination._id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          totalSlot: Number(tutor.totalSlot) - 1,
          status: Number(tutor.totalSlot) - 1 === 0 ? "booked" : "available",
        }),
      });

      alert("Booking Successful!");
    } catch (error) {
      console.log(error);
      alert("Booking failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <form onSubmit={onSubmit} className="space-y-5">

        {/* Student Name */}
        <TextField name="studentName" isRequired>
          <Label>Student Name</Label>
          <Input placeholder="Enter your name" />
        </TextField>

        {/* Phone */}
        <TextField name="phone" isRequired>
          <Label>Phone</Label>
          <Input placeholder="01XXXXXXXXX" />
        </TextField>

        {/* Auto Tutor Name */}
        <div>
          <Label>Tutor Name</Label>
          <Input value={tutor?.tutorName} disabled />
        </div>

        {/* Auto Email */}
        <div>
          <Label>Email</Label>
          <Input value={session?.user?.email} disabled />
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 text-white"
        >
          {loading ? "Booking..." : "Confirm Booking"}
        </Button>

      </form>
    </Card>
  );
};

export default BookingForm;