"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState("");
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }

    if (session?.user) {
      setName(session.user.name);
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!session) return null;

  const user = session.user;

  
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  
  const handleSave = async () => {
    try {
      
      console.log("Updated Name:", name);
      console.log("Image File:", file);

      setIsEdit(false);
      alert("Profile Updated Successfully!");
    } catch (error) {
      console.log(error);
      alert("Update failed!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">

        {/* Avatar */}
        <div className="flex flex-col items-center">

          <div className="relative">
            <Image
              src={
                preview ||
                user.image ||
                "https://i.ibb.co/4pDNDk1/avatar.png"
              }
              alt="Profile"
              width={120}
              height={120}
              className="rounded-full border-4 border-blue-500 object-cover"
            />

            {isEdit && (
              <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer text-xs">
                ✎
                <input
                  type="file"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            )}
          </div>

          {/* Name */}
          {!isEdit ? (
            <h1 className="text-2xl font-bold mt-4">{user.name}</h1>
          ) : (
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-4 border p-2 rounded w-full text-center"
            />
          )}

          {/* Email */}
          <p className="text-gray-500">{user.email}</p>
        </div>

        {/* Buttons */}
        <div className="mt-6 space-y-3">

          {!isEdit ? (
            <button
              onClick={() => setIsEdit(true)}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg"
            >
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => setIsEdit(false)}
                className="w-1/2 bg-gray-400 hover:bg-gray-500 text-white py-3 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="w-1/2 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg"
              >
                Save
              </button>
            </div>
          )}

          <button
            onClick={() => authClient.signOut()}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}