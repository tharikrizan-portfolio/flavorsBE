import React from 'react';
import ReactDOM from 'react-dom';
import Survey from './';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Survey />, div);
  ReactDOM.unmountComponentAtNode(div);
});
