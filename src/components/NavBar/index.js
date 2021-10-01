import React, { useContext } from 'react';
import useStyles from './styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppProvider';

import { Recipe, Creations, ShopList, Profile } from '../../assets/Icons';

function NavBar({ ...others }) {
  const classes = useStyles();
  const { navBarValue, setNavBarValue } = useContext(AppContext);

  return (
    <BottomNavigation
      value={navBarValue}
      onChange={(event, newValue) => {
        setNavBarValue(newValue);
      }}
      showLabels
      className={classes.root}
      {...others}
    >
      <BottomNavigationAction
        label="Receitas"
        icon={<Recipe />}
        component={Link}
        to="/"
      />
      <BottomNavigationAction
        component={Link}
        label="Criações"
        icon={<Creations />}
        to="/creations"
      />
      <BottomNavigationAction
        component={Link}
        label="Compras"
        icon={<ShopList />}
        to="/shopList"
      />
      <BottomNavigationAction
        component={Link}
        label="Perfil"
        icon={<Profile />}
        to="/user"
      />
    </BottomNavigation>
  );
}

// Defina aqui qual o tipo da prop
NavBar.propTypes = {};

// Defina aqui o valor padrão de cada prop
NavBar.defaultProps = {};

export default NavBar;
