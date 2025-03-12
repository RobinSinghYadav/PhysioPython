import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { motion } from 'framer-motion';  // Import motion from framer-motion


const Doctors = () => {
  const {speciality}=useParams()
  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const navigate=useNavigate()
  
  const {doctors}=useContext(AppContext)

  const applyFilter=()=>{
    if(speciality){
      setFilterDoc(doctors.filter(doc => doc.speciality===speciality))
    }
    else{
      setFilterDoc(doctors)
    }
  }

  useEffect(()=>{
    applyFilter()
  },[doctors,speciality])


  return (
    <motion.div
   
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div>
      <p className='text-gray-600'>Browse through the Therapist's Speciality.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-primary text-white' : ''}`} onClick={()=>{setShowFilter(prev=>!prev)}}>Filters</button>
        <div className={`flex flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          <p onClick={()=>speciality==='Posture Correction Exercises' ? navigate('/doctors') : navigate('/doctors/Posture Correction Exercises')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Posture Correction Exercises" ? "bg-indigo-100 text-black" : ""}`}>Posture Correction Exercises</p>
          <p onClick={()=>speciality==='Mobility Exercises' ? navigate('/doctors') : navigate('/doctors/Mobility Exercises')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Mobility Exercises" ? "bg-indigo-100 text-black" : ""}`}>Mobility Exercises</p>
          <p onClick={()=>speciality==='Balance and Coordination Exercises' ? navigate('/doctors') : navigate('/doctors/Balance and Coordination Exercises')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Balance and Coordination Exercises" ? "bg-indigo-100 text-black" : ""}`}>Balance and Coordination Exercises</p>
          <p onClick={()=>speciality==='Strengthening Exercise' ? navigate('/doctors') : navigate('/doctors/Strengthening Exercise')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Strengthening Exercise" ? "bg-indigo-100 text-black" : ""}`}>Strengthening Exercise</p>
          <p onClick={()=>speciality==='Stretching Exercises' ? navigate('/doctors') : navigate('/doctors/Stretching Exercises')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Stretching Exercises" ? "bg-indigo-100 text-black" : ""}`}>Stretching Exercises</p>
          <p onClick={()=>speciality==='Core Stability Exercises' ? navigate('/doctors') : navigate('/doctors/Core Stability Exercises')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Core Stability Exercises" ? "bg-indigo-100 text-black" : ""}`}>Core Stability Exercises</p>
        </div>
      
      <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
        {
          filterDoc.map((item,index)=>(
            <div onClick={()=>navigate(`/appointment/${item._id}`)} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
              
                <img className='bg-blue-50' src={item.image} alt="" />
              
             <div className='p-4'>
             <div className={`flex items-center gap-2 test-sm text-center ${item.available?'text-green-500':'text-gray-500'}  `}>
                <p className={`w-2 h-2 ${item.available?'bg-green-500' :'bg-gray-500'} rounded-full`}></p><p>{item.available?'Available':'Not Available'}</p>
              </div>
              <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
              <p className='text-gray-600 text-sm'>{item.speciality}</p>
             </div>
            </div>
        ))
        }
      </div>
    </div>
    </div>
    </motion.div>
  )
}

export default Doctors