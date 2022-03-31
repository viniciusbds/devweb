import React, { useState, useEffect } from 'react';
import {
  Navbar, Container, Nav, NavDropdown, Button,
} from 'react-bootstrap';
import {
  Link, Outlet,
  useNavigate,
} from 'react-router-dom';
import PrivateRoutes from '../../commons/PrivateRoutes';
import { useUserStore } from '../../providers/UserProvider';
import UserService from '../../services/UserService';

import LanguageContext from '../../utils/context/LanguageContext';

import './Navbar.css';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [language, setLanguage] = useState('pt-br');
  const [role] = useState(sessionStorage.getItem('role_user'));
  const [userEmail] = useState(sessionStorage.getItem('email_user'));
  const [userWallet, setUserWallet] = useState(0);

  const UserStore = useUserStore();
  const navigate = useNavigate();

  async function getWallet(email) {
    const response = await UserService.getWallet(email);
    setUserWallet(response.data.wallet);
  }

  useEffect(() => {
    async function fetchData() {
      getWallet(userEmail);
    }
    fetchData();
  }, []);

  const logout = () => {
    UserStore.logout(() => navigate('/login'));
  };

  return (
    <LanguageContext.Provider value={language}>
      <div>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/">
              <div className="logo">
                <img src="./favicon.ico" alt="logo" />
                {' '}
                <p>esbet</p>
              </div>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/matches">{language === 'pt-br' ? 'Partidas' : 'Matches'}</Nav.Link>
                {role === 'admin' ? <Nav.Link as={Link} to="/teams">{language === 'pt-br' ? 'Times' : 'Teams'}</Nav.Link> : <p />}
                {role === 'admin' ? <Nav.Link as={Link} to="/games">{language === 'pt-br' ? 'Jogos' : 'Games'}</Nav.Link> : <p />}
                {role === 'user' ? <Nav.Link as={Link} to="/bets">{language === 'pt-br' ? 'Apostas' : 'Bets'}</Nav.Link> : <p />}

                <NavDropdown
                  title={language}
                  id="basic-nav-dropdown"
                  onSelect={(e) => {
                    const newLanguage = e;
                    setLanguage(newLanguage);
                  }}
                >
                  <NavDropdown.Item eventKey="pt-br">pt-br</NavDropdown.Item>
                  <NavDropdown.Item eventKey="en">en</NavDropdown.Item>
                </NavDropdown>

                {role === 'user' ? (
                  <Nav.Link>
                    SALDO: R$
                    {' '}
                    {userWallet}
                  </Nav.Link>
                ) : <p />}

              </Nav>

              <Button
                className="new-match-button"
                variant="primary"
                onClick={logout}
              >
                {language === 'pt-br' ? 'sair' : 'logout'}

              </Button>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <PrivateRoutes>
        <RouterOutlet />
      </PrivateRoutes>

    </LanguageContext.Provider>

  );
}

function RouterOutlet() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default App;
