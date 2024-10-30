import {useState, useRef,  useMemo, useCallback} from 'react'
import { searchMovies } from '../services/searchMovies'
import { movie } from '../types/movieType'
type Props = {
    search:string
    sort: boolean
}
export default function useMovies({search, sort}:Props){
    const [movies, setMovies] = useState<movie[]>([])
    const [loading, setLoading] = useState(false)
    const [pageNum, setPageNum] = useState(1)
    const [numberOfPages, setNumberOfPages] = useState(1)

    const prevSearch = useRef(search)

    const getMovies = useCallback(async (search:string) => {
        resetPageNum()
        if(search == '') return
        if(search === prevSearch.current) return
        setLoading(true)
        try{
            prevSearch.current = search
            const {moviesResult, pageNums} = await searchMovies({valueToSearch:search, pageNum})
            setNumberOfPages(Math.ceil(pageNums/10))
            setMovies(moviesResult)
        }
        catch(e){
            throw new Error('movie not found')
        }
        finally{
            setLoading(false)
        }
    },[])

    const loadNextPage = async()=>{
        if(pageNum === numberOfPages) return
        try{
            const nextPage = pageNum +1
            setPageNum(nextPage)
            const currentMovies = movies
            const {moviesResult} = await searchMovies({valueToSearch:search, pageNum:nextPage})
            const newMovies = [...currentMovies].concat(moviesResult)
            setMovies(newMovies)
        }
        catch(e){
            throw new Error('movie not found')
        }
    }

    const resetPageNum = useCallback(() => {
        if (prevSearch.current !== search) {
          setPageNum(1);
        }
      }, [search, prevSearch]);

    const sortedMovies = useMemo(() => 
        sort && movies ? [...movies].sort((a,b) => a.Title.localeCompare(b.Title)) : movies
    ,[sort, movies])

    return {movies:sortedMovies, getMovies, loadNextPage, loading, numberOfPages, pageNum}
}