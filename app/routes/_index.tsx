import type { MetaFunction } from "@remix-run/node";
import { json, Link, useLoaderData } from "@remix-run/react";
import { useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async () => {
  const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,region,population,capital');
  const county: {
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
    flags: {
      png: string;
      svg: string;
      alt?: string;
    };
    capital: string[];
    region: string;
    population: number

  }[] = await response.json();


  return json({ countries: county });

}


export default function Index() {
  const { countries } = useLoaderData<typeof loader>();
  const [search, setSearch] = useState("");


  return (
    <>
      <div className="searchBar">
        <input type="text" onChange={(event) => {
          const makeSmall = event.target.value.toLowerCase();
          setSearch(makeSmall)
        }} placeholder="Search for a country" />
        <select name="Filter by Region" id="selectRegion" onClick={(event) => {
          const x = document.getElementById("selectRegion");
          const kols = x?.children;
          console.log(kols);
          
        }}>
          <option value="Africa">Africa</option>
          <option value="America">America</option>
          <option value="Asia">Asia</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
      <ul>
        {countries.filter((country) => {
          const capitalCity = country.capital.map((capitol) => { return capitol.toLowerCase() })
          return search.toLowerCase() === "" ? country : country.name.common.toLowerCase().includes(search) || capitalCity.includes(search)
        }).map(country => (
          <Link to={`countries/${country.name.common}`} key={JSON.stringify(country)}>
            <img src={country.flags.svg} alt={country.flags.alt} />
            <p>{country.name.common}</p>
            <p>Population: {country.population}</p>
            <p>Region: {country.region}</p>
            <p>Capital: {country.capital}</p>
          </Link>
        ))}
      </ul>
    </>
  )
}


