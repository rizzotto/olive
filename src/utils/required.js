import React from 'react';
import tagsObject from './tagsObject';

function validate(recipeData) {
  const title = recipeData.title === '';
  const portions = recipeData.portions === '';
  const preparation_time = recipeData.preparation_time === '';
  const difficulty = recipeData.difficulty === 0;
  const tags = tagsObject(recipeData.tags).length === 0;
  const ingredients = recipeData.ingredients.length === 0;
  const steps = recipeData.steps[0].title === '';

  return {
    title,
    portions,
    preparation_time,
    difficulty,
    tags,
    ingredients,
    steps,
  };
}

function required(recipeData) {
  const {
    title,
    portions,
    preparation_time,
    difficulty,
    tags,
    ingredients,
    steps,
  } = validate(recipeData);

  return (
    title ||
    portions ||
    preparation_time ||
    difficulty ||
    tags ||
    ingredients ||
    steps
  );
}

function createMessage(recipeData) {
  const {
    title,
    portions,
    preparation_time,
    difficulty,
    tags,
    ingredients,
    steps,
  } = validate(recipeData);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <span style={{ fontWeight: 'bold' }}>{title ? 'Título' : ''}</span>
      <span style={{ fontWeight: 'bold' }}>{portions ? 'Porções' : ''}</span>
      <span style={{ fontWeight: 'bold' }}>
        {preparation_time ? 'Tempo' : ''}
      </span>
      <span style={{ fontWeight: 'bold' }}>
        {difficulty ? 'Dificuldade' : ''}
      </span>
      <span style={{ fontWeight: 'bold' }}>{tags ? 'Tags' : ''}</span>
      <span style={{ fontWeight: 'bold' }}>
        {ingredients ? 'Ingredientes' : ''}
      </span>
      <span style={{ fontWeight: 'bold' }}>{steps ? 'Passos' : ''}</span>
    </div>
  );
}

export { required, createMessage };
