import React, { createContext, useEffect, useState } from 'react';
import RecipesAPI from '../services/RecipesAPI';
// Context
const CreationsContext = createContext();

function CreationsProvider({ children }) {
  // Here it's possible to set many states to use in the Creations
  const [tab, setTab] = useState(0);
  const [recipeData, setRecipeData] = useState({});
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState(null);
  const [stepsImages, setStepsImages] = useState(new Map());
  const [aviableTags, setAviableTags] = useState([]);

  useEffect(() => {
    RecipesAPI()
      .getTagsList()
      .then(result => {
        setAviableTags(result);
        setRecipeData({
          difficulty: 0,
          title: '',
          portions: '',
          preparation_time: '',
          tags: result,
          ingredients: [],
          steps: [
            {
              title: '',
            },
          ],
        });
        setLoading(false);
      });
  }, []);

  function getEmptyRecipeDate() {
    return {
      inProgress: false,
      difficulty: 0,
      title: '',
      portions: '',
      preparation_time: '',
      tags: aviableTags,
      ingredients: [],
      steps: [
        {
          title: '',
        },
      ],
    };
  }

  return (
    <CreationsContext.Provider
      value={{
        tab,
        setTab,
        recipeData,
        setRecipeData,
        loading,
        mainImage,
        setMainImage,
        stepsImages,
        setStepsImages,
        getEmptyRecipeDate,
      }}
    >
      {children}
    </CreationsContext.Provider>
  );
}

export { CreationsContext, CreationsProvider };
