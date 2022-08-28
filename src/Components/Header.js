import React from 'react';

import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { supabase } from '../Auth/supabaseClient';
import { useState, useEffect } from 'react'


const Header = ({ session }) => {

    // const [loading, setLoading] = useState(true)
    // const [first_name, setFirstName] = useState(null);
    // const [last_name, setLastName] = useState(null);

    // useEffect(() => {
    //     getProfile()
    // }, [session])

    // const getProfile = async () => {
    //     try {
    //         setLoading(true)
    //         const { user } = session

    //         let { data, error, status } = await supabase
    //             .from('profiles')
    //             .select(`username, website, avatar_url, first_name, last_name`)
    //             .eq('id', user.id)
    //             .single()

    //         if (error && status !== 406) {
    //             throw error
    //         }

    //         if (data) {
    //             setFirstName(data.first_name)
    //             setLastName(data.last_name)
    //         }
    //     } catch (error) {
    //         alert(error.message)
    //     } finally {
    //         setLoading(false)
    //     }
    // }

    return (
        <>
            <Navbar expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/" className='display-1'>Golf Shop KP </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav" className='justify-content-end'>
                        <Nav>
                            <Nav.Link>Stats</Nav.Link>
                            <LinkContainer to='/profile'>
                                <Nav.Link>Profile</Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header;