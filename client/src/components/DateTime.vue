<template>
    <div class="header">
        <div class="date">
            It is {{day}}, {{date}} of {{month}}.
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
            }
        },
        methods: {
            getNow() {
                var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                var months = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
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