import { useState } from 'react'
import { supabase } from './supabaseClient'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner';

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const { error } = await supabase.auth.signInWithOtp({ email })
      if (error) throw error
      alert('Check your email for the login link!')
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="row flex-center flex">
      <div className="col-6 form-widget" aria-live="polite">
        <h1 className="header">Supabase + React</h1>
        <p className="description">
          Sign in via magic link with your email below
        </p>
          <Form>
            <Form.Group className='mb-3'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' placeholder='Your Email' onChange={(e) => setEmail(e.target.value)} />

              <Button variant='success' aria-live="polite" onClick={handleLogin} className="mt-3">
                {loading 
                  ? (<Spinner as="span" animation="border" size="sm" role="status" />) 
                  : 'Send magic link ' }
              </Button>
            </Form.Group>
          </Form>
      </div>
    </div>
  )
}