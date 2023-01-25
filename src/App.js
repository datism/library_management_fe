import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css';
import Login from './pages/Login';
import Register from './pages/Register'
import PublicLayout from './Layout/PublicLayout';
import { PUBLIC_ROUTER } from './router/index.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/login'
          element={<Login />}
        />
        <Route
          path='/register'
          element={<Register />}
          exact={true}
        />
        {PUBLIC_ROUTER.map((e) =>
          <Route
            key={e.key}
            path={e.path}
            exact={e.exact}
            element={<PublicLayout subMenu={e.subMenu}>{e.element}</PublicLayout>}
          />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
