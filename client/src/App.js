// import MenuBar from './components/MenuBar';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import './App.css';


import { AuthProvider } from './context/auth';
import AuthRoute from './util/AuthRoute';


import MenuBar from './components/MenuBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { Container } from 'semantic-ui-react';

function App() {
  return (
    <div> 
      <AuthProvider>
        <Router>
        <Container>
          <MenuBar />
          <Routes>
            <Route exact path='/' Component={Home} element={<AuthRoute/>} ></Route>
            <Route exact path='/register' Component={Register} element={<AuthRoute/>} ></Route>
            <Route exact path='/login' Component={Login} element={<AuthRoute/>} ></Route>
          </Routes>



        </Container>
        </Router>
      </AuthProvider>
    </div>


  );
}

export default App;
