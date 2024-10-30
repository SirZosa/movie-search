import './movies.css'
import { movie } from '../types/movieType'
type Props = {
    movieList: movie[]
}
function HasMovies({movieList}:Props){
    return (
        <ul className='movies'>
            {movieList.map(movie => {
                const {Title, Poster, Year, imdbID} = movie
                
                return(
                    <li key={imdbID} className='movie'>
                    <h3>{Title}</h3>
                    <span>{Year}</span>
                    <img src={Poster != 'N/A' ? Poster : 'https://placehold.co/400x550?text=Not+Available' } alt={`Poster for ${Title}`} />
                </li>
                )
            })}
        </ul>
    )
}

function HasntMovies(){
    return <p>No movies were found.</p>
}

export default function Movies({movieList}:Props){
    return movieList ? <HasMovies movieList={movieList}/> : <HasntMovies/>
}