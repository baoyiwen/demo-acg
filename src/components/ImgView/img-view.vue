<template>

</template>
<script>
    export default {
        name: "img-view",
        data () {
            return {
                showImgList: this.showImgs,
            }
        },
        props: {
            showImgs: {
                type: Boolean
            }
        }
    }
</script>

<style scoped lang="less">
    img-view {

    }
    .censored {
        filter: blur(40px);
        position: relative;
    }
</style>
