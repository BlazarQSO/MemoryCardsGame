﻿$(function () {
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
                    settings();
                }
            }
        },        
    }
    
    for (var key in actions) {
        document.getElementById(key).onclick = actions[key].onClickHandler();
    }
    
    var second = "0";
    var intervalHandler;
        
    function startGame() {
        intervalHandler = setInterval(timer, 1000);

        var first = "0";

        var name = $("#selName").val();
        var lvl = $("#selLvl").val();

        var item = -1;
        var num = 1;        // This's argument imitates a choose one of decks.
        var numBack = 1;    // This's argument imitates a choose back.        
        var joker = 0;      // This's agrument for hard game
        var count = Number(lvl[3]) * Number(lvl[5]); // It is a sum all cards in game.
        
        var array = Array(count);

        array = random(array, count, num);               

        $("#lg").text(name);
        $("#ll").text(": Level №" + lvl[0]);

        var input = $("#game");
        
        var horiz = Math.floor((100 - lvl[5] - 1) / lvl[5]);
        var vert = Math.floor((100 - lvl[3] - 3)/ lvl[3]);        

        for (var j = 1; j <= lvl[3]; j++) {
            for (var i = 1; i <= lvl[5]; i++) {
                item++;
                $("<div/>", {
                    text: "back" + array[item],
                    id: "c" + j + i,                    
                    "class": "card",
                    click: function () {
                        first = game($(this), num, numBack, first, count);
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
                temp.css("background-image", "url(images/back/d" + numBack + "_back.png)");
            }
        }        
    }

    function random(array, count, num) {
        var deckCount = [16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        let numPool = Array(count);
        let allPool = Array(deckCount[num - 1]);

        for (var t = 0; t < allPool.length; t++) {
            allPool[t] = t + 1;
        }

        for (var t = 0; t < count / 2; t++) {
            var rand = allPool[Math.floor(Math.random() * allPool.length)];
            var del = allPool.indexOf(rand);
            allPool.splice(del, 1);
            numPool[2 * t] = rand;
            numPool[2 * t + 1] = rand;
        }

        for (var i = 0; i < count; i++) {
            var rand = numPool[Math.floor(Math.random() * numPool.length)];
            var del = numPool.indexOf(rand);
            numPool.splice(del, 1);
            array[i] = rand;
        }

        return array;
    }

    function game(elem, num, numBack, first, count) {
        var temp = elem.text();
        var card = temp.slice(4, temp.length);
        temp = temp.slice(0, 4);

        if (temp == "good" || second != "0") {
            return first;
        }

        if (first == "0") {
            first = card;
            elem.css("background-image", "url(/images/cards/deck" + num + "/" + card + ".png)");
            elem.text("good");
            
            var rank = Number($("#attempts").text());
            rank++;
            $("#attempts").text(rank);

            return first;
        }
        else {
            var rank = Number($("#attempts").text());
            rank++;
            $("#attempts").text(rank);

            elem.css("background-image", "url(/images/cards/deck" + num + "/" + card + ".png)");

            if (card != first) {
                second = "1";
                setTimeout(function () { back(elem, numBack) }, 1000);                
                return first;
            }
            else {
                var rank = Number($("#open").text());
                rank++;
                $("#open").text(rank);
                elem.text("good");
                first = "0";

                if (count / 2 == rank) {
                    clearInterval(intervalHandler);
                }
                return first;
            }
        }
    }

    function back(elem, numBack) {        
        elem.css("background-image", "url(images/back/d" + numBack + "_back.png)");        
        second = "0";
    }

    function timer() {
        var time = Number($("#time").text());
        time++;
        $("#time").text(time);
    }

    function settings() {
        //$.ajax({
        //    type: "GET",
        //    url: "Settings.html",
        //    success: function (data) {                               
        //        $("#game").html(data);
        //    }
        //})

        //$("#game").html(window.open("Settings.html", "_self"));

        $("#game").load("Settings.html");
    }
});