<template>
    <div>
        <div class="hero-head">

        </div>
        <div class="hero-body" v-for="item in this.newsData.articles" :key="item.url">
            <div class="header">
                {{item.title}}.
            </div>

            <div class="subheader">
                {{item.description}}
            </div>
        </div>
        <div class="hero-foot">

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
                console.log(this.newsData);
                this.cleanNewsDescription();

            },

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