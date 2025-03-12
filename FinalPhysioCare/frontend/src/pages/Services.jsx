import React from 'react';
import { useNavigate } from 'react-router-dom';

const Services = () => {
    const navigate = useNavigate();

    const services = [
        { title: "Video Calling Consultation", path: "/service/video-consultation", description: "Connect with a specialist via video call for personalized consultation." },
        { title: "Virtual Exercise Library", path: "/service/virtual-exercise", description: "Access a library of guided exercise videos for your physiotherapy needs." },
        { title: "Live Camera Exercise Training", path: "/service/live-exercise-training", description: "Real-time exercise guidance with live feedback and posture correction." }
    ];

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-8">Our Services</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
                {services.map((service, index) => (
                    <div
                        key={index}
                        onClick={() => navigate(service.path)}
                        className="cursor-pointer p-6 border rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105 w-80"
                    >
                        <h2 className="text-xl font-semibold mb-2">{service.title}</h2>
                        <p className="text-gray-600">{service.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Services;
