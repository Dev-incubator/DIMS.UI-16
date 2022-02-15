[![Netlify Status](https://api.netlify.com/api/v1/badges/7744832f-1820-4384-95f5-8cb2d4baf2c2/deploy-status)](https://app.netlify.com/sites/dims-cra/deploys)
[![codecov](https://codecov.io/gh/Dev-incubator/DIMS-cra/branch/main/graph/badge.svg?token=OGFOYAC3VK)](https://codecov.io/gh/Dev-incubator/DIMS-cra)
[![Build Status](https://travis-ci.com/Dev-incubator/DIMS-cra.svg?branch=main)](https://travis-ci.com/Dev-incubator/DIMS-cra)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/Dev-incubator/DIMS-cra)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
![GitHub issues](https://img.shields.io/github/issues/Dev-incubator/DIMS-cra)

## Important notes ⚠️️

### The link to principal idea of design [mockup](https://symu.co/freebies/templates-4/merkury-dashboard-psd-template/). <br/> **You do not have to follow it, just use it as a guide**

### In **[wiki-ui](https://github.com/Dev-incubator/Wiki-UI)** you can find all other guides regarding project structure, plan etc.

### Read about good commits, git workflow requirements etc. in repo [guide](https://github.com/Dev-incubator/git)

### Main scripts 📄

```bash
  "start" - start app
  "build" - build app
  "test" - run tests
  "test:coverage:ci:codecov" - run test and submit codecoverage to codecov
  "lint" - check your code with eslint
  "lint:fix" - fix your code with eslint
  "cm" - run commitizen to create a good commit
```

To commit message you have to write following commands
```bash
   git add .
   git commit 
```
then follow commitizen prompts and write a good commit

### Main technologies ℹ️

- react
- eslint + air bnb style guide + some additional rules
- husky and lint-staged
- prettier and eslint
- codecov with Travis CI
- commitizen

### Publish with netlify button 🚀

You need to have an account on [netlify](https://www.netlify.com/)

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/Dev-incubator/DIMS-cra#CUSTOM_LOGO=https://live.staticflickr.com/65535/50695950941_526e15d2f1.jpg&DIMS_TITLE="Dims%20app")

If you click this button, it’ll authenticate you in Netlify and you'll have to choose a repository name. <br/>
Netlify will automatically create a new repo for you that looks exactly like this one. <br/>
Next, it will build and deploy the new site on Netlify bringing you to the site dashboard when the build is completed.

### Env variables 📝

 - **CUSTOM_LOGO** - here you can pass a link to your app logo
 - **DIMS_TITLE** - here you can pass your app title

#### VSCode integration
For ESLint warnings inline with your code and run formatting automatically with Prettier in VSCode, we need to install:
 - **[ESLint](https://github.com/Microsoft/vscode-eslint)** extension
 - **[Prettier](https://github.com/prettier/prettier-vscode)** extension
 - Edit **VSCode** settings.json to set up formatting on every file change or on every save

#### Basic webstorm setup is in .idea 
