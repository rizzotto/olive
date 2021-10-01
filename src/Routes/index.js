import { useMediaQuery } from '@material-ui/core';
import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  // eslint-disable-next-line prettier/prettier
  Switch,
} from 'react-router-dom';
import NavBar from '../components/NavBar';
import theme from '../constants/theme';
import { AppContext } from '../context/AppProvider';
import { CreationsProvider } from '../context/CreationsProvider';
import Creations from '../pages/Creations';
import IndexTabs from '../pages/Creations/IndexTabs';
import InformationPage from '../pages/Creations/InformationPage';
import RecipeCreated from '../pages/Creations/RecipeCreated';
import Login from '../pages/Login';
import ExecuteSteps from '../pages/ExecuteSteps';
import Onboarding from '../pages/Onboarding';
import Preferences from '../pages/Preferences';
import Feed from '../pages/Feed';
import Recipe from '../pages/Recipe';
import RecipeFinished from '../pages/RecipeFinished';
import Evaluation from '../pages/Evaluation';
import EvaluationFinished from '../pages/EvaluationFinished';
import ShopList from '../pages/ShopList';
import User from '../pages/User';
import Settings from '../pages/Settings';
import Welcome from '../pages/Welcome';
import useStyles from './styles';
import Admin from '../pages/Admin';
import LandingPage from '../pages/LandingPage';

const Routes = () => {
  const { renderNavBar } = useContext(AppContext);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { authUser } = useContext(AppContext);

  const classes = useStyles();

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        authUser ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  );

  function renderRoutes() {
    return (
      <div className={classes.page}>
        <div className={classes.content}>
          <PrivateRoute
            path="/recipe-finished"
            exact
            component={RecipeFinished}
          />
          <PrivateRoute
            path="/recipes/:id/execute"
            exact
            component={ExecuteSteps}
          />
          <Route path="/" exact component={Login} />
          <PrivateRoute path="/recipes" exact component={Feed} />
          <PrivateRoute path="/recipes/:id" exact component={Recipe} />
          <PrivateRoute path="/shopList" exact component={ShopList} />
          <PrivateRoute path="/user" exact component={User} />
          <PrivateRoute path="/settings" exact component={Settings} />
          <PrivateRoute path="/admin" exact component={Admin} />
          <CreationsProvider>
            <PrivateRoute path="/creations" exact component={Creations} />
            <PrivateRoute path="/indexTabs" exact component={IndexTabs} />
            <PrivateRoute
              path="/information"
              exact
              component={InformationPage}
            />
            <PrivateRoute
              path="/recipe-created"
              exact
              component={RecipeCreated}
            />
            <PrivateRoute path="/welcome" exact component={Welcome} />
            <PrivateRoute path="/preferences" exact component={Preferences} />
            <PrivateRoute path="/onboarding" exact component={Onboarding} />
            <PrivateRoute
              path="/evaluation-finished"
              exact
              component={EvaluationFinished}
            />
            <PrivateRoute path="/evaluation" exact component={Evaluation} />
          </CreationsProvider>
          <Route path="/recipe/:id" component={Recipe} />
        </div>
        {renderNavBar && authUser && <NavBar />}
      </div>
    );
  }

  return (
    <Router>
      <Switch>
        <>{isMobile ? renderRoutes() : <LandingPage />}</>
      </Switch>
    </Router>
  );
};

export default Routes;
