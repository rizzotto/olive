import React, { useContext, useEffect, useState } from 'react';
import ImageButton from '../../components/ImageButton';
import Infos from '../../components/Infos';
import Input from '../../components/Input';
import Slider from '../../components/Slider';
import TagList from '../../components/TagList';
import { AppContext } from '../../context/AppProvider';
import { CreationsContext } from '../../context/CreationsProvider';

export default function InformationPage() {
  const { setRenderNavBar } = useContext(AppContext);
  const {
    recipeData,
    setRecipeData,

    setMainImage,
    mainImage,
  } = useContext(CreationsContext);
  const [slider] = useState(recipeData.difficulty);

  useEffect(() => {
    setRenderNavBar(false);
    if (recipeData.logo)
      fetch(recipeData.logo)
        .then(r => r.blob())
        .then(setMainImage);
    else setMainImage(null);
  });

  function handleOnChange(object, value) {
    setRecipeData({
      ...recipeData,
      [object]: value,
    });
  }

  function handleTagsOnChange(tags) {
    setRecipeData({
      ...recipeData,
      tags: tags,
    });
  }

  function getImage(img) {
    handleOnChange('main_image', img);
    setMainImage(img);
  }

  return (
    <div style={{ marginBottom: 60 }}>
      <h2>Nome</h2>
      <Input
        label="Nome da Receita"
        onChange={e => handleOnChange('title', e.target.value)}
        defaultValue={recipeData.title}
      />
      <h2>Descrição</h2>
      <Input
        rows={4}
        multiline
        label="Descrição da Receita"
        onChange={e => handleOnChange('description', e.target.value)}
        defaultValue={recipeData.description}
      />
      <h2>Foto</h2>
      <ImageButton
        key={mainImage ? mainImage.size : 0}
        getImage={getImage}
        image={mainImage}
      >
        Adicionar imagem
      </ImageButton>
      <h2>Infos</h2>
      <Infos
        onChangeTime={value => handleOnChange('preparation_time', value)}
        onChangePortions={value => handleOnChange('portions', value)}
        defaultTime={recipeData.preparation_time}
        defaultPortions={recipeData.portions}
      />
      <h2>Dificuldade</h2>
      <Slider
        initialValue={slider}
        onChange={(event, value => handleOnChange('difficulty', value))}
      />
      <h2>Tags</h2>
      <div style={{ paddingBottom: 80 }}>
        {recipeData.tags && (
          <TagList
            isButton
            tags={recipeData.tags}
            horizontal={false}
            onClick={tags => handleTagsOnChange(tags)}
          />
        )}
      </div>
    </div>
  );
}
