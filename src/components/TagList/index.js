import React, { useState } from 'react';
import useStyles from './styles';
import PropTypes from 'prop-types';
import Tag from '../Tag';

function TagList({ onClick, tags, horizontal, multiSelect, ...others }) {
  const classes = useStyles({ horizontal });
  const [tagsArray, setTagsArray] = useState(tags);

  function handleOnClick(id) {
    const newTags = tagsArray.map(tag => {
      if (tag.tag_id === id) return { ...tag, selected: !tag.selected };

      return multiSelect ? tag : { ...tag, selected: false };
    });

    setTagsArray(newTags);

    if (onClick) onClick(newTags);
  }

  return (
    <div className={classes.root}>
      {tagsArray.map(tag => (
        <Tag
          key={tag.tag_id}
          customStyle={{ margin: '5px 3px' }}
          selected={tag.selected}
          name={tag.title}
          onClick={() => handleOnClick(tag.tag_id)}
          {...others}
        />
      ))}
    </div>
  );
}

TagList.propTypes = {
  onClick: PropTypes.func,
  tags: PropTypes.array,
  horizontal: PropTypes.bool,
  multiSelect: PropTypes.bool,
};

TagList.defaultProps = {
  onClick: () => {},
  tags: [],
  horizontal: true,
  multiSelect: true,
};

export default TagList;
