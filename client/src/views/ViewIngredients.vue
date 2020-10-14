<template>
    <div>
        <toast ref="toast"></toast>
        <navbar></navbar>
        <div class="container">
            <div class="header welcomeContainer">
                All Ingredients
            </div>
            <div class="customContainer foodContainer tile">
                <div class="tile is-parent is-vertical">
                    <div v-for="(item, index) in ingredients1" class="tile is-child" :key="item.id">
                        <IngredientCard
                                v-bind:ingredient-id="item.id"
                                v-bind:ingredient-name="item.name"
                                v-bind:ingredient-price="item.price"
                                v-bind:ingredient-total-weight="item.totalWeight"
                                v-bind:ingredient-categories="item.categories"
                                @deleteIngredient="deleteIngredient(index, ingredients1)"></IngredientCard>
                    </div>
                </div>
                <div class="tile is-parent is-vertical">
                    <div v-for="(item, index) in ingredients2" class="tile is-child" :key="item.id">
                        <IngredientCard
                                v-bind:ingredient-id="item.id"
                                v-bind:ingredient-name="item.name"
                                v-bind:ingredient-price="item.price"
                                v-bind:ingredient-total-weight="item.totalWeight"
                                v-bind:ingredient-categories="item.categories"
                                @deleteIngredient="deleteIngredient(index, ingredients2)"></IngredientCard>
                    </div>
                </div>
                <div class="tile is-parent is-vertical">
                    <div v-for="(item, index) in ingredients3" class="tile is-child" :key="item.id">
                        <IngredientCard
                                v-bind:ingredient-id="item.id"
                                v-bind:ingredient-name="item.name"
                                v-bind:ingredient-price="item.price"
                                v-bind:ingredient-total-weight="item.totalWeight"
                                v-bind:ingredient-categories="item.categories"
                                @deleteIngredient="deleteIngredient(index, ingredients3)"></IngredientCard>
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
                this.ingredients = ingredientResponse.data;
                await this.splitData(3);
                NProgress.done();
            } catch (error) {
                //Cant load response
                this.$refs.toast.dangerGet();
                NProgress.done();

            }

        },

        data() {
            return {
                api: "",
                ingredients: [],
                ingredients1: [],
                ingredients2: [],
                ingredients3: [],
                category: []
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
                    this.$router.go(0);
                } catch (error) {
                    this.$refs.toast.danger();
                }

            },

            /**
             * Splits the ingredients into three arrays of roughly equal size.
             * Adapted from code by Senthe 25 Jul 2018
             * https://stackoverflow.com/questions/8188548/splitting-a-js-array-into-n-arrays
             * @returns {[]}
             */
            async splitData(parts) {
                let result = [];
                for (let i = parts; i > 0; i--) {
                    result.push(this.ingredients.splice(0, Math.ceil(this.ingredients.length / i)));
                }
                this.ingredients1 = result[0];
                this.ingredients2 = result[1];
                this.ingredients3 = result[2];

            }
        }
    }
</script>

<style scoped>

</style>
