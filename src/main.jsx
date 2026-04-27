import React from 'react'
import ReactDOM from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import './styles.css'
import WorkflowMap from './WorkflowMap.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WorkflowMap />
    <Analytics />
  </React.StrictMode>
)
