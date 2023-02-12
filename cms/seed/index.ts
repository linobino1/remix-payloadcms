import payload from "payload";

const restCountries = 'https://restcountries.com/v2/all?fields=alpha2code,translations';

export async function seedCountries() {
  fetch(restCountries)
    .then((res) => res.json())
    .then((countries) => {
      countries.forEach((country: any) => {
        payload.update({
          collection: 'countries',
          id: country.alpha2code,
          data: {
            name: country.translation.en,
          },
        });
      });
    })
}

export async function seed() {
  await seedCountries();
}

seed();