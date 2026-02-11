// src/main.jsx (Vite 기준)
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx' // <--- 여기서 App.jsx를 불러오고 있나요?
import './index.css' // Tailwind가 들어있는 곳

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)