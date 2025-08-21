
# 🛡️ DeepSafe: AI-Powered Deepfake Detection

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-SDK_v11-orange?logo=firebase)](https://firebase.google.com/)
[![Genkit](https://img.shields.io/badge/Genkit-AI-blue?logo=google&logoColor=white)](https://firebase.google.com/docs/genkit)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-blue?logo=tailwind-css)](https://tailwindcss.com/)

DeepSafe is an advanced, web-based tool that leverages the power of Google's Gemini AI to analyze video content for signs of deepfake manipulation and full AI generation. In an era where digital misinformation is rampant, DeepSafe provides a crucial layer of verification, allowing users to assess the authenticity of video media with confidence.

![DeepSafe Dashboard Screenshot](https://placehold.co/800x500.png)
*A placeholder image of the DeepSafe dashboard.*

---

## ✨ Key Features

-   **Advanced AI Analysis**: Utilizes Google's state-of-the-art Gemini models via Genkit to perform a detailed forensic analysis of video files.
-   **Dual Confidence Scores**: Provides separate, percentage-based confidence scores for both **Deepfake Manipulation** (e.g., face-swapping) and **Full AI Generation** (e.g., Sora/Veo content).
-   **In-Depth Reports**: Generates a detailed textual analysis explaining the AI's findings, highlighting specific artifacts and inconsistencies.
-   **Secure User Authentication**: Built with Firebase Authentication for secure sign-up, login, and user management.
-   **Persistent Analysis History**: Automatically saves analysis results to the user's browser, allowing them to review past submissions.
-   **Modern, Responsive UI**: A sleek and intuitive interface built with Next.js, ShadCN UI, and Tailwind CSS, ensuring a seamless experience on all devices.
-   **Drag & Drop Uploader**: Easy-to-use video uploader with validation for file size and type.

## 🛠️ Technology Stack

-   **Framework**: [Next.js](https://nextjs.org/) (App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **AI Toolkit**: [Firebase Genkit](https://firebase.google.com/docs/genkit)
-   **AI Model**: [Google Gemini 1.5 Flash](https://ai.google.dev/docs/gemini_api_overview)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
-   **Authentication**: [Firebase Authentication](https://firebase.google.com/docs/auth)
-   **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

Follow these instructions to get a local copy of DeepSafe up and running for development and testing purposes.

### Prerequisites

-   [Node.js](https://nodejs.org/) (version 20 or later)
-   A [Firebase Project](https://console.firebase.google.com/). You will need the web app configuration details.
-   A Google AI [API Key](https://ai.google.dev/gemini-api/docs/api-key) for Gemini.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/deepsafe.git
    cd deepsafe
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a file named `.env` in the root of the project and add your Firebase and Gemini credentials.

    ```env
    # Firebase Web App Configuration
    # You can get this from your Firebase project settings
    NEXT_PUBLIC_FIREBASE_API_KEY="AIzaSy..."
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-project-id.firebaseapp.com"
    NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-project-id.appspot.com"
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="12345..."
    NEXT_PUBLIC_FIREBASE_APP_ID="1:12345:web:abcd..."

    # Google AI API Key for Genkit
    # You can get this from Google AI Studio
    GEMINI_API_KEY="AIzaSy..."
    ```
    *Note: The `firebase.ts` file may need to be updated to consume these environment variables instead of being hardcoded.*

4.  **Run the Genkit developer UI (optional but recommended):**
    In a separate terminal, run the Genkit developer UI to inspect your AI flows.
    ```bash
    npm run genkit:watch
    ```

5.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:9002](http://localhost:9002) in your browser to see the application.

## ⚙️ How It Works

1.  **Video Upload**: The user uploads a video file through the `VideoUploader` component on the dashboard.
2.  **Client-Side Validation**: The file is checked for size (<50MB) and type (`video/*`).
3.  **Server Action**: The video file is converted to a `base64` data URI and passed to a Next.js Server Action (`runAnalysisAction`).
4.  **Genkit Flow**: The server action invokes the `analyzeDeepfake` Genkit flow located in `src/ai/flows/analyze-deepfake.ts`.
5.  **Gemini Analysis**: The flow sends a detailed prompt, along with the video data, to the Gemini 1.5 Flash model for analysis. The prompt instructs the AI to act as a digital forensics expert.
6.  **Structured Output**: The AI returns a JSON object with a verdict (`isDeepfake`), confidence scores, and a detailed text analysis.
7.  **Display Results**: The results are passed back to the client and displayed in the `AnalysisResultDisplay` component. The analysis is also added to the `HistorySidebar`.

## 📂 Project Structure

```
/src
├── ai/
│   ├── flows/
│   │   └── analyze-deepfake.ts  # The core Genkit flow for analysis
│   └── genkit.ts                # Genkit configuration
├── app/
│   ├── (auth)/                  # Route group for auth pages
│   │   └── login/
│   ├── dashboard/               # The main application dashboard
│   ├── page.tsx                 # Landing page
│   └── layout.tsx               # Root layout
├── components/
│   ├── ui/                      # ShadCN UI components
│   └── ...                      # Custom application components
├── hooks/
│   └── ...                      # Custom React hooks
└── lib/
    ├── firebase.ts              # Firebase initialization
    └── utils.ts                 # Utility functions
```

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
