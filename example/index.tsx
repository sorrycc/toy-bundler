import { foo } from './foo';
import React from 'react';
import ReactDOM from 'react-dom';

function App() {
  return <div>Hello {foo}</div>;
}

ReactDOM.render(<App />, document.getElementById('root'));
