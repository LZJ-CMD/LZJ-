function Compress(file, type, quality) {
    return new Promise(function (resolve) {
        const read = new FileReader();
        const canvas = document.createElement('canvas'); //画布
        const cxt = canvas.getContext('2d'); //画笔
        read.addEventListener('load', function () {
            base64ToBlob(this.result).then(function(blob){
                resolve(blob)
            })
        })
        read.readAsDataURL(file);
        function base64ToBlob(base64) {
            return new Promise(function (resolve) {
                let img = document.createElement('img');
                img.src = base64;
                img.addEventListener('load', function () {
                    // let { width: originWidth, height: originHeight } = this; //得到原始图片宽高;
                    // let ratio = originWidth / originHeight; //得到原始图片宽高比;
                    cxt.drawImage(img, 0, 0);
                    console.log(type, quality)
                    canvas.toBlob(function (blob) {
                        resolve(blob)
                    },
                        type, quality)
                })
            })
        }
    })
    
}