import './css/styles.css';
import Notiflix from 'notiflix';
const debounce = require('lodash.debounce');
import {fetchCountries} from "./js/fetchCountries";

const DEBOUNCE_DELAY = 300;
const searchInput=document.querySelector("#search-box")
const countryList=document.querySelector(".country-list")
const countryInfo=document.querySelector(".country-info")

searchInput.addEventListener('input',debounce(searchQuery,DEBOUNCE_DELAY) ) 

function searchQuery(evt){
    clearMarkup(countryList);
    clearMarkup(countryInfo);
const searchParams = (evt.target.value).trim()
if ((/\d/.test(searchParams))||(searchParams==='')) {   

 return Notiflix.Notify.info("Country name must contain only letters and not be empty")
}
fetchCountries(searchParams)
.then((data)=>{

 if (data.length>10) {
   return Notiflix.Notify.info( "Too many matches found. Please enter a more specific name.")
 } else if(data.length<10 && data.length>1) {  
    createCountryList(data);
 } else if (data.length=1){
    clearMarkup(countryList);
    console.log(data);
    createCountryCard(data)
 }  
})
.catch(()=>{
    Notiflix.Notify.failure("Oops, there is no country with that name")
})
}
function createCountryList(Arr){
const markupList = Arr.map(({name, flag})=>
`<li class="item"> <img src="${flag}" alt="flag" width="30px"> ${name}</li>`).join('')
return countryList.insertAdjacentHTML('afterbegin',markupList)
}
function createCountryCard(Arr){
    const markupList = Arr.map(({name, flag, capital,population,languages
    })=>

    `<img src="${flag}" alt="flag" width="250px">
      <h2>${name}</h2>
      <p>Capital:${capital} </p>
      <p>Population: ${population}</p>
      <p>Lanuuages: ${languages.map((language)=>`<span>${language.name}</span>`).join(', ')}  </p>
`)
.join('')
    return countryInfo.insertAdjacentHTML('afterbegin',markupList)
    }
function clearMarkup(name){
    return name.innerHTML =""
    }     