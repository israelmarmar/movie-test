import React, {useState, useEffect} from 'react';
import { Container, Card, Col, Row, Button, FormControl, Form } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory, Link } from 'react-router-dom';
import { apiKey } from '../../config/api.json';

interface Movie {
    Title: string;
    Poster: string
    Year: string;
    Type: string;
    imdbID: string;
}

const Home = () => {
    let history = useHistory();
    const textStorage = localStorage.getItem('text') || '';
    const yearStorage = parseInt(localStorage.getItem('year') || '');
    const typeStorage = localStorage.getItem('type') || 'Movie';
    const moviesStorage = JSON.parse(localStorage.getItem('movies') || "[]");
    const [movies, setMovies] = useState(moviesStorage);
    const [type, setType] = useState(typeStorage);
    const [text, setText] = useState(textStorage);
    const [year, setYear] = useState<number>(yearStorage);

    useEffect(()=>{
        window.onbeforeunload = () => {
            localStorage.removeItem('text');
            localStorage.removeItem('year');
            localStorage.removeItem('type');
            localStorage.removeItem('movies');
        };
    },[]);

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        searchMovies();
    }

    const searchMovies = async () => {
        localStorage.setItem('text',text);
        localStorage.setItem('year',`${year}`);
        localStorage.setItem('type',type);
        const searchYear = year ? `y=${year}&` : '';
        const response = await axios.get(`http://www.omdbapi.com/?type=${type}&${searchYear}s=${text}&apikey=${apiKey}`);
        console.log(response);
        setMovies(response.data.Search || []);
        localStorage.setItem('movies',JSON.stringify(response.data.Search || []));
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event && event.key === 'Enter') {
            searchMovies();
        }
      }    

    return (
        <Container style={{marginTop: "50px", marginBottom: "50px"}}>
            <Form onSubmit={onSubmit} style={{marginBottom: "50px"}}>
                <Row className="justify-content-md-center">
                    <FormControl
                        placeholder="Search a movie..."
                        style={{width: "60%"}}
                        defaultValue={text}
                        onKeyDown={handleKeyDown}
                        required
                        onChange={ (event: React.ChangeEvent<HTMLInputElement>) =>setText(event.target.value)} />
                    
                    <FormControl
                        placeholder="Year"
                        style={{width: "15%"}}
                        defaultValue={year}
                        onKeyDown={handleKeyDown}
                        type="number"
                        onChange={ (event: React.ChangeEvent<HTMLInputElement>) =>setYear(parseInt(event.target.value))} />
                    
                    <Form.Control
                        defaultValue={type}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>setType(event.target.value)}
                        style={{width: "15%"}}
                        as="select" custom>
                        <option>Movie</option>
                        <option>Series</option>
                        <option>Episode</option>
                    </Form.Control>

                    <Button type="submit">Search</Button>
                </Row>
            </Form>
            {movies.map((movie: Movie, index: number) =>
            <Card style={{ width: '100%' }} key={movie.Title+index}>
                <Row>
                <Card.Img variant="top" src={movie.Poster} style={{width: 286, height: 180, marginLeft: 20, marginTop: 20}} />
                <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                        <Card.Text>
                            {movie.Type}
                        </Card.Text>
                        <Card.Text>
                            {movie.Year}
                        </Card.Text>
                        <Button variant="primary" onClick={()=> history.push(`/detail/${movie.imdbID}`)}>
                            Detail
                        </Button>
                </Card.Body>
                </Row>
            </Card>)
            }
        </Container>
    )
}

export default Home;