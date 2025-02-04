import {useState} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Reports from './components/Reports'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

const emojisList = [
  {
    id: '380e6284-a454-11ec-b909-0242ac120002',
    emojiName: 'Very Happy',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/monthly-emojis/monthly-emojis-very-happy.png',
  },
  {
    id: '380e64f0-a454-11ec-b909-0242ac120002',
    emojiName: 'Happy',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/monthly-emojis/monthly-emojis-happy.png',
  },
  {
    id: '380e6626-a454-11ec-b909-0242ac120002',
    emojiName: 'Neutral',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/monthly-emojis/monthly-emojis-neutral.png',
  },
  {
    id: '380e6748-a454-11ec-b909-0242ac120002',
    emojiName: 'Sad',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/monthly-emojis/monthly-emojis-sad.png',
  },
  {
    id: '380e69c8-a454-11ec-b909-0242ac120002',
    emojiName: 'Very Sad',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/monthly-emojis/monthly-emojis-very-sad.png',
  },
]

const App = () => {
  const [selectedDates, setSelectedDates] = useState({})

  return (
    <div className="container">
      <Switch>
        <Route path="/login" component={LoginForm} />
        <ProtectedRoute
          exact
          path="/"
          component={() => (
            <Home
              selectedDates={selectedDates}
              setSelectedDates={setSelectedDates}
            />
          )}
        />
        <ProtectedRoute
          path="/reports"
          component={() => (
            <Reports selectedDates={selectedDates} emojisList={emojisList} />
          )}
        />
        <Route path="/not-found" component={NotFound} />
        <Redirect to="not-found" />
      </Switch>
    </div>
  )
}

export default App
