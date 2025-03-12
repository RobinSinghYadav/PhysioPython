// import React, { useContext } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { AppContext } from '../context/AppContext';

// const TopDoctors = () => {
//     const navigate = useNavigate();
//     const {doctors}=useContext(AppContext)
//   return (
//     <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10 '>
//        <h1 className='text-3xl font-medium'>Top Therapists to Book</h1>
//        <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors.</p> 
//        <div className='w-full grid grid-cols-auto gap-4 gap-y-6 px-3 sm:px-0'>
//         {doctors.slice(0,10).map((item,index)=>(
//             <div onClick={()=>{navigate(`/appointment/${item._id}`);scrollTo(0,0)}}  className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
              
//                 <img className='bg-blue-50' src={item.image} alt="" />
              
//              <div className='p-4'>
//              <div className="flex items-center gap-2 text-sm text-center text-green-500">
//                 <p className="w-2 h-2 bg-green-500 rounded-full"></p>
//                 <p>Available</p>
//               </div>
//               <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
//               <p className='text-gray-600 text-sm'>{item.speciality}</p>
//              </div>
//             </div>
//         ))}
//        </div>
//        <button onClick={()=>{navigate('/doctors'); scrollTo(0,0)}} className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10'>More</button>
//     </div>
//   )
// }

// export default TopDoctors

import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const TopDoctors = () => {
    const navigate = useNavigate();
    const {doctors}=useContext(AppContext)
  

  // Animation variants
  const fadeInOutVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.6 } },
  };

  return (
    <motion.div
      className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10"
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeInOutVariants}
    >
      {/* Section Title */}
      <motion.h1
        className="text-3xl font-medium"
        variants={fadeInOutVariants}
      >
        Top Therapists to Book
      </motion.h1>
      <motion.p
        className="sm:w-1/3 text-center text-sm"
        variants={fadeInOutVariants}
      >
        Simply browse through our extensive list of trusted doctors.
      </motion.p>

      {/* Doctors Grid */}
      <div className="w-full grid grid-cols-auto gap-4 gap-y-6 px-3 sm:px-0">
        {doctors.slice(0, 10).map((item, index) => (
          <motion.div
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              scrollTo(0, 0);
            }}
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer transition-all duration-500"
            key={index}
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInOutVariants}
            whileHover={{
              scale: 1.05, // Slightly scale up
              boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.2)', // Add a shadow for depth
            }}
          >
            <img className="bg-blue-50" src={item.image} alt="" />
            <div className="p-4">
              <div className="flex items-center gap-2 text-sm text-center text-green-500">
                <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                <p>Available</p>
              </div>
              <p className="text-gray-900 text-lg font-medium">{item.name}</p>
              <p className="text-gray-600 text-sm">{item.speciality}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* More Button */}
      <motion.button
        onClick={() => {
          navigate('/doctors');
          scrollTo(0, 0);
        }}
        className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10 hover:scale-105 transition-all"
        variants={fadeInOutVariants}
      >
        More
      </motion.button>
    </motion.div>
  );
};

export default TopDoctors;
