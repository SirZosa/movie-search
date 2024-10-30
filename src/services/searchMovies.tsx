const API_KEY = '71d8596f'
import { movie } from "../types/movieType";
type Props ={
  valueToSearch:string;
  pageNum:number;
}

type searchResults ={
  moviesResult: movie[];
  pageNums: number;
}
export const searchMovies = async({valueToSearch, pageNum}:Props):Promise<searchResults>=>{
    if(valueToSearch == '') return { moviesResult: [], pageNums: 0 };
    try{
      const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${valueToSearch}&page=${pageNum}`)
      const json = await response.json()
      const moviesResult = json.Search
      const pageNums = Number(json.totalResults)
      return {moviesResult, pageNums}
    }
    catch(e){
      throw new Error('movie not found')
    }
  }