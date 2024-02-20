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
    validate(value) {
      if (!value) {
        return "Please enter a Project Title";
      }
      return true;
    },
  },
  // Project Description
  {
    type: "editor",
    name: "projDesc",
    message: "Enter the description of your project",
    validate(text) {
      if (text.split("\n").length < 1) {
        return "Must be at least 1 lines.";
      }
      return true;
    },
    waitUserInput: true,
  },
  // Links to Repo and Live
  {
    type: "input",
    name: "projRepo",
    message: "Enter the Repo URL of your project",
    default: "https://github.com/project",
    validate(value) {
      if (value.split("/").length < 5) {
        return "Please enter a valid Repo URL";
      }
      return true;
    },
  },
  {
    type: "input",
    name: "projURL",
    message: "Enter the URL for the live site of your project",
    default: "https://<yourname.github.io/project",
    validate(value) {
      if (value.split("/").length < 4) {
        return "Please enter a valid Site URL";
      }
      return true;
    },
  },
  // Installation instructions (Default N/A)
  {
    type: "editor",
    name: "projInst",
    message: "Enter any installation instructions",
    default: "N/A",
    validate(text) {
      if (text === "") {
        text = "N/A";
      }
      return true;
    },
    waitUserInput: true,
  },
  // Usage information
  {
    type: "editor",
    name: "projUsage",
    message: "Enter usage information",
    default: "N/A",
    validate(text) {
      if (text.split("\n").length < 1) {
        return "Must be at least 1 line of information.";
      }
      return true;
    },
    waitUserInput: true,
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
    type: "editor",
    name: "projFeat",
    message: "Enter any feature of the project",
    default: "N/A",
    validate(text) {
      if (text === "") {
        text = "N/A";
      }
      return true;
    },
    waitUserInput: true,

  },
  // Acknowledgements
  {
    type: "editor",
    name: "projAck",
    message: "Enter acknowledgements/references for this project",
    default: "N/A",
    validate(text) {
      if (text === "") {
        text = "N/A";
      }
      return true;
    },
    waitUserInput: true,

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
    type: "editor",
    name: "projTst",
    message: "Enter tests for this project",
    default: "N/A",
    validate(text) {
      if (text === "") {
        text = "N/A";
      }
      return true;
    },
    waitUserInput: true,
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
  let responses;

  // If there are not 3 arugments, then log and do not process
  if (process.argv.length < 3) {
    console.error("Usage: node genReadme.js <pathname>");
    console.error(
      "<pathname> is the fully qualified folder to where the README.md will be created"
    );
    console.error(
      "If a README.md already exists in the folder, it will be overwritten!"
    );
  }
  // if the folder (argv[2]) does not exist, log error and do not process
  else if (!fs.existsSync(process.argv[2])) {
    console.error("Unable to access folder " + process.argv[2]);
    console.error("Please check folder exists and/or permissions are correct");
  }
  // Perform README.md process
  else {
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
      answers.projLicImg = projLicImg;
      // build questions and add to answers object before passing to generateMarkdown()
      let ansEml =
        "If you wish to contact me, you can email me at " + answers.projEml;
      let ansGit =
        "My github profile can be found at https://github.com/" +
        answers.projGit;
      if (answers.projEml == "N/A" && answers.projGit == "N/A") {
        answers.q1 = "N/A";
        answers.q2 = "";
      } else if (answers.projEml == "N/A") {
        answers.q1 = ansGit;
        answers.q2 = "";
      } else if (answers.profGit == "N/A") {
        answers.q1 = ansEml;
        answers.q2 = "";
      } else {
        answers.q1 = ansGit;
        answers.q2 = ansEml;
      }
      responses = answers;
    });

    console.log(responses);
    // save to README.md in specified directory
    await writeToFile(process.argv[2]+"/README.md", generateMarkdown(responses));
  }
}

// function call to initialize program
init();
