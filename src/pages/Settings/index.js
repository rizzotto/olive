import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Button as MaterialButton, IconButton } from '@material-ui/core';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { AppContext } from '../../context/AppProvider';
import useStyles from './styles';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import { useHistory } from 'react-router-dom';
import TagList from '../../components/TagList';
import RecipesAPI from '../../services/RecipesAPI';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import getIcon from '../../constants/userIcons';
import theme from '../../constants/theme';

export default function Settings() {
  const classes = useStyles();
  const history = useHistory();
  const [tags, setTags] = useState([]);
  const [loadingTags, setLoadingTags] = useState(true);
  const { doSignOut, updateProfile, userDoc } = useContext(AppContext);
  const [selectedTags, setSelectedTags] = useState(userDoc.favourites.tags);
  const [icon, setIcon] = useState(userDoc.iconId);
  const [name, setName] = useState(userDoc.name);
  const [altered, setAltered] = useState(false);

  const getTagList = useCallback(() => {
    RecipesAPI()
      .getTagsList()
      .then(tags => {
        tags.map(tag => {
          if (selectedTags.includes(tag.tag_id)) tag.selected = true;
        });

        setTags(tags);
        setLoadingTags(false);
      });
  }, [selectedTags]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getTagList();
    }
    return () => (mounted = false);
  }, [getTagList]);

  function onSave() {
    updateProfile(name, icon, selectedTags);
    setAltered(false);
  }

  function handleTagsChange(tags) {
    const cleanTags = [];
    tags.map(tag => {
      if (tag.selected) cleanTags.push(tag.tag_id);
    });
    setAltered(true);
    setSelectedTags(cleanTags);
  }
  function handleNameChange(name) {
    setName(name);
    setAltered(true);
  }
  function handleIconChange() {
    setIcon(Math.floor(Math.random() * 50) + 1);
    setAltered(true);
  }

  return (
    <div>
      <div className={classes.header}>
        <IconButton
          style={{ padding: 0 }}
          onClick={() => history.push('/user')}
        >
          <ArrowBackIosOutlinedIcon color="secondary" />
        </IconButton>
        {userDoc.role === 0 && (
          <MaterialButton
            style={{
              color: theme.palette.secondary.main,
              float: 'right',
              borderRadius: 6,
            }}
            size="small"
            onClick={() => history.push('/admin')}
          >
            <span>Gerenciar Curadores</span>
          </MaterialButton>
        )}
      </div>
      <div className={classes.titleContainer}>
        <div className={classes.title}>
          <h1 style={{ marginBottom: 0 }}>Configurações</h1>
        </div>
      </div>

      <h2>Nome do Usuário</h2>
      <Input
        label="Nome"
        value={name}
        onChange={e => handleNameChange(e.target.value)}
      />

      <h2>Icone</h2>
      <div className={classes.content}>
        <div className={classes.border}>
          <div className={classes.profile}>
            <img className={classes.image} src={getIcon(icon)} />
          </div>
        </div>

        <Button
          fullWidth
          style={{
            marginLeft: 20,
          }}
          variant="outlined"
          color="secondary"
          text="Novo Icone"
          endIcon={<ShuffleIcon />}
          onClick={handleIconChange}
        />
      </div>

      <h2>Preferências</h2>

      {!loadingTags && (
        <TagList
          tags={tags}
          horizontal={false}
          onClick={tags => handleTagsChange(tags)}
          isButton
        />
      )}

      <Button
        disabled={!altered}
        fullWidth
        color="secondary"
        text="Salvar"
        onClick={onSave}
      />

      <Button
        fullWidth
        style={{
          marginBottom: 20,
          marginTop: 16,
        }}
        variant="outlined"
        color="secondary"
        text="Realizar Logout"
        onClick={doSignOut}
      />
    </div>
  );
}
