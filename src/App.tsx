import { useState, useCallback} from 'react'
import debounce from 'just-debounce-it'
import useSearch from './hooks/useSearch'
import Movies from './components/movies'
import useMovies from './hooks/useMovies'
import './App.css'

function App() {
  const [sort, setSort] = useState(false)
  const {search, updateSearch, error} = useSearch()
  const {movies, getMovies, loadNextPage, loading, numberOfPages, pageNum} = useMovies({search, sort})

  const getDebouncedMovies = useCallback(debounce((search:string) => {
    getMovies(search)
  }, 300),[getMovies])
  
  function handleChange(e:React.ChangeEvent<HTMLInputElement>){
    const newSearch = e.target.value
    updateSearch(newSearch)
    getDebouncedMovies(newSearch)
  }

  function handleSubmit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();
      getMovies(search)
  }

  function handleSort(){
    setSort(prev => !prev)
  }

  function handleNextPage(){
    loadNextPage()
  }
  
  return (
    <div className='page'>
    <header>
      <h1>Movie Search</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-search">
          <input className='search-input' type="text" placeholder='Avengers, Spiderman, etc...' onChange={handleChange}/>
          <button>Search</button>
        </div>
        <div className="sort-input">
          <label htmlFor="filter">Sort by title</label>
          <input type="checkbox" name='filter' onChange={handleSort}/>
        </div>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </header>
    <main>
      {loading ? <p>loading...</p> : <Movies movieList={movies}/>}
      {numberOfPages != pageNum ? <button onClick={handleNextPage}>Load More</button>:  null}
    </main>
    </div>
  )
}

export default App
