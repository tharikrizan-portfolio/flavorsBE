import React from 'react';
import ReactDOM from 'react-dom';
import FinalScreen from './FinalScreen';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FinalScreen />, div);
  ReactDOM.unmountComponentAtNode(div);
});
