import { json, LoaderFunctionArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react";
import Border from "../components/border";
import { loader as borderLoader } from "../components/border";
import Header from "~/components/header";
import { Flex, Text} from "@mantine/core";
import classes from "../src/styles.module.css";

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
  const componentData = ({
    childData: borderLoader,
  })
  const wellDone = await componentData.childData();
  const data = await wellDone.json(); // Assuming TypedResponse has a .json() method

  // Access the countriesBorder property
  const countriesBorder = data.countriesBorder;
  // console.log(countriesBorder);





  return json({
    geoplace: countryname[0], countriesBorder
  })

}


const Idkname = () => {

  const { geoplace } = useLoaderData<typeof loader>();
  // console.log({countriesBorder});


  const nativename = geoplace.name.nativeName;
  const currency = Object.values(geoplace.currencies);
  const language = Object.values(geoplace.languages);

  /* This is concerning the border components,i am trying to bring it into this place, and make it function, re-evaluating stuffs */
  // const {childData} = useLoaderData<typeof loader>()
  // console.log({childData});


  return (
    <>
      <Header />
      <Flex className="flex"
        mih={50}
        // bg="rgba(0, 0, 0, .3)"
        gap="xl"
        justify="space-evenly"
        align="center"
        direction="row"
        wrap="wrap"
        p="5rem">
        <div className={classes.class1}>
          <img src={geoplace.flags.svg} alt="" />
        </div>
        <div className="class-2">
          <h3>{geoplace.name.common}</h3>
          <table>
            <tbody>
              <tr>
                {/* <td>Native Name: {`${Object.values(nativename)[0].common}`}</td> */}
                <td><Text fw="bold" display="inline-block">Native Name:</Text>{" "}
                  {nativename && Object.keys(nativename).length > 0
                    ? Object.values(nativename)[0]?.common || "N/A"
                    : "N/A"}</td>
                <td><Text fw="bold" display="inline-block">Top Level Domain:</Text> {geoplace.tld[0]}</td>
              </tr>
              <tr>
                <td>{geoplace.population}</td>
                <td><Text fw="bold" display="inline-block">Currencies:</Text> {currency.length === 1 ? (
                  currency.map(moneytype => <span key={moneytype.name}>{moneytype.name}</span>)
                ) : currency.length > 1 ? (

                  currency.map((moneytype, index) => <span key={moneytype.name}>{moneytype.name}{index < currency.length - 1 ? ', ' : ''}</span>)
                ) : (
                  <span>No currency available</span>
                )}</td>
              </tr>
              <tr>
                <td><Text fw="bold" display="inline-block">Region:</Text> {geoplace.region}</td>
                <td><Text fw="bold" display="inline-block">Languages:</Text> {language.length === 1 ? (
                  language.map(spoken => <span key={spoken}>{spoken}</span>)
                ) : language.length > 1 ? (

                  language.map((spoken, index) => <span key={spoken}>{spoken}{index < language.length - 1 ? ', ' : ''}</span>)
                ) : (
                  <span>No languages available</span>
                )}
                </td>
              </tr>
              <tr>
                <td><Text fw="bold" display="inline-block">Sub Region:</Text> {geoplace.subregion}</td>
              </tr>
              <tr>
                <td><Text fw="bold" display="inline-block">Capital:</Text>
                  {geoplace.capital.map(capitalstate => (
                    <span key={capitalstate}>{capitalstate}</span>
                  ))}
                </td>
              </tr>
            </tbody>
          </table>
          <Border />
        </div>

      </Flex>
    </>

  );
};

export default Idkname
