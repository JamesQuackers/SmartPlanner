<template>
    <div class="itemContainer">
        <section class="itemCard">
            <div class="item-left">
                <div>
                    {{ingredientName}}
                    <b-dropdown ref="dropdown" class="float-right">
                        <ion-icon name="pencil-sharp" slot="trigger" class="clickable"></ion-icon>
                        <b-dropdown-item aria-role="listitem">
                            <ion-icon name="pencil-sharp" class="inline-icon"></ion-icon>
                            Edit
                        </b-dropdown-item>
                        <b-dropdown-item aria-role="listitem" v-on:click="deleteIngredient">
                            <ion-icon name="trash-outline" class="inline-icon"></ion-icon>
                            Delete
                        </b-dropdown-item>
                    </b-dropdown>

                </div>

                <div class="">
                    <div v-for="item in ingredientCategories" class="categories">
                        <b-tag :class="{'is-danger': item === 'Protein', 'is-primary': item === 'Carbohydrate',
                        'is-success': item === 'Vegetable'}" class="is-light">{{item}}
                        </b-tag>
                    </div>
                </div>
                <br>
                <div class="ingredientInfo">
                    <ion-icon name="barbell-outline" class="inline-icon"></ion-icon>
                    {{ingredientTotalWeight}}g
                </div>
                <div>
                    <div class="ingredientInfo">
                        <ion-icon name="cash-outline" class="inline-icon"></ion-icon>
                        ${{ingredientPrice}}
                    </div>
                </div>
            </div>
        </section>

    </div>
</template>

<script>
    export default {
        name: "IngredientCard",

        props: {
            ingredientId: {
                type: String,
                default: ""
            },
            ingredientName: {
                type: String,
                default: "Default name"
            },
            ingredientPrice: {
                type: Number,
                default: 0.0
            },
            ingredientTotalWeight: {
                type: Number,
                default: 0.0
            },
            ingredientCategories: {
                type: Array,
                default: () => []
            }
        },
        mounted() {
        },
        methods: {
            deleteIngredient() {
                //Send call to delete ingredient
                this.$emit("deleteIngredient");
            }
        },
        data() {
            return {
                show: false,
            }
        }
    }
</script>

<style scoped>
</style>
