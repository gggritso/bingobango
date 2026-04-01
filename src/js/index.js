import "../index.css";

import React from "react";
import { createRoot } from "react-dom/client";

import { Card } from "./components/Card.jsx";

createRoot(document.getElementById("card")).render(<Card />);
