import React, { useEffect, useState } from 'react';
import {Container, Table} from 'react-bootstrap';
import {supabase} from '../Auth/supabaseClient'

function Shots() {
    const [currentShots, setCurrentShots] = useState([]);

    useEffect(() => {
        getShots();
    }, []);

    const getShots = async () => {
        const {data, error } = await supabase
            .from('shot_table')
            .select('users_table(first_name), distance_to_hole, green_hit, club')
            .order('distance_to_hole', { ascending: true });
        if(data){
            console.log(data);
            setCurrentShots(data)
        } if(error){
            console.log(data);
        }
    }

    return (
        <Container>
            <h1  className='display-5'>Shots</h1>
            <Table striped bordered hover>
                <thead class='thead-dark'>
                    <tr>
                        <th scope='col'>Player Name</th>
                        <th scope='col'>Distance To Pin</th>
                        <th scope='col'>Club</th>
                        <th scope='col'>Green Hit</th>
                    </tr>
                </thead>
                <tbody>
                {
                    currentShots.map(item => {
                        let wasHit = "No";
                        if(item['green_hit'] === true){
                            wasHit = "Yes";
                        }
                        return (
                            <tr>
                                <td>{item['users_table']['first_name']}</td>
                                <td>{item['distance_to_hole']} ft</td>
                                <td>{item['club']}</td>
                                <td>{wasHit}</td>
                            </tr>
                        );
                    })
                }
                </tbody>
            </Table>
        </Container>
    );
}

export default Shots;