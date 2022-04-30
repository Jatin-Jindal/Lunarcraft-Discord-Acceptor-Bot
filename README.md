# Wolfcraft Discord Bot

## Description

A bot made for the [Wolfcraft Discord Server](https://discord.gg/gXxWwbPWAt "Invite to the Server").

### Features

- [x] **Ping** the bot to show it's latency and websocket latency
- [x] **Accept** an applicant to the server and whitelists them
- [x] **Reject** someone's application and kicks them
- [x] **Ban** someone from the server
- [ ] **Kick** someone from the server
- [ ] **Unwhitelist** someone from the server

---

## Requirements

- **[Node.js](https://nodejs.org/en/ "Node JS") 16.9.0 or newer**
- Discord Bot application to run the script on.

### How to Run

1. Add your bot token in the config.json (Based on [config.json.sample](./config.json.sample "Sample config"))
1. Install the required modules with your preferred package manager:
    - [npm](https://www.npmjs.com "npm")
        ```bash
        npm i
        ```
    - [yarn](https://yarnpkg.com "yarn")
        ```bash
        yarn install
        ```
    - [pnpm](https://pnpm.io "pnpm")
        ```bash
        pnpm install
        ```
1. Deploy the commands to the test server with:
    - [npm](https://www.npmjs.com "npm")
        ```bash
        npm run deploy
        ```
    - [yarn](https://yarnpkg.com "yarn")
        ```bash
        yarn deploy
        ```
    - [pnpm](https://pnpm.io "pnpm")
        ```bash
        pnpm run deploy
        ```
    - **NOTE:** This script only needs to be run when adding/updating a command.
    To push the commands to all servers, uncomment [these lines](src/deploy-commands.js#L25-L28) and rerun the deploy command
1. Run the script with your preferred manager:
    - [npm](https://www.npmjs.com "npm")
        ```bash
        npm run start
        ```
    - [yarn](https://yarnpkg.com "yarn")
        ```bash
        yarn start
        ```
    - [pnpm](https://pnpm.io "pnpm")
        ```bash
        pnpm run start
        ```
