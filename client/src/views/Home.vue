<template>
  <div>
    <navbar></navbar>
    <div class="container">
      <div class="header welcomeContainer">
        <h1>Welcome back, {{name}}</h1>
      </div>
      <div class="timeContainer">
        <date-time></date-time>
      </div>
      <div class="weatherContainer">
        <weather></weather>
      </div>
      <div class="home">
        <div class="schedule">

        </div>
        <div class="foodSchedule">

        </div>
        <div class="newsContainer">

        </div>
        <div class="nextEvent">

        </div>
      </div>
    </div>
  </div>

</template>

<script>

import Navbar from "../components/Navbar";
import DateTime from "../components/DateTime";
import Weather from "../components/Weather";
export default {
  name: 'Home',
  components: {
    Weather,
    DateTime,
    Navbar
  },
  data() {
    return {
      name: "James"
    }
  }
}
</script>
