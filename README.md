# City Opportunity Heatmap 🏙️

An interactive urban economic visualization tool designed to help entrepreneurs and urban planners identify high-potential business locations through data-driven insights.

## 🚀 Overview

The **City Opportunity Heatmap** analyzes foot traffic, competition density, and demographic data to calculate "Opportunity Scores" for various urban zones. It provides a seamless, professional interface for exploring city-wide economic potential.

### Key Features

-   **Interactive Heatmap**: Visualize opportunity zones with dynamically sized and color-coded markers using Leaflet.js.
-   **Opportunity Score Engine**: A proprietary algorithm that weights monthly visits against local competition and population density.
-   **Advanced Filtering**: Granular control with range sliders for minimum scores and visit thresholds.
-   **Data Insight Dashboard**: Professional analytics view with Bar and Pie charts summarizing category distributions and market share.
-   **PWA Support**: Fully installable as a Progressive Web App for offline access and a native-like experience.
-   **Data Persistence**: Automatically saves your filters and view preferences to your browser's local storage.

## 🛠️ Tech Stack

-   **Frontend**: React 19, Vite
-   **Styling**: Tailwind CSS 4
-   **Mapping**: Leaflet.js, React-Leaflet, Marker Clustering
-   **Charts**: Chart.js, React-Chartjs-2
-   **Icons**: Lucide React
-   **Deployment**: Optimized for Vercel / Static Hosting

## 📦 Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/city-opportunity-heatmap.git
    cd city-opportunity-heatmap
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run development server**:
    ```bash
    npm run dev
    ```

4.  **Build for production**:
    ```bash
    npm run build
    ```

## 🌐 Deployment

This project is ready for deployment on **Vercel**:

1.  Push your code to GitHub.
2.  Import the repository into Vercel.
3.  Vercel will automatically detect the Vite configuration and deploy.

## 📄 License

This project is licensed under the MIT License.
