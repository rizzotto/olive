import React from 'react';
import renderer from 'react-test-renderer';
import Card from '../components/Card';
import { ThemeProvider } from '@material-ui/core';
import theme from '../constants/theme';

test('renders a simple Card', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={theme}>
        <Card />
      </ThemeProvider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
