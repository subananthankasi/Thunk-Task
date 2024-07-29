import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Create from './component/Create';
import Read from './component/Read';



function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Create />} />
          <Route path='/read' element={<Read />} />
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
