<template>
    <div>
        <toast ref="toast"></toast>
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
                        <b-field :type="this.priceHasError" :message="this.priceErrorMessage">
                            <b-input type="number" id="priceInput" v-model="price" placeholder="$0.00"
                                     step=".01"></b-input>
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
                        Categories
                    </div>
                    <div class="column">
                        <b-field label="">
                            <b-taginput
                                    v-model="categories"
                                    :data="filteredCategories"
                                    @typing="getFilteredCategories"
                                    :allow-new="true"
                                    :open-on-focus="true"
                                    ellipsis
                                    :placeholder="categoryPlaceholder">
                            </b-taginput>
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
    import Toast from "../components/Toast";
    import {UserApiClient} from "../api.js";
    import {Validate} from "../validate";

    export default {
        name: "AddIngredient",
        components: {
            Navbar,
            Toast
        },
        mounted() {
            this.api = new UserApiClient();
            this.validate = new Validate();
            this.filteredCategories = this.defaultCategories;
        },
        data() {
            return {
                api: "",
                validate: "",
                name: "",
                price: "",
                totalWeight: "",
                categories: [],
                defaultCategories: ["Protein", "Vegetable", "Carbohydrate", "Chicken", "Pork", "Beef", "Lamb", "Fish", "Seafood", "Extra", "Filler"],
                filteredCategories: [],
                categoryPlaceholder: "Add a new or existing category",

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

        watch: {
            name: async function () {
                this.clearErrors();
                await this.validate.validateIngredientName(this.name, this.errors);
                if (this.errors.fields.length !== 0) {
                    this.updateInvalidInputs();
                }
            },
            price: async function () {
                this.clearErrors();
                await this.validate.validateIngredientPrice(this.price, this.errors);
                if (this.errors.fields.length !== 0) {
                    this.updateInvalidInputs();
                }
            },
            totalWeight: async function () {
                this.clearErrors();
                await this.validate.validateIngredientWeight(parseFloat(this.totalWeight), this.errors);
                if (this.errors.fields.length !== 0) {
                    this.updateInvalidInputs();
                }
            },
            categories: async function() {
                this.clearErrors();
                if (this.categories.length === 0) {
                    this.categoryPlaceholder = "Add a new or existing category";
                } else {
                    this.categoryPlaceholder = "";
                }
            }
        },
        methods: {


            async submit() {
                this.clearErrors();
                let ingredient = {
                    name: this.name,
                    price: parseFloat(this.price),
                    totalWeight: parseInt(this.totalWeight),
                    categories: this.categories,
                };

                this.errors = await this.validate.validateIngredient(ingredient);
                if (this.errors.fields.length === 0) {
                    this.isLoading = true;
                    let response = await this.api.postIngredient(ingredient);
                    this.isLoading = false;
                    if (response.status === 200) {
                        this.$refs.toast.success("Ingredient", ingredient.name);
                        this.cleanInputs();
                    } else {
                        this.$refs.toast.danger();
                    }
                } else {
                    await this.updateInvalidInputs();
                    this.$refs.toast.danger();
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
                }
            },

            /**
             * Clears all error messages.
             */
            clearErrors() {
                this.errors = {
                    fields: [],
                    messages: []
                };
                this.nameHasError = "";
                this.nameErrorMessage = "";
                this.priceHasError = "";
                this.priceErrorMessage = "";
                this.totalWeightHasError = "";
                this.totalWeightErrorMessage = "";
                this.servingSizeHasError = "";
                this.servingSizeErrorMessage = "";
            },

            /**
             * Sets all input fields to their original state.
             */
            cleanInputs() {
                this.name = "";
                this.price = "";
                this.totalWeight = "";
                this.categories = [];
                this.clearErrors();
            },

            getFilteredCategories(text) {
                this.filteredCategories = this.defaultCategories.filter((option) => {
                    return option
                        .toString()
                        .toLowerCase()
                        .indexOf(text.toLowerCase()) >= 0;
                })
            }

        }
    }
</script>

<style scoped>

</style>
