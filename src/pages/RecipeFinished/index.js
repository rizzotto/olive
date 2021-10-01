import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppProvider';
import { useHistory } from 'react-router-dom';
import Button from '../../components/Button';
import EmptyGeneric from '../../components/EmptyGeneric';
import RecipesAPI from '../../services/RecipesAPI';
import SpeechRecognition from 'react-speech-recognition';
import useStyles from './styles';

export default function RecipeFinished(props) {
  const classes = useStyles();
  const history = useHistory();
  const { recipe_id, tags } = props.location.state;
  const { setRenderNavBar } = useContext(AppContext);
  const {
    favouriteRecipes,
    updateFavoriteRecipes,
    setFavouriteRecipes,
    cookRecipe,
  } = useContext(AppContext);

  const [isLiked, setIsLiked] = React.useState(
    favouriteRecipes && favouriteRecipes.includes(Number.parseInt(recipe_id)),
  );

  const handleFavClick = async () => {
    const fav = await updateFavoriteRecipes(Number.parseInt(recipe_id));

    if (!isLiked) RecipesAPI().likeRecipe(Number.parseInt(recipe_id));
    else RecipesAPI().dislikeRecipe(Number.parseInt(recipe_id));

    setFavouriteRecipes(fav);
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    SpeechRecognition.stopListening();
    setRenderNavBar(true);
  });

  cookRecipe(recipe_id, tags);

  return (
    <div className={classes.emptyState}>
      <EmptyGeneric
        title="Receita Concluída!"
        description="Ela já foi contabilizada nas suas conquistas"
      />
      <div className={classes.button}>
        <Button
          style={{ width: 220 }}
          text={!isLiked ? 'Adicionar aos Favoritos' : 'Remover dos Favoritos'}
          onClick={() => handleFavClick()}
          variant="outlined"
          color="secondary"
        />
        <h4 className={classes.textInfo}>
          Que tal dar uma olhada em mais receitas?
        </h4>
        <div>
          <Button
            style={{ width: 220 }}
            text="Voltar para o Feed"
            onClick={() => history.push('/')}
            color="secondary"
          />
        </div>
      </div>
    </div>
  );
}
