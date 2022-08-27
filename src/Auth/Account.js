import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';
import { Container, FormGroup, ToastContainer } from 'react-bootstrap';


const Account = ({ session }) => {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [first_name, setFirstName] = useState(null);
  const [last_name, setLastName] = useState(null);
  const [website, setWebsite] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)

  useEffect(() => {
    getProfile()
  }, [session])

  const getProfile = async () => {
    try {
      setLoading(true)
      const { user } = session

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url, first_name, last_name`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setWebsite(data.website)
        setFirstName(data.first_name)
        setLastName(data.last_name)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const { user } = session

      const updates = {
        id: user.id,
        username,
        website,
        avatar_url,
        first_name, 
        last_name,
        updated_at: new Date(),
      }

      let { error } = await supabase.from('profiles').upsert(updates)

      if (error) {
        throw error
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
      // return (
      //   <>
      //     <ToastContainer position='bottom-end'>
      //       <Toast>
      //         <Toast.Header>
      //           <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
      //           <strong className="me-auto">Bootstrap</strong>
      //           <small>11 mins ago</small>
      //         </Toast.Header>
      //         <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
      //       </Toast>
      //     </ToastContainer>
      //   </>
      // );
    }
  }

  return (
    <Container aria-live="polite">
        <Form onSubmit={updateProfile} className="form-widget">

          <Form.Group className="mb-3">
            <Form.Label htmlFor="username">Username</Form.Label>
            <Form.Control type='text' value={username || ''}  onChange={(e) => setUsername(e.target.value)} placeholder='Username' disabled={loading} />
            <Form.Text className="text-muted"> This will be your username </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label> First Name </Form.Label>
            <Form.Control type='text' value={first_name || ''} onChange={(e) => setFirstName(e.target.value)} placeholder='First Name' disabled={loading} />
            <Form.Text className="text-muted"> Your First Name </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label> Last Name </Form.Label>
            <Form.Control type='text' value={last_name || ''} onChange={(e) => setLastName(e.target.value)} placeholder='Last Name' disabled={loading} />
            <Form.Text className="text-muted"> Your Last Name </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Button onClick={updateProfile} variant="success" className="button primary block" disabled={loading}>
            {loading ? 'Saving...' : 'Update'}
            </Button>
          </Form.Group>
          
            
        </Form>
      <Button
        variant='danger'
        type="button"
        className="button block"
        onClick={() => supabase.auth.signOut()}
      >
        Sign Out
      </Button>
    </Container>
  )
}

export default Account