import React from 'react';
import useStyles from './styles';
import { ReactComponent as LandingSplash } from '../../assets/landing-splash.svg';
import { ReactComponent as Rectangle } from '../../assets/rectangle.svg';
import { ReactComponent as Logo2 } from '../../assets/logo2.svg';
import { ReactComponent as AGES } from '../../assets/AGES.svg';
import { ReactComponent as DRIBBBLE } from '../../assets/DRIBBBLE.svg';
import { ReactComponent as GITLAB } from '../../assets/GITLAB.svg';
import newRecipes from '../../assets/newRecipes.svg';
import rememberBuy from '../../assets/rememberBuy.svg';
import shareRecipes from '../../assets/shareRecipes.svg';
import landing0 from '../../assets/landing-0.svg';
import landing1 from '../../assets/landing-1.svg';
import landing2 from '../../assets/landing-2.svg';
import landing3 from '../../assets/landing-3.svg';
import landing4 from '../../assets/landing-4.svg';
import landing5 from '../../assets/landing-5.svg';
import landing6 from '../../assets/landing-6.svg';
import Carousel from 'react-material-ui-carousel';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Grow } from '@material-ui/core';

function LandingPage() {
  const classes = useStyles();

  const phone = [
    { image: landing0, text: 'Todas as receitas que você quiser' },
    {
      image: landing1,
      text: 'Gerencie suas receitas e compartilhe com amigos!',
    },
    {
      image: landing2,
      text: 'Crie novas receitas de forma fácil e divertida',
    },
    { image: landing3, text: 'Gerencie sua lista de compras ' },
    {
      image: landing4,
      text:
        'Utilize comandos de voz para ajudar a visualizar seus próximos passos',
    },
    { image: landing5, text: 'Todas as informações que você precisa' },
    { image: landing6, text: 'Complete novos desafios cozinhando!' },
  ];

  return (
    <div className={classes.container}>
      <Rectangle className={classes.rectangle} />
      <Grow in>
        <div className={classes.page1}>
          <div className={classes.titleContainer}>
            <div className={classes.title}>
              Sua nova<div>jornada</div> gastrônomica
            </div>
            <h3 className={classes.subtitle}>
              Para acessar, utilize um ambiente mobile
            </h3>
          </div>
          <LandingSplash height="503" />
        </div>
      </Grow>
      <h1 className={classes.title2}>A melhor refeição, é a sua!</h1>
      <div className={classes.page2}>
        <div className={classes.item}>
          <img src={newRecipes} alt="React Logo" className={classes.image} />
          <h2 className={classes.h2}>Encontre novas Receitas</h2>
          <span className={classes.span}>
            Vamos explorar ótimas receitas criadas com muito carinho
          </span>
        </div>
        <div className={classes.item}>
          <img src={shareRecipes} alt="React Logo" className={classes.image} />
          <h2 className={classes.h2}>Compartilhe a sua culinária</h2>
          <span className={classes.span}>
            Compartilhar com todo mundo algumas das suas receitas mais saborosas
          </span>
        </div>
        <div className={classes.item}>
          <img src={rememberBuy} alt="React Logo" className={classes.image} />
          <h2 className={classes.h2}>Nunca esqueça das compras</h2>
          <span className={classes.span}>
            Utilizar a lista de compras virtual para salvar os ingredientes de
            sua próxima aventura
          </span>
        </div>
      </div>
      <div style={{ backgroundColor: '#357735' }}>
        <Carousel
          navButtonsAlwaysVisible
          NextIcon={<ChevronRightIcon fontSize="large" />}
          PrevIcon={<ChevronLeftIcon fontSize="large" />}
          navButtonsProps={{
            style: {
              backgroundColor: 'transparent',
            },
          }}
          indicatorIconButtonProps={{
            style: {
              color: 'rgba(254,249,238,0.4)',
              margin: 20,
            },
          }}
          activeIndicatorIconButtonProps={{
            style: {
              backgroundColor: 'rgba(254,249,238)',
              margin: 20,
            },
          }}
          indicatorContainerProps={{
            style: {
              paddingBottom: '20px',
            },
          }}
        >
          {phone.map((item, i) => (
            <div key={i} className={classes.carousel}>
              <img src={item.image} alt="Phone Image" height="503" />
              <div className={classes.carouselTitle}>{item.text}</div>
            </div>
          ))}
        </Carousel>
      </div>
      <div className={classes.footer}>
        <Logo2 />
        <div style={{ marginTop: 24 }}>
          <a
            href="http://www.ages.pucrs.br/lista-de-projetos-2021-1/olive/"
            target="_blank"
            rel="noreferrer"
            style={{ margin: 16 }}
          >
            <AGES />
          </a>
          <a
            href="https://dribbble.com/shots/15900384-Olive"
            target="_blank"
            rel="noreferrer"
            style={{ margin: 16 }}
          >
            <DRIBBBLE />
          </a>
          <a
            href="https://tools.ages.pucrs.br/olive"
            target="_blank"
            rel="noreferrer"
            style={{ margin: 16 }}
          >
            <GITLAB />
          </a>
        </div>
        <div className={classes.footerTitle}>
          Agência Experimental de Engenharia de Software{' '}
        </div>
        <div>2021</div>
      </div>
    </div>
  );
}

export default LandingPage;
