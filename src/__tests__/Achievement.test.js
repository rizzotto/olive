import React from 'react';
import renderer from 'react-test-renderer';
import Achievement from '../components/Achievement';
import { ThemeProvider } from '@material-ui/core';
import theme from '../constants/theme';

test('renders a simple Achievement', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={theme}>
        <Achievement />
      </ThemeProvider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
