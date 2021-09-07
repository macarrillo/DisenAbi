import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ThemeProvider } from '@material-ui/core';
import { MenuAppBar } from './componentes/navegacion/MenuAppBar';
import theme from './theme/Theme';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import RegistraPersonal from './componentes/vistas/RegistraPersonal';
import Personal from './componentes/vistas/Personal';
import TabInfoPersona from './componentes/navegacion/TabInfoPersona';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
      <MenuAppBar/>
        <Switch>
          <Route exact path="/personal" component = {Personal}/>
          <Route exact path="/registrar" component = {TabInfoPersona}/>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
