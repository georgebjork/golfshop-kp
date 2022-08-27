import React, { useEffect, useState } from 'react';
import {Container, Table} from 'react-bootstrap';
import {supabase} from '../Auth/supabaseClient'

function Players() {
    
    const [currentPlayers, setCurrentPlayers] = useState([]);
    
    useEffect(() => {
        getPlayers();
    }, []);

    const getPlayers = async () => {
        const {data, error } = await supabase
            .from('users_table')
            .select()
            .order('id', { ascending: true });
        if(data){
            console.log(data);
            setCurrentPlayers(data)
        } if(error){
            console.log(data);
        }

    }
    return (
        <Container>
            <h1 className='display-5'>Players</h1>
            <Table striped bordered hover>
                <thead class='thead-dark'>
                    <tr>
                        <th scope='col'>Id</th>
                        <th scope='col'>Name</th>
                        <th scope='col'>KP's Won</th>
                    </tr>
                </thead>
                <tbody>
                {
                    currentPlayers.map(item => {
                        return (
                            <tr>
                                <td>{item['id']}</td>
                                <td>{item['first_name']}</td>
                                <td>{item['kp_won']}</td>
                            </tr>
                        );
                    })
                }
                </tbody>
            </Table>
        </Container>
    );
}

export default Players; 