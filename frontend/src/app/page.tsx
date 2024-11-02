import Hero from "@/components/Home/Hero";
import Navbar from "@/components/Home/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="absolute top-16 left-10 w-24 h-24 bg-purple-700 rounded-full blur-2xl opacity-25 animate-pulse"></div>
      <div className="absolute bottom-16 right-10 w-32 h-32 bg-sky-700 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <Navbar/>
      <Hero/>
    </div>
  );
}
