// // src/components/dashboard/TopNav.tsx
// 'use client';

// import React, { useState } from 'react';
// import { FiSearch } from 'react-icons/fi';
// import { CiBrightnessDown } from 'react-icons/ci';
// import { IoIosNotificationsOutline } from 'react-icons/io';
// import { BiMenuAltLeft } from 'react-icons/bi';
// import SideNav from './SideNav';

// const TopNav = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <div>
//       <div className="flex justify-between items-center bg-[#A5C9CA] py-1 px-5 sm:mx-8 md:mx-8 lg:mx-8 mx-2 my-2 rounded-md shadow-md">
//         <div className="flex align-middle">
//           <BiMenuAltLeft
//             className="text-2xl text-[#32475C] sm:hidden lg:hidden xl:hidden cursor-pointer"
//             onClick={toggleSidebar}
//           />
//           <FiSearch className="text-2xl text-[#32475C]" />
//           <input
//             type="text"
//             placeholder="Search"
//             className="w-full px-1 placeholder-[#6D8093] rounded-md"
//           />
//         </div>
//         <div className="flex items-center space-x-4">
//           <button className="text-lg">
//             <i className="fas fa-bell"></i>
//           </button>
//           <button className="text-lg">
//             <i className="fas fa-sun"></i>
//           </button>
//           <div className="flex gap-3">
//             <IoIosNotificationsOutline className="text-4xl text-black pt-1" />
//             <CiBrightnessDown className="text-4xl text-black pt-1" />
//             <img
//               src="https://via.placeholder.com/40"
//               alt="Profile"
//               className="w-10 h-10 rounded-full"
//             />
//           </div>
//         </div>
//       </div>
//       <div className="w-[430px]">{isSidebarOpen && <SideNav />}</div>
//     </div>
//   );
// };

// export default TopNav;
