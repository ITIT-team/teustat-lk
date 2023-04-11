import React from 'react'
import { createRoot } from 'react-dom/client'
import * as Sentry from '@sentry/react'
import './index.css'
import { App } from './App'

Sentry.init({
  dsn: "https://85139dfe5cbc417dbebf24638029ec61@o4504994273296384.ingest.sentry.io/4504994278998016",
  integrations: [new Sentry.BrowserTracing()],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
})

createRoot(document.getElementById('root')).render( <App /> )
