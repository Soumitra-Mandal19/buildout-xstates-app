import { useEffect, useState } from "react";
import { fetchCities, fetchCountries, fetchStates } from "./apis"
import styles from "./Location.module.css";

const defaultCountry = "Select Country";
const defaultState = "Select State";
const defaultCity = "Select City";
export const Location = () => {

    // #region "state variables"
    const [countries, setCountries] = useState([defaultCountry]);
    const [selectedCountry, setSelectedCountry] = useState();
    const [states, setStates] = useState([defaultState]);
    const [selectedState, setSelectedState] = useState();
    const [cities, setCities] = useState([defaultCity]);
    const [selectedCity, setSelectedCity] = useState();
    // #endregion

    // #region "useEffect"
    useEffect(() => {
        //Creating a function to fetch all the countries 
        const fetchingCountries = async () => {
            //Creating a variable that has an array of all country    
            const data = await fetchCountries();
            //Using setter method of useState we assigned the array of countries(allCountries) to countries of useState   
            setCountries([defaultCountry, ...data]);
        }
        //Calling the function to get the countries array
        fetchingCountries();
    }, [])
    // #endregion

    // #region "functions"
    
    //Created a method to handle the value selected out of country options
    const onCountryChange = (e) => {

        setStates([defaultState]);
        setCities([defaultCity]);
        setSelectedState();
        setSelectedCity();
        
        // remove selected state
        const fetchingStates = async (countryName) => {
            const data = await fetchStates(countryName);
            setStates([defaultState, ...data]);
        }
        if (e.target.value !== defaultCountry){
            setSelectedCountry(e.target.value);
            fetchingStates(e.target.value);
        } else {
            setSelectedCountry();
        }
        
    }

    const onStateChange = (e) => {
        
        
        setCities([defaultCity]);
        setSelectedCity();
        const fetchingCities = async (stateName) => {
            const data = await fetchCities(selectedCountry, stateName);
            setCities(((prev) => [...prev, ...data]));
        }
        
        if (e.target.value !== defaultState){
            fetchingCities(e.target.value);
            setSelectedState(e.target.value);
        } else {
            setSelectedState();
        }
    }

    const onCityChange = (event) => {
        setSelectedCity(event.target.value);
    }
    // #endregion

    return (
        <div >
            <div><h1>Select Location</h1></div>
            <div className={styles.container}>
            <select onChange={onCountryChange} className={styles.select} value={selectedCountry}>
                {countries.map((country, index) => {
                    return (
                        <option value={country} key={index}>{country}</option>
                    )
                })}
            </select>

            <select onChange={onStateChange} className={styles.select} value={selectedState} disabled={selectedCountry === undefined}>
                {states.map((state, index) => {
                    return (
                        <option value={state} key={index}>{state}</option>
                    )
                })}
            </select>

            <select onChange={onCityChange} className={styles.select} value={selectedCity} disabled={selectedState === undefined}>
                {cities.map((city, index) => {
                    return (
                        <option value={city} key={index}>{city}</option>
                    )
                })}
            </select>
            </div>
            {selectedCity && selectedState && defaultCountry ? <div>
                <strong>You selected {selectedCity}, {selectedState}, {selectedCountry}</strong>
            </div> : null}
        </div>
    )
}