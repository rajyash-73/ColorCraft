import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { PaletteProvider } from "./contexts/PaletteContext";

createRoot(document.getElementById("root")!).render(
  <PaletteProvider>
    <App />
  </PaletteProvider>
);
