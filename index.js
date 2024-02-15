const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown");

// array of questions for user
const questions = [
  // Title of the project
  {
    type: "input",
    name: "projTitle",
    message: "Enter the title of your project",
    default: "",
  },
  // Project Description
  {
    type: "input",
    name: "projDesc",
    message: "Enter the description of your project",
    default: "",
  },
  // Links to Repo and Live
  {
    type: "input",
    name: "projRepo",
    message: "Enter the Repo URL of your project",
    default: "https://github.com/project",
  },
  {
    type: "input",
    name: "projURL",
    message: "Enter the URL for the live site of your project",
    default: "https://<yourname.github.io/project",
  },
  // Installation instructions (Default N/A)
  {
    type: "input",
    name: "projInst",
    message: "Enter any installation instructions",
    default: "N/A",
  },
  // Usage information
  {
    type: "input",
    name: "projUsage",
    message: "Enter usage information",
    default: "N/A",
  },

  // License
  {
    type: "rawlist",
    name: "projLic",
    message: "Please select your License type",
    choices: [
      "Apache License 2.0",
      "GNU General Public License v3.0",
      "MIT License",
      'BSD 2-Clause "Simplified" License',
      'BSD 3-Clause "New" or "Revised" License',
      "Boost Software License 1.0",
      "Creative Commons Zero v1.0 Universal",
      "Eclipse Public License 2.0",
      "GNU Affero General Public License v3.0",
      "GNU General Public License v2.0",
      "GNU Lesser General Public License v2.1",
      "Mozilla Public License 2.0",
      "The Unlicense",
    ],
  },
  // Features
  {
    type: "input",
    name: "projFeat",
    message: "Enter any feature of the project",
    default: "N/A",
  },
  // Acknowledgements
  {
    type: "input",
    name: "projAck",
    message: "Enter acknowledgements/references for this project",
    default: "N/A",
  },
  // Github user
  {
    type: "input",
    name: "projGit",
    message: "Please enter your Github userID",
    default: "N/A",
  },
  // Email
  {
    type: "input",
    name: "projEml",
    message: "Please enter your email address",
    default: "N/A",
  },
  // Contribute
  {
    type: "input",
    name: "projCont",
    message: "Enter details how people can contribute to the project",
    default: "N/A",
  },
  // Tests
  {
    type: "input",
    name: "projTst",
    message: "Enter tests for this project",
    default: "N/A",
  },
];

// function to write README file
function writeToFile(fileName, data) {
  fs.writeFile("./" + fileName, data, (err) => {
    err ? console.error(err) : console.log("Ok");
  });
}

// function to initialize program
async function init() {
  // initialise/set variables
  let readMe = "";
  // ask questions (with validation, with list selections, with defaults)
  await inquirer.prompt(questions).then((answers) => {
    // get repo name and user name from projRepo
    const repoArr = answers.projRepo.split("/");
    // then use img shields to get License IMG (Report must be public!!)
    const projLicImg =
      "![GitHub License](https://img.shields.io/github/license/" +
      repoArr[3] +
      "/" +
      repoArr[4] +
      ")";

    // create markdown of the readme
    const readMeMain = `# ${answers.projTitle}
${projLicImg}

## Description
${answers.projDesc}
                
## Table of Contents
* [Links](#links)
* [Installation](#installation)
* [Usage](#usage)
* [Screenshots](#screenshots)
* [Project Items](#project-items)
* [License](#license)
* [Features](#features)
                
## Links
* [Repo](${answers.projRepo})
* [Live](${answers.projURL})
                
## Installation
${answers.projInst}
                
## Usage
${answers.projUsage}
        
## Screenshots
                
## License
${answers.projLic}

## Features
${answers.projFeat}

## Contributions
${answers.projCont}

## Tests
${answers.projTst}

## Acknowledgements
${answers.projAck}
`;

    if (answers.projEml === "N/A" && answers.projGit === "N/A") {
      readMe = readMeMain;
    } else {
      readMe = readMeMain+`
## Questions?`;
      if (!answers.projEml === "N/A") {
        readMe += `
If you wish to contact me, you can email me at ${answers.projEml}`;
      }
      if (!answers.projGit === "N/A") {
        readMe += `
My github profile can be found at https://github.com/${answers.projGit}`;
      }
    }
    readMe += `
© 2024 edX Boot Camps LLC. Confidential and Proprietary. All Rights Reserved.`;
  });

  // Questions section
  // When a user enters their GitHub username then this is added to the section of the README entitled Questions, with a link to their GitHub profile
  // When a user enters their email address then this is added to the section of the README entitled Questions, with instructions on how to reach them with additional question

  // save to README.md in specified directory
  await writeToFile("README.md", readMe);
}

// function call to initialize program
init();
