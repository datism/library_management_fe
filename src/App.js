import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css';
import Register from './pages/Register'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/register'
          element={<Register />}
          exact={true}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
