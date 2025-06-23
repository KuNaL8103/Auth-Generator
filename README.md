# Godspeed Auth Generator

This is a Next.js application that uses Google's Genkit to generate authentication code for the Godspeed Framework based on a user-provided configuration.

### Prerequisites

- [Node.js](https://nodejs.org/en) (version 18 or later recommended)
- A Google AI API Key. You can get one from [Google AI Studio](https://aistudio.google.com/app/apikey).

### Step 1: Initialize a New Next.js App

Open your terminal and run the following command to create a new Next.js project.

```bash
npx create-next-app@latest godspeed-auth-generator
```

You will be asked a series of questions. It is important to accept the default answers for all of them by pressing `Enter`. This will ensure the project is set up correctly with TypeScript, Tailwind CSS, the `src/` directory, and the App Router.

After the project is created, navigate into the directory:

```bash
cd godspeed-auth-generator
```

### Step 2: Install Dependencies

Replace the contents of `package.json` in your new project with the one from this project. Then, run the installation command:

```bash
npm install
```

### Step 3: Initialize ShadCN UI

This project uses ShadCN UI for its components. Run the `init` command to configure it. You can accept the default answers for all questions by pressing `Enter`.

```bash
npx shadcn@latest init
```

This will create the `components.json` file and the `src/lib/utils.ts` file, and it will update `tailwind.config.ts` and `src/app/globals.css`.

### Step 4: Copy All Project Files

Now, copy all the files and folders from this project's `src` directory into your new project's `src` directory, overwriting any existing files. Do the same for all root-level configuration files like `next.config.ts`, `tsconfig.json`, `apphosting.yaml` etc.

### Step 5: Set Up Environment Variables

1.  Create a new file named `.env` in the root of your project.
2.  Add your Google AI API key to this file:

    ```
    GOOGLE_API_KEY=YOUR_API_KEY_HERE
    ```

    _Note: The Genkit configuration in `src/ai/genkit.ts` automatically looks for this environment variable._

### Step 6: Run the Development Server

You're all set! Start the app by running:

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) in your browser to see the application running.
