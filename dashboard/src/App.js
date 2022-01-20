import './App.css';
import Sidebar from './components/Sidebar';
import ContentWrapper from './components/ContentWrapper';

function App() {
  return (
    <div>
      <style>
          @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@1,300&family=Raleway:ital,wght@1,200&display=swap');
      </style>
      <div className="allDashboard">
        <div className="sideBar">
          <Sidebar />        
        </div >
        <div className="contentWrapper">
          <ContentWrapper />  
        </div>
      </div>
    </div>
  );
}

export default App;
