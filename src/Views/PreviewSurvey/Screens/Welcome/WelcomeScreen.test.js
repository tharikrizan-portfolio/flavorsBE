import React from 'react';
import ReactDOM from 'react-dom';
import WelcomeScreen from './WelcomeScreen';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<WelcomeScreen />, div);
  ReactDOM.unmountComponentAtNode(div);
});
