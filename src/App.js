import './index.css'
import { useState, useEffect } from 'react'
import { supabase } from './Auth/supabaseClient'
import Auth from './Auth/Auth'
import Account from './Auth/Account'
import Header from './Components/Header';
import { Route, Routes} from "react-router-dom";
import Home from './Components/Home'

export default function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <>
      {!session ? (
        <Auth />
      ) : (
      <>
        <Header />
        <Routes>          
          <Route exact path="/" element={<Home />} />
          <Route exact path="/profile" element={ <Account session={session} />} />
        </Routes>
      </>)}
    </>
    // <div className="container" style={{ padding: '50px 0 100px 0' }}>
    //   {!session ? (
    //     <Auth />
    //   ) : ( 
    //     <Account key={session.user.id} session={session} />
    //   )}
    // </div>
  )
}