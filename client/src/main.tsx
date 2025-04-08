import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import ContextTest from "./ContextTest";

createRoot(document.getElementById("root")!).render(
  <ContextTest />
);
