import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import CollectionCollected from './Collected';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/CollectionCollected" element={<CollectionCollected />} />
      </Routes>
    </Router>
  );
}
export default App;