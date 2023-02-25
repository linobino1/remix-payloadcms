import i18n from "../../i18n";
import express from "express";
import payload from "payload";
import invariant from "tiny-invariant";

const restCountries = 'https://restcountries.com/v2/all?fields=alpha2Code,translations,name';
const locales = i18n.supportedLngs;

export async function seedCountries() {
  let countries = [];
  try {
    const res = await fetch(restCountries)
    countries = await res.json();
  } catch (err) {
    payload.logger.fatal(`Could not fetch countries from ${restCountries}`);
    return;
  }
  
  await Promise.all(countries.map(async (country: any) => {
    const alpha2 = (country.alpha2Code as string).toLowerCase();
    
    // try create item
    let res = await fetch(`http://localhost:3000/api/countries?locale=en`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: alpha2,
        name: country.name,
      }),
    });

    // the local API won't work here...
    // no fields other than 'name' will be written.
    // await payload.create({
    //   collection: 'countries',
    //   data: {
    //     id: country.alpha2Code,
    //     name: country.name, // name returned by restcountries.com is english
    //   },
    //   locale: 'en',
    // });

    if (!res.ok) {
      payload.logger.warn(`Could not create country ${alpha2} - ${country.name}`);
      console.log(res);
      return;
    }
    payload.logger.info(`added ${alpha2} ${country.name}`)

    // add translations for languages other than 'en'
    await Promise.all(locales.map(async (locale) => {
      if (locale === 'en') return;
      
      let res = await fetch(`http://localhost:3000/api/countries/${alpha2}?locale=${locale}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: country.translations[locale],
        }),
      });

      // the local API won't work here either...
      // await payload.update({
      //   collection: 'countries',
      //   id: id as string,
      //   data: {
      //     name: country.translations[locale],
      //     test: alpha2,
      //   },
      //   // locale,
      // });

      if (!res.ok) {
        payload.logger.warn(`could not add ${locale} name for ${alpha2}: ${country.translations[locale]}`)
        console.log(res);
        return;
      }
      payload.logger.info(`added ${locale} name for ${alpha2}: ${country.translations[locale]}`)
    }));
  }));
}

export async function seed() {
  invariant(process.env.PAYLOAD_SECRET, "PAYLOAD_SECRET is required");
  invariant(process.env.MONGODB_URI, "MONGODB_URI is required");
  
  // Initialize Payload
  console.log('initializing payload...')
  const app = express();
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    mongoURL: process.env.MONGODB_URI,
    express: app,
    local: true,
    onInit: () => console.log('Done.')
  });
  
  await seedCountries();
  
  process.exit(0);
}

seed();