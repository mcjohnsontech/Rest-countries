import { json, useLoaderData, useOutletContext } from "@remix-run/react"

export const loader = async () => {
  const response = await fetch('https://restcountries.com/v3.1/all?fields=name,cca3,borders');
  const bordersDate: {
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
  }[] = await response.json();
  // console.log(bordersDate);

  return json({ countriesBorder: bordersDate });

}





export default function Border() {

  const { geoplace } = useOutletContext<{
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
      borders: string[];
      population: number
    }
  }>();


  const borders = Object.values(geoplace.borders);
  const { countriesBorder } = useLoaderData<typeof loader>();

  // console.log(countriesBorder);
  const neighboringCountryNames = borders.map(borderCode => {
    const match = countriesBorder.find(country => country.cca3 === borderCode);
    return match ? match.name.common : null; // Return the name if match is found, else null
  })
    .filter(Boolean); // Remove null values for unmatched codes

  return (
    <div>
      <div className="borders">
        <p>{neighboringCountryNames.map((sideCountries, index) => <span key={sideCountries}>{sideCountries} {index < neighboringCountryNames.length - 1 ? ', ' : ''}</span >)}</p>
      </div>
    </div >
  );
}