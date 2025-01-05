import type { MetaFunction } from "@remix-run/node";
import { json, Link, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { Flex, Select, Input } from "@mantine/core";
import classes from '../src/styles.module.css'
import { IconSearch } from '@tabler/icons-react'
import Header from "~/components/header";

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
  const [data, setData] = useState("");

  const onOptionChangeHandler = (event) => {
    setData(event);
    console.log(
      event
    );
  };

  return (
    <>
      <Header />
      <Flex
        justify="space-between"
        align="center"
        className={classes.flexBox}
      >

        {/* <input type="text" onChange={} placeholder="Search for a country" /> */}
        <Input size="md" w={400} fw="500" placeholder="Search for a country..." onChange={(event) => {
          const makeSmall = event.target.value.toLowerCase();
          setSearch(makeSmall)
        }} width="300" leftSection={<IconSearch stroke={2}/>} className={classes.indexInput}/>

        <Select
        className={classes.selectIndex}
        fw="500"
        c="hsl(200, 15%, 8%)"
          label=""
          placeholder="Filter by Region"
          onChange={onOptionChangeHandler}
          data={[
            "Africa",
            "America",
            "Asia",
            "Europe",
            "Oceania"]}
        />

        {/* <select>
          <option value="" disabled hidden>Filter by Region</option>
          {options.map((option, index) => {
            return (
              <option key={index}>
                {option}
              </option>
            );
          })}
        </select> */}

      </Flex>
      <div className={classes.gridie}>
        <ul className={classes.listIndex}>
          {countries.filter((country) => {

            const capitalCity = country.capital.map((capitol) => { return capitol.toLowerCase() })
            return (search.toLowerCase() === "" ? country : country.name.common.toLowerCase().includes(search) || capitalCity.includes(search)) && (data === "" ? country : country.region.includes(data) || capitalCity.includes(search))
          }).map(country => (
            <div key={country.name.common} className="kkkkk">
              <Link to={`countries/${country.name.common}`} key={JSON.stringify(country)}>
                <img src={country.flags.svg} alt={country.flags.alt} />
                <p>{country.name.common}</p>
                <p>Population: {country.population}</p>
                <p>Region: {country.region}</p>
                <p>Capital: {country.capital}</p>
              </Link>
            </div>

          ))}
        </ul>
      </div>

    </>
  )
}


