# node-activities-zipper

This project is inteded to make my job as a coding bootcamp TA a little easier by separating solutions from class activities and zipping all folders.

Part of my duties are to slack out class activities followed by the solutions after the excersice is completed.
This is very tedious because at the start of every class I need to make a git pull from the curriculum repo as it's continuously updated, then pull out the solutions and zip every folder in preparation for slacking out in class.

Each daily activities folder looks something like this...

```
class-activities
    |_  01-exercise-one
    |   |_  Unsolved
    |   |   |_exercise.js
    |   |
    |   |_  Solved
    |   |   |_exersize.js
    |   |   |_Explanation.md
    |   |
    |   |_  README.md
    |
    |_ 02-exercise-two
    |   |
```  

## How To Use

1. Install [node js](https://nodejs.org/en/) (if not already installed).
2. Clone repo & install dependencies.
    * in terminal type ```git clone <remote URL>```
    * navigate into repo and type ```npm install```
3. Paste or Move the Daily activities into the 'activities' directory.
    * There are some example activities that can be pasted into the activities folder.
4. run command ```node zipper.js```
5. All zipped files will be in the 'zipped-files' directory.
