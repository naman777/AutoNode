"use client"
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast';

const Hero = () => {

  const router = useRouter();
  const {data:session} = useSession();

  const handleClick = async () => {
    try {
      if(session && session.user?.email){
        console.log("User is logged in");
        router.push("/dashboard");
      }
      else{
        console.log("User is not logged in");
        signIn("google");
      }
    } catch (error) {
      console.error("Error while redirecting to dashboard", error);
      toast.error("Error occurred please try again later.");  
    }
  }



  return (
    <div className="min-h-screen ">
      <div className="relative max-w-5xl mx-auto pt-16 sm:pt-18 lg:pt-24 px-6">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-center">
          From idea to launch, Faster than EVER.
          Deploy your Node.js app in seconds.
        </h1>
        <p className="mt-6 text-lg text-center max-w-3xl mx-auto text-slate-400">
          Seamlessly Deploy Your <span className="font-mono font-medium text-sky-400">Node.js</span> backends in just a{' '}
          <span className="font-mono font-medium text-sky-400">Few Clicks.</span> Empowering Developers with{' '}
          <span className="font-mono font-medium text-sky-400">Effortless Hosting Solutions!</span> Giving you more time to
          focus on <span className="font-mono font-medium text-sky-400">coding</span> while we handle the{' '}
          <span className="font-mono font-medium text-sky-400">deployment.</span>
        </p>

        <div className="mt-10 flex justify-center space-x-6 text-lg">
          <button
            className="bg-gradient-to-r from-blue-800 to-purple-800 hover:from-blue-700 hover:to-purple-700 text-white font-semibold h-12 px-8 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300 flex items-center justify-center"
            onClick={handleClick}
          >
            Deploy
          </button>
        </div>

        {/* Click, Deploy, Done Section */}
        <div className="relative max-w-5xl mx-auto pt-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-center">
            Click, Deploy, Done!
          </h1>
        </div>
      </div>
    </div>
  )
}

export default Hero
