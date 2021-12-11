string = """
// clone this repository 
git clone https://github.com/pSN0W/notes-generator.git

// Install pip3 if not installed already
sudo apt install python3-pip

// Install virtualenv if not installed already
pip install virtualenv

// go to the project
cd notes-generator

// go to backend directory
cd backend/

// Create virtual environment
python3 -m venv env

// Activate virtual environment
source env/bin/activate

// Install related packages
pip3 install -r requirments.txt

// Ready your database for migration
python3 manage.py makemigrations

// migrate
python3 manage.py migrate --run-syncdb

// start your backend development server
python3 manage.py runserver

// Make sure your development server is running

// Create one for instance of terminal at notes-generator

// Go to frontend directory
cd frontend

// Install all the necessary packages
npm install

// Start your development server
npm start
"""

lst = string.split('\n')
fin = []
for sent in lst:
    if sent.strip() == '':
        continue
    if sent[:2] == "//":
        fin.append(sent[2:])
    else:
        fin.append(f"<code>{sent}</code><br>")

finStr = "<br>\n".join(fin)
print(finStr)