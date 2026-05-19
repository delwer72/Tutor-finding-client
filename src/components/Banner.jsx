// import { Separator } from "@heroui/react";

// const Banner = () => {
//   return (
//     <div className="bg-[url('/assets/banner.png')] text-white  flex justify-between flex-col items-center  gap-5 h-150">
//       <div className="p-10 text-center flex justify-center flex-col items-center gap-3.5 flex-1">
//         <h1 className="text-7xl">
//           Discover Your <br /> Next Adventure
//         </h1>

//         <p className="text-2xl">
//           Explore breathtaking destinations and create unforgettable memories
//           with our curated travel experiences.
//         </p>

//         <div className="flex gap-5">
//           <button className="uppercase bg-cyan-500 px-5 py-3 cursor-pointer">
//             Explore Now
//           </button>

//           <button className="uppercase px-5 py-3 bg-white/50 cursor-pointer">
//             View Destination
//           </button>
//         </div>
//       </div>

//       <div className=" bg-white/30 flex justify-between gap-5 w-full items-center">
//         <div className="px-3">
//           <h3 className="text-sm">Location</h3>
//           <p className="text-xs">Address, City or Zip</p>
//         </div>

//          <Separator variant="tertiary" orientation="vertical" />

//         <div>
//           <h3 className="text-sm">Date/Duration</h3>
//           <p className="text-xs">Anytime/3 Days</p>
//         </div>

//            <Separator variant="tertiary" orientation="vertical" />

//         <div>
//           <h3 className="text-sm">Budget</h3>
//           <p className="text-xs">$0-$3000</p>
//         </div>

//            <Separator variant="tertiary" orientation="vertical" />

//         <div>
//           <h3 className="text-sm">People</h3>
//           <p className="text-xs">5-10</p>
//         </div>



//         <div className="bg-cyan-500 py-2 px-4">
//           <h3>Search</h3>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Banner;
"use client";

import { useState, useEffect } from "react";

const slides = [
{
title: "Find Expert Tutors Easily",
desc: "Book one-on-one sessions with verified tutors anytime, anywhere.",
img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644",
},
{
title: "Learn Smarter, Not Harder",
desc: "Choose your subject, schedule time, and start learning instantly.",
img: "https://images.unsplash.com/photo-1581091870622-1e7b0c4c0b0b",
},
{
title: "Achieve Your Academic Goals",
desc: "Join thousands of students improving their skills with expert guidance.",
img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
},
];

const Banner = () => {
const [current, setCurrent] = useState(0);

useEffect(() => {
const interval = setInterval(() => {
setCurrent((prev) => (prev + 1) % slides.length);
}, 4000);

return () => clearInterval(interval);
}, []);

return (
<div className="relative w-full h-[80vh] overflow-hidden">
{slides.map((slide, index) => (
<div
key={index}
className={`absolute inset-0 transition-opacity duration-1000 ${
index === current ? "opacity-100" : "opacity-0"
}`}
>
{/* Background Image */}
<img
src={slide.img}
alt="banner"
className="w-full h-full object-cover"
/>

{/* Overlay */}
<div className="absolute inset-0 bg-black/60 flex items-center justify-center">
<div className="text-center text-white px-4 max-w-2xl">
<h1 className="text-3xl md:text-5xl font-bold mb-4">
{slide.title}
</h1>
<p className="text-lg md:text-xl mb-6">{slide.desc}</p>

<button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl transition">
Explore Tutors
</button>
</div>
</div>
</div>
))}

{/* Dots Navigation */}
<div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2">
{slides.map((_, index) => (
<button
key={index}
onClick={() => setCurrent(index)}
className={`w-3 h-3 rounded-full transition ${
current === index ? "bg-white" : "bg-gray-400"
}`}
/>
))}
</div>
</div>
);
};

export default Banner; 
