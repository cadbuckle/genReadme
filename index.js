const fs = require("fs");
const path = require('path');
const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown");

// array of questions for user
const questions = [
    // Title of the project 
    {
        type: 'input',
        name: 'projTitle',
        message: 'Enter the title of your project',
        default: '',
    },
    // Project Description
    {
        type: 'input',
        name: 'projDesc',
        message: 'Enter the description of your project',
        default: '',
    },
    // Generate TOC - no prompts but create section in ReadMe
    // Links to Repo and Live
    {
        type: 'input',
        name: 'projRepo',
        message: 'Enter the Repo URL of your project',
        default: 'https://github.com/project',
    },
    {
        type: 'input',
        name: 'projURL',
        message: 'Enter the URL for the live site of your project',
        default: 'https://<yourname.github.io/project',
    },
    // Installation instructions (Default N/A)
    {
        type: 'input',
        name: 'projInst',
        message: 'Enter any installation instructions',
        default: 'N/A',
    },
    // Usage information
    {
        type: 'input',
        name: 'projUsage',
        message: 'Enter usage information',
        default: 'N/A',
    },
    // Screenshots - no questions but empter section created in ReadMe
    // License (List + badge)
    {
        type: 'rawlist',
        name: 'projLic',
        message: 'Please select your License type',
        choices: ["Apache License 2.0","GNU General Public License v3.0","MIT License","BSD 2-Clause \"Simplified\" License","BSD 3-Clause \"New\" or \"Revised\" License","Boost Software License 1.0","Creative Commons Zero v1.0 Universal","Eclipse Public License 2.0","GNU Affero General Public License v3.0","GNU General Public License v2.0","GNU Lesser General Public License v2.1","Mozilla Public License 2.0","The Unlicense"]
      },
    // Features
    {
        type: 'input',
        name: 'projFeat',
        message: 'Enter any feature of the project',
        default: 'N/A',
    },
    // Acknowledgements
    {
        type: 'input',
        name: 'projAck',
        message: 'Enter acknowledgements/references for this project',
        default: 'N/A',
    },
    // Tests 
    // Questions
];

// function to write README file
function writeToFile(fileName, data) {
}

// function to initialize program
function init() {
    // initialise/set variables

    // ask questions (with validation, with list selections, with defaults)
    inquirer.prompt(questions).then((answers) => {
                // create markdown of the readme
                const readMe = `# ${answers.projTitle}

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
                
                ## Acknowledgements
                ${answers.projAck}
                
                © 2024 edX Boot Camps LLC. Confidential and Proprietary. All Rights Reserved.
                
                `;
                console.log(readMe);
        
    });


    // save to README.md in specified directory  (do we allow a README.md to be passed as an argument????)
}

// function call to initialize program
init();
