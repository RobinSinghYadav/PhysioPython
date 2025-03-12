// import React, { useContext, useState } from 'react'
// import { assets } from '../assets/assets'
// import { AppContext } from '../context/AppContext'
// import axios from 'axios'
// import { toast } from 'react-toastify'

// const MyProfile = () => {
//   const {userData,setUserData,token,backendUrl,loadUserProfileData}=useContext(AppContext)

//   const [isEdit, setIsEdit] = useState(false)
//   const [image, setImage] = useState(false)


//   const updateUserProfileData = async ()=>{
//     try{
//       const formData = new FormData()

//       formData.append('name', userData.name)
//       formData.append('phone', userData.phone)
//       formData.append('address', JSON.stringify(userData.address))  
//       formData.append('dob', userData.dob)
//       formData.append('gender', userData.gender)
//       image && formData.append('image',image);


//       const {data} = await axios.post(backendUrl + '/api/user/update-profile',formData,{headers:{token}})

//       if(data.success){
//         toast.success(data.message)
//         await loadUserProfileData()
//         setIsEdit(false)
//         setImage(false)
//       }
//       else{
//         toast.error(data.message)
//       }
      
      
//     }
//     catch(error){
//       console.log(error)
//       toast.error(error.message)

//     }
//   }


//   return userData&&(
//     <div className='max-w-lg flex flex-col gap-2 text-sm'>

//       {
//         isEdit ?
//         <label htmlFor="image">
//           <div className='inline-block relative cursor-pointer'>
//             <img className='w-36 rounded opacity-75 ' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
//             <img className='w-10 absolute bottom-12 right-12' src={image ? '' : assets.upload_icon} alt="" />
//           </div>
//           <input onChange={(e)=>setImage(e.target.files[0])} type="file"  id="image" hidden/>
//         </label> :
//         <img className='w-36 rounded' src={userData.image} alt="" />
//       }

      

//       {
//         isEdit ? <input className='bg-gray-50 text-3xl font-medium max-w-60 mt-4' type="text" value={userData.name} onChange={e=>setUserData(prev=>({...prev,name:e.target.value}))}/> : <p className='font-medium text-3xl text-neutral-800 mt-4'>{userData.name}</p>
//       }

//       <hr className='bg-zinc-400 h-[1px] border-none' />
//       <div>
//         <p className='text-neutral-500 underline mt-3'>CONTACT IMFORMATION</p>
//         <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 text-neutral-700'>
//           <p className='font-medium'>Email Id:</p>
//           <p className='text-blue-500'>{userData.email}</p> 
//           <p className='font-medium'>Phone:</p>
//           {
//         isEdit ? <input className='bg-gray-100 max-w-52' type="text" value={userData.phone} onChange={e=>setUserData(prev=>({...prev,phone:e.target.value}))}/> : <p className='text-blue-400'>{userData.phone}</p>
//       }
//       <p className='font-medium'>Address:</p>
//       {
//         isEdit 
//         ? <p>
//           <input className='bg-gray-50' onChange={(e)=>setUserData(prev=>({...prev,address:{...prev.address,line1:e.target.value}}))} value={userData.address.line1} type="text" />
          
//           <br />
//           <input className='bg-gray-50' onChange={(e)=>setUserData(prev=>({...prev,address:{...prev.address,line2:e.target.value}}))} value={userData.address.line2} type="text" />
//         </p>
//         : <p className='text-gray-500'>
//           {userData.address.line1}
//           <br />
//           {userData.address.line2}

//         </p>
//       }

//         </div>
//       </div>
//       <div>
//         <p className='text-neutral-500 underline mt-3'>BASIC INFORMATION</p>
//         <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
//           <p className='font-medium'>Gender:</p>
//           {
//         isEdit ? <select className='max-w-20 bg-gray-100' onChange={(e)=>setUserData(prev=>({...prev,gender:e.target.value}))} value={userData.gender}>
//           <option value="Male">Male</option>
//           <option value="Female">Female</option>

//         </select> : <p className='text-gray-400'>{userData.gender}</p>
//       }
//       <p className='font-medium'>BirthDay:</p>
//       {
//         isEdit ? <input className='max-w-28 bg-gray-100' type="date" onChange={(e)=>setUserData(prev=>({...prev,dob:e.target.value}))} value={userData.dob} /> : <p className='text-gray-400'>{userData.dob}</p>
//       }
//         </div>
//       </div>
//       <div className='mt-10'>
//         {
//           isEdit ? <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all' onClick={()=>{updateUserProfileData()}}>Save Information</button>
//           : <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all' onClick={()=>setIsEdit(true)}>Edit</button>
//         }
//       </div>
//     </div>
//   )
// }

// export default MyProfile

import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';  // Import motion from framer-motion

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('phone', userData.phone);
      formData.append('address', JSON.stringify(userData.address));
      formData.append('dob', userData.dob);
      formData.append('gender', userData.gender);
      image && formData.append('image', image);

      const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } });

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return userData && (
    <motion.div
      className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center">
        {
          isEdit ?
            <label htmlFor="image" className="relative cursor-pointer">
              <img className="w-36 h-36 rounded-full border-4 border-gray-200 shadow-lg opacity-75" src={image ? URL.createObjectURL(image) : userData.image} alt="Profile" />
              <img className="w-10 absolute bottom-0 right-0 bg-white rounded-full p-2" src={image ? '' : assets.upload_icon} alt="Upload" />
            </label>
            :
            <img className="w-36 h-36 rounded-full border-4 border-gray-200 shadow-lg" src={userData.image} alt="Profile" />
        }
        <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
      </div>

      <div className="text-center">
        {
          isEdit ?
            <input className="bg-gray-50 text-3xl font-medium text-center w-full py-2 px-4 border-b-2 border-gray-300 focus:outline-none focus:border-primary" type="text" value={userData.name} onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))} />
            :
            <p className="text-3xl font-semibold text-gray-800">{userData.name}</p>
        }
      </div>

      <hr className="border-t-2 border-gray-200" />

      <div>
        <p className="text-neutral-500 underline text-lg mt-3">Contact Information</p>
        <div className="space-y-3 text-gray-700">
          <div className="flex justify-between">
            <p className="font-medium">Email:</p>
            <p className="text-blue-500">{userData.email}</p>
          </div>

          <div className="flex justify-between">
            <p className="font-medium">Phone:</p>
            {
              isEdit ?
                <input className="bg-gray-100 px-4 py-2 rounded-lg w-full max-w-xs" type="text" value={userData.phone} onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))} />
                :
                <p className="text-blue-400">{userData.phone}</p>
            }
          </div>

          <div className="flex justify-between">
            <p className="font-medium">Address:</p>
            {
              isEdit ?
                <div>
                  <input className="bg-gray-100 px-4 py-2 rounded-lg w-[80%] mb-2 ml-20" onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={userData.address.line1} type="text" placeholder='address line 2' />
                  <input className="bg-gray-100 px-4 py-2 rounded-lg w-[80%] mb-2 ml-20" onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={userData.address.line2} type="text" placeholder='address line 2' />
                </div>
                :
                <p className="text-gray-500">
                  {userData.address.line1}
                  <br />
                  {userData.address.line2}
                </p>
            }
          </div>
        </div>
      </div>

      <div>
        <p className="text-neutral-500 underline text-lg mt-3">Basic Information</p>
        <div className="space-y-3 text-gray-700">
          <div className="flex justify-between">
            <p className="font-medium">Gender:</p>
            {
              isEdit ?
                <select className="bg-gray-100 px-4 py-2 rounded-lg w-full max-w-xs" onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} value={userData.gender}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                :
                <p className="text-gray-400">{userData.gender}</p>
            }
          </div>

          <div className="flex justify-between">
            <p className="font-medium">Birth Date:</p>
            {
              isEdit ?
                <input className="bg-gray-100 px-4 py-2 rounded-lg w-full max-w-xs" type="date" onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} value={userData.dob} />
                :
                <p className="text-gray-400">{userData.dob}</p>
            }
          </div>
        </div>
      </div>

      <div className="mt-6 text-center">
        {
          isEdit ?
            <button className="border border-primary px-8 py-2 rounded-full bg-primary text-white hover:bg-primary-dark transition-all" onClick={updateUserProfileData}>Save Changes</button>
            :
            <button className="border border-primary px-8 py-2 rounded-full text-primary hover:bg-primary hover:text-white transition-all" onClick={() => setIsEdit(true)}>Edit Profile</button>
        }
      </div>
    </motion.div>
  );
};

export default MyProfile;
