// import React from 'react'
// import { assets } from '../assets/assets'
// import { useNavigate } from 'react-router-dom'



// const Header = () => {

//     const navigate=useNavigate()
//   return (
//     <div className='flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20'>
//         {/*-------Left Side------------*/}
//         <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'> 
//             <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight'>
//                 Book Appointment <br/> with Trusted Therapists

//             </p>
//             <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light'>
//                 <img className='w-28' src={assets.group_profiles} alt="" />
//                 <p>Simply browse through our extensive list of trusted Therapists, <br className='hidden sm:block' /> schedule your appointment hassle-free
//                 </p>
//             </div>
//             <a onClick={()=>navigate('/doctors')} className='flex items-center gap-2 cursor-pointer bg-white px-8 py-3 rounded-full text-grey-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300'>
//                 Book Appointment <img className='w-3' src={assets.arrow_icon} alt="" />
//             </a>
//         </div>

//         {/*------------Right Side---------*/}
//         <div className='md:w-1/2 relative'>
//             <img className='w-full md:absolute bottom-0 h-auto rounded-lg' src={assets.header_img} alt="" />
//             {/* <img className='w-full md:absolute bottom-0 h-auto rounded-lg' src={assets.header_img2} alt="" /> */}
            

//         </div>
//     </div>
//   )
// }

// export default Header

import React from 'react';
import { motion } from 'framer-motion';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  // Define animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.2 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.4 } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, delay: 0.6 } },
  };

  return (
    <motion.div
      className="flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Left Side */}
      <motion.div
        className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]"
        variants={textVariants}
      >
        <motion.p
          className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight"
          variants={textVariants}
        >
          Book Appointment <br /> with Trusted Therapists
        </motion.p>
        <motion.div
          className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light"
          variants={textVariants}
        >
          <motion.img className="w-28" src={assets.group_profiles} alt="" />
          <p>
            Simply browse through our extensive list of trusted Therapists,{' '}
            <br className="hidden sm:block" /> schedule your appointment
            hassle-free
          </p>
        </motion.div>
        <motion.a
          onClick={() => navigate('/doctors')}
          className="flex items-center gap-2 cursor-pointer bg-white px-8 py-3 rounded-full text-grey-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300"
          variants={buttonVariants}
        >
          Book Appointment <img className="w-3" src={assets.arrow_icon} alt="" />
        </motion.a>
      </motion.div>

      {/* Right Side */}
      <motion.div
        className="md:w-1/2 relative"
        variants={imageVariants}
      >
        <motion.img
          className="w-full md:absolute bottom-0 h-auto rounded-lg"
          src={assets.header_img}
          alt=""
          variants={imageVariants}
        />
      </motion.div>
    </motion.div>
  );
};

export default Header;
