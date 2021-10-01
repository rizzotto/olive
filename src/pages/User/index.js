import React, { useContext, useEffect, useState } from 'react';
import { IconButton, CircularProgress } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../context/AppProvider';
import useStyles from './styles';
import Settings from '@material-ui/icons/Settings';
import RecipesAPI from '../../services/RecipesAPI';
import Achievement from '../../components/Achievement';
import getIcon from '../../constants/userIcons';

export default function User() {
  const { userDoc } = useContext(AppContext);
  const [tags, setTags] = useState();
  const [loadingTags, setLoadingTags] = useState(true);
  const history = useHistory();

  useEffect(() => {
    getTagList();
  }, []);

  function getTagList() {
    RecipesAPI()
      .getTagsList()
      .then(tags => {
        setTags(tags);
        setLoadingTags(false);
      });
  }

  function format(progress) {
    if (progress > 10) {
      var digit = ('' + progress)[0];
      progress = (parseInt(digit) + 1) * 10;
    } else progress = 10;

    return progress;
  }

  function getBorderColor(r) {
    if (r <= 10) return '#D09F72';
    if (r <= 20) return '#C3D1DE';
    if (r <= 30) return '#FFC702';
    if (r <= 40) return '#1BAFF9';
    if (r <= 50) return '#FE4C4E';
    if (r <= 60) return '#77C900';
    if (r <= 70) return '#CB83FD';
    if (r <= 80) return '#FEABDE';
    if (r <= 90) return '#4A4852';
    if (r <= 100) return '#8DEAEA';
  }

  const recipesLength = userDoc.achievements.recipes.length;

  const borderColor = getBorderColor(recipesLength);

  const classes = useStyles({ borderColor });

  return (
    <div>
      <div className={classes.header}>
        <IconButton
          style={{ padding: 0 }}
          onClick={() => history.push('/settings')}
        >
          <Settings color="secondary" />
        </IconButton>
      </div>

      <div className={classes.content}>
        <div className={classes.border}>
          <div className={classes.profile}>
            <img className={classes.image} src={getIcon(userDoc.iconId)} />
          </div>
        </div>
        <h1>{userDoc.name}</h1>
        {loadingTags ? (
          <div
            style={{
              padding: 150,
            }}
          >
            <CircularProgress color="secondary" />
          </div>
        ) : (
          <>
            <div>
              <Achievement
                main
                disabled={recipesLength === 0}
                progress={recipesLength}
                total={format(recipesLength)}
              />
            </div>
            {Object.keys(userDoc.achievements.tags).map(achievement => (
              <div key={achievement} style={{ padding: '8px 0' }}>
                <Achievement
                  disabled={userDoc.achievements.tags[achievement] === 0}
                  tag={tags.find(t => t.tag_id == achievement).title}
                  progress={userDoc.achievements.tags[achievement]}
                  total={format(userDoc.achievements.tags[achievement])}
                />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
