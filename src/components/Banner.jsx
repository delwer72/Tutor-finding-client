
"use client";
import Link from "next/link";

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
  img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1400&",
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

{/* <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl transition">
Explore Tutors
</button> */}

<Link href="/all-tutors">
  <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl transition">
    Explore Tutors
  </button>
</Link>

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
