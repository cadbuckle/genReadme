// function to generate markdown for README
function generateMarkdown(data) {
//   return `# ${data.title}

// `;
  return `# ${data.projTitle}
${data.projLicImg}

## Description
${data.projDesc}

## Table of Contents
* [Links](#links)
* [Installation](#installation)
* [Usage](#usage)
* [Screenshots](#screenshots)
* [Project Items](#project-items)
* [License](#license)
* [Features](#features)

## Links
* [Repo](${data.projRepo})
* [Live](${data.projURL})

## Installation
${data.projInst}

## Usage
${data.projUsage}

## Screenshots

## License
${data.projLic}

## Features
${data.projFeat}

## Contributions
${data.projCont}

## Tests
${data.projTst}

## Acknowledgements
${data.projAck}

## Questions?
${data.q1}
${data.q2}

© 2024 edX Boot Camps LLC. Confidential and Proprietary. All Rights Reserved.`
}

module.exports = generateMarkdown;
