# notes-generator

Futuristic way of taking notes

## 📓 About

Notes generator is a web application written using React and Django. It converts
normal markdown notes into a flowchart that makes revision of topic more
efficient and fun.

## 💡 Motivation

The idea of this project came when I was working on a project for Object
Oriented Methodology. I had to make class and Use Case diagrams and I completely
hated the idea of dragging and dropping components and then writing to it. I
just wanted to write the hierarchy in a text file and have some software convert
them into a flowchart. I searched for software to do this, but couldn't fine any
so I decided to create one myself. <br> During research on the topic, I found
out that humans tend to remember concepts longer if they are presented to them
in pictorial form, and that's why teachers use flowcharts for explanation. This
discovery led me to expand my idea and motivated me to create an app that can
convert a normal text file into a flowchart.<br> Upon further investigation, I
discovered that most of people have already shifted from taking notes using pen
and paper to taking notes on computer and markdown is widely used file extension
for this.<br> <b>So finally I decided to make an application that can convert a
markdown file into flowchart.</b>

## 🚀 Features

<ul>
    <li> Create flowcharts quickly by not having to worry about GUI </li>
    <li> Save your notes for future read </li>
    <li> Customize the look of your flowchart </li>
    <li> Share note globally or with your friend </li>
    <li> Easy sign up </li>
    <li> Beautiful looking note to make learning fun </li>
</ul>

## 🤖 Tech Stack

Following tech stacks have been used to create this project <br>
<b>React</b><br> React is used for frontend of the application because it works
on the concept of building webpage from components and this concept is helpful
for this app as flowchart is also build from small components (nodes).

<b>Pybind11 </b><br> I wrote the function that converts markdown into JSX string
in C++ language as it is fast. Pybind11 was chosen as it is a header only
library that can easily convert a C++ function to a python function.

<b>Django </b><br> Django was used for backend as it is also a python framework
and hence can use the python module generated by Pybind11.

## 📦 Getting started

Make sure that python > 3.8 and npm > 6.14.4 is installed on your system <br>
Follow the instructions in COMMANDS.txt file to start the app

## 🔨 Contribute

Want to contribute to this project? <br> Fork this repository, read about the
code structure in
<a href="https://github.com/pSN0W/notes-generator/blob/main/HACKING.md">HACKING.md</a>
file, make the desired changes and then create a pull request.
