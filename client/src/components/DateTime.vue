<template>
    <div class="header customContainer black">
        <div class="date">
            {{day}}, {{date}} {{month}}
        </div>
        <div class="time">
            {{time}}
        </div>
    </div>
</template>

<script>
    export default {
        name: "DateTime",

        created() {
            setInterval(this.getNow, 1000);
        },
        data() {
            return {
                date: "",
                time: "",
                day: "",
                month: "",
            }
        },
        methods: {
            getNow() {
                var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                    "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
                ];
                const today = new Date();
                this.date = today.getDate();
                this.month = months[today.getMonth()];
                this.day = days[today.getDay()];
                this.seconds = today.getSeconds();
                if (this.seconds.toString().length === 1) {
                    this.seconds = "0" + this.seconds.toString();
                }
                this.time =
                    today.getHours() + ':' + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + ":" + this.seconds;
            },
        },
    }
</script>

<style scoped>

</style>
