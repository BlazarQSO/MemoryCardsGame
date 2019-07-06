$("#ok").click(function () {
    var rad = $("input[name=radio-1]:checked").val();
    if (rad != undefined) {
        size = rad;
    }

    var rad = $("input[name=radio-2]:checked").val();
    if (rad != undefined) {
        numBack = rad;
    }

    var rad = $("input[name=radio]:checked").val();
    if (rad != undefined) {
        num = rad;
    }

    var rad = $("input[name=radio-3]:checked").val();
    if (rad != undefined) {
        $("section").css("background-image", "url(images/background/" + rad + ".png");
        if (isNumber(rad)) {
            $("section").css("background-size", "cover");
        } else {
            $("section").css("background-size", "auto");
        }
    }

    var rad = $("input[name=radio-4]:checked").val();
    if (rad != undefined) {
        $("aside").css("background-image", "url(images/background/" + rad + ".png");
        if (isNumber(rad)) {
            $("aside").css("background-size", "cover");
        } else {
            $("aside").css("background-size", "auto");
        }
    }

    var rad = $("input[name=radio-5]:checked").val();
    if (rad != undefined) {
        $("#border").css("background-image", "url(images/background/" + rad + ".png");
        if (isNumber(rad)) {
            $("#border").css("background-size", "cover");
        } else {
            $("#border").css("background-size", "auto");
        }
    }

    function isNumber(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); }
});