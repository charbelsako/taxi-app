import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/login' element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
