import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

/* Fonts are bundled, not fetched from a CDN — the page makes zero third-party
   requests, and there is no swap-in reflow. */
import "@fontsource-variable/ibm-plex-sans";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";

import "./styles.css";
import App from "./App";

const root = document.getElementById("root");
if (!root) throw new Error("#root is missing from index.html");

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
