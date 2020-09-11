<template>
    <div>
        <navbar></navbar>
        <div class="container">
            <div class="header welcomeContainer">
                <h1>Welcome back, {{name}}</h1>
            </div>
          <div class="nextEvent">
            <div class="customContainer container header">
              Event here
            </div>
          </div>

            <div class="columns">

                <div class="column">

                  <div>
                    <date-time></date-time>
                  </div>
                  <div>
                    <weather></weather>
                  </div>
                </div>


                <div class="home">
                    <div class="newsContainer column">
                        <news></news>
                    </div>

                </div>
            </div>

        </div>
    </div>

</template>

<script>

    import Navbar from "../components/Navbar";
    import DateTime from "../components/DateTime";
    import Weather from "../components/Weather";
    import News from "../components/News";

    export default {
        name: 'Home',
        components: {
            News,
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
