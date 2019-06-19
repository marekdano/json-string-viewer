import React from 'react';
import { render } from 'react-testing-library';
import App from '../App';

test('should create two jsoneditors and a validation button', () => {
  const { container, getByText} =  render(<App />);
  const inputTextArea = container.querySelector('#input > .jsoneditor > .jsoneditor-outer > .ace_editor > textarea');
  const outputTextArea = container.querySelector('#output > .jsoneditor > .jsoneditor-outer > .ace_editor > textarea');
  const button = getByText(/validate & prettify/i);
  
  expect(inputTextArea).toBeTruthy();
  expect(button).toBeTruthy();
  expect(outputTextArea).toBeTruthy();
});