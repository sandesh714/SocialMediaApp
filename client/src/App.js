import React from 'react';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import MenuBar from './components/MenuBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';



function App() {
  return (
      <Router>
        <Container>
          <MenuBar />
          <Routes>
            <Route exact path ="/" component={ Home } />
            <Route exact path="/login" compoent={ Login } />
            <Route exact path="/register" compoent={ Register } />
          </Routes>
        </Container>
      </Router>
  );
}

export default App;
