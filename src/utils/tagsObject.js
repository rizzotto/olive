const tagsObject = tags => {
  return tags
    .map(tag => {
      return tag.selected && { tag_id: tag.tag_id };
    })
    .filter(tag => {
      return typeof tag !== 'boolean';
    });
};

export default tagsObject;
