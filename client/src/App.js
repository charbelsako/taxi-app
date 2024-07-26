import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Layout from './components/Layout';
import Home from './components/Home';
import PersistLogin from './components/PersistLogin';
import RequireAuth from './components/RequireAuth';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth />}>
              <Route path='/login' element={<Login />}></Route>
              <Route path='/home' element={<Home />}></Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
