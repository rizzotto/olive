import React, { useContext, useEffect } from 'react';
import InputList from '../../components/InputList';
import { CreationsContext } from '../../context/CreationsProvider';
import { AppContext } from '../../context/AppProvider';

export default function IngredientsPage() {
  const { recipeData, setRecipeData } = useContext(CreationsContext);
  const { setRenderNavBar } = useContext(AppContext);

  useEffect(() => {
    setRenderNavBar(false);
  });

  function handleOnChange(e) {
    setRecipeData(prevState => ({
      ...prevState,
      ingredients: e,
    }));
  }

  return (
    <div style={{ marginBottom: 100, marginTop: 20 }}>
      <InputList items={recipeData.ingredients} onChange={handleOnChange} />
    </div>
  );
}
