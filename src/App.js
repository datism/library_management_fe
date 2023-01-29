import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import Login from './pages/Login';
import { PUBLIC_ROUTER } from './router';
import PublicLayout from './Layout/PublicLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        {PUBLIC_ROUTER.map((e) => (
          <Route
            key={e.key}
            path={e.path}
            exact={e.exact}
            element={
              <PublicLayout subMenu={e.subMenu}>{e.element}</PublicLayout>
            }
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
