import axios from "axios"

const SERVER_URL = process.env.VUE_APP_API_BASE_URL;
const WEATHER_URL = `https://api.openweathermap.org/data/2.5/`;
const NEWS_URL = 'http://newsapi.org/v2/';

const server = axios.create({
    baseURL: SERVER_URL,
    timeout: 10000
});

/**
 * Creates an instance of the open weather map API
 */
const openWeatherMap = axios.create({
    baseURL: WEATHER_URL,
    timeout: 2000
});

const news = axios.create({
    baseURL: NEWS_URL,
    timeout: 1000
});

export class weatherApi {
    /**
     * Called to fetch the weather details from the weather instance
     * @param city - The city provided for the weather request
     * @returns the requested data from the external API or an empty list if unavailable
     */
    async fetchWeather(city) {
        return openWeatherMap.get( "weather?q=" + city + `&appid=${process.env.VUE_APP_WEATHER_API_KEY}`).then(function (response) {
            return response.data;

        }).catch(function () {
            return [];

        });
    }

    /**
     * Called to fetch all one call data from the weather instance
     * @param lat - The latitiude of the area provided
     * @param lng - The longitude of the area provided
     * @returns the requested data from the external API or an empty list if unavailable
     */
    async fetch(lat, lng) {
        return openWeatherMap.get( "onecall?lat=" + lat + "&lon=" + lng + `&exclude=hourly,daily&appid=${process.env.VUE_APP_WEATHER_API_KEY}`).then(function (response) {
            return response.data;

        }).catch(function () {
            return [];

        });
    }
}



export class newsApi {

    /**
     * Called to fetch all headlines, https://newsapi.org/docs/endpoints/top-headlines
     * @returns the requested data from the external API or an empty list if unavailable
     */
    async fetch() {
        return news.get( `top-headlines?country=nz&pageSize=5&apiKey=${process.env.VUE_APP_NEWS_KEY}`).then(function (response) {
            return response.data;

        }).catch(function () {
            return [];

        });
    }
}
export class UserApiClient {
    constructor(urlRoot) {
        this.urlRoot = urlRoot;
    }


    /**
     * Adds user to the map in JSON format
     * @param ingredientData
     */
    async postIngredient(ingredientData) {
        let returnResponse = {};
        return server.post("/ingredients/add", ingredientData).then(function (response) {
            returnResponse = {
                status: response.status
            };

            return returnResponse;

        }).catch(function (error) {
            returnResponse = {
                status: error.status,
                data: error
            };

            return returnResponse;

        });
    }

    /**
     * Gets all ingredients from the database.
     * @returns an array of ingredient objects
     */
    async getAllIngredients() {
        let returnResponse = {};
        return server.get("/ingredients").then(function (response) {
            returnResponse = {
                status: response.status,
                data: response.data
            };

            return returnResponse;

        }).catch(function (error) {
            returnResponse = {
                status: error.status,
                data: error
            };

            return returnResponse;

        });
    }

    /**
     * Gets all ingredient categories from the database.
     * @returns an array of categories objects
     */
    async getAllIngredientCategories() {
        let returnResponse = {};
        return server.get("/ingredients/categories").then(function (response) {
            returnResponse = {
                status: response.status,
                data: response.data
            };

            return returnResponse;

        }).catch(function (error) {
            returnResponse = {
                status: error.status,
                data: error
            };

            return returnResponse;

        });
    }

    /**
     * Takes an ingredientId and deletes it from the database.
     * @param ingredientId - Id of the ingredient to be deleted
     */
    async deleteIngredient(ingredientId) {
        let returnResponse = {};
        return server.delete(`/ingredients/${ingredientId}`).then(function (response) {
            returnResponse = {
                status: response.status,
                data: response.data
            };

            return returnResponse;

        }).catch(function (error) {
            returnResponse = {
                status: error.status,
                data: error
            };

            return returnResponse;

        });
    }
}

