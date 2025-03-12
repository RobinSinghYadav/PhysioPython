import React, { useState, useEffect, useRef } from 'react';

const VideoConsultation = () => {
    const [patientName, setPatientName] = useState("John Doe");
    const [selectedDoctor, setSelectedDoctor] = useState("");
    const [consultationDate, setConsultationDate] = useState("");
    const [consultationTime, setConsultationTime] = useState("");
    const [additionalInfo, setAdditionalInfo] = useState("");
    const [isVideoCallStarted, setIsVideoCallStarted] = useState(false);

    const jitsiContainerRef = useRef(null);

    const doctors = [
        { id: 1, name: "Dr. Alice Smith" },
        { id: 2, name: "Dr. Bob Johnson" },
        { id: 3, name: "Dr. Carol Lee" }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Consultation booked successfully!");
    };

    const startVideoCall = () => {
        setIsVideoCallStarted(true);
    };

    useEffect(() => {
        if (isVideoCallStarted) {
            const domain = "meet.jit.si";
            const options = {
                roomName: `Consultation_${selectedDoctor}_${patientName}`,
                width: "100%",
                height: 500,
                parentNode: jitsiContainerRef.current,
                userInfo: {
                    displayName: patientName
                }
            };
            new window.JitsiMeetExternalAPI(domain, options);
        }
    }, [isVideoCallStarted]);

    return (
        <div className="container mx-auto p-4 max-w-lg">
            <h1 className="text-2xl font-bold mb-6 text-center">Video Consultation Booking</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700">Patient Name</label>
                    <input
                        type="text"
                        value={patientName}
                        readOnly
                        className="w-full p-2 border rounded bg-gray-100 text-gray-700"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Select Doctor</label>
                    <select
                        value={selectedDoctor}
                        onChange={(e) => setSelectedDoctor(e.target.value)}
                        required
                        className="w-full p-2 border rounded"
                    >
                        <option value="">Choose a doctor</option>
                        {doctors.map((doctor) => (
                            <option key={doctor.id} value={doctor.name}>
                                {doctor.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700">Consultation Date</label>
                    <input
                        type="date"
                        value={consultationDate}
                        onChange={(e) => setConsultationDate(e.target.value)}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Consultation Time</label>
                    <input
                        type="time"
                        value={consultationTime}
                        onChange={(e) => setConsultationTime(e.target.value)}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Additional Information</label>
                    <textarea
                        value={additionalInfo}
                        onChange={(e) => setAdditionalInfo(e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="Enter any additional information..."
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
                >
                    Book Consultation
                </button>
            </form>

            {isVideoCallStarted ? (
                <div className="mt-8 p-4 bg-gray-200 rounded shadow text-center">
                    <div ref={jitsiContainerRef} />
                </div>
            ) : (
                <button
                    onClick={startVideoCall}
                    className="w-full mt-4 bg-green-600 text-white p-2 rounded hover:bg-green-700 transition"
                >
                    Start Video Call
                </button>
            )}
        </div>
    );
};

export default VideoConsultation;
