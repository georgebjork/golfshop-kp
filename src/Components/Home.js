import {useState, useEffect} from 'react';
import {Container, Row, Col, Spinner} from 'react-bootstrap';
import Players from './Players';
import Shots from './Shots';
import {supabase} from '../Auth/supabaseClient'

function Home() {

    const [currentKP, setCurrentKP] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() =>{
        getCurrentKp()
    }, [])
    
    const getCurrentKp = async () => {
        try{
            setIsLoading(true);
            let { data, error, status } = await supabase
            .from('kp_table')
            .select('yardage')
            .eq('is_current', true)

            if (error && status !== 406) {
                throw error
            } 

            if(data){
                setCurrentKP(data[0]['yardage']);
            }
        } catch(error) {
            alert(error.error_description || error.message)
        } finally {
            setIsLoading(false);
        }
    }
    
    return (
        <>
            <Container id='home-background'>
                <Container className='text-center p-5' fluid>
                    <h2 className='display-3'> Todays Yardage: {isLoading ? <Spinner animation="border" /> : currentKP} </h2>
                </Container>

                <Container fluid> 
                    <Row>
                        <Col lg={8} md={12} sm={12}> <Shots/> </Col>
                        <Col lg={4} md={12} sm={12}> 
                            <Players/>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </>
    );
    
}

export default Home; 