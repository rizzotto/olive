import React, { useContext, useEffect, useRef, useState } from 'react';
import { InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useHistory } from 'react-router-dom';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Input from '../../components/Input';
import TagList from '../../components/TagList';
import theme from '../../constants/theme';
import { AppContext } from '../../context/AppProvider';
import { storage } from '../../services/firebase';
import RecipesAPI from '../../services/RecipesAPI';

export default function Feed() {
  const [recipes, setRecipesValue] = useState([]);
  const [tags, setTagsValue] = useState([]);
  const [activeTags, setActiveTags] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const isFirstRun = useRef(true);
  const [loadingTags, setLoadingTags] = useState(true);
  const [seeAprovedRecipes, setSeeAprovedRecipes] = useState(true);
  const history = useHistory();

  const { getName, userDoc } = useContext(AppContext);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      loadRecipes();
      getTagList();
    }
    return () => (mounted = false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    loadRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, activeTags]);

  function loadRecipes() {
    if (activeTags.length === 0 && (searchTerm === undefined || !searchTerm))
      getRecipesListWihtPreferences();
    else getRecipesList(seeAprovedRecipes);
  }

  function getTagList() {
    RecipesAPI()
      .getTagsList()
      .then(tags => {
        setTagsValue(tags);
        setLoadingTags(false);
      });
  }

  function getRecipesList(status) {
    RecipesAPI()
      .getRecipesList({
        title: searchTerm,
        tags: activeTags,
        status: status,
      })
      .then(recipes => {
        setRecipesValue(recipes);

        const updatedRecipes = recipes.map(r => {
          if (r.media_format) {
            var format = r.media_format.split('/')[1];
            return storage
              .child(`/recipes/${r.recipe_id}/media.${format}`)
              .getDownloadURL()
              .then(url => ({ ...r, logo: url }))
              .catch(() => ({ ...r, logo: null }));
          }
          return { ...r, logo: null };
        });
        Promise.all(updatedRecipes).then(done => {
          setRecipesValue(done);
        });
      });
  }

  function getRecipesListWihtPreferences() {
    RecipesAPI()
      .getRecipesListWithPreferences({ tags: userDoc.favourites.tags })
      .then(recipes => {
        setRecipesValue(recipes);
        const updatedRecipes = recipes.map(r => {
          if (r.media_format) {
            var format = r.media_format.split('/')[1];
            var data = storage
              .child(`/recipes/${r.recipe_id}/media.${format}`)
              .getDownloadURL()
              .then(url => ({ ...r, logo: url }))
              .catch(() => ({ ...r, logo: null }));

            return data;
          }
          return { ...r, logo: null };
        });
        Promise.all(updatedRecipes).then(done => {
          setRecipesValue(done);
        });
      });
  }

  function onClickCard(card) {
    history.push(`/recipes/${card.recipe_id}`, { recipe: card });
  }

  const handleGetRecipesByStatus = () => {
    setSeeAprovedRecipes(!seeAprovedRecipes);
    const status = !seeAprovedRecipes;
    getRecipesList(status);
  };

  let timeout = null;

  function handleSearch(e) {
    // Timeouts for debounce
    clearTimeout(timeout);

    // Make a new timeout set to go off in 1000ms (1 second)
    timeout = setTimeout(function () {
      setSearchTerm(e.target.value);
    }, 300);
  }

  function onClickTag(tags) {
    // setSeeAprovedRecipes(true);
    // Get array of ids from selected tags
    setActiveTags(
      tags.reduce((output, tag) => {
        if (tag.selected) output.push(tag.tag_id);
        return output;
      }, []),
    );
  }

  return (
    <div>
      <h1 style={{ marginTop: 48 }}>
        {`${getName().split(' ')[0]},`} Bem-vindo ao{' '}
        <span style={{ color: theme.palette.primary.main }}>Olive</span>
      </h1>
      <Input
        disabled={!seeAprovedRecipes}
        hiddenLabel
        placeholder="Buscar"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon style={{ fill: '#C4C4C6' }} />
            </InputAdornment>
          ),
        }}
        onChange={e => handleSearch(e)}
      />
      {!loadingTags && (
        <TagList
          disabled={!seeAprovedRecipes}
          horizontal
          isButton={seeAprovedRecipes}
          onClick={onClickTag}
          tags={tags}
        />
      )}
      {(userDoc.role === 0 || userDoc.role === 2) && (
        <Button
          color="secondary"
          disabled={activeTags.length > 0 || searchTerm.length > 0}
          text={
            seeAprovedRecipes
              ? 'Ver as receitas pendentes'
              : 'Ver receitas aprovadas'
          }
          onClick={() => handleGetRecipesByStatus()}
          style={{ width: '100%' }}
        />
      )}
      {recipes.length === 0 ? (
        <h3
          style={{
            color: '#8A8A8E',
            padding: '90px 50px',
            textAlign: 'center',
          }}
        >
          Nenhuma receita encontrada
        </h3>
      ) : (
        recipes.map(recipe => (
          <Card
            showStatus={!seeAprovedRecipes}
            onClickCard={onClickCard}
            style={{ marginTop: '20px' }}
            key={recipe.recipe_id}
            data={recipe}
          />
        ))
      )}
    </div>
  );
}
