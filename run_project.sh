#!/bin/bash

# Path to backend and frontend
flask_project_path="backend/API/dialogue_summarizer"
angular_project_path="frontend/multidialsum"


# Start Flask server in the background
cd $flask_project_path
export FLASK_APP=app.py
export FLASK_ENV=development
flask run --host=0.0.0.0 --port=5000 &

# Start Angular frontend
cd $angular_project_path
ng serve --host 0.0.0.0 --port 4200
