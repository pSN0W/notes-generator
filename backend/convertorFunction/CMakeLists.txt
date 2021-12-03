cmake_minimum_required(VERSION 3.4)
project(convertorFunction)
add_subdirectory(pybind11)
pybind11_add_module(string_to_JSX main.cpp)