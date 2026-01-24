---
title: "Quick-start a new python project with zsh scripting"
description: "Because I was tired of doing it manually"
date: "2026-01-24"
image: "/images/line-abstract.jpg"
highlight: false
---

# Problem
I've been starting some new Python projects, but it's getting tedious to create new folders, virtual environments, then installing packages manually.
So I thought: why not write a zsh script to speed things up? 

# Solution (Script)
```
#!/usr/bin/env zsh

# ./new_project.sh <dest folder> <project name> <txt file with pkgs to install>
# Example Usage: ./new_python_project.sh ~/Desktop myNewProject pkgs.txt

# Goals:
# - initialise new Python project in specified location
# - create and activate a Python venv
#      - install packages from given .txt file (each line a package)

# parse command line args
if [[ $# -ne 3 ]]; then
  echo "Usage: $0 <folder_path> <project_name> <packages_txt>"
  exit 1
fi

FOLDER_PATH="$1"
PROJECT_NAME="$2"
PKGS_FILE="$3"

# For testing:
# echo "the file is called '$PKGS_FILE'"
# echo "its content is: $(cat $PKGS_FILE)"

# expand paths
FOLDER_PATH="${~FOLDER_PATH}"   # ~ is an expansion flag: if there is ~ , expand it
PKGS_FILE="${PKGS_FILE:A}"  # expand package file path too bc we later cd into new project dir

# check package file exists
if [[ ! -f "$PKGS_FILE" ]]; then
  echo "Error: '$PKGS_FILE' does not exist :("
  exit 1
fi

# create project directory 
PROJECT_DIR="$FOLDER_PATH/$PROJECT_NAME"
mkdir -p "$PROJECT_DIR"
cd "$PROJECT_DIR"  # navigate into it

# create and activate new venv
python3 -m venv .venv
source .venv/bin/activate

# upgrade pip to be safe
pip install --upgrade pip

echo "Ready to install packages..."
# install packages line by line (-r for raw (don't escape \); don't skip last line if no EOF)
while IFS= read -r package || [[ -n "$package" ]]; do
  # echo "Installing "$package"..."
  [[ -z "$package" || "$package" == \#* ]] && continue  # skip empty lines and comments
  pip install "$package"
done < "$PKGS_FILE" # put contents from PFGS_FILE into stdin

# create empty main
touch main.py

echo "======== Created project '$PROJECT_NAME' at $PROJECT_DIR ========="
echo "============================== BYE! =============================="
```