# My Todo React App

A awesome and responsive Todo application built with React.js, TypeScript, and styled with Tailwind CSS.

## Features

- 📝 Add and manage Todo list items
- 🔍 Search functionality for filtering Todo list items
- 🔍 Status filtering Todo list items based on complete and incomplete
- 📋 Copy Todo list item contents to the clipboard directly from the UI
- 💾 Persistent storage of Todo list items and categories using LocalStorage
- 📱 Fully responsive design for mobile and desktop viewing
- 📁 Category feature to better organize and manage Todo list items with adding and removing categories also functionality for filtering Todo list items

## Prerequisites

- Node.js (v14 or higher recommended)
- npm (comes with Node.js)

## Getting Started

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/flaidexdev/todo-app.git
   ```

2. **Navigate to the App Directory**:
   ```bash
   cd todo-app
   ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Run the App**:
   ```bash
   npm start
   ```

   This command starts the development server and opens the app in your default browser.

## File Structure

- `public/`: This directory contains public assets like my HTML file and icons.
- `src/`: This is where your React components and TypeScript code reside.
  - `components/`: Contains reusable components like TodoItem, SearchTodo, etc.
  - `App.tsx`: The main App component.
  - `index.tsx`: The entry point for my React application.
  - `index.css`: The entry point for all global css and tailwind integration.
- `package.json`: This file lists the dependencies and scripts for your application.
- `tailwind.config`: This file contains the configartion for tailwindcss.

## Contributing

1. Fork the repository on GitHub.
2. Clone the forked repository to your machine.
3. Make changes to improve the project.
4. Push your changes back to your fork on GitHub.
5. Submit a pull request to the original repository.