<template>
    <div class="appMain">
        <div class="left-nav">
            <div class="nav-btn">|||</div>
            <div class="nav">
                <router-link to="/">Home</router-link>
            </div>
            <div class="nav">
                <router-link to="/about">About</router-link>
            </div>
        </div>
        <div class="right-nav">
            <router-view/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "appMain"
    }
</script>

<style lang="scss" scoped>
   .appMain {
        .nav {
            padding: 15px;

            a {
                font-weight: bold;
                color: #2c3e50;

                &.router-link-exact-active {
                    color: #42b983;
                }
            }
        }

        .left-nav {
            //display: none;
            position: relative;
            width: 240px;
            // height: 200px;
            background-color: #6cf;
            float: left;
            height: 100%;
            margin-right: 20px;
            // margin-left: -240px;
            .nav-btn{
                position: absolute;
                padding: 3px;
                top: 0;
                left: 240px;
                background-color: #42b983;
                cursor: pointer;
            }
        }

        .right-nav {
            overflow: hidden;
            margin-left: 20px;
            border: 1px solid #f00;
            height: calc(~"100% - 5px");
        }
    }

</style>
