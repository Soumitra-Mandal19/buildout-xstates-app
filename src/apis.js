const countries_api_url = "https://crio-location-selector.onrender.com/countries";



export const fetchCountries = async () => {
    try {
        const response = await fetch(countries_api_url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error.message)
        return [];
    }

}

export const fetchStates = async (countryName) => {
    try {
        const response = await fetch(`https://crio-location-selector.onrender.com/country=${countryName}/states`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error.message)
        return [];
    }
}

export const fetchCities = async (countryName, stateName) => {
    try {
        const response = await fetch(`https://crio-location-selector.onrender.com/country=${countryName}/state=${stateName}/cities`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error.message)
        return [];
    }
} 