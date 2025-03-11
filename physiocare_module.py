import cv2
import mediapipe as mp
import numpy as np
from tkinter import Tk, filedialog

class PhysioCare:
    def __init__(self):
        self.video_path = self.select_video()
        if not self.video_path:
            print("No video selected. Exiting...")
            exit()
        
        self.cap = cv2.VideoCapture(self.video_path)
        self.mp_pose = mp.solutions.pose
        self.pose = self.mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5)
        self.mp_drawing = mp.solutions.drawing_utils
        self.window_name = "PhysioCare Exercise"
        self.playback_speed = 1.0
        self.paused = False

    def select_video(self):
        Tk().withdraw()
        video_path = filedialog.askopenfilename(title="Select Exercise Video", filetypes=[("MP4 Files", "*.mp4")])
        return video_path

    def extract_pose_landmarks(self, frame):
        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = self.pose.process(frame_rgb)
        if results.pose_landmarks:
            self.mp_drawing.draw_landmarks(frame, results.pose_landmarks, self.mp_pose.POSE_CONNECTIONS)
            return np.array([[lmk.x, lmk.y, lmk.z] for lmk in results.pose_landmarks.landmark])
        return None

    def calculate_similarity(self, video_landmarks, patient_landmarks):
        if video_landmarks is None or patient_landmarks is None:
            return 0
        distances = np.linalg.norm(video_landmarks - patient_landmarks, axis=1)
        return max(0, 100 - np.mean(distances) * 100)

    def handle_keypress(self, key):
        if key == ord('p'):
            self.paused = not self.paused
        elif key == ord('b'):
            self.cap.set(cv2.CAP_PROP_POS_MSEC, max(0, self.cap.get(cv2.CAP_PROP_POS_MSEC) - 5000))
        elif key == ord('f'):
            self.cap.set(cv2.CAP_PROP_POS_MSEC, self.cap.get(cv2.CAP_PROP_POS_MSEC) + 10000)
        elif key == ord('s'):
            self.playback_speed = max(0.5, self.playback_speed - 0.5)
        elif key == ord('d'):
            self.playback_speed += 0.5
        elif key == ord('q'):
            return False
        return True

    def run(self):
        patient_cap = cv2.VideoCapture(0)
        if not patient_cap.isOpened():
            print("Error: Could not open webcam.")
            exit()

        while self.cap.isOpened() and patient_cap.isOpened():
            if not self.paused:
                ret1, frame_video = self.cap.read()
                ret2, frame_patient = patient_cap.read()

                if not ret1 or not ret2:
                    break

                video_landmarks = self.extract_pose_landmarks(frame_video)
                patient_landmarks = self.extract_pose_landmarks(frame_patient)

                similarity = self.calculate_similarity(video_landmarks, patient_landmarks)

                # Change text color based on correctness threshold
                text_color = (0, 255, 0) if similarity >= 70 else (0, 0, 255)  # Green if ≥70, else Red
                cv2.putText(frame_patient, f"Similarity: {similarity:.2f}%", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, text_color, 2)

                frame_video = cv2.resize(frame_video, (640, 480))
                frame_patient = cv2.resize(frame_patient, (640, 480))
                combined_frame = cv2.hconcat([frame_video, frame_patient])

                cv2.imshow(self.window_name, combined_frame)

            key = cv2.waitKey(max(1, int(33 / self.playback_speed)))
            if not self.handle_keypress(key):
                break

        self.cap.release()
        patient_cap.release()
        cv2.destroyAllWindows()

if __name__ == "__main__":
    physio_app = PhysioCare()
    physio_app.run()

