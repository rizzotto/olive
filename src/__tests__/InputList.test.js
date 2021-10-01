import React from 'react';
import renderer from 'react-test-renderer';
import InputList from '../components/InputList';

test('<InputList /> should render list when items prop is not empty', () => {
  const tree = renderer
    .create(<InputList items={['Foo', 'Bar', 'Zedd']} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('<InputList /> should render no item when items prop is empty', () => {
  const tree = renderer.create(<InputList />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('<InputList /> should render checkboxes when checkbox prop is defined', () => {
  const tree = renderer
    .create(<InputList checkbox items={['Foo', 'Bar', 'Zedd']} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
