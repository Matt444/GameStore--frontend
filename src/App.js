import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { HomePage } from "./pages/HomePage";
import { CartPage } from "./pages/CartPage";
import { LoginPage } from "./pages/LoginPage";
import { MyaccountOrdersPage } from "./pages/MyaccountOrdersPage";
import { MyaccountEditPage } from "./pages/MyaccountEditPage";
import { AdminOrdersPage } from "./pages/AdminOrdersPage";
import { AdminUsersPage } from "./pages/AdminUsersPage";
import { AdminKeysPage } from "./pages/AdminKeysPage";
import { AdminPlatformsPage } from "./pages/AdminPlatformsPage";
import { AdminCategoriesPage } from "./pages/AdminCategoriesPage";
import { AdminGamesPage } from "./pages/AdminGamesPage";
import { GamePage } from "./pages/GamePage";
import { NoMatchPage } from "./pages/NoMatchPage";
import { Layout } from "./layouts/Layout";
import { NavigationBar } from "./layouts/NavigationBar";
import { Footer } from "./layouts/Footer";
import { RegisterPage } from "./pages/RegisterPage";
import { UserContext } from "./UserContext";

function App() {
    const getUser = () => {
        const user = localStorage.getItem("user");
        return JSON.parse(user);
    };

    const [user, setUser] = useState(getUser);

    const saveUser = (user) => {
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
    };

    return (
        <React.Fragment>
            <Layout>
                <Router>
                    <UserContext.Provider value={{ user, setUser: saveUser }}>
                        <NavigationBar />
                        <Switch>
                            <Route exact path="/" component={HomePage} />
                            <Route path="/Cart" component={CartPage} />
                            <Route path="/Game/:id" component={GamePage} />
                            <Route path="/Register" component={RegisterPage} />
                            <Route path="/Login" component={LoginPage} />

                            <Route exact path="/myaccount">
                                <Redirect to="/myaccount/orders" />
                            </Route>
                            <Route path="/myaccount/orders" component={MyaccountOrdersPage} />
                            <Route path="/myaccount/edit" component={MyaccountEditPage} />

                            <Route exact path="/admin">
                                <Redirect to="/admin/orders" />
                            </Route>
                            <Route path="/admin/orders" component={AdminOrdersPage} />
                            <Route path="/admin/games" component={AdminGamesPage} />
                            <Route path="/admin/keys" component={AdminKeysPage} />
                            <Route path="/admin/platforms" component={AdminPlatformsPage} />
                            <Route path="/admin/categories" component={AdminCategoriesPage} />
                            <Route path="/admin/users" component={AdminUsersPage} />
                            <Route component={NoMatchPage} />
                        </Switch>
                    </UserContext.Provider>
                </Router>
            </Layout>
            <Footer />
        </React.Fragment>
    );
}

export default App;
