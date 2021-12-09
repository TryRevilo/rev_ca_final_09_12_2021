/*       accordion       */
/*  author : CSJ  */
/*  version: 1.0.1      */

$.fn.accordion = function (revImagesLength) {
    var self = $(this);

    var imgCounter = revImagesLength; //图序号

    var timer = null;

    //初始化，将图片放入手风琴盒子里
    self.children("li").each(function (index) {
        $(this).css("left", index * 50);
    });

    function rotation(counter) {
        self.children("li")
            .eq(counter)
            .stop()
            .animate(
                {
                    left: counter * 50 + "px", //将点击的图片位置放入到初始化的位置
                },
                700
            );
        self.children("li")
            .eq(counter)
            .nextAll()
            .each(function (index) {
                //对当前图片的往后的所有图片进行重新定位
                $(this)
                    .stop()
                    .animate(
                        {
                            left: 500 + counter * 50 + index * 50 + "px",
                        },
                        700
                    );
            });

        self.children("li")
            .eq(counter)
            .prevAll()
            .each(function (index) {
                //对当前图片的往前的所有图片进行重新定位
                $(this)
                    .stop()
                    .animate(
                        {
                            left: (counter - index - 1) * 50 + "px",
                        },
                        700
                    );
            });
    }

    //手风琴轮播功能实现
    self.children("li").mouseenter(function () {
        var idx = self.children("li").index(this); //获取当前点击的图片序号
        imgCounter = idx;
        rotation(idx);
        clearTimeout(timer);
        autoRotation();
    });

    let revRotationMaxCount = 12;

    if (self.children("li").length < revRotationMaxCount) revRotationMaxCount = self.children("li").length;

    //自动轮播
    function autoRotation() {
        timer = setTimeout(function () {
            if (imgCounter >= revRotationMaxCount) {
                imgCounter = 0;
            } else {
                imgCounter++;
            }
            rotation(imgCounter);
            autoRotation();
        }, 1000);
    }
    autoRotation();
};
