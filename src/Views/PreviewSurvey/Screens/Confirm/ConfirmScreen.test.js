import React from 'react';
import ReactDOM from 'react-dom';
import ConfirmScreen from './ConfirmScreen';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ConfirmScreen />, div);
  ReactDOM.unmountComponentAtNode(div);
});
