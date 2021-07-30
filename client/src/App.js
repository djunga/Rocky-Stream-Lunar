import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom'
import DashboardPage from './components/pages/DashboardPage'
import logo from './logo.svg'
import './App.css'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={DashboardPage} />
      </BrowserRouter>
    </div>
  );
}

export default App;
