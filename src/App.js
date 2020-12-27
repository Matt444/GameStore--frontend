import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Home } from './Home';
import { Cart } from './Cart';
import { Login } from './Login';
import { User_orders } from './User_orders';
import { User_edit } from './User_edit';
import { Admin_orders } from './Admin_orders';
import { Admin_users } from './Admin_users';
import { Game } from './Game';
import { NoMatch } from './NoMatch';
import { Layout } from './components/Layout';
import { NavigationBar } from './components/NavigationBar';


function App() {
  return (
    <React.Fragment>
      <Layout>
        <NavigationBar />
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/Cart" component={Cart} />
            <Route path='/Game' component={Game} />
            <Route path='/Login' component={Login} />
            <Route path="/myaccount/orders" component={User_orders} />
            <Route path="/myaccount/edit" component={User_edit} />
            <Route path="/admin/orders" component={Admin_orders} />
            <Route path="/admin/users" component={Admin_users} />
            <Route component={NoMatch} />
          </Switch>
        </Router>
      </Layout>

    </React.Fragment>
  );
}

export default App;
