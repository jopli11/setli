// src/App.tsx
import Button from './components/common/Button';

function App() {
  return (
    <div className="App">
      <h1>Welcome to Setli</h1>
      <Button label="Test Button" onClick={() => alert('Button clicked!')} />
    </div>
  );
}

export default App;
