import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Layout from '../pages/layout'
import Login from '../pages/login/login'
import '../i18n'
import Home from '../pages/home/home'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback='loading...'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
          </Route>
          <Route path='login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  </StrictMode>,
)
