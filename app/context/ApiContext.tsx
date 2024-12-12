import { LoaderFunctionArgs } from "@remix-run/node";
import { createContext } from "react";
import Root from "../root";
const ApiContext = createContext({})


const ApiContext = () => {
    
  return (
    <div>
      
    </div>
  )
}

export default ApiContext


export const loader = async ({ params }: LoaderFunctionArgs) => {
    const response = await fetch(`https://restcountries.com/v3.1/name/${params.name}/?fields=name,capital,currencies,languages,subregion,borders,population,tld,region,flags,cca3`);
  
    const countryname: {
      flags: {
        png: string;
        svg: string;
        alt: string;
      };
      name: {
        common: string;
        official: string;
        nativeName?: {
          [key: string]: {
            official: string;
            common: string;
          };
        };
      };
      tld: string[];
      currencies: {
        [key: string]: {
          name: string;
          symbol: string;
        };
      };
      capital: string[];
      region: string;
      subregion: string;
      languages: {
        [key: string]: string;
      };
      borders: string[];
      population: number
  
    }[] = await response.json();
    // console.log(countryname);
  
  
    return(
        <ApiContext.Provider value={countryname}>
            <Root/>
        </ApiContext.Provider>
    )
  
  }