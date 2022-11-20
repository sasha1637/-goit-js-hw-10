function fetchCountries(name){
  const BASIC_URL="https://restcountries.com/v2"
  const filter= "name,capital,population,flags,languages"
return fetch(`${BASIC_URL}/name/${name}?${filter}`)
  .then((res) => {
    if (!res.ok) {
        throw new Error(res.status);
      }
      return res.json()
  })
}
export {fetchCountries};