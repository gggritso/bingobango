import "../index.css";

import React from "react";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

Sentry.init({
  dsn: "https://c0fea8d279d1446ba514cdb33036c710@o1301100.ingest.sentry.io/6536661",
  integrations: [new BrowserTracing()],
  release: "bingobango@0.0.1",

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

import { Card } from "./components/Card.jsx";

ReactDOM.render(<Card />, document.getElementById("card"));
