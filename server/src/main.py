import os

ROOT_PATH = os.getenv("ROOT_PATH")
UPLOAD_DIRECTORY = f"{ROOT_PATH}/uploads"

# from face_rec import classify_face

from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import shutil

def run():
    app = FastAPI()

    origins = ["*"]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    if not os.path.exists(UPLOAD_DIRECTORY):
        os.makedirs(UPLOAD_DIRECTORY)

    @app.post("/uploadfile/")
    async def create_upload_file(file: UploadFile = File(...)):
        # with open(f"{UPLOAD_DIRECTORY}/{file.filename}", "wb") as buffer:
        #     shutil.copyfileobj(file.file, buffer)
        #     names = classify_face(f"{UPLOAD_DIRECTORY}/{file.filename}")
        return {"names": ["Bill Gates"]}

    uvicorn.run(app, host="0.0.0.0", port=8000)

if __name__ == "__main__":
    run()

