import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HomePage } from './pages/HomePage';
import { CartPage } from './pages/CartPage';
import { LoginPage } from './pages/LoginPage';
import { MyaccountOrdersPage } from './pages/MyaccountOrdersPage';
import { MyaccountEditPage } from './pages/MyaccountEditPage';
import { AdminOrdersPage } from './pages/AdminOrdersPage';
import { AdminUsersPage } from './pages/AdminUsersPage';
import { AdminKeysPage } from './pages/AdminKeysPage';
import { AdminPlatformsPage } from './pages/AdminPlatformsPage';
import { AdminCategoriesPage } from './pages/AdminCategoriesPage';
import { AdminGamesPage } from './pages/AdminGamesPage';
import { GamePage } from './pages/GamePage';
import { NoMatchPage } from './pages/NoMatchPage';
import { Layout } from './layouts/Layout';
import { NavigationBar } from './layouts/NavigationBar';
import { Footer } from './layouts/Footer';
import { RegisterPage } from './pages/RegisterPage';
import useToken from './components/useToken';
import useRole from './components/useRole';

function App() {
  const { token, setToken } = useToken();
  const { role, setRole } = useRole();

  return (
    <React.Fragment>
      <Layout>
        
        <Router>
          <NavigationBar token={token} role={role} />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/Cart" >
              <CartPage token={token} />
            </Route>
            <Route path='/Game/:id' component={GamePage} />
            <Route path="/Register" component={RegisterPage}/>
            <Route path='/Login' >
              <LoginPage setToken={setToken} setRole={setRole} />
            </Route>
            <Route path="/myaccount/orders" >
              <MyaccountOrdersPage token={token} />
            </Route>
            <Route path="/myaccount/edit" >
              <MyaccountEditPage token={token} />
            </Route>
            <Route path="/admin/orders" >
              <AdminOrdersPage token={token} role={role} />
            </Route>
            <Route path="/admin/games" >
              <AdminGamesPage token={token} role={role} />
            </Route>
            <Route path="/admin/keys" >
              <AdminKeysPage token={token} role={role} />
            </Route>
            <Route path="/admin/platforms" >
              <AdminPlatformsPage token={token} role={role} />
            </Route>
            <Route path="/admin/categories" >
              <AdminCategoriesPage token={token} role={role} />
            </Route>
            <Route path="/admin/users" >
              <AdminUsersPage token={token} role={role} />
            </Route>
            <Route component={NoMatchPage} />
          </Switch>
        </Router>
        
      </Layout>
      <Footer />
    </React.Fragment>
  );
}

export default App;
