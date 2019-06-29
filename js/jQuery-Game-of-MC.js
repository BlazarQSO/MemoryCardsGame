$(function () {
    // Initialization of jQuery-ui library controls.
    $("button, a")
        .button()
        .click(function (e) {
            
        });

    $("select")
        .selectmenu()
        .click(function (e) {

        });
    
    // Objects of controls
    var actions = {        
        "start": {
            title: "Start",
            onClickHandler: function (e) {
                return function () {
                    startGame();
                }
            }
        },
        "opt": {
            title: "Options",
            onClickHandler: function (e) {
                return function () {
                    
                }
            }
        },        
    }
    
    for (var key in actions) {
        document.getElementById(key).onclick = actions[key].onClickHandler();
    }
        
    function startGame() {
        var name = $("#selName").val();
        var lvl = $("#selLvl").val();

        $("#lg").text(name);
        $("#ll").text(": Level №" + lvl[0]);

        var input = $("#game");
        
        var horiz = Math.floor((100 - lvl[5] - 1) / lvl[5]);
        var vert = Math.floor((100 - lvl[3] - 3)/ lvl[3]);        

        for (var j = 1; j <= lvl[3]; j++) {
            for (var i = 1; i <= lvl[5]; i++) {
                
                $("<div/>", {
                    text: "face",
                    id: "c" + j + i,
                    position: 1,
                    "class": "card",
                    click: function () {      
                        if ($(this).text() == "face") {
                            $(this).css("background-image", "url(/css/images/shirt-2-min.png)");                            
                            $(this).text("back");
                        }
                        else {
                            $(this).css("background-image", "url(/css/images/Kc-1.png)");                            
                            $(this).text("face");
                        }
                    }
                }).appendTo("#game");
            }
            input.append("<br />");
        }

        for (var j = 1; j <= lvl[3]; j++) {
            for (var i = 1; i <= lvl[5]; i++) {
                var temp = $("#c" + j + i);
                temp.css("margin-left", "1%");
                temp.css("margin-bottom", "0.5%");
                temp.css("width", horiz + "%");
                temp.css("height", vert + "%");
                temp.css("border", "2px solid black");
                temp.css("background-image", "url(/css/images/Kc-1.png)");
            }
        }        
    }

});