// components/Navbar.js
export default function Navbar() {
    return (

      <nav className="flex items-center justify-between p-4 bg-black text-white border-b  ">
        <div className="flex justify-center items-center gap-16 ">
            <h1 className="text-2xl font-extrabold ml-5">
                AutoNode 
            </h1>
            <h1 className="text-2xl hover:bg-purple-800 ">
                Dashboard
                <div>
                        
                </div>
            </h1>
        </div>

        <div className=" h-full ">
          <h1 className="text-xl text-white hover:text-black hover:bg-white p-2">
            + Add a new project
          </h1>
        </div>
      </nav>


    );
  }
  