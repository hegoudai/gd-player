import React from 'react';
import {render} from '@testing-library/react-native';
import App from '../src/App';

jest.mock('../src/navigation/AppNavigator', () => {
  return jest.fn(() => null);
});

describe('App', () => {
  it('renders without crashing', () => {
    const {toJSON} = render(<App />);
    expect(toJSON()).toBeTruthy();
  });
});
