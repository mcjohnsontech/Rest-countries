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

  // console.log("Search Value:", search); // Logs the updated search value

  const filteredCountries = countries.filter((country) => {
    const searchLower = search.toLowerCase();
    return searchLower === "" || country.name.common.toLowerCase().includes(searchLower);
  });
  // const handleSearchChange = (e) => {
  //   console.log(e.target.value);

  //   setSearch(e.target.value); // Updates the state with the input value
  // };

  console.log("mheey");
  return (
    <>
      <input type="text" name="search" onChange={(event) => console.log(`this is : ${event}`)
        // setSearch(event.target.value)}
      } placeholder="Search for a country" />
      <button onClick={() => console.log("here")}>submit</button>
      <ul>
        {filteredCountries.map((country) => (<Link to={`countries/${country.name.common}`} key={JSON.stringify(country)}>
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


