
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from "./components/Header"
import FeedbackList from "./components/FeedbackList"
import FeedbackData from './data/FeedbackData'
import FeedbackStats from './components/FeedbackStats'
import FeedbackForm from './components/FeedbackForm'
import AboutPage from './pages/AboutPage'
import { FeedbackProvider } from './context/FeedbackContext'
import AboutIconLink from './components/AboutIconLink'


function App() {

  return (
    <FeedbackProvider>
    <Router>
      <Header />
      <div className='container'>
        {/* react-dom Version6 surround with Route with Routes */}
        <Routes>
          <Route exact path='/'
            element={
              <>
                <FeedbackForm  />
                <FeedbackStats />
                <FeedbackList />
              </>
            }
          ></Route>

          <Route
            path='/about'
            // V6 react dom component changed to element component={AboutPage}>
            element={<AboutPage />}
          ></Route>
        </Routes>
        <AboutIconLink />
      </div>
    </Router>
    </FeedbackProvider>
  )
}

export default App