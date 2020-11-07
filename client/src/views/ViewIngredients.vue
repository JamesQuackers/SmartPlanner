<template>
    <div>
        <toast ref="toast"></toast>
        <navbar></navbar>
        <div class="container">
            <div class="header welcomeContainer">
                All Ingredients
            </div>
            <div class="customContainer">
                <div>
                    <nav class="navbar filterBar">
                        <div class="navbar-brand">
                        </div>

                        <div class="navbar-menu">
                            <div class="navbar-start">
                                <div class="navbar-item">
                                    <b-field>
                                        <ion-icon name="search-circle-outline" class="largeIcon"></ion-icon>
                                        <b-input type="text" placeholder="Search" v-model="searchTerm"></b-input>
                                    </b-field>
                                </div>
                                <div class="navbar-item">
                                    <b-field label="">
                                        <b-taginput
                                                v-model="categorySearch"
                                                :data="categories"
                                                @typing=""
                                                :open-on-focus="true"
                                                :allow-new="false"
                                                ellipsis
                                                placeholder="Enter a tag">
                                        </b-taginput>
                                    </b-field>
                                </div>

                            </div>
                        </div>
                    </nav>
                </div>

                <div class="auto-grid foodContainer">
                    <div v-for="(item, index) in filteredIngredients" class="" :key="item.id">
                        <IngredientCard
                                v-bind:ingredient-id="item.id"
                                v-bind:ingredient-name="item.name"
                                v-bind:ingredient-price="item.price"
                                v-bind:ingredient-total-weight="item.totalWeight"
                                v-bind:ingredient-categories="item.categories"
                                @deleteIngredient="deleteIngredient(index, ingredients)"
                                class="tile is-child"></IngredientCard>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import Navbar from "../components/Navbar";
    import Toast from "../components/Toast";
    import {UserApiClient} from "../api";
    import NProgress from 'nprogress'
    import 'nprogress/nprogress.css';
    import IngredientCard from "../components/IngredientCard";
    const _ = require('underscore');
    export default {
        name: "ViewIngredients",
        components: {
            IngredientCard,
            Navbar,
            Toast
        },
        async mounted() {
            this.api = new UserApiClient();

            try {
                NProgress.start();
                NProgress.inc();
                let ingredientResponse = await this.api.getAllIngredients();
                let categoryResponse = await this.api.getAllIngredientCategories();
                this.ingredients = ingredientResponse.data;
                this.categories = categoryResponse.data;
                this.filteredIngredients = this.ingredients;
                this.categoryFiltered = this.ingredients;
                this.searchFiltered = this.ingredients;
                NProgress.done();
            } catch (error) {
                //Cant load response
                this.$refs.toast.dangerGet();
                NProgress.done();

            }

        },
        watch: {
            /**
             * Filters ingredients based on the searchTerm.
             */
            searchTerm: function () {
                if (this.searchTerm.length === 0) {
                    this.searchFiltered = this.ingredients;
                } else {
                    this.searchFiltered = [];
                    for (let i = 0; i < this.ingredients.length; i++) {
                        let ingredient = this.ingredients[i];
                        if (ingredient.name.toUpperCase().includes(this.searchTerm.toUpperCase())) {
                            this.searchFiltered.push(ingredient);
                        } else {
                            for (let j = 0; j < ingredient.categories.length; j++) {
                                let category = ingredient.categories[j];
                                if (category.toUpperCase().includes((this.searchTerm.toUpperCase()))) {
                                    this.searchFiltered.push(ingredient);
                                }
                            }
                        }
                    }
                }
                this.filteredIngredients = _.intersection(this.searchFiltered, this.categoryFiltered);
            },

            /**
             * Filters ingredients based on categories.
             */
            categorySearch: function () {
                if (this.categorySearch.length === 0) {
                    this.categoryFiltered = this.ingredients;
                } else {
                    this.categoryFiltered = [];
                    for (let i = 0; i < this.categorySearch.length; i++) {
                        let search = this.categorySearch[i];
                        for (let j = 0; j < this.ingredients.length; j++) {
                            let ingredient = this.ingredients[j];
                            if (ingredient.categories.includes(search)) {
                                this.categoryFiltered.push(ingredient);
                            }
                        }
                    }
                }
                this.filteredIngredients = _.intersection(this.categoryFiltered, this.searchFiltered);
            }
        },

        data() {
            return {
                api: "",
                ingredients: [],
                filteredIngredients: [],
                categoryFiltered: [],
                searchFiltered: [],
                category: [],
                searchTerm: "",

                categorySearch: [],
                categories: [],
            }
        },

        methods: {
            /**
             * Tries to delete an ingredient, on a success (200), the item is removed from the users view also.
             */
            deleteIngredient(index, array) {
                let ingredientToBeDeleted = array[index];
                try {
                    this.api.deleteIngredient(ingredientToBeDeleted.id);
                    this.$refs.toast.successDeleted(ingredientToBeDeleted.name);
                    array.splice(index, 1);
                } catch (error) {
                    this.$refs.toast.danger();
                }

            },
        }
    }
</script>

<style scoped>

</style>
