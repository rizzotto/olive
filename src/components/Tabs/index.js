import React, { useContext } from 'react';
import Tab from '@material-ui/core/Tab';
import { Tabs as MaterialTabs } from '@material-ui/core';
import useStyles from './styles';
import { CreationsContext } from '../../context/CreationsProvider';

const Tabs = () => {
  const classes = useStyles();
  const { tab, setTab } = useContext(CreationsContext);

  const onChangeTab = (event, newTab) => {
    setTab(newTab);
  };

  return (
    <MaterialTabs value={tab} centered onChange={onChangeTab}>
      <Tab className={classes.label} label="Informações" />
      <Tab className={classes.label} label="Ingredientes" />
      <Tab className={classes.label} label="Passos" />
    </MaterialTabs>
  );
};

export default Tabs;
