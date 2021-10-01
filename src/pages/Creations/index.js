import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppProvider';
import { CreationsContext } from '../../context/CreationsProvider';
import { IconButton } from '@material-ui/core';
import { storage } from '../../services/firebase';
import { useHistory } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import Button from '../../components/Button';
import Card from '../../components/Card';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogConfirmRecipeOverwrite from '../../components/Dialogs/DialogConfirmRecipeOverwrite';
import DialogDecideEditOrCreateRecipe from '../../components/Dialogs/DialogDecideEditOrCreateRecipe';
import EmptyGeneric from '../../components/EmptyGeneric';
import RecipesApi from '../../services/RecipesAPI';
import DialogFeedback from '../../components/Dialogs/DialogFeedback';

export default function Creations() {
  const history = useHistory();
  const { setRenderNavBar, authUser } = useContext(AppContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { recipeData, setRecipeData, getEmptyRecipeDate } = useContext(
    CreationsContext,
  );
  const [openModalFeedback, setOpenModalFeedback] = useState(false);
  const [openModalDataLoss, setOpenModalDataLoss] = useState(false);
  const [openModalDecideEditCreate, setOpenModalDecideEditCreate] = useState(
    false,
  );
  const [recipeToEdit, setRecipeToEdit] = useState({});

  useEffect(() => {
    setRenderNavBar(true);
    fetchAPI();
  }, []);

  async function fetchAPI() {
    try {
      const data = await RecipesApi().getRecipesByUser({ id: authUser.uid });
      setData(data);
      const updatedRecipes = data.map(r => {
        var format;
        if (r.media_format) {
          format = r.media_format.split('/')[1];
          return storage
            .child(`/recipes/${r.recipe_id}/media.${format}`)
            .getDownloadURL()
            .then(url => ({ ...r, logo: url }))
            .catch(() => ({ ...r, logo: null }));
        }
        return { ...r, logo: null };
      });

      Promise.all(updatedRecipes).then(done => {
        setData(done);
      });
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setData([]);
    }
  }

  function onClickCard(recipe, origin) {
    if (recipe.new) recipe.tags = [];

    const tags = getTags(recipe);

    if (recipeData.recipe_id == recipe.recipe_id && recipe.new != true)
      recipe = recipeData;

    if (
      recipe.feedback &&
      !openModalFeedback &&
      !openModalDataLoss &&
      recipe.recipe_id != recipeData.recipe_id &&
      recipe.status != 'P'
    ) {
      setRecipeToEdit({ ...recipe, tags });
      setOpenModalFeedback(true);
      return;
    }

    setRecipeToEdit({ ...recipe, tags });

    if (checkForOverride(recipe))
      if (origin == 'start-new') setOpenModalDecideEditCreate(true);
      else setOpenModalDataLoss(true);
    else sendToEdit({ ...recipe, tags });
  }

  function getTags(recipe) {
    return getEmptyRecipeDate().tags.reduce((tags, tag) => {
      if (
        recipe.tags.filter(recipeTag => recipeTag.title == tag.title).length > 0
      )
        return tags.concat({ ...tag, selected: true });
      else return tags.concat(tag);
    }, []);
  }

  function checkForOverride(recipe) {
    return (
      !!recipeData.inProgress &&
      (recipeData.recipe_id != recipe.recipe_id || recipe.new == true)
    );
  }

  function sendToEdit(recipe) {
    setRecipeData(recipe);
    history.push('/indexTabs');
  }

  return loading ? (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <CircularProgress color="secondary" />
    </div>
  ) : data.length !== 0 ? (
    <div>
      <IconButton
        style={{ marginLeft: 'auto', display: 'block' }}
        onClick={() =>
          onClickCard({ ...getEmptyRecipeDate(), new: true }, 'start-new')
        }
      >
        <AddIcon color="secondary" />
      </IconButton>

      <div>
        <h1 style={{ marginTop: 0 }}>Minhas Criações</h1>
      </div>

      {data.map(recipe => {
        return (
          <Card
            showStatus
            onClickCard={() => onClickCard(recipe)}
            style={{ marginTop: '20px' }}
            key={recipe.recipe_id}
            data={recipe}
          />
        );
      })}
      <DialogConfirmRecipeOverwrite
        open={openModalDataLoss}
        handleOnClose={() => setOpenModalDataLoss(false)}
        handleOptionYes={() => sendToEdit(recipeToEdit)}
        handleOptionNo={() => setOpenModalDataLoss(false)}
      />
      <DialogDecideEditOrCreateRecipe
        open={openModalDecideEditCreate}
        handleOnClose={() => setOpenModalDecideEditCreate(false)}
        handleOptionNo={() => sendToEdit(getEmptyRecipeDate())}
        handleOptionYes={() => sendToEdit(recipeData)}
      />
      <DialogFeedback
        open={openModalFeedback}
        status={recipeToEdit.status}
        feedback={recipeToEdit.feedback}
        handleOnClose={() => setOpenModalFeedback(false)}
        handleOptionEdit={() => {
          setOpenModalFeedback(false);
          onClickCard(recipeToEdit);
        }}
        handleOptionFinish={() => setOpenModalFeedback(false)}
      />
    </div>
  ) : (
    <div
      style={{
        overflowY: 'hidden',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'column',
      }}
    >
      <IconButton
        style={{ marginLeft: 'auto', display: 'block' }}
        onClick={() => history.push('/indexTabs')}
      >
        <AddIcon color="secondary" />
      </IconButton>
      <h1 style={{ alignSelf: 'flex-start', marginBottom: 'auto' }}>
        Minhas Criações
      </h1>
      <EmptyGeneric
        title="Você ainda não criou nenhuma receita"
        description="Para adicionar itens acesse uma receita ou adicione aqui mesmo"
      />
      <Button
        style={{ width: 220, marginTop: 'auto' }}
        text="Criar Receita"
        onClick={() => history.push('/indexTabs')}
        color="secondary"
      />
    </div>
  );
}
