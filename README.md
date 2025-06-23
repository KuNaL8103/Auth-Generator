# Auth Generator

An AI-powered tool to instantly generate secure and production-ready authentication code.

## Overview

This project is a web-based tool that leverages Google's Gemini model via Genkit to automate the creation of Node.js/Express API routes for the Godspeed Framework. It takes a user-provided `better-auth` JSON configuration and generates the corresponding code, saving developers time and reducing the risk of manual errors.

## Key Features

- **AI-Powered Code Generation:** Paste your `better-auth` JSON config and instantly get complete, ready-to-use Godspeed API routes.
- **Configuration Analysis:** Get AI-driven suggestions to improve the security and best practices of your configuration.
- **Modern Tech Stack:** Built with Next.js App Router, React, and Genkit for a high-performance, modern web experience.
- **Sleek UI:** A clean and intuitive user interface built with ShadCN UI and Tailwind CSS.
- **Copy-to-Clipboard:** Easily copy the generated code with a single click.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **AI:** [Google Genkit](https://firebase.google.com/docs/genkit) & [Gemini](https://ai.google.dev/)
- **UI:** [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Component Library:** [ShadCN UI](https://ui.shadcn.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/)
- A **Google AI API Key**. You can get one from [Google AI Studio](https://aistudio.google.com/app/apikey).

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/Auth-Generator.git
    cd Auth-Generator
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a new file named `.env` in the root of your project and add your Google AI API key:

    ```
    GOOGLE_API_KEY=YOUR_API_KEY_HERE
    ```

    _Note: The Genkit configuration in `src/ai/genkit.ts` is set up to automatically use this variable._

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:9002](http://localhost:9002) in your browser to see the application running.
