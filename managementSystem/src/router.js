/*import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import ModulePage from './routes/ModulePage';
import UserListPage from './routes/UserListPage';
import CoursePage from './routes/CoursePage';
import ShopPage from './routes/ShopPage';
import SettingPage from './routes/SettingPage';
import LoginPage from './routes/LoginPage';*/

import React from 'react';
import dynamic from 'dva/dynamic'
import { Route, Switch, routerRedux } from 'dva/router';
import { LocaleProvider } from 'antd';
import IndexPage from './routes/IndexPage';
import Page from './routes/Page';
import enUS from 'antd/lib/locale-provider/en_US';
const { ConnectedRouter } = routerRedux;
const routes = [
  {
    path: '/',
    models: () => [import('./models/admin')],
    component: () => import('./routes/IndexPage'),
  },
  {
    path: '/module',
    models: () => [import('./models/admin')],
    component: () => import('./routes/ModulePage'),
  },
  {
    path: '/userList',
    models: () => [import('./models/admin')],
    component: () => import('./routes/UserListPage'),
  },
  {
    path: '/course',
    models: () => [import('./models/course')],
    component: () => import('./routes/CoursePage'),
  },
  {
    path: '/shop',
    models: () => [import('./models/admin')],
    component: () => import('./routes/ShopPage'),
  },
  {
    path: '/setting',
    models: () => [import('./models/admin')],
    component: () => import('./routes/SettingPage'),
  },
  {
    path: '/login',
    models: () => [import('./models/admin')],
    component: () => import('./routes/LoginPage'),
  },
];

function RouterConfig({ history, app }) {
  return (

    <ConnectedRouter history={history}>
      <LocaleProvider locale={enUS}>
        <Page>
          <Switch>
            {
              routes.map(({path, ...dynamics}, key) => (
                <Route
                  key={key}
                  exact
                  path={path}
                  component={dynamic({
                    app,
                    ...dynamics
                  })}
                />
              ))
            }
          </Switch>
        </Page>
      </LocaleProvider>
    </ConnectedRouter>

    /*<Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/module/" component={ModulePage} />
        <Route path="/userList/" component={UserListPage} />
        <Route path="/course/" component={CoursePage} />
        <Route path="/shop/" component={ShopPage} />
        <Route path="/setting/" component={SettingPage} />
        <Route path="/login" component={LoginPage} />
      </Switch>
    </Router>*/
  );
}

export default RouterConfig;
