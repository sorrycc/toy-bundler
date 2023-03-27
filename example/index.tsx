import { foo } from './foo';
import React from 'react';
import ReactDOM from 'react-dom';

function App() {
  return <div>Hello {foo}</div>;
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
