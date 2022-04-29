export default function LastMovieDetails(props) {
  return (
    props.title && (
      <div className="card" style={{ width: '90%%', margin: '1%'}}>
        <div className="card-body">
          {props.title} in {new Date(props.releaseDate).getFullYear()} is the last movie this character appeared in!!
        </div>
      </div>
    )
  );
}
