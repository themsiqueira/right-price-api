# Right Price API

[![node](https://img.shields.io/badge/node-18.12.X-yellow.svg)](https://nodejs.org)

[![npm](https://img.shields.io/badge/npm-v6.6.X-red.svg)](https://www.npmjs.com/)
[![yarn](https://img.shields.io/badge/yarn-v1.6.X-red.svg)](https://www.yarn.com/)

[![TypeScript](https://img.shields.io/badge/TypeScript-4.3-blue.svg)](https://www.typescriptlang.org/)

## Table of Contents

- [Right Price API](#right-price-api)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Tooling](#tooling)
  - [Setup](#setup)
  - [Contributing](#contributing)
    - [Conventional Commits](#conventional-commits)
  - [Deployments](#deployments)
    - [Semantic Release](#semantic-release)

## Prerequisites

You will need the following things properly installed on your computer:

- [nodejs](https://nodejs.org/en/download/)
- [yarn](https://classic.yarnpkg.com/en/docs/cli/install/)
- [docker](https://docs.docker.com/desktop/mac/install/)
- [docker-compose](https://docs.docker.com/compose/install/)

## Tooling

If you use VSCode, We advice add those lines to launch.json file in .vscode folder.

```code
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "attach",
      "name": "Payment API",
      "remoteRoot": "/application",
      "localRoot": "${workspaceFolder}",
      "port": 9229,
      "restart": true,
      "address": "localhost",
      "skipFiles": ["<node_internals>/**"]
    }
  ]
}
```

## Setup

1. Clone the repository (<https://github.com/themsiqueira/right-price-api>)

```shell
> git clone git@github.com:themsiqueira/right-price-api.git
```

2. Install dependencies.

```shell
> make setup
```

Note: In this step, all default configurations, docker and environment files are copied:

- [.env.dist](./.env.dist) copied to [.env](./.env)

If you don't want these files to be copied, you can just build the project:

```shell
> make dc:build
```

1. Run the app, it's necessary build before

```shell
> make dc:start
```

6. Run the app in development mode

```shell
> make dc:dev
```

7. Run the tests

```shell
// Unit
> make dc:cli test

// e2e
> make dc:cli test:e2e
```

8. Update node_modules on Docker

```shell
// We need to update node_modules anytime we make changes to packages.
docker-compose down --volumes
docker compose up --build -V
```

## Contributing

If you find this repo useful here's how you can help:

- Send a Pull Request with your awesome new features and bug fixes

### Conventional Commits

We need at least one commit of your PR to include the following format:

- < [type](https://github.com/commitizen/conventional-commit-types/blob/v3.0.0/index.json) >: [jira-ticket] < subject >

for example:

- feat: [123] Set account as ....

> Also the PR title must have the same format

## Deployments

This repo uses dev ops team github actions for deployments in which:

- Pushing a commit to `main` triggers deployment to DEV
- Pushing a commit with a tag `x.y.z` triggers deployment to PRODUCTION

### Semantic Release

To avoid the hassle of manually pushing git tags and creating releases in jira, github, etc, the tool [semantic-release](https://github.com/semantic-release/semantic-release) is set up in the repo which automatically will:

- Calculate the sem-ver version of the new release based on the use of [conventional-commits](https://www.conventionalcommits.org/).
- Create and push a git commit of the release including the git tag (`x.y.z-beta|rc.X`) needed to trigger deployments.
- Generate/Update change logs.
- Create the release on the github's repository of the project.
- Create the release on Monday.
- Tag the release in all related Tickets.
- There's a merge down github action that will try to automatically merge the release to a lower release branch.

The semantic release strategy is based on 1 release branches

- `main` -> PRODUCTION

All the manual operations needed to trigger the semantic release process is just to merge and push to any of these branches:

- `main` Pushing to this branch will trigger release.yml action which will create a new commit/release `x.y.z` to later use merge-down.yml and merge it into `rc`. The new git tag will trigger the deployment to PRODUCTION.
