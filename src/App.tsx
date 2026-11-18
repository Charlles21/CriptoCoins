
import { RouterProvider } from 'react-router-dom'
import { router } from './Routes'
import style from './App.module.css'

function App() {
  return (    
    <div className={style.container}>      
       <RouterProvider router={router}/>
    </div> 
  )
}

export default App
