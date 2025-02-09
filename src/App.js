import {Route, Switch, Redirect} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Reports from './components/Reports'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import {MoodProvider} from './context/MoodContext'
import './App.css'

const App = () => (
  <MoodProvider>
    <Switch>
      <Route path="/login" component={LoginForm} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute path="/reports" component={Reports} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="not-found" />
    </Switch>
  </MoodProvider>
)

export default App
