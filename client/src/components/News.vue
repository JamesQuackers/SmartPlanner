<template>
    <div>

        <div class="container customContainer">
            <div class="header black">
                News
            </div>
            <div id="newsItem" v-for="item in this.newsData.articles">
                <div class="header black">
                    {{item.title}}.
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {newsApi} from "../api";

    export default {
        name: "News",

        data() {
            return {
                newsApi: "",
                newsData: "",
            }
        },

        mounted() {
            this.newsApi = new newsApi();
            this.getNews();
        },

        methods: {

            /**
             * Gets headlines from the api.
             * @returns {Promise<void>}
             */
            async getNews() {
                this.newsData = await this.newsApi.fetch();
                this.cleanNewsDescription();

            },


            /**
             * Removes tags given inside of the desciption headers.
             */
            cleanNewsDescription() {
                for (let i = 0; i < this.newsData.articles.length; i++) {
                    let article = this.newsData.articles[i];
                    this.newsData.articles[i].description = article.description.replace("<i>", "").replace("</i>", "");

                }
            }

        }
    }
</script>

<style scoped>

</style>
