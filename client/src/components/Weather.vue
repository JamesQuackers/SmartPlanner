<template>
    <div class="header">
        <div>
            <img v-bind:src="icon" alt="weather">
        </div>
        {{city}} {{weatherDescription}} {{temperature}}°
        <div>
            Feels Like: {{feelsTemperature}}°
        </div>
    </div>
</template>

<script>
    import {weatherApi} from "../api";

    export default {
        name: "Weather",
        async mounted() {
            this.weatherApi = new weatherApi();
            await this.getWeather();
        },
        data() {
            return {
                weatherApi: "",
                weatherData: "",
                icon: "",
                city: "Christchurch",
                lat: -43.5168,
                lng: 172.5721,
                oneCallWeather: "",
                weatherDescription: "",
                temperature: "",
                feelsTemperature: "",
            }
        },

        methods: {


            async getWeather() {
                this.weatherData = await this.weatherApi.fetchWeather(this.city);
                this.weatherDescription = this.weatherData.weather[0].description;
                this.oneCallWeather = await this.weatherApi.fetch(this.lat, this.lng);
                this.temperature = Math.round((this.oneCallWeather.current.temp - 273.15) * 10) / 10;
                this.feelsTemperature = Math.round((this.oneCallWeather.current.feels_like - 273.15) * 10) / 10;
                this.icon = "http://openweathermap.org/img/wn/" + this.weatherData.weather[0].icon + "@2x.png"
            },
        }
    }
</script>

<style scoped>

</style>