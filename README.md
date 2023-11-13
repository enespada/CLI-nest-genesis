[![NPM](https://img.shields.io/badge/npm-v9.6.7-%232C8EBB.svg?logo=npm&logoColor=white)](https://www.npmjs.com/) [![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/) [![NodeJS](https://img.shields.io/badge/node.js-v18.17.1-6DA55F?logo=node.js&logoColor=white)](https://nodejs.org/en/)

# CLI One Kenobi

The CLI One Kenobi simplifies the creation of NestJS projects with a robust 3-tier architecture following best practices. It eases the initial setup, allowing you to focus on implementing your business logic instead of dealing with basic project structure and configuration. It also ensures that your project is ready to run on Node.js 18.17.1, the latest stable release.

## Main Features

3-Tier Architecture: It promotes a structure organized in three layers: Controllers, Services and Repositories. This architecture improves the modularity and maintainability of your application.

Node.js 18.17.1: Take advantage of the latest Node.js features and performance improvements to develop faster and more efficient applications.

Predefined Configuration: Initial configuration for databases, logging, and exception handling. Saves time on initial configuration.

Integrated Testing: Includes tools for unit and integration testing, encouraging test-driven development (TDD).

Consistent Code Style: Follows coding best practices and ensures that your code is clean, maintainable and scalable.

## Installation

```bash
  $ npm install -g cli-one-kenobi
```

## Usage

```bash
  $ kenobi --help
```

## Arcuitecture

```bash
📂 root
├── 📜 README.md
├── 📜 commitlint.config.js
├── 📜 nest-cli.json
├── 📜 package-lock.json
├── 📜 package.json
├── 📂 src
│   ├── 📂 app
│   │   ├── 🌐 api
│   │   ├── 🚀 application
│   │   ├── 🏢 domain
│   │   ├── 🔧 core
│   │   ├── 📜 app.module.ts
│   ├── 🎨 assets
│   │   ├── 🌎 favicon.ico
│   │   ├── 🖼️  favicon.jpg
│   │   └── 📜 swagger.css.ts
│   ├── 📂 environments
│   │   ├── 📝 dto
│   │   └── 📜 environment.ts
│   └── 📜 main.ts
├── 📂 test
│   ├── 📜 app.e2e-spec.ts
│   └── 📜 jest-e2e.json
├── 📜 tsconfig.build.json
└── 📜 tsconfig.json
```

## License

CLI One Kenobi is [MIT](https://choosealicense.com/licenses/mit/) licensed.
