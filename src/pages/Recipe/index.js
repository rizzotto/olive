import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  LinearProgress,
  Button as MaterialButton,
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { ReactComponent as Clock } from '../../assets/clock.svg';
import { ReactComponent as Plate } from '../../assets/plate.svg';
import Accordion from '../../components/Accordion';
import Button from '../../components/Button';
import TagList from '../../components/TagList';
import theme from '../../constants/theme';
import { AppContext } from '../../context/AppProvider';
import RecipesAPI from '../../services/RecipesAPI';
import StyledDiv from '../../utils/styledDiv';
import useStyles from './styles';
import getPlaceholder from '../../constants/placeholderIcons';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

export default function Recipe(props) {
  const classes = useStyles();
  const { id } = useParams();
  const [recipe, setRecipe] = useState(
    props.location.state ? props.location.state.recipe : {},
  );

  const {
    title,
    description,
    difficulty,
    portions,
    likes_number,
    ingredients,
    preparation_time,
    steps,
    recipe_id,
    tags,
    logo,
    status,
  } = recipe;

  const [likes, setLikes] = useState(likes_number);

  const history = useHistory();
  const [openModal, setOpenModal] = useState(false);
  const { resetTranscript } = useSpeechRecognition();
  const {
    userDoc,
    setNavBarValue,
    favouriteRecipes,
    updateFavoriteRecipes,
    setFavouriteRecipes,
  } = useContext(AppContext);

  const [isLiked, setIsLiked] = React.useState(
    favouriteRecipes && favouriteRecipes.includes(Number.parseInt(id)),
  );

  useEffect(() => {
    SpeechRecognition.stopListening();
    let mounted = true;
    if (mounted && !recipe.steps) {
      RecipesAPI()
        .getRecipeById({ id })
        .then(recipe => setRecipe(recipe));
    }
    return () => (mounted = false);
  });

  const handleHeartClick = async () => {
    const fav = await updateFavoriteRecipes(Number.parseInt(id));

    if (!isLiked)
      RecipesAPI()
        .likeRecipe(Number.parseInt(id))
        .then(res => setLikes(res.data.data));
    else
      RecipesAPI()
        .dislikeRecipe(Number.parseInt(id))
        .then(res => setLikes(res.data.data));

    setFavouriteRecipes(fav);
    setIsLiked(!isLiked);
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

  const stepsArray = steps && steps.map(step => step.title);

  function handleShopListClick() {
    setNavBarValue(2);
    history.push('/shopList', { ingredients });
  }

  function handleCookOnClick(voiceEnabled) {
    if (!voiceEnabled) SpeechRecognition.abortListening();
    resetTranscript();
    history.push(`/recipes/${recipe_id}/execute`, {
      recipe,
      steps,
      voice: voiceEnabled,
    });
  }

  const handleCloseDialog = () => {
    setOpenModal(false);
  };

  return (
    <div>
      {recipe.steps ? (
        <>
          <div className={classes.navigationHeader}>
            <IconButton
              onClick={() => history.push('/recipes')}
              style={{ padding: 0 }}
            >
              <ArrowBackIosOutlinedIcon color="secondary" />
            </IconButton>
            <IconButton onClick={handleShopListClick} style={{ padding: 0 }}>
              <ShoppingCartOutlinedIcon color="secondary" />
            </IconButton>
          </div>
          <div className={classes.titleContainer}>
            <div className={classes.title}>
              <h1 style={{ marginBottom: 0 }}>{title}</h1>
              <span style={{ fontSize: 18, color: theme.palette.grey.darker }}>
                {description}
              </span>
            </div>
            <IconButton
              aria-label="add to favorites"
              color="secondary"
              onClick={handleHeartClick}
              style={{ padding: 0 }}
            >
              {isLiked ? (
                <FavoriteIcon color="secondary" />
              ) : (
                <FavoriteBorderIcon color="secondary" />
              )}
            </IconButton>
          </div>
          <div className={classes.content}>
            <img src={logo || getPlaceholder(id)} />
          </div>
          <div className={classes.info}>
            <div className={classes.item}>
              <Clock />
              {preparation_time} Min
            </div>
            <div className={classes.item}>
              <Plate />
              {portions} Porçoes
            </div>
            <div className={classes.item}>
              <FavoriteBorderIcon color="secondary" />
              {likes === 1 ? `${likes} like` : `${likes} likes`}
            </div>
            <div className={classes.item}>
              <LinearProgress
                classes={{
                  root: classes.progressContainer,
                }}
                color="secondary"
                variant="determinate"
                value={difficulty * 10}
              />
              {difficultyObject[difficulty]}
            </div>
          </div>
          <TagList tags={tags} />

          <div style={{ marginBottom: 46 }}>
            <Accordion
              id={0}
              title={`${ingredients.length} Ingredientes`}
              description={ingredients}
            />
            <Accordion
              id={1}
              title={`${steps.length} Passos`}
              description={stepsArray}
            />
          </div>

          <StyledDiv>
            {status === 'P' && (userDoc.role === 2 || userDoc.role == 0) ? (
              <Button
                text="Analisar"
                style={{ width: 220, bottom: 45 }}
                color="secondary"
                onClick={() => handleCookOnClick(false)}
              />
            ) : (
              <Button
                text="Cozinhar"
                style={{ width: 220, bottom: 45 }}
                color="secondary"
                onClick={() => setOpenModal(true)}
              />
            )}
          </StyledDiv>
          <Dialog
            open={openModal}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
            PaperProps={{
              style: { borderRadius: 12 },
            }}
          >
            <DialogTitle style={{ paddingBottom: 4 }} id="alert-dialog-title">
              Comandos de Voz
            </DialogTitle>
            <DialogContent>
              <div style={{ marginBottom: 6, color: 'gray' }}>
                Que tal utilizar a sua voz para navegar entre os passos da
                receita?
              </div>
              <div style={{ fontSize: 16 }}>
                <div>Comandos disponíveis:</div>
                <div>- Próximo</div>
                <div>- Voltar</div>
                <div>- Passo (nº)</div>
                <div>- Finalizar</div>
              </div>
            </DialogContent>
            <DialogActions>
              <MaterialButton
                onClick={() => handleCookOnClick(false)}
                style={{ color: '#FF1B25' }}
                autoFocus
              >
                Não
              </MaterialButton>
              <MaterialButton
                onClick={() => handleCookOnClick(true)}
                color="primary"
                autoFocus
              >
                Sim
              </MaterialButton>
            </DialogActions>
          </Dialog>
        </>
      ) : (
        <div className={classes.loading}>
          <CircularProgress color="secondary" />
        </div>
      )}
    </div>
  );
}
