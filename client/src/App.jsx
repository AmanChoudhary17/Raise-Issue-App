import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import EmailVerify from './pages/EmailVerify'
import Login from './pages/Login'
import ResetPassword from './pages/ResetPassword'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UploadIssue from './pages/uploadIssue'
import AllIssues from './pages/AllIssues'
import MyIssues from './pages/MyIssues'


const App = () => {
  return (
    <div>
     <ToastContainer/> 
      <Routes>
        <Route path ='/' element = {<Home/>}/>
        <Route path ='/login' element = {<Login/>}/>
        <Route path ='/email-verify' element = {<EmailVerify/>}/>
        <Route path ='/reset-password' element = {<ResetPassword/>}/>
        <Route path ='/upload' element = {<UploadIssue/>}/>
        <Route path ='/issue/all' element = {<AllIssues/>}/>
        <Route path ='/issue/my' element = {<MyIssues/>}/>
      </Routes>
    </div>
  )
}

export default App
