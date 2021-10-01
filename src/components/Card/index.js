import {
  Card as MaterialCard,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Collapse,
  IconButton,
  Grow,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { ReactComponent as Clock } from '../../assets/clock.svg';
import { ReactComponent as Plate } from '../../assets/plate.svg';
import getPlaceholder from '../../constants/placeholderIcons';

import { AppContext } from '../../context/AppProvider';
import RecipesAPI from '../../services/RecipesAPI';
import useStyles from './styles';

function Card({ data, onClickCard, showStatus, ...others }) {
  const {
    description,
    difficulty,
    logo,
    portions,
    preparation_time,
    recipe_id,
    status,
    title,
  } = data;

  const {
    updateFavoriteRecipes,
    favouriteRecipes,
    setFavouriteRecipes,
  } = useContext(AppContext);

  const classes = useStyles({ difficulty, status, showStatus });
  const [expanded, setExpanded] = React.useState(false);
  const [isLiked, setIsLiked] = React.useState(
    favouriteRecipes && favouriteRecipes.includes(data.recipe_id),
  );

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleHeartClick = async () => {
    const fav = await updateFavoriteRecipes(data.recipe_id);

    if (!isLiked) RecipesAPI().likeRecipe(data.recipe_id);
    else RecipesAPI().dislikeRecipe(data.recipe_id);

    setFavouriteRecipes(fav);
    setIsLiked(!isLiked);
  };

  const handleOnClickCard = () => {
    if (onClickCard) onClickCard(data);
  };

  const difficultyObject = {
    1: 'Fácil',
    2: 'Fácil',
    3: 'Fácil',
    4: 'Fácil',
    5: 'Médio',
    6: 'Médio',
    7: 'Médio',
    8: 'Difícil',
    9: 'Difícil',
    10: 'Difícil',
  };

  const statusMap = {
    A: 'Aprovado',
    P: 'Pendente',
    R: 'Reprovado',
  };

  return (
    <Grow in>
      <MaterialCard className={classes.root} {...others}>
        <CardActionArea
          onClick={handleOnClickCard}
          style={{ position: 'relative' }}
        >
          <div className={classes.tag}>
            {showStatus ? statusMap[status] : difficultyObject[difficulty]}
          </div>
          {logo === undefined ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 200,
              }}
            >
              <CircularProgress color="secondary" />
            </div>
          ) : logo === null ? (
            <CardMedia
              component="img"
              height={200}
              image={getPlaceholder(recipe_id)}
              title="Default image"
            />
          ) : (
            <CardMedia
              height={200}
              component="img"
              image={logo}
              title="Main image"
            />
          )}
          <CardContent className={classes.content}>
            <Typography
              style={{ fontWeight: '500' }}
              variant="h5"
              component="h2"
            >
              {title}
            </Typography>
          </CardContent>
        </CardActionArea>

        <CardActions className={classes.actions}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Clock />
            <Typography style={{ marginLeft: 8 }}>
              {preparation_time} min
            </Typography>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Plate />
            <Typography style={{ marginLeft: 8 }}>
              {portions} porções
            </Typography>
          </div>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography style={{ fontWeight: '500' }}>Descrição</Typography>
              <IconButton
                aria-label="add to favorites"
                color={isLiked ? 'secondary' : 'default'}
                onClick={() => handleHeartClick()}
              >
                <FavoriteIcon />
              </IconButton>
            </div>
            <Typography>{description}</Typography>
          </CardContent>
        </Collapse>
      </MaterialCard>
    </Grow>
  );
}

Card.propTypes = {
  data: PropTypes.object,
  onClickCard: PropTypes.func,
};

Card.defaultProps = {
  data: {},
  onClickCard: () => {},
};

export default Card;
