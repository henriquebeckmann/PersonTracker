import os
import sys

from dotenv import load_dotenv

load_dotenv()
ROOT_PATH = os.getenv("ROOT_PATH")

sys.path.append(os.path.abspath(f"{ROOT_PATH}/server/src"))
sys.path.append(os.path.abspath(f"{ROOT_PATH}/server/lib"))

import main

if __name__ == "__main__":
    main.run()

