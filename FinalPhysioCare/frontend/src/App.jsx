import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import MyProfile from './pages/MyProfile';
import MyAppointments from './pages/MyAppointments';
import Appointments from './pages/Appointments';
import Services from './pages/Services';  // Importing the Services overview page
import VideoConsultation from './pages/VideoConsultation';
import VirtualExercise from './pages/VirtualExercise';
import LiveExerciseTraining from './pages/LiveExerciseTraining';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Chatbot from "./components/Chatbot";




import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotVisible((prev) => !prev);
  };
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer />
      <Navbar />
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/my-appointments' element={<MyAppointments />} />
        <Route path='/appointment/:docId' element={<Appointments />} />
        
        {/* Services Overview and Sub-Pages */}
        <Route path="/" element={<Home />} />
        {/* ye wala 3 Doubts hai */}
    <Route path="/service/video-consultation" element={<VideoConsultation />} />
    <Route path="/service/virtual-exercise" element={<VirtualExercise />} />
    <Route path="/service/live-exercise-training" element={<LiveExerciseTraining />} />
    
        <Route path='/services' element={<Services />} />
        <Route path='/services/video-consultation' element={<VideoConsultation />} />
        <Route path='/services/virtual-exercise' element={<VirtualExercise />} />
        <Route path='/services/live-exercise-training' element={<LiveExerciseTraining />} />
      </Routes>

      <div className="relative">
      {/* <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer /> */}
      <Chatbot isVisible={isChatbotVisible} onClose={() => setIsChatbotVisible(false)} />

{/* Conditionally render the button */}
{!isChatbotVisible && (
  <button
    onClick={toggleChatbot}
    className="fixed bottom-20 mb-10 right-10 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600"
  >
    💬
  </button>
)}

    </div>
      
      <Footer />
    </div>
  );
};

export default App;
