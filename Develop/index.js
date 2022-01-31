
const inquirer = require("inquirer");
const fs = require("fs");
const generateMarkdown = require("./utils/generateMarkdown.js");


const questions = () => {
  return inquirer.prompt([
    {
        type: "input",
        name: "github",
        message: "Enter your GitHub Username.",
        validate: (githubInput) => {
          if (githubInput) {
            return true;
          } else {
            console.log("GitHub username Required!");
            return false; }
        },
      },
    {
      type: "input",
      name: "title",
      message: "What is your project title?",
      validate: (projectTitle) => {
        if (projectTitle) {
          return true;} 
        else {
          console.log("Project title is Required!");
        return false; }
      },
    },
    {
      type: "input",
      name: "description",
      message: "Enter a short description of your project.",
      validate: (projectDescription) => {
        if (projectDescription) {
          return true;
        } else {
          console.log("Project description is Required!");
          return false;
        }
      },
    },
    {
      type: "checkbox",
      name: "languages",
      message: "What did you use to build this project?",
      choices: [
        "Javascript",
        "HTML",
        "CSS",
        "ES6",
        "jQuery",
        "Bootstrap",
        "Node.js",
      ],
    },
    {
      type: "list",
      name: "license",
      message: "Please select a license for your project (Required):",
      choices: ["MIT", "APACHE(2.0)", "GPL(3.0)", "BSD(3)", "MPL(2.0)", "CDDL(1.0)", "EPL(2.0)", "None"],
      validate: (projectLicense) => {
        if (projectLicense) {
          return true;
        } else {
          console.log("Project license type Required!");
          return false;
        }
      },
    },
    {
      type: "input",
      name: "installation",
      message: "What command is run to install dependencies?",
      default: "npm install",
    },
    {
      type: "input",
      name: "test",
      message: "What command is used to run tests?",
      default: "npm test",
    },
    {
      type: "input",
      name: "usage",
      message: "What does the user need to know about using the repo?",
    },
    {
        type: "input",
        name: "website",
        message: "Enter your project website.",
        validate: (projectWebsite) => {
          if (projectWebsite) {
            return true;
          } else {
            console.log("Project website Required!");
            return false;
          }
        },
      },
    {
      type: "input",
      name: "email",
      message: "Enter your email address?",
      validate: (emailInput) => {
        if (emailInput) {
          return true;
        } else {
          console.log("Email Address Required!");
          return false;
        }
      },
    },
    {
      type: "input",
      name: "contributing",
      message: "Enter contributor names for the project:",
      validate: (contributorName) => {
        if (contributorName) {
          return true;
        } else {
          console.log("Contributors names are required!");
          return false;
        }
      },
    },
  ]);
};


const writeToFile = data => {
  return new Promise((resolve, reject) => {
    fs.writeFile("./projectREADME.md", data, err => {
      if (err) {
        reject(err);
   
        return;
      }
     
      resolve({
        ok: true,
        message: "File created!",
      });
    });
  });
};


function init() {
  questions()
    .then((response) => generateMarkdown(response))
    
    .then((res) => {
      writeToFile(res);
      console.log("projectREADME.md Successfully Generated!");
    });
}


init();