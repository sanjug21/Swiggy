import Body from "./components/Body"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { Outlet } from "react-router-dom"
import{ Provider} from "react-redux"
import appStore from "./utils/appStore"

function App() {
  
  return (
    <Provider store={appStore}>
    
    <Header />
    {/* <Body /> */}
    <Outlet />
    <Footer/>
     
    </Provider>
  )
}

export default App
