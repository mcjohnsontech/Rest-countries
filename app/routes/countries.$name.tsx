import { json, LoaderFunctionArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react";
import Border from "./countries.$name.border";

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
    cca3: string;
    borders: string[];
    population: number

  }[] = await response.json();
  // console.log(countryname);


  return json({ geoplace: countryname[0] })

}


const Idkname = () => {

  const { geoplace } = useLoaderData<typeof loader>();
  const nativename = geoplace.name.nativeName;
  const currency = Object.values(geoplace.currencies);
  const language = Object.values(geoplace.languages);
  


  return (
    <>
      
      <div className="flex">
        <div className="class-1">
          <img src={geoplace.flags.svg} alt="" />
        </div>
        <div className="class-2">
          <h3>{geoplace.name.common}</h3>
          <table>
            <tbody>
              <tr>
                {/* <td>Native Name: {`${Object.values(nativename)[0].common}`}</td> */}
                <td>Native Name:{" "}
                  {nativename && Object.keys(nativename).length > 0
                    ? Object.values(nativename)[0]?.common || "N/A"
                    : "N/A"}</td>
                <td>Top Level Domain: {geoplace.tld[0]}</td>
              </tr>
              <tr>
                <td>{geoplace.population}</td>
                <td>Currencies: {currency.length === 1 ? (
                  currency.map(moneytype => <span key={moneytype.name}>{moneytype.name}</span>)
                ) : currency.length > 1 ? (

                  currency.map((moneytype, index) => <span key={moneytype.name}>{moneytype.name}{index < currency.length - 1 ? ', ' : ''}</span>)
                ) : (
                  <span>No currency available</span>
                )}</td>
              </tr>
              <tr>
                <td>Region: {geoplace.region}</td>
                <td>Languages: {language.length === 1 ? (
                  language.map(spoken => <span key={spoken}>{spoken}</span>)
                ) : language.length > 1 ? (

                  language.map((spoken, index) => <span key={spoken}>{spoken}{index < language.length - 1 ? ', ' : ''}</span>)
                ) : (
                  <span>No languages available</span>
                )}
                </td>
              </tr>
              <tr>
                <td>Sub Region: {geoplace.subregion}</td>
              </tr>
              <tr>
                <td>Capital: {geoplace.capital.map(capitalstate => (
                  <span key={capitalstate}>{capitalstate}</span>
                ))}</td>
              </tr>
            </tbody>
          </table>
          <Border />
        </div>

      </div>
    </>

  );
};

export default Idkname
