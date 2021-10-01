import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../components/Button';
import TagList from '../../components/TagList';
import RecipesAPI from '../../services/RecipesAPI';
import useStyles from './styles';

export default function Preferences() {
  const classes = useStyles();
  const history = useHistory();
  const [tags, setTagsValue] = useState([]);
  const [activeTags, setActiveTags] = useState([]);
  const [loadingTags, setLoadingTags] = useState(true);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getTagList();
    }
    return () => (mounted = false);
  }, []);

  function getTagList() {
    RecipesAPI()
      .getTagsList()
      .then(tags => {
        setTagsValue(tags);
        setLoadingTags(false);
      });
  }

  function onClickTag(tags) {
    setActiveTags(
      tags.reduce((output, tag) => {
        if (tag.selected) output.push(tag.tag_id);
        return output;
      }, []),
    );
  }

  const nextScreen = () => {
    skip();
  };

  const skip = () => {
    history.push('/onboarding', { tags: activeTags });
  };

  return (
    <div className={classes.page}>
      <div></div>
      <div>
        <h1 className={classes.title}>
          Quais suas preferências na hora de escolher uma receita?
        </h1>
        {!loadingTags && (
          <TagList
            tags={tags}
            horizontal={false}
            onClick={onClickTag}
            isButton
          />
        )}
      </div>
      <div></div>
      <div className={classes.buttons}>
        <Button
          color="primary"
          variant="outlined"
          text="Pular"
          style={{ width: 220 }}
          onClick={skip}
        />
        <Button
          style={{ marginTop: 20, width: 220 }}
          color="primary"
          text="Próximo"
          onClick={nextScreen}
        />
      </div>
    </div>
  );
}
