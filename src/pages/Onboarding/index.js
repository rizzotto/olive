import { CircularProgress } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import newRecipes from '../../assets/newRecipes.svg';
import rememberBuy from '../../assets/rememberBuy.svg';
import shareRecipes from '../../assets/shareRecipes.svg';
import Button from '../../components/Button';
import { AppContext } from '../../context/AppProvider';
import useStyles from './styles';

export default function Onboarding(props) {
  const classes = useStyles();
  var [show, setShow] = useState(0);
  const history = useHistory();
  const { tags } = props.location.state;

  const { createNewUserWithAuthData, loading, setRenderNavBar } = useContext(
    AppContext,
  );

  var options = [
    {
      image: newRecipes,
      title: 'Encontre novas Receitas',
      description:
        'No Olive, você pode explorar ótimas receitas criadas com muito carinho',
    },
    {
      image: shareRecipes,
      title: 'Compartilhe a sua culinária',
      description:
        'Que tal compartilhar com todo mundo algumas das suas receitas mais saborosas?',
    },
    {
      image: rememberBuy,
      title: 'Nunca esqueça das compras',
      description:
        'Utilize a lista de compras virtual para salvar os ingredientes de sua próxima aventura',
    },
  ];

  const nextScreen = () => {
    setShow(show + 1);
  };
  const accessOlive = async () => {
    await createNewUserWithAuthData({ tags });
    setRenderNavBar(true);
    history.push('/');
  };

  return (
    <div className={classes.page}>
      <div></div>
      <div className={classes.content}>
        <img
          src={options[show].image}
          alt="React Logo"
          className={classes.image}
        />

        <div className={classes.pagination}>
          <div
            onClick={() => setShow(0)}
            className={show == 0 ? classes.indexSelected : classes.index}
          />
          <div
            onClick={() => setShow(1)}
            className={show == 1 ? classes.indexSelected : classes.index}
          />
          <div
            onClick={() => setShow(2)}
            className={show == 2 ? classes.indexSelected : classes.index}
          />
        </div>

        <div className={classes.info}>
          <h1 className={classes.title}>{options[show].title}</h1>
          <h3 className={classes.description}>{options[show].description}</h3>
        </div>
      </div>
      {!loading && (
        <Button
          style={{ width: 220 }}
          color="primary"
          text={show != 2 ? 'Próximo' : 'Acessar o Olive'}
          onClick={show != 2 ? nextScreen : accessOlive}
        />
      )}
      {loading && <CircularProgress color="secondary" />}
    </div>
  );
}
