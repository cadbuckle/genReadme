# ReadMe Generator

## Description
This application quickly generates a README.md file by prompting the user for some information and then creating the formatted file containing the user responses.

## Table of Contents
* [Links](#links)
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Features](#features)
* [Contributions](#contributions)

## Links
* [Repo](https://github.com/cadbuckle/genReadme)
* [Video Walkthough](https://app.screencastify.com/v3/watch/15sn7geVcPjDgQUchMZM)

## Installation
* Latest LTS version of Node required (Available here: https://nodejs.org/en/)
* Installation of the third party module "inquirer" (Please use version 8.0.0)

## Usage
From the command line enter:
    node genReadMe.js <full pathname of folder to place README.md>

A series of prompt will be presented for completion. When they have all been completed, the README.md will be created in the specified folder.

For example: 
* "node genReadMe.js ."  would create the README.md in the current directory.
* "node genReadMe.js ./weatherApp" would create the README.md in a subdirectory called weatherApp.

NOTE: destination folders must already exist. If the folder already contains a README.md file, it will be overwritten.

## License
MIT License as per repository.

## Features
* JavaScript
* Node.JS
* Includes the use of filesystem for directory and file manipulation
* Includes the use of inquirer to prompt the user with various questions

## Contributions
Thanks to:
* EdX Bootcamp
* Node.js
* SBoudrias (Inquirer)
* Shields.io (For displaying License badge at the top of the generated Readme)

© 2024 edX Boot Camps LLC. Confidential and Proprietary. All Rights Reserved.