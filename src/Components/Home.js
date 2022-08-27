import {useState, useEffect} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import Players from './Players';
import Shots from './Shots';
import {supabase} from '../Auth/supabaseClient'

function Home() {

    const [currentKP, setCurrentKP] = useState(0);

    useEffect(() =>{
        getCurrentKp()
    }, [])
    
    const getCurrentKp = async () => {
        const { data, error } = await supabase
            .from('kp_table')
            .select('yardage')
        if(data){
            console.log(data[0]['yardage']);
            setCurrentKP(data[0]['yardage']);
        } else if (error){
            alert(error.error_description || error.message)
        }
    }
    
    return (
        <>
            <Container id='home-background'>
                <Container className='text-center p-5' fluid>
                    <h2 className='display-3'> Todays Yardage: {currentKP} </h2>
                </Container>

                <Container fluid> 
                    <Row>
                        <Col lg={8} md={12} sm={12}> <Shots/> </Col>
                        <Col lg={4} md={12} sm={12}> 
                            {/* <Players/> */}
                        </Col>
                    </Row>
                </Container>
            </Container>
        </>
    );
    
}

export default Home; 