import './App.css'
import { Route,Routes } from 'react-router-dom'

//Pages
import PanelGeneral from './pages/PanelGeneral'
import ListApplicants from './pages/ListApplicants'
import VistaError from './pages/Error404'
import ContactForm from './pages/ContactForm'
import DetailCandidate from './pages/DetailCandidate'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
//Components generals
import Banner from './components/ApplicationBanner'
import NavBar from './components/NavigationBar'
import Footer from './components/Footer'

function App() {

  return (
    <>
      <div>
        <Banner></Banner>
        <NavBar></NavBar>
      </div>
      <Routes>
        <Route path="/" exact element={<PanelGeneral/>} />
        <Route path="/applicants" element={<ListApplicants />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/applicants/:id" element={<DetailCandidate />} />
        <Route path="/applicants/register" element={<RegisterPage />} />
        <Route path="/applicants/login" element={<LoginPage />} />
        <Route path="/error" element={<VistaError/>}/>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <div>
        <Footer></Footer>
      </div>
    </>
  )
}

export default App
