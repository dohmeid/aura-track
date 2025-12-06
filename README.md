# ✨ AuraTrack

> **Discover Your Inner Aura.** > A beautiful, ethereal mood tracking application designed to help you understand your emotional patterns, sleep habits, and energy levels through insightful visualizations.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-16.0-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4.0-cyan)

## 📖 About

**AuraTrack** goes beyond simple smiley-face logging. It offers a calm, aesthetically pleasing interface to record detailed metrics about your day—including triggers, coping mechanisms, sleep hours, and energy levels. It uses advanced data visualization to correlate these metrics, helping you find balance and mindfulness.

## 🚀 Key Features

* **Daily Check-ins**: Log your mood score (1-10), specific emotions, triggers, coping actions, and detailed notes.
* **Physical Tracking**: Record sleep hours and energy levels to see how physical health impacts emotional well-being.
* **Visual History**:
    * **Year in Pixels**: A GitHub-style calendar heatmap of your mood history.
    * **Filter & Sort**: Easily browse past entries by week, month, or year.
* **Deep Insights**:
    * **Aura Flow**: Interactive line charts showing mood fluctuations.
    * **Emotional Spectrum**: Doughnut charts displaying emotion distribution.
    * **Correlations**: Automatically calculates relationships (e.g., "Sleep ↔ Energy" or "Best Day of the Week").
* **Secure Authentication**: Custom-built secure authentication (JWT) with password hashing.
* **Ethereal Design**: A custom design system featuring glassmorphism, floating animations, and a soothing pastel palette.

## 🛠️ Tech Stack

* **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Server Actions)
* **Language**: TypeScript
* **Database**: MongoDB (via Mongoose ODM)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & PostCSS
* **Visualization**: Chart.js & React-chartjs-2
* **Validation**: Zod
* **Auth**: Custom JWT implementation using `jose` & `bcryptjs`
* **Icons**: Lucide React

## ⚡ Getting Started

### Prerequisites

* Node.js (v18 or higher recommended)
* MongoDB Database (Local or Atlas URL)

### Installation

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/yourusername/aura-track.git](https://github.com/yourusername/aura-track.git)
    cd aura-track
    ```

2.  **Install dependencies**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Configure Environment Variables**
    Create a `.env.local` file in the root directory and add the following keys:

    ```env
    # Database Connection
    MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/auratrack

    # Security (Generate a strong random string)
    JWT_SECRET=your_super_secret_random_string_here
    ```

4.  **Run the development server**
    ```bash
    npm run dev
    ```

5.  **Open your browser**
    Navigate to `http://localhost:3000`.

## 📂 Project Structure

```text
├── app/
│   ├── (dashboard)/       # Protected routes (Home, History, Insights)
│   ├── actions/           # Server Actions (Auth, Mood operations)
│   ├── api/               # API Routes (Insights calculation)
│   ├── components/        # Reusable UI components
│   └── ...                # Public pages (Login, Signup, Landing)
├── lib/
│   ├── db/                # Database connection logic
│   ├── models/            # Mongoose Schemas (User, Mood)
│   ├── utils/             # Helpers (Auth, Timezones, Insights math)
│   └── validation/        # Zod schemas
└── public/
```

## 🎨 Color Palette
AuraTrack uses a specific "Aura" theme defined in globals.css:

- Chantilly (#f3b2dd) - Pink/Purple
- Wistful (#9fa1d2) - Periwinkle
- Mint Tulip (#c4f2e8) - Soft Green
- Blizzard Blue (#a0dbe9) - Light Blue
- Sidecar (#f1e6ae) - Soft Yellow

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (git checkout -b feature/AmazingFeature)
3. Commit your changes (git commit -m 'Add some AmazingFeature')
4. Push to the branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

## 📄 License
This project is licensed under the MIT License.
