import { Button as MaterialButton, DialogContentText } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../components/Button';
import Tabs from '../../components/Tabs';
import { AppContext } from '../../context/AppProvider';
import { CreationsContext } from '../../context/CreationsProvider';
import { storage } from '../../services/firebase';
import RecipesAPI from '../../services/RecipesAPI';
import { createMessage, required } from '../../utils/required';
import StyledDiv from '../../utils/styledDiv';
import tagsObject from '../../utils/tagsObject';
import InformationPage from './InformationPage';
import IngredientsPage from './IngredientsPage';
import StepsPage from './StepsPage';

export default function IndexTabs() {
  const { tab, setTab } = useContext(CreationsContext);
  const [open, setOpen] = useState(false);
  const [openRequired, setOpenRequired] = useState(false);
  const history = useHistory();
  const [toggle, setToggle] = useState(true);
  const {
    recipeData,
    setRecipeData,
    loading,
    setMainImage,
    setStepsImages,
  } = useContext(CreationsContext);
  const { setNavBarValue, authUser } = useContext(AppContext);

  async function handleOnSubmit() {
    if (required(recipeData) === true) {
      setOpenRequired(true);
    } else {
      setOpenRequired(false);
      let postObject = recipeData;
      const mainMedia = postObject['main_image'];
      let mediaType;
      if (mainMedia) mediaType = mainMedia.type;
      delete postObject['main_image'];

      let stepsImage = [];
      postObject.steps = postObject.steps.map(step => {
        if (!step.image) return step;
        stepsImage.push({
          image: step.image,
          position: step.position,
        });
        const mediaType = step.image.type;
        delete step.image;
        return { ...step, media_format: mediaType };
      });

      postObject = {
        ...postObject,
        portions: parseInt(postObject.portions),
        preparation_time: parseInt(postObject.preparation_time),
        tags: tagsObject(recipeData.tags),
        user_id: authUser.uid || null,
        status: 'P',
        media_format: mediaType,
      };

      delete postObject['inProgress'];
      delete postObject['new'];
      delete postObject['likes_number'];
      delete postObject['active'];
      delete postObject['logo'];
      delete postObject['feedback'];

      let result;
      if (postObject.recipe_id)
        result = await RecipesAPI().patchRecipe(postObject);
      else result = await RecipesAPI().postRecipe(postObject);

      if (mediaType) {
        const recipeImageRef = storage.child(
          `/recipes/${result.data.data}/media.${mediaType.split('/')[1]}`,
        );
        recipeImageRef.put(mainMedia);
      }

      stepsImage.forEach(step => {
        const format = step.image.type.split('/')[1];
        let stepImageRef = storage.child(
          `recipes/${result.data.data.recipe_id}/steps/${step.position}/media.${format}`,
        );
        stepImageRef.put(step.image);
      });

      RecipesAPI()
        .getTagsList()
        .then(tags => {
          setRecipeData({
            inProgress: false,
            difficulty: 0,
            title: '',
            portions: '',
            preparation_time: '',
            tags: tags,
            ingredients: [],
            steps: [
              {
                title: '',
              },
            ],
          });
        });

      setMainImage(null);
      setStepsImages(new Map());
      setTab(0);

      history.push('/recipe-created');
    }
  }

  const handleChange = () => {
    setToggle(!toggle);
  };

  function handleOnClick() {
    setOpen(true);
  }

  const handleCloseDialog = () => {
    setOpenRequired(false);
  };

  const handleCloseYes = () => {
    if (!toggle)
      RecipesAPI()
        .getTagsList()
        .then(tags => {
          setRecipeData({
            inProgress: false,
            difficulty: 0,
            title: '',
            portions: '',
            preparation_time: '',
            tags: tags,
            ingredients: [],
            steps: [
              {
                title: '',
              },
            ],
          });
        });
    else setRecipeData({ ...recipeData, inProgress: true });
    setTab(0);
    setOpen(false);
    setNavBarValue(1);
    setMainImage(null);
    setStepsImages(new Map());
    history.push('/creations');
  };

  return (
    <>
      {!loading ? (
        <>
          <div style={{ paddingBottom: 15 }}>
            <MaterialButton
              style={{ color: '#FF1B25', float: 'right', borderRadius: 6 }}
              size="small"
              onClick={() => handleOnClick()}
            >
              Cancelar
            </MaterialButton>
          </div>
          <div>
            <h1>{recipeData.recipe_id ? 'Editar' : 'Nova'} Receita</h1>
            <Tabs value={tab} />
            {tab === 0 && <InformationPage />}
            {tab === 1 && <IngredientsPage />}
            {tab === 2 && <StepsPage />}
          </div>
          <StyledDiv>
            <Button
              color="secondary"
              text="Salvar Receita"
              onClick={handleOnSubmit}
              style={{ width: 220 }}
            />
          </StyledDiv>
          <Dialog
            open={openRequired}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
            PaperProps={{
              style: { borderRadius: 12 },
            }}
          >
            <DialogTitle id="alert-dialog-title">
              Campos Obrigatórios:
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {createMessage(recipeData)}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <MaterialButton
                onClick={handleCloseDialog}
                color="primary"
                autoFocus
              >
                Continuar
              </MaterialButton>
            </DialogActions>
          </Dialog>
          <Dialog
            PaperProps={{
              style: { borderRadius: 12 },
            }}
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Deseja cancelar a receita?
            </DialogTitle>
            <DialogContent>
              <FormControlLabel
                control={
                  <Switch
                    checked={toggle}
                    onChange={handleChange}
                    color="primary"
                  />
                }
                label="Manter dados da receita"
              />
            </DialogContent>
            <DialogActions>
              <MaterialButton
                onClick={handleCloseYes}
                style={{ color: '#FF1B25' }}
              >
                Sim
              </MaterialButton>
              <MaterialButton
                onClick={() => setOpen(false)}
                color="primary"
                autoFocus
              >
                Não
              </MaterialButton>
            </DialogActions>
          </Dialog>{' '}
        </>
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <CircularProgress color="secondary" />
        </div>
      )}
    </>
  );
}
