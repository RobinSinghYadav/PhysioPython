import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import { assets } from "../assets/assets";

const LiveExerciseTraining = () => {
    const [selectedExercise, setSelectedExercise] = useState("squats");
    const [isPlaying, setIsPlaying] = useState(false);
    const [isCameraOn, setIsCameraOn] = useState(true);
    const [isVideoMuted, setIsVideoMuted] = useState(true);
    const [isCameraMuted, setIsCameraMuted] = useState(true);
    const [videoVolume, setVideoVolume] = useState(1);
    const [playbackSpeed, setPlaybackSpeed] = useState(1);
    const [videoProgress, setVideoProgress] = useState(0);
    const videoRef = useRef(null);
    const webcamRef = useRef(null);

    const exercises = [
        { id: "squats", name: "Squats", videoSrc: assets.squatsVideo },
        { id: "lunges", name: "Lunges", videoSrc: assets.lungesVideo },
        { id: "plank", name: "Plank", videoSrc: assets.plankVideo },
    ];

    const [videoDimensions, setVideoDimensions] = useState({ width: null, height: null });

    useEffect(() => {
        const selectedExerciseData = exercises.find((exercise) => exercise.id === selectedExercise);
        if (selectedExerciseData) {
            const video = document.createElement("video");
            video.preload = "metadata";
            video.src = selectedExerciseData.videoSrc;
            video.onloadedmetadata = () => {
                setVideoDimensions({ width: video.videoWidth, height: video.videoHeight });
            };
        } else {
            setVideoDimensions({ width: null, height: null });
        }
    }, [selectedExercise]);

    useEffect(() => {
        const updateProgress = () => {
            if (videoRef.current) {
                setVideoProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
            }
        };

        if (videoRef.current) {
            videoRef.current.addEventListener("timeupdate", updateProgress);
        }

        return () => {
            if (videoRef.current) {
                videoRef.current.removeEventListener("timeupdate", updateProgress);
            }
        };
    }, []);

    const handleExerciseChange = (event) => {
        setSelectedExercise(event.target.value);
        setIsPlaying(false);
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
            setVideoProgress(0);
        }
    };

    const togglePlayPause = () => {
        if (videoRef.current) {
            if (videoRef.current.paused || videoRef.current.ended) {
                videoRef.current.play();
                setIsPlaying(true);
            } else {
                videoRef.current.pause();
                setIsPlaying(false);
            }
        }
    };

    const toggleVideoMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsVideoMuted(videoRef.current.muted);
        }
    };

    const toggleCameraMute = () => {
        setIsCameraMuted(!isCameraMuted);
    };

    const handleVolumeChange = (event) => {
        const volume = parseFloat(event.target.value);
        setVideoVolume(volume);
        if (videoRef.current) {
            videoRef.current.volume = volume;
        }
    };

    const handlePlaybackSpeedChange = (event) => {
        const speed = parseFloat(event.target.value);
        setPlaybackSpeed(speed);
        if (videoRef.current) {
            videoRef.current.playbackRate = speed;
        }
    };

    const handleResolutionChange = (event) => {
        console.log("Resolution changed:", event.target.value);
    };

    const handleSeekChange = (event) => {
        const seekTime = (parseFloat(event.target.value) / 100) * videoRef.current.duration;
        videoRef.current.currentTime = seekTime;
        setVideoProgress(event.target.value);
    };

    return (
        <div className="container mx-auto p-6 text-center">
            <h1 className="text-3xl font-bold mb-6">Live Exercise Training</h1>
            <p className="mb-4 text-gray-600">Choose an exercise and follow along!</p>

            <div className="flex justify-center items-center gap-4 mb-6">
                <label className="text-lg font-medium" htmlFor="exercise">Select Exercise:</label>
                <select
                    id="exercise"
                    value={selectedExercise}
                    onChange={handleExerciseChange}
                    className="border border-gray-300 rounded p-2"
                >
                    {exercises.map((exercise) => (
                        <option key={exercise.id} value={exercise.id}>
                            {exercise.name}
                        </option>
                    ))}
                </select>
                <button
                    onClick={togglePlayPause}
                    className="ml-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                    {isPlaying ? "Pause Exercise" : "Start Exercise"}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Exercise Video with Controls */}
                <div className="relative rounded-lg overflow-hidden shadow-md bg-gray-100">
                    <div style={{ width: videoDimensions.width, height: videoDimensions.height }}>
                        {selectedExercise ? (
                            <video
                                src={exercises.find((exercise) => exercise.id === selectedExercise)?.videoSrc}
                                ref={videoRef}
                                controls={false}
                                muted={isVideoMuted}
                                autoPlay={isPlaying}
                                className="w-full h-full object-cover rounded-lg"
                                onPlay={() => setIsPlaying(true)}
                                onPause={() => setIsPlaying(false)}
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-500">
                                <p>Select an exercise to start</p>
                            </div>
                        )}
                    </div>

                    {/* Custom Video Controls */}
                    <div className="flex justify-between items-center p-4">
                        <button onClick={togglePlayPause} className="text-blue-500">
                            {isPlaying ? "Pause" : "Play"}
                        </button>
                        <button onClick={toggleVideoMute} className="text-blue-500">
                            {isVideoMuted ? "Unmute" : "Mute"}
                        </button>
                        <div className="flex items-center gap-2">
                            <label>Volume</label>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.1"
                                value={videoVolume}
                                onChange={handleVolumeChange}
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <label>Speed</label>
                            <select
                                value={playbackSpeed}
                                onChange={handlePlaybackSpeedChange}
                                className="border border-gray-300 rounded p-1"
                            >
                                <option value="0.5">0.5x</option>
                                <option value="1">1x</option>
                                <option value="1.5">1.5x</option>
                                <option value="2">2x</option>
                            </select>
                        </div>
                        <div className="flex items-center gap-2">
                            <label>Resolution</label>
                            <select
                                defaultValue="720p"
                                onChange={handleResolutionChange}
                                className="border border-gray-300 rounded p-1"
                            >
                                <option value="360p">360p</option>
                                <option value="720p">720p</option>
                                <option value="1080p">1080p</option>
                            </select>
                        </div>
                    </div>

                    {/* Video Progress Slider */}
                    <div className="flex items-center p-4">
                        <label>Progress</label>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={videoProgress}
                            onChange={handleSeekChange}
                            className="w-full ml-2"
                        />
                    </div>
                </div>

                {/* Webcam Placeholder with Consistent Dimensions */}
                <div className="relative rounded-lg overflow-hidden shadow-md bg-gray-100" style={{ width: videoDimensions.width, height: videoDimensions.height }}>
                    {isCameraOn ? (
                        <Webcam
                            audio={!isCameraMuted}
                            muted={isCameraMuted}
                            ref={webcamRef}
                            width={videoDimensions.width}
                            height={videoDimensions.height}
                            className="object-cover rounded-lg"
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-500">
                            <p>Camera is off</p>
                        </div>
                    )}
                    <div className="absolute bottom-0 left-0 bg-black bg-opacity-30 text-white p-2">
                        <button onClick={() => setIsCameraOn(!isCameraOn)} className="text-sm">
                            {isCameraOn ? "Turn Off Camera" : "Turn On Camera"}
                        </button>
                        <button onClick={toggleCameraMute} className="text-sm ml-2">
                            {isCameraMuted ? "Unmute Camera" : "Mute Camera"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LiveExerciseTraining;
