import './App.css'
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./AppRouter.tsx";
import {observer} from "mobx-react";

const App = observer(() => {

  return (
      <BrowserRouter>
        <AppRouter/>
      </BrowserRouter>
  )
})

export default App
