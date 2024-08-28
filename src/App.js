import RouterClass from './router';
import './App.css';
import Header from './components/header/header';
import Sidebar from './components/sidebar/sidebar';
import CMS_Editor from './components/textEditor/CMS_Editor';

function App() {
  return (
    
    <div className="app">

        <Sidebar/>
        <Header/>
        <RouterClass />

    </div>

  );
}

export default App;
