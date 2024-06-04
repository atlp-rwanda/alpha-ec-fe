// 'use state';

// import React from 'react';
// import Link from 'next/link';
// import { FiHome } from 'react-icons/fi';
// import { MdErrorOutline, MdOutlineManageAccounts } from 'react-icons/md';
// import { FcStatistics } from 'react-icons/fc';
// import { AiOutlineProduct } from 'react-icons/ai';
// import { RiAccountCircleLine, RiLogoutBoxRLine } from 'react-icons/ri';
// import { IoIosHelpCircleOutline } from 'react-icons/io';
// import { IoCalendarNumberOutline } from 'react-icons/io5';

// const SideNav = () => {
//   return (
//     <div className="bg-[#a5c9ca] w-full h-full p-5 absolute z-100 md:relative md:z-100">
//       <div className="mb-8">
//         <h1 className="text-2xl font-bold text-[#32475C]">alpha-team</h1>
//       </div>
//       <nav className="space-y-4 text-black">
//         <Link
//           href="/dashboard"
//           className="text-lg flex hover:bg-[#32475C] hover:text-white hover:py-[3px] hover:pl-[3px] hover:rounded-[5px]"
//         >
//           <FiHome className="text-xl" />
//           <p className="pl-2">Dashboard</p>
//         </Link>
//         <Link
//           href="/account-settings"
//           className="flex text-lg hover:bg-[#32475C] hover:text-white hover:py-[3px] hover:pl-[3px] hover:rounded-[5px]"
//         >
//           <MdOutlineManageAccounts className="text-2xl" />
//           <p className="pl-2 text-nowrap">Account Settings</p>
//         </Link>
//         <div className="mt-6 pt-3">
//           <h2 className="text-xl font-semibold">Activities</h2>
//           <Link
//             href="/stastics"
//             className="flex mt-2 hover:bg-[#32475C] hover:text-white hover:py-[3px] hover:pl-[3px] hover:rounded-[5px]"
//           >
//             <FcStatistics className="text-xl" />
//             <p className="pl-2 text-nowrap">Statistics</p>
//           </Link>
//           <Link
//             href="/error"
//             className="flex mt-2 hover:bg-[#32475C] hover:text-white hover:py-[3px] hover:pl-[3px] hover:rounded-[5px]"
//           >
//             <MdErrorOutline className="text-xl" />
//             <p className="pl-2 text-nowrap">Error</p>
//           </Link>
//           <Link
//             href="/Products"
//             className="flex mt-2 hover:bg-[#32475C] hover:text-white hover:py-[3px] hover:pl-[3px] hover:rounded-[5px]"
//           >
//             <AiOutlineProduct className="text-xl" />
//             <p className="pl-2 text-nowrap">Products</p>
//           </Link>
//         </div>
//         <div className="mt-10 pt-3">
//           <h2 className="text-xl font-semibold">More Info</h2>
//           <Link
//             href="/account-status"
//             className="flex mt-2 hover:bg-[#32475C] hover:text-white hover:py-[3px] hover:pl-[3px] hover:rounded-[5px]"
//           >
//             <RiAccountCircleLine className="text-xl" />
//             <p className="pl-2 text-nowrap">Account Status</p>
//           </Link>
//           <Link
//             href="/help"
//             className="flex mt-2 hover:bg-[#32475C] hover:text-white hover:py-[3px] hover:pl-[3px] hover:rounded-[5px]"
//           >
//             <IoIosHelpCircleOutline className="text-xl" />
//             <p className="pl-2 text-nowrap">Help</p>
//           </Link>
//           <Link
//             href="/calendar"
//             className="flex mt-2 hover:bg-[#32475C] hover:text-white hover:py-[3px] hover:pl-[3px] hover:rounded-[5px]"
//           >
//             <IoCalendarNumberOutline className="text-xl" />
//             <p className="pl-2 text-nowrap">Calendar</p>
//           </Link>
//         </div>
//         <Link
//           href="/logout"
//           className="flex mt-4 hover:bg-[#32475C] hover:text-white hover:py-[3px] hover:pl-[3px] hover:rounded-[5px]"
//         >
//           <RiLogoutBoxRLine className="text-xl" />
//           <p className="pl-2 text-nowrap">Logout</p>
//         </Link>
//       </nav>
//     </div>
//   );
// };

// export default SideNav;
