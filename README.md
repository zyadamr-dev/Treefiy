# Treefiy 🌳

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![CLI Version](https://img.shields.io/npm/v/treefiy)](https://npmjs.com/package/treefiy)
[![Fastify API](https://img.shields.io/badge/API-Fastify-FFD700.svg)](https://fastify.io)

A lightweight, pluggable CLI and API tool for directory structure visualization and analysis.

## 📚 Table of Contents
- [Features](#-features)
- [Installation](#-installation)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [Architecture](#-architecture)
- [API Documentation](#-api-documentation)
- [License](#-license)

---

## 🌟 Features

- 📁 **Multi-format Visualization**: Generate trees in JSON
- ⚡ **High Performance**: Optimized directory traversal algorithms
- 🟢 **CLI Commands**: Interactive commands
- 📊 **File Metadata**: Display size, permissions, and modification dates
- 🌐 **Web UI**: Browser-based visualization with React
- 📡 **REST API**: Integration-ready HTTP endpoints

---

## 📥 Installation

### Local Development (Contributors)
```bash
git clone https://github.com/zyadamr-dev/treefiy.git
cd treefiy
npm install
npm link  # Creates global symlink
```

### Global install (Users)
```bash
npm install -g treefiy
```

## 🟢 Usage 
```bash
treefiy <command> [options]
```
### Example
```bash
treefiy gen-tree --pth=D:/projects --showSize=true --skipDirs=node_modules
```
- For more info about how to use it you can excute command 
```bash
treefiy help
```

## 🗂️ Project Structure

├── src/
│   ├── .config/               # App configuration & logging
│   │   ├── cached-config/     # Cached user configs
│   │   ├── cliStyleConfig.js  # CLI tree style formatting
│   │   ├── defaultConfig.js   # Default settings
│   │   └── logger.js          # Logger setup
│   ├── api/                   # Fastify API server
│   │   ├── functions.js       # Tree generation logic
│   │   └── server.js          # Fastify application
│   ├── cli/                   # CLI command dispatcher
│   │   ├── commands/          # Individual command modules
│   │   └── index.js           # Main CLI entry point
│   ├── constants/             # Shared constants (e.g., aliases)
│   │   └── cmdAlias.js
│   │   └── outFormat.js
│   ├── core/                  # Core functionality
│   │   ├── index.js           # Visualizer class & tree logic
│   │   └── ui/                # React frontend for visualization
│   └── utils/                 # Utility modules (spinner, config parser)
│       ├── spinner.js
│       ├── parseConfig.js
│       └── index.js
├── LICENSE
└── package.json

--- 

## ⛏️ Architecture 

![Component Diagram](images/Architecture%20of%20treefiy.drawio.png "High‑level Component Diagram")

---

## ✨ API Documentation

### Endpoints
- GET api/tree?pth=[dir]&showSize=true - Generate directory structure
- GET api/config - View active configuration

---
## 🪪 License
MIT © 2025 — Zyad A.