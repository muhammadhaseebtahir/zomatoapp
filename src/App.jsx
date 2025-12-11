
import './App.css'
import ScreenLoader from './component/screenLoader'
import { useAuthContext } from './context/authContext'
import Index from './pages/Routes'

function App() {
  const {isAppLoading}= useAuthContext()
   
  return (
    <>
    {!isAppLoading?
      
      <Index/>:
      <ScreenLoader/>

      
    }
    </>
  )
}

export default App
