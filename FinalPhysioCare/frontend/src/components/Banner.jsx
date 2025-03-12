import React from 'react';
import { motion } from 'framer-motion';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
  const navigate = useNavigate();

  // Define animation variants for the banner
  const bannerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      className="flex bg-primary rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      variants={bannerVariants}
    >
      {/* Left Side */}
      <div className="flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5">
        <motion.div
          className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          variants={bannerVariants}
        >
          <p>Book Appointment</p>
          <p className="mt-4">With 100+ Trusted Therapists</p>
        </motion.div>
        <motion.button
          onClick={() => {
            navigate('/login');
            scrollTo(0, 0);
          }}
          className="bg-white text-sm sm:text-base text-gray-600 px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          variants={bannerVariants}
        >
          Create Account
        </motion.button>
      </div>

      {/* Right Side */}
      <motion.div
        className="hidden md:block md:w-1/2 lg:w-[370px] relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
        variants={imageVariants}
      >
        <img
          className="w-full absolute bottom-0 right-0 max-w-md"
          src={assets.appointment_img}
          alt=""
        />
      </motion.div>
    </motion.div>
  );
};

export default Banner;
