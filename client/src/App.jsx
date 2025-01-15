import './App.css'

import { useState } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AllBooks from './components/AllBooks';

function App() {

  const [newBookToggle, setNewBookToggle] = useState(false);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={
            <AllBooks
              newBookToggle={newBookToggle}
            />
            }>
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
