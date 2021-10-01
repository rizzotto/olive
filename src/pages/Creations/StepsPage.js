import React, { createRef, useContext, useEffect } from 'react';
import Button from '../../components/Button';
import Step from '../../components/Step';
import { AppContext } from '../../context/AppProvider';
import { CreationsContext } from '../../context/CreationsProvider';
import { storage } from '../../services/firebase';
import useStyles from './styles';

export default function StepsPage() {
  const { recipeData, setRecipeData, stepsImages, setStepsImages } = useContext(
    CreationsContext,
  );
  const { setRenderNavBar } = useContext(AppContext);
  const classes = useStyles();
  const arrLength = recipeData.steps.length;
  const [elRefs, setElRefs] = React.useState([]);

  useEffect(() => {
    if (recipeData.recipe_id) {
      const images = recipeData.steps.map(step => {
        var format;
        if (step.media_format) {
          format = step.media_format.split('/')[1];
          return storage
            .child(
              `/recipes/${recipeData.recipe_id}/steps/${step.position}/media.${format}`,
            )
            .getDownloadURL()
            .then(fetch)
            .then(r => r.blob())
            .catch(null);
        }
      });

      Promise.all(images).then(images => {
        const foo = new Map();
        images.forEach((image, i) => foo.set(i, image));
        setStepsImages(foo);
      });
    }
    setRenderNavBar(false);
  });

  useEffect(() => {
    // create refs
    setElRefs(elRefs =>
      Array(arrLength)
        .fill()
        .map((_, i) => elRefs[i] || createRef()),
    );
  }, [arrLength]);

  useEffect(() => {
    if (elRefs.length > 1) {
      elRefs[arrLength - 1].current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }
  }, [arrLength, elRefs]);

  function handleOnClick() {
    setRecipeData({ ...recipeData, steps: [...recipeData.steps, {}] });
  }

  function handleOnChange(value, index, object) {
    const newSteps = [];
    recipeData.steps.forEach((step, i) => {
      if (i === index)
        return newSteps.push({ ...step, position: index, [object]: value });
      return newSteps.push({ ...step });
    });
    setRecipeData({ ...recipeData, steps: newSteps });
  }

  function handleStepImageCallback(index, image) {
    const updatedMap = stepsImages;
    updatedMap.set(index, image);
    setStepsImages(updatedMap);
    handleOnChange(image, index, 'image');
  }

  function handleDeleteButton(index) {
    let newSteps = recipeData.steps;
    if (index !== 0) newSteps.splice(index, 1);
    const updatedMap = stepsImages;
    updatedMap.delete(index);
    setRecipeData({ ...recipeData, steps: newSteps });
    setStepsImages(updatedMap);
  }

  function handleImageDeletion(index) {
    const updatedMap = stepsImages;
    updatedMap.delete(index);
    setStepsImages(updatedMap);
  }

  return (
    <div className={classes.container}>
      <div className={classes.steps}>
        {recipeData.steps.map((step, index) => {
          return (
            <Step
              ref={elRefs[index]}
              key={index}
              number={index + 1}
              title={step.title}
              description={step.description}
              onChangeTitle={e => handleOnChange(e, index, 'title')}
              onChangeDescription={e => handleOnChange(e, index, 'description')}
              onClickDeleteButton={() => handleDeleteButton(index)}
              onImageChange={e => handleStepImageCallback(index, e)}
              stepPosition={index}
              image={stepsImages.get(index)}
              onImageDelete={() => handleImageDeletion(index)}
            />
          );
        })}
      </div>
      <Button
        text="Novo Passo"
        variant="outlined"
        color="secondary"
        style={{ width: 220, marginTop: 20, marginBottom: 80 }}
        onClick={handleOnClick}
      />
    </div>
  );
}
