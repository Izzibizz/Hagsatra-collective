// src/App.tsx
import React from "react";
import Routes from "./routes/Routes";
import { Header } from "./components/Header"
import { ScrollToTop } from "./components/ScrollToTop";
import { Footer } from "./components/Footer";


const App: React.FC = () => {
  return (
     <>
    <ScrollToTop />
    <div className={`max-w-screen min-h-screen flex flex-col overflow-hidden relative`}>
      <Header />
      <main className={`flex-grow mb-20 ${"pt-38"} `}>
        <Routes />
      </main>
      <Footer/>
    </div>
    </>
  )
};

export default App;
