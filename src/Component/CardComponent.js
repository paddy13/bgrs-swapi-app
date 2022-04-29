import { Card } from "react-bootstrap";

export default function CardComponent({moviesList}) {
  return (
    moviesList.map((movie, i) => {
      return (
        <Card.Body key={i}>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>
            {movie.opening_crawl}
          </Card.Text>
        </Card.Body>
      )
    })
  );
}
