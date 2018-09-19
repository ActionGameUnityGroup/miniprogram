import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import ModulePage from './routes/ModulePage';
import UserListPage from './routes/UserListPage';
import CoursePage from './routes/CoursePage';
import ShopPage from './routes/ShopPage';
import SettingPage from './routes/SettingPage';
import LoginPage from './routes/LoginPage';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/module/" component={ModulePage} />
        <Route path="/userList/" component={UserListPage} />
        <Route path="/course/" component={CoursePage} />
        <Route path="/shop/" component={ShopPage} />
        <Route path="/setting/" component={SettingPage} />
        <Route path="/login" component={LoginPage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
