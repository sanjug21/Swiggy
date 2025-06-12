import Body from "./components/Body"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom"


function App() {
  
  return (
    <>
    
    <Header />
    <Outlet />
    <Footer/>
     
    </>
  )
}

export default App
