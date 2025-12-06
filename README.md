# ✨ AuraTrack

> **Discover Your Inner Aura.** > A beautiful, ethereal mood tracking application designed to help you understand your emotional patterns, sleep habits, and energy levels through insightful visualizations.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-16.0-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4.0-cyan)

## 📖 About

**AuraTrack** goes beyond simple smiley-face logging. It offers a calm, aesthetically pleasing interface to record detailed metrics about your day—including triggers, coping mechanisms, sleep hours, and energy levels. It uses advanced data visualization to correlate these metrics, helping you find balance and mindfulness.

1. Home page
<img width="1277" height="728" alt="image" src="https://github.com/user-attachments/assets/b9138cb2-912f-42e3-be85-f9c0a3e5f921" />
<img width="1280" height="682" alt="image" src="https://github.com/user-attachments/assets/c6690a0c-e3c5-4358-a105-4c329ad27beb" />

2. Login / SignUp pages
<img width="1279" height="732" alt="image" src="https://github.com/user-attachments/assets/ca2d2bdd-3532-47d8-8acd-d55801b86220" />
<img width="1280" height="737" alt="image" src="https://github.com/user-attachments/assets/cbe11e1f-f68e-45cd-8496-9df0ec9e5db9" />

3. Dashboard
<img width="1279" height="737" alt="image" src="https://github.com/user-attachments/assets/07b1fb9a-837d-4f17-931b-85763162aa92" />

4. Log Mood Page
<img width="1274" height="730" alt="image" src="https://github.com/user-attachments/assets/612cd201-aefe-42c5-836b-528f3d52b170" />
<img width="1277" height="697" alt="image" src="https://github.com/user-attachments/assets/7c3d94cd-1c9f-4453-b771-6128b256add3" />
<img width="1277" height="414" alt="image" src="https://github.com/user-attachments/assets/3f418297-6d10-4ba3-bf60-c866ca9b950a" />

5. Mood History page
<img width="1279" height="731" alt="image" src="https://github.com/user-attachments/assets/cddc435a-d782-4ca9-b1c9-0eacfbc37c78" />

6. Insights page
<img width="1280" height="733" alt="image" src="https://github.com/user-attachments/assets/92789360-9824-4946-85aa-2d002539b382" />
<img width="1277" height="727" alt="image" src="https://github.com/user-attachments/assets/1f52ef6e-bc51-4c04-99de-8a78a631a757" />



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
