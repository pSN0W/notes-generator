# Commands

## Download the software in your local machine

Clone this repository <br> <code>git clone
https://github.com/pSN0W/notes-generator.git</code><br><br>

## Start backend server

Install pip3 if not installed already<br> <code>sudo apt install
python3-pip</code><br><br> Install virtualenv if not installed already<br>
<code>pip install virtualenv</code><br><br> Go to the project<br> <code>cd
notes-generator</code><br><br> Go to backend directory<br> <code>cd
backend/</code><br><br> Create virtual environment<br> <code>python3 -m venv
env</code><br><br> Activate virtual environment<br> <code>source
env/bin/activate</code><br><br> Install related packages<br> <code>pip3 install
-r requirments.txt</code><br><br> Ready your database for migration<br>
<code>python3 manage.py makemigrations</code><br><br> migrate<br> <code>python3
manage.py migrate --run-syncdb</code><br><br> Start your backend development
server<br> <code>python3 manage.py runserver</code><br><br> Make sure your
development server is running<br><br>

## Start frontend server

Create one for instance of terminal at notes-generator<br><br> Go to frontend
directory<br> <code>cd frontend</code><br><br> Install all the necessary
packages<br> <code>npm install</code><br><br> Start your development server<br>
<code>npm start</code><br> <br> Once both your frontend and backend development
server has successfully started search <code> http://localhost:3000/ <code> in
your browser. <br> You will see home page of Notesy.

## Creating first note

First step is to create an account for yourself. <br> Click on the User icon on
top right of the page and then click sign up on the login page. Or just search
for <code>http://localhost:3000/register </code> in your browser.<br> Provide
relevant information to create the User. <br> Once the user has been registered
successfully you will be redirected to homepage. <br> Click on Notes on the top
right of home page and select Create Notes.<br><br>

Create your note and the click on Save and Create option on top task bar.
<br><br>

<b>Hurray!! you have created your first Note.</b>
