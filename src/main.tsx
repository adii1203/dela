import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ConvexClientProvider } from "./components/convex-provider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConvexClientProvider>
      <App />
    </ConvexClientProvider>
  </React.StrictMode>
);
