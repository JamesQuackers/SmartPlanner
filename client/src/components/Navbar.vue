<template>
    <b-navbar class="is-fixed-top navbar">
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                Brand
            </b-navbar-item>
        </template>
        <template slot="start">
            <b-navbar-item v-on:click="routeTo('/')">
                Home
            </b-navbar-item>
            <b-navbar-item v-on:click="routeTo('/food')">
                Food
            </b-navbar-item>
            <b-navbar-item href="#">
                Calendar
            </b-navbar-item>
        </template>
        <template slot="end">
            <b-navbar-item href="#">
                <div>
                    <img v-bind:src="icon" alt="weather" id="weatherIcon">
                </div>
                <div class="tempNav">
                    {{temperature}}°
                </div>

            </b-navbar-item>
        </template>
    </b-navbar>
</template>

<script>
    import {weatherApi} from "../api";

    export default {
        name: "Navbar",

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
                temperature: "",
            }
        },

        methods: {

            /**
             * Gets and assigns all weather related calls from Open Weather Maps API
             *
             */
            async getWeather() {
                this.weatherData = await this.weatherApi.fetchWeather(this.city);
                this.oneCallWeather = await this.weatherApi.fetch(this.lat, this.lng);
                this.temperature = Math.round((this.oneCallWeather.current.temp - 273.15) * 10) / 10;
                this.icon = "http://openweathermap.org/img/wn/" + this.weatherData.weather[0].icon + "@2x.png"
            },

            /**
             * Handles routes to other pages
             * @param route - The route that is taken
             */
            routeTo(route) {
                this.$router.push(route);
            }
        }
    }
</script>

<style scoped>
</style>