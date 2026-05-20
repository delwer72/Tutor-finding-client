// "use client"

// import { FieldError, Input, Label, TextField, Select, ListBox, TextArea, Button, Card } from "@heroui/react";

// const AddDestinationPage = () => {
//     const onSubmit = async (e) => {
//         e.preventDefault()
//         const formData = new FormData(e.currentTarget)
//         const destination = Object.fromEntries(formData.entries())

//         console.log(destination)

//         const res = await fetch('http://localhost:5000/destination', {
//             method: 'POST',
//             headers: {
//                 'content-type': 'application/json'
//             },
//             body: JSON.stringify(destination)
//         })

//         const data = await res.json()


//     }

//     return (
//         <div className="p-5 max-w-7xl mx-auto">
//          <h1 className="text-2xl font-bold">Add destination</h1>

//          <Card>
//         <form
//         onSubmit={onSubmit}
//             className="p-10 space-y-8 w-3xl"
//           >
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//               {/* Destination Name */}
//               <div className="md:col-span-2">
//                 <TextField name="destinationName" isRequired>
//                   <Label>Destination Name</Label>
//                   <Input placeholder="Bali Paradise" className="rounded-2xl" />
//                   <FieldError />
//                 </TextField>
//               </div>

//               {/* Country */}
//               <TextField name="country" isRequired>
//                 <Label>Country</Label>
//                 <Input placeholder="Indonesia" className="rounded-2xl" />
//                 <FieldError />
//               </TextField>

//               {/* Category - Updated Select Component */}
//               <div>
//                 <Select
//                   name="category"
//                   isRequired
//                   className="w-full"
//                   placeholder="Select category"
//                 >
//                   <Label>Category</Label>
//                   <Select.Trigger className="rounded-2xl">
//                     <Select.Value />
//                     <Select.Indicator />
//                   </Select.Trigger>
//                   <Select.Popover>
//                     <ListBox>
//                       <ListBox.Item id="Beach" textValue="Beach">
//                         Beach
//                         <ListBox.ItemIndicator />
//                       </ListBox.Item>
//                       <ListBox.Item id="Mountain" textValue="Mountain">
//                         Mountain
//                         <ListBox.ItemIndicator />
//                       </ListBox.Item>
//                       <ListBox.Item id="City" textValue="City">
//                         City
//                         <ListBox.ItemIndicator />
//                       </ListBox.Item>
//                       <ListBox.Item id="Adventure" textValue="Adventure">
//                         Adventure
//                         <ListBox.ItemIndicator />
//                       </ListBox.Item>
//                       <ListBox.Item id="Cultural" textValue="Cultural">
//                         Cultural
//                         <ListBox.ItemIndicator />
//                       </ListBox.Item>
//                       <ListBox.Item id="Luxury" textValue="Luxury">
//                         Luxury
//                         <ListBox.ItemIndicator />
//                       </ListBox.Item>
//                     </ListBox>
//                   </Select.Popover>
//                 </Select>
//               </div>

//               {/* Price */}
//               <TextField name="price" type="number" isRequired>
//                 <Label>Price (USD)</Label>
//                 <Input
//                   type="number"
//                   placeholder="1299"
//                   className="rounded-2xl"
//                 />
//                 <FieldError />
//               </TextField>

//               {/* Duration */}
//               <TextField name="duration" isRequired>
//                 <Label>Duration</Label>
//                 <Input
//                   placeholder="7 Days / 6 Nights"
//                   className="rounded-2xl"
//                 />
//                 <FieldError />
//               </TextField>

//               {/* Departure Date */}
//               <div className="md:col-span-2">
//                 <TextField name="departureDate" type="date" isRequired>
//                   <Label>Departure Date</Label>
//                   <Input type="date" className="rounded-2xl" />
//                   <FieldError />
//                 </TextField>
//               </div>

//               {/* Image URL - Removed preview */}
//               <div className="md:col-span-2">
//                 <TextField name="imageUrl" isRequired>
//                   <Label>Image URL</Label>
//                   <Input
//                     type="url"
//                     placeholder="https://example.com/bali-paradise.jpg"
//                     className="rounded-2xl"
//                   />
//                   <FieldError />
//                 </TextField>
//               </div>

//               {/* Description */}
//               <div className="md:col-span-2">
//                 <TextField name="description" isRequired>
//                   <Label>Description</Label>
//                   <TextArea
//                     placeholder="Describe the travel experience..."
//                     className="rounded-3xl"
//                   />
//                   <FieldError />
//                 </TextField>
//               </div>
//             </div>

//             {/* Buttons */}

//             <Button
//               type="submit"
//               variant="outline"
//               className=" rounded-none w-full bg-cyan-500 text-white"
//             >
//              Add Destination
//             </Button>
//           </form>
//          </Card>
//         </div>
//     );
// };

// export default AddDestinationPage;

"use client";

import {
  FieldError,
  Input,
  Label,
  TextField,
  Select,
  ListBox,
  TextArea,
  Button,
  Card,
} from "@heroui/react";

import { authClient } from "@/lib/auth-client";

const AddTutorPage = () => {
  const { data: session } = authClient.useSession();

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const tutor = Object.fromEntries(formData.entries());

    // user id attach (important)
    tutor.userId = session?.user?.id;

    const res = await fetch("http://localhost:5000/destination", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(tutor),
    });

    const data = await res.json();
    console.log(data);
  };

  return (
    <div className="p-5 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold">Add Tutor</h1>

      <Card>
        <form onSubmit={onSubmit} className="p-10 space-y-8 w-3xl">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Tutor Name */}
            <TextField name="tutorName" isRequired>
              <Label>Tutor Name</Label>
              <Input placeholder="Enter tutor name" className="rounded-2xl" />
              <FieldError />
            </TextField>

            {/* Subject */}
            <TextField name="subject" isRequired>
              <Label>Subject</Label>
              <Input placeholder="Mathematics / English" className="rounded-2xl" />
              <FieldError />
            </TextField>

            {/* Time Slot */}
            <TextField name="timeSlot" isRequired>
              <Label>Time Slot</Label>
              <Input placeholder="6 PM - 8 PM" className="rounded-2xl" />
              <FieldError />
            </TextField>

            {/* Fee */}
            <TextField name="fee" type="number" isRequired>
              <Label>Fee</Label>
              <Input type="number" placeholder="500" className="rounded-2xl" />
              <FieldError />
            </TextField>

            {/* Total Slot */}
            <TextField name="totalSlot" type="number" isRequired>
              <Label>Total Slot</Label>
              <Input type="number" placeholder="10" className="rounded-2xl" />
              <FieldError />
            </TextField>

            {/* Date */}
            <TextField name="date" type="date" isRequired>
              <Label>Date</Label>
              <Input type="date" className="rounded-2xl" />
              <FieldError />
            </TextField>

            {/* Experience */}
            <TextField name="experience" isRequired>
              <Label>Experience</Label>
              <Input placeholder="2 years / 5 years" className="rounded-2xl" />
              <FieldError />
            </TextField>

            {/* Location */}
            <TextField name="location" isRequired>
              <Label>Location</Label>
              <Input placeholder="Dhaka / Online" className="rounded-2xl" />
              <FieldError />
            </TextField>

            {/* Mode */}
            <div>
              <Select name="mode" isRequired className="w-full">
                <Label>Mode</Label>

                <Select.Trigger className="rounded-2xl">
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>

                <Select.Popover>
                  <ListBox>
                    <ListBox.Item id="online">Online</ListBox.Item>
                    <ListBox.Item id="offline">Offline</ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full bg-cyan-500 text-white rounded-none"
          >
            Add Tutor
          </Button>

        </form>
      </Card>
    </div>
  );
};

export default AddTutorPage;