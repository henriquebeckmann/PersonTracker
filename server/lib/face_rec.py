import os

import cv2
import face_recognition as fr
import numpy as np

ROOT_PATH = os.getenv("ROOT_PATH")

def get_encoded_faces():
    """
    looks through the faces folder and encodes all
    the faces

    :return: dict of (name, image encoded)
    """
    faces_path = f"{ROOT_PATH}/server/faces"
    encoded = {}

    for _, _, fnames in os.walk(faces_path):
        for fname in fnames:
            if fname.endswith(".jpg") or fname.endswith(".png"):
                face = fr.load_image_file(f"{faces_path}/{fname}")
                encoding = fr.face_encodings(face)[0]
                encoded[fname.split(".")[0]] = encoding

    return encoded


def classify_face(im):
    """
    will find all of the faces in a given image and label
    them if it knows what they are

    :param im: str of file path
    :return: list of face names
    """
    faces = get_encoded_faces()
    faces_encoded = list(faces.values())
    known_face_names = list(faces.keys())

    img = cv2.imread(im)

    face_locations = fr.face_locations(img)
    unknown_face_encodings = fr.face_encodings(img, face_locations)

    face_names = []
    for face_encoding in unknown_face_encodings:
        # See if the face is a match for the known face(s)
        matches = fr.compare_faces(faces_encoded, face_encoding)
        name = "Desconhecido"

        # use the known face with the smallest distance to the new face
        face_distances = fr.face_distance(faces_encoded, face_encoding)
        best_match_index = np.argmin(face_distances)
        if matches[best_match_index]:
            name = known_face_names[best_match_index]

        face_names.append(name)

        return face_names

if __name__ == "__main__":
    print(classify_face("bill gates.jpg"))

