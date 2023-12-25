import logo from './logo.svg';
import './App.css';
import Loginpage from './Components/Loginpage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Postspage from './Components/Postspage';


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index path='/' element={<Loginpage/>} ></Route>
          <Route path='/posts' element={<Postspage/>} ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
