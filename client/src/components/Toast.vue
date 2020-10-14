<template>
    <div></div>
</template>

<script>
    export default {
        name: "Toast",
        methods: {

            /**
             * Tells the user something was added successfully.
             */
            success(type, name) {
                this.$buefy.toast.open({
                    message: type + ": " + name + " successfully added!",
                    type: 'is-success',
                    duration: 5000,
                });
            },

            /**
             * Tells the user something was deleted successfully.
             */
            successDeleted(name) {
                this.$buefy.toast.open({
                    message: name + " successfully deleted!",
                    type: 'is-success',
                    duration: 5000,
                });
            },

            /**
             * Tells the user an item could not be added
             */
            danger() {
                this.$buefy.toast.open({
                    duration: 5000,
                    message: `Item could not be added! Try again.`,
                    type: 'is-danger'
                })
            },

            dangerGet() {
                this.$buefy.toast.open({
                    duration: 5000,
                    message: `Could not load data! Try refresh the page.`,
                    type: 'is-danger'
                })
            }
        }
    }
</script>

<style scoped>

</style>
