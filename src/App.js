import {Switch, Route, Redirect} from 'react-router-dom'
import Login from './Login'
import Home from './Home'
import JobItemDetails from './JobItemDetails'
import './App.css'
import Jobs from './Jobs'
import NotFound from './NotFound'
import ProtectedRoute from './ProtectedRoute'

const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/jobs" component={Jobs} />
      <ProtectedRoute exact path="/jobs/:id" component={JobItemDetails} />
      <Route exact path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </>
)

export default App
