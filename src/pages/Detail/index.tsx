import React, {useState, useEffect} from 'react';
import { useHistory, useParams } from "react-router-dom";
import { Container, Card, Col, Row, Button, FormGroup, FormControl, Spinner } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';
import { apiKey } from '../../config/api.json';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Movie {
    Title: string;
    Poster: string
    Year: string;
    Type: string;
    imdbID: string;
    Released: string;
    Genre: string;
    Ratings: any[];
}

interface ParamTypes {
    id: string
}

const MovieComponent = () => {
    let history = useHistory();
    let { id } = useParams<ParamTypes>();
    const [movie, setMovie] = useState<Movie>();

    useEffect(()=>{
        (async ()=> {
            const response = await axios.get(`http://www.omdbapi.com/?i=${id}&apikey=${apiKey}`);
            const movieResp: Movie = response.data;
            console.log(movieResp);
            setMovie(movieResp);
        })();
    },[])

    return (
        <Container style={{marginTop: "50px"}}>
            <Button style={{marginBottom: "50px"}} onClick={()=>history.goBack()}>
                <FaArrowLeft />
            </Button>
            <br />
            {movie ? (
            <Card style={{ width: '100%'}}>
                <Row>
                <Card.Img variant="top" src={movie.Poster} style={{width: 286, height: '100%', marginLeft: 20, marginTop: 20, marginBottom: 20 }} />
                <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                        <Card.Text>
                            {movie.Type}
                        </Card.Text>
                        <Card.Text>
                            {movie.Year}
                        </Card.Text>
                        <Card.Text>
                            {movie.Type}
                        </Card.Text>
                        <Card.Text>
                            {movie.Released}
                        </Card.Text>
                        <Card.Text>
                            {movie.Genre}
                        </Card.Text>
                        <Card.Text>
                            {movie.Ratings[0].Value}
                        </Card.Text>
                </Card.Body>
                </Row>
            </Card>) : <Spinner animation="border" role="status" />}
        </Container>
    )
}

export default MovieComponent;