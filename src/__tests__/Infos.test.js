import React from 'react';
import renderer from 'react-test-renderer';
import Infos from '../components/Infos';

test('<Infos /> should render with no props', () => {
  const tree = renderer
    .create(<Infos />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('<Infos /> should render with props', () => {
    const tree = renderer
      .create(<Infos onChangePortions={() => {}} onChangeTime={() => {}} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  