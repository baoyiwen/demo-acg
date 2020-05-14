<template>
    <div class="footer-main">
        <p>
            <span>本网张只供学习交流使用,如有侵权发送邮件至511530203@qq.com</span>
            <span>编号: Byw000000001</span>
        </p>
    </div>
</template>

<script>
    export default {
        name: "FooterMain",
    }
</script>

<style scoped lang="less">
    .footer-main {
        position: relative;
        height: 120px;
        margin-top: 10px;
        background: #66ccff;
        text-align: center;
        font-size: 12px;
        color: #f0f0ff;

        & > p {
            position: absolute;
            width: 100%;
            height: 30px;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            margin: auto;
            & > span {
                display: block;
                padding: 5px;
            }
        }
    }
</style>
