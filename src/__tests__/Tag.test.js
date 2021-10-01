import React from 'react';
import renderer from 'react-test-renderer';
import Tag from '../components/Tag';

test('renders Tag', () => {
  const tree = renderer.create(<Tag name="foo" />).toJSON();
  expect(tree).toMatchSnapshot();
});
