import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "./components/ui/sonner.tsx";
import { BrowserRouter } from "react-router-dom";
import ThemeProvider from "./components/theme-provider.tsx";
import { ConvexClientProvider } from "./components/convex-provider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <ConvexClientProvider>
        <BrowserRouter>
          <App />
          <Toaster duration={1000} />
        </BrowserRouter>
      </ConvexClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);
