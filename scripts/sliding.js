$(document).ready(function () {
    let imageNodes = [];
    let imagePos = [];

    for (let i = 0; i < ($(".image")).length; i++) {
        imageNodes.push($(".image").eq(i));
    }


    let firstNode = '<div class="image" id="cloned1"></div>';
    let lastNode = '<div class="image" id="cloned2"></div>';
    $(".container").prepend(firstNode);
    $(".container").append(lastNode);

    $("#cloned1").css("background-image", imageNodes[imageNodes.length - 1].css("background-image"));
    $("#cloned2").css("background-image", imageNodes[0].css("background-image"));

    imageNodes.unshift($("#cloned1"));
    imageNodes.push($("#cloned2"));

    for (let i = 0; i < imageNodes.length; i++) {
        imagePos.push(i - 1);
    }

    for (let i = 0; i < imageNodes.length; i++) {
        imageNodes[i].css({
            transform: "translateX(" + imagePos[i] * 100 + "%)"
        })
    }

    let prevX = 0;
    let mousedown = false;

    $(".container").mousedown(function (event) {
        prevX = event.pageX;
        mousedown = true;
    })

    $(".container").mousemove(function (event) {
        if (mousedown) {
            current = event.pageX - prevX;
            if (current != 0) {

                $(".image").css({
                    "transition-duration": "0s"
                })
                for (let i = 0; i < imageNodes.length; i++) {
                    imageNodes[i].css({
                        transform: "translateX(calc(" + imagePos[i] * 100 + "% + " + current + "px))"
                    })
                }
            }
        }
    })

    $(".container").mouseup(function (event) {
        console.log("up");
        $(".image").css({
            "transition-duration": "0.5s"
        })
        let diff = event.pageX - prevX;

        if (diff < 0) {

            for (let i = 0; i < imageNodes.length; i++) {
                imagePos[i] = imagePos[i] - 1;

            }

            imagePos[0] = imagePos[imagePos.length - 1] + 1;
            imageNodes[0].css({
                visibility: "hidden",
            })

            imagePos = shift(-1, imagePos);
            imageNodes = shift(-1, imageNodes);

            for (let i = 0; i < imageNodes.length; i++) {
                imageNodes[i].css({
                    transform: "translateX(" + imagePos[i] * 100 + "%)"
                })
            }

            imageNodes[imageNodes.length - 1].css({
                "background-image": imageNodes[1].css("background-image")
            })

            imageNodes[0].css({
                "background-image": imageNodes[imageNodes.length - 2].css("background-image")
            })

            setTimeout(function () {
                imageNodes[imageNodes.length - 1].css({
                    visibility: "visible",
                })
            }, 500)

        } else if (diff > 0) {



            for (let i = 0; i < imageNodes.length; i++) {
                imagePos[i] = imagePos[i] + 1;
            }

            imagePos[imagePos.length - 1] = imagePos[0] - 1;
            imageNodes[imagePos.length - 1].css({
                visibility: "hidden",
            })

            imagePos = shift(1, imagePos);
            imageNodes = shift(1, imageNodes);

            for (let i = 0; i < imageNodes.length; i++) {
                imageNodes[i].css({
                    transform: "translateX(" + imagePos[i] * 100 + "%)"
                })
            }

            imageNodes[imageNodes.length - 1].css({
                "background-image": imageNodes[1].css("background-image")
            })

            imageNodes[0].css({
                "background-image": imageNodes[imageNodes.length - 2].css("background-image")
            })

            setTimeout(function () {
                imageNodes[0].css({
                    visibility: "visible"
                })
            }, 500)
        }
        mousedown = false;
        prevX = 0;

    })


});

function shift(dir, arr) {
    if (dir == -1) {
        let tmp = arr[0];
        for (let i = 0; i < arr.length - 1; i++) {
            arr[i] = arr[i + 1];
        }
        arr[arr.length - 1] = tmp;

    }

    if (dir == 1) {
        let tmp = arr[arr.length - 1];
        for (let i = arr.length - 1; i > 0; i--) {
            arr[i] = arr[i - 1];
        }
        arr[0] = tmp;
    }

    return arr;
}