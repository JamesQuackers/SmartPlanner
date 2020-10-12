<template>
    <div>
        <b-loading :is-full-page="true" v-model="isLoading"></b-loading>
        <navbar></navbar>
        <div class="container">
            <div class="header welcomeContainer">
                Add an Ingredient
            </div>
            <div class="customContainer foodContainer">
                <div class="columns">
                    <div class="column">
                        Ingredient Name
                    </div>
                    <div class="column">
                        <b-field :type="this.nameHasError" :message="this.nameErrorMessage">
                            <b-input type="text" id="nameInput" v-model="name" placeholder="Potatoes"></b-input>
                        </b-field>
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        Price
                    </div>
                    <div class="column">
                        <b-field :type="this.priceHasError"  :message="this.priceErrorMessage">
                            <b-input type="number" id="priceInput" v-model="price" placeholder="$0.00"></b-input>
                        </b-field>
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        Weight (g)
                    </div>
                    <div class="column">
                        <b-field :type="this.totalWeightHasError" :message="this.totalWeightErrorMessage">
                            <b-input type="number" id="weightInput" v-model="totalWeight" placeholder="100"></b-input>
                        </b-field>
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        Serving Size
                    </div>
                    <div class="column">
                        <b-field :type="this.servingSizeHasError" :message="this.servingSizeErrorMessage">
                            <b-input type="number" id="servingSizeInput" v-model="servingSize" placeholder="50"></b-input>
                        </b-field>
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                    </div>
                    <div class="column">
                        <div class="columns">
                            <div class="column">
                            </div>
                            <div class="column">
                            </div>
                            <div class="column">
                                <b-button id="submitButton" type="is-success" v-on:click="submit()">Submit</b-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Navbar from "../components/Navbar";
    import {UserApiClient} from "../api.js";
    import {Validate} from "../validate";

    export default {
        name: "AddIngredient",
        components: {
            Navbar
        },
        mounted() {
            this.api = new UserApiClient();
            this.validate = new Validate();
        },
        data() {
            return {
                api: "",
                validate: "",
                name: "",
                price: "",
                totalWeight: "",
                servingSize: "",

                errors: {
                    fields: [],
                    messages: []
                },

                //Errors
                nameHasError: "",
                nameErrorMessage: "",
                priceHasError: "",
                priceErrorMessage: "",
                totalWeightHasError: "",
                totalWeightErrorMessage: "",
                servingSizeHasError: "",
                servingSizeErrorMessage: "",

                //buefy
                isLoading: false,
            }
        },
        methods: {


            async submit() {
                this.clearErrors();
                let ingredient = {
                    name: this.name,
                    price: parseFloat(this.price),
                    totalWeight: parseInt(this.totalWeight),
                    servingSize: parseInt(this.servingSize),
                };

                this.errors = await this.validate.validateIngredient(ingredient);
                if (this.errors.fields.length === 0) {
                    this.isLoading = true;
                    let response = await this.api.postIngredient(ingredient);
                    this.isLoading = false;
                    if (response.status === 200) {
                        this.success();
                    } else {
                        this.danger();
                    }
                } else {
                    await this.updateInvalidInputs();
                    this.danger();
                }

            },

            /**
             * Adds error messages to inputs if they exist.
             */
            async updateInvalidInputs() {
                for (let i = 0; i < this.errors.fields.length; i++) {
                    let field = this.errors.fields[i];
                    if (field === "name") {
                        this.nameHasError = 'is-danger';
                        this.nameErrorMessage = this.errors.messages[i];
                    }
                    if (field === "price") {
                        this.priceHasError = 'is-danger';
                        this.priceErrorMessage = this.errors.messages[i];
                    }
                    if (field === "totalWeight") {
                        this.totalWeightHasError = 'is-danger';
                        this.totalWeightErrorMessage = this.errors.messages[i];
                    }
                    if (field === "servingSize") {
                        this.servingSizeHasError = 'is-danger';
                        this.servingSizeErrorMessage = this.errors.messages[i];
                    }
                }
            },

            /**
             * Clears all error messages.
             */
            clearErrors() {
                this.nameHasError = "";
                this.nameErrorMessage = "";
                this.priceHasError = "";
                this.priceErrorMessage = "";
                this.totalWeightHasError = "";
                this.totalWeightErrorMessage = "";
                this.totalWeightHasError = "";
                this.totalWeightErrorMessage = "";
            },


            /**
             * Tells the user the ingredient was added successfully, and calls cleanInputs().
             */
            success() {
                this.$buefy.toast.open({
                    message: this.name + " successfully added!",
                    type: 'is-success',
                    duration: 5000,
                });
                this.cleanInputs();
            },

            /**
             * Tells the user the ingredient was not added.
             */
            danger() {
                this.$buefy.toast.open({
                    duration: 5000,
                    message: `Something went wrong! Try again.`,
                    type: 'is-danger'
                })
            },

            /**
             * Sets all input fields to their original state.
             */
            cleanInputs() {
                this.name = "";
                this.price = 0;
                this.totalWeight = 0;
                this.servingSize = 0;
            },

        }
    }
</script>

<style scoped>

</style>
