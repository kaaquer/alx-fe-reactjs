import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MEADesorberAnalysis from './components/Carbon'
import Header from './components/Header'
import MainContent from './components/MainContent'
import Footer from './components/Footer'

function App() {

  return (
    <div className="app-bg min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center py-8">
        <MainContent />
        <div className="w-full max-w-7xl mt-8">
          <MEADesorberAnalysis />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
