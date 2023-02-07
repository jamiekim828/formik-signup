import './App.css';
import Lottie from 'react-lottie-player';
import signup from './asset/signup.json';
import SignUp from './components/SignUp';

function App() {
  return (
    <div className='App'>
      <SignUp />
      <Lottie loop animationData={signup} play style={{ width: '400px' }} />
    </div>
  );
}

export default App;
