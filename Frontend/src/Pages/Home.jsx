import { Link } from "react-router-dom";

const Home=()=>{
    return(
        <div>
            <div className="bg-cover bg-center h-screen w-full bg-red-400 flex flex-col justify-end pt-10 bg-[url('/image.jpg')]">
                <h3 className="absolute top-5 left-5 font-extrabold text-gray-500 opacity-0.1">UBR</h3>
                <div className="bg-white h-40 w-full pl-5 pt-5 pr-10"> 
                    <h2 className="text-2xl font-bold mb-5">Get started with UBR</h2>
                    <Link to="/login" className="p-3 w-full flex justify-center border bg-black border-black rounded text-white">Continue</Link>
                </div>
            </div>
        </div>
    )
}
export default Home;

// import React, { useState } from "react";
// import { useSwipeable } from "react-swipeable";

// const Home = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const cards = ["Card 1", "Card 2", "Card 3", "Card 4"];

//   const swipeHandlers = useSwipeable({
//     onSwipedLeft: () => setCurrentIndex((prev) => Math.min(prev + 1, cards.length - 1)),
//     onSwipedRight: () => setCurrentIndex((prev) => Math.max(prev - 1, 0)),
//     onSwipedUp:()=>{console.log("hi")},
//     preventScrollOnSwipe: true, // Prevents scrolling during swipe gestures
//     trackMouse: true, // Enables mouse-based swipe gestures
//   });

//   return (
//     <div
//       {...swipeHandlers}
//       className="flex justify-center items-center h-screen bg-gray-100 select-none"
//     >
//       <div className="relative w-72 h-96">
//         {cards.map((card, index) => (
//           <div
//             key={index}
//             className={`absolute inset-0 flex justify-center items-center transition-transform duration-500 ${
//               index === currentIndex ? "transform scale-100 z-10" : "transform scale-90 opacity-50 z-0"
//             }`}
//           >
//             <div className="bg-white p-6 shadow-md rounded-lg text-center">
//               {card}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;

