import React from 'react';
import renderer from 'react-test-renderer';
import TagList from '../components/TagList';

test('renders TagList', () => {
  const tags = [
    { tag_id: 1, title: 'test1', selected: false },
    { tag_id: 2, title: 'test2', selected: false },
    { tag_id: 3, title: 'test3', selected: false },
    { tag_id: 4, title: 'test4', selected: true },
  ];

  const tree = renderer.create(<TagList tags={tags} />).toJSON();
  expect(tree).toMatchSnapshot();
});
