import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Home } from './Home';
import { Cart } from './Cart';
import { Login } from './Login';
import { User_orders } from './User_orders';
import { User_edit } from './User_edit';
import { Admin_orders } from './Admin_orders';
import { Admin_users } from './Admin_users';
import { Admin_keys } from './Admin_keys';
import { Admin_platforms } from './Admin_platforms';
import { Admin_categories } from './Admin_categories';
import { Admin_games } from './Admin_games';
import { Game } from './Game';
import { NoMatch } from './NoMatch';
import { Layout } from './components/Layout';
import { NavigationBar } from './components/NavigationBar';
import { Footer } from './components/Footer';
import { Register } from './Register';
import useToken from './components/useToken';
import useRole from './components/useRole';

function App() {
  const { token, setToken } = useToken();
  const { role, setRole } = useRole();

  return (
    <React.Fragment>
      <Layout>
        <NavigationBar token={token} role={role} />
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/Cart" component={Cart} />
            <Route path='/Game' component={Game} />
            <Route path="/Register" component={Register}/>
            <Route path='/Login' >
              <Login setToken={setToken} setRole={setRole} />
            </Route>
            <Route path="/myaccount/orders" >
              <User_orders token={token} />
            </Route>
            <Route path="/myaccount/edit" >
              <User_edit token={token} />
            </Route>
            <Route path="/admin/orders" >
              <Admin_orders token={token} role={role} />
            </Route>
            <Route path="/admin/games" >
              <Admin_games token={token} role={role} />
            </Route>
            <Route path="/admin/keys" >
              <Admin_keys token={token} role={role} />
            </Route>
            <Route path="/admin/platforms" >
              <Admin_platforms token={token} role={role} />
            </Route>
            <Route path="/admin/categories" >
              <Admin_categories token={token} role={role} />
            </Route>
            <Route path="/admin/users" >
              <Admin_users token={token} role={role} />
            </Route>
            <Route component={NoMatch} />
          </Switch>
        </Router>
        
      </Layout>
      <Footer />
    </React.Fragment>
  );
}

export default App;
