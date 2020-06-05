/**
 * 封装工作方法
 * */
export const utils = {
    /**
     * 添加无法显示类容马赛克处理
     * */
    _init (canvasId, imgUrl, width, height) {
        let canvasDemo = document.getElementById(canvasId),
            img = new Image(),
            ctx;
        img.src = imgUrl;
        // 获取canvas画笔
        if(canvasDemo.getContext) {
            ctx = canvasDemo.getContext("2d");
        }

        img.onload = function() {
            canvasDemo.width = width;
            canvasDemo.height = height;
            this.draw(ctx, img, width, height);
        }
    },
    draw(ctx, img, width, height) {
        if (ctx) {
            return 'canvas方法获取失败!'
        }
        ctx.drawImage(img, 0, 0, width, height);
        let oldImageData = ctx.getImageData(0, 0, width, height),
            newImageData = ctx.createImageData(width, height),
            size = 10;
        // 马赛克操作
        // 1、选取一个马赛克矩形
        // 2、从马赛克矩形中的像素信息统一调成随机抽出来的那个
        for (let i = 0; i < oldImageData.width / size; i++) {
            for (let j = 0; j < oldImageData.height / size; j++) {
                let color = this.getPxInfo(oldImageData, Math.floor(Math.random() * size) + i * size, Math.floor(Math.random() * size) + j * size);
                //console.log(color);
                for (let a = 0; a < size; a++) {
                    for (let b = 0; b < size; b++) {
                        this.setPxInfo(newImageData, a + i * size, b + j * size, color);
                    }
                }
            }
        }
        ctx.putImageData(newImageData, width, 0);

    },
    getPxInfo(imageData, x, y) {
        let color = [],
            data = imageData.data,
            w = imageData.width,
            h = imageData.height;

        if ((y * w + x) * 4 >= imageData.data.length || ((y * w + x) * 4 + 1) >= imageData.data.length || ((y * w + x) * 4 + 2) >= imageData.data.length || ((y * w + x) * 4 + 3) >= imageData.data.length) {

            // r色
            color[0] = data[Math.floor((y * w + x) * 4 / 5)];
            // g色
            color[1] = data[Math.floor((y * w + x) * 4 / 5) + 1];
            // b色
            color[2] = data[Math.floor((y * w + x) * 4 / 5) + 2];
            // 透明度
            color[3] = data[Math.floor((y * w + x) * 4 / 5) + 3];

        } else {
            // r色
            color[0] = data[(y * w + x) * 4];
            // g色
            color[1] = data[(y * w + x) * 4 + 1];
            // b色
            color[2] = data[(y * w + x) * 4 + 2];
            // 透明度
            color[3] = data[(y * w + x) * 4 + 3];
        }
//
        /*	// r色
                color[0] = data[(y * w + x) * 4];
                // g色
                color[1] = data[(y * w + x) * 4 + 1];
                // b色
                color[2] = data[(y * w + x) * 4 + 2];
                // 透明度
                color[3] = data[(y * w + x) * 4 + 3];*/

        return color;
    },
    setPxInfo(imageData, x, y, color) {
        let data = imageData.data,
            w = imageData.width,
            h = imageData.height;

        // r色
        data[(y * w + x) * 4] = color[0];
        // g色
        data[(y * w + x) * 4 + 1] = color[1];
        // b色
        data[(y * w + x) * 4 + 2] = color[2];
        // 透明度
        data[(y * w + x) * 4 + 3] = color[3];
    },
};
