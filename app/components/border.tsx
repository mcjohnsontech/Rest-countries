import { json, useLoaderData, useMatches } from "@remix-run/react"

export const loader = async () => {
  const responses = await fetch(`https://restcountries.com/v3.1/all?fields=name,cca3,borders`);
  const bordersdate: {
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
    cca3: string;
    borders: string[];
  }[] = await responses.json();

  return json({ countriesBorder: bordersdate });
}



const Border = () => {
  type dataFromCountries = {
    geoplace: {
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
    }
  }


  const matches = useMatches()

  const useDataFound = matches.find(match => match.id === "routes/countries.$name")?.data as dataFromCountries;
  // console.log(useDataFound.geoplace);
  
  const { countriesBorder } = useLoaderData<typeof loader>();
  // console.log(`toooo ${countriesBorder}`);
  
  const borders = Object.values(useDataFound.geoplace.borders);
  // console.log({borders});


  const neighboringCountryNames = borders.map(borderCode => {
    const match = countriesBorder.find(country => country.cca3 === borderCode);
    return match ? match.name.common : null; // Return the name if match is found, else null
  })
    .filter(Boolean); // Remove null values for unmatched codes

  return (
    <div>
      <div className="borders">
        {/* <p>kok</p> */}
        <p>{neighboringCountryNames.map((sideCountries, index) => <span key={sideCountries}>{sideCountries} {index < neighboringCountryNames.length - 1 ? ', ' : ''}</span >)}</p>
      </div>
    </div >
  );
}

export default Border