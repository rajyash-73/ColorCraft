import { createRoot } from "react-dom/client";
import "./index.css";
import { PaletteProvider } from "./contexts/PaletteContext";
import TestApp from "./TestApp";

createRoot(document.getElementById("root")!).render(
  <TestApp />
);
