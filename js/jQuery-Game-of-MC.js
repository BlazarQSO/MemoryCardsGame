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
                    settings();
                }
            }
        },        
    }
    
    for (var key in actions) {
        document.getElementById(key).onclick = actions[key].onClickHandler();
    }
    
    var memory = 1;
    var second = "0";
    size = "cover";
    numBack = 1;            // This's argument imitates a choose back.      
    var intervalHandler;
    num = 1;                // This's argument imitates a choose one of decks.       
    time = 0;
    var gameTrue = 0;
    var nameGame = "Classic";
    rate = 1;
        
    function flipswitch() {        
        if ($("#fs").prop("checked")) {
            memory = 1
            gameTrue = 0;
        } else {
            memory = 0;
            gameTrue = 1;
        }
    }

    function startGame() {
        $("audio")[0].play();        
        flipswitch();
        clearInterval(intervalHandler);

        $("#time").text("00:00");
        $("#attempts").text("0");
        $("#open").text("0");

        time = 0;
        rate = 1;
        intervalHandler = setInterval(timer, 1000);

        $("#game").html("");

        var first = "0";        
        
        nameGame = $("#setName").val();
        var lvl = $("#setLvl").val();
                       

        if (nameGame == "Quads") {
        }
        else {            
        }

        var item = -1;              
        var joker = 0;                                  // This's agrument for hard game
        var count = Number(lvl[3]) * Number(lvl[5]);    // It is a sum all cards in game.
        
        var array = Array(count);

        array = random(array, count, lvl);               

        $("#lg").text(nameGame);
        $("#ll").text(": Level №" + lvl[0]);

        var input = $("#game");        

        var horiz = Math.floor((100 - lvl[5] - 1) / lvl[5]);
        var vert = Math.floor((100 - lvl[3] - 3)/ lvl[3]);        

        for (var j = 1; j <= lvl[3]; j++) {
            for (var i = 1; i <= lvl[5]; i++) {
                item++;
                $("<div/>", {
                    name: "back" + array[item],
                    id: "back" + array[item] + "c" + j + i + item,  
                    "class": "card",
                    click: function () {
                        if (gameTrue == 1) {
                            first = game(this, numBack, first, count);
                        }
                    }
                }).appendTo("#game");

                $("<figure>", {                    
                    id: "c" + j + i + item + "b",
                    "class": "back",
                }).appendTo("#back" + array[item] + "c" + j + i + item); 
                $("<figure>", {                    
                    id: "c" + j + i + item + "f",
                    "class": "front",
                }).appendTo("#back" + array[item] + "c" + j + i + item); 
            }
            input.append("<br />");
        }
                
        setTimeout(function () { draw(lvl, horiz, vert, array) }, 500);
        if (memory == 1) {
            gameTrue = 0;
            time = -10;
            $("#time").text("10");            
            setTimeout(function () { memory = 0;}, 600);
            setTimeout(function () { draw(lvl, horiz, vert, array); gameTrue = 1; }, 10000);
        }
    }
    
    function draw(lvl, horiz, vert, array) {
        var t = -1;
        for (var j = 1; j <= lvl[3]; j++) {
            for (var i = 1; i <= lvl[5]; i++) {
                if (nameGame == "Quads" && j == lvl[3] && i == (lvl[5] - 1)) {
                    return;
                }
                t++;
                var temp = $("#back" + array[t] + "c" + j + i + t);
                temp.css("margin-left", "1%");
                temp.css("margin-bottom", "0.5%");
                temp.css("width", horiz + "%");
                temp.css("height", vert + "%");

                var temp2 = $("#c" + j + i + t + "b");
                if (memory == 0) {
                    temp2.css("background-image", "url(images/back/d" + numBack + "_back.png)");
                }
                else {
                    temp2.css("background-image", "url(images/cards/deck" + num + "/" + array[t] + ".png)");
                }
                temp2.css("background-size", size);
                
                
                var temp2 = $("#c" + j + i + t + "f");                             
                temp2.css("background-size", size);
                temp2.css("border-radius", "15px");
            }
        }        
    }

    function random(array, count, lvl) {
        const deckCount = [18, 56, 56, 56, 56, 56, 16, 16, 16, 16, 12, 12];
        let numPool = Array(count);
        let allPool;        
        
        if (nameGame == "Classic") {
            if (num == 5) {
                allPool = Array(deckCount[num - 1]);
            }
            else
                if (lvl[0] <= 4) {
                    allPool = Array(16);
                }
                else
                    if (lvl[0] == 5) {
                        allPool = Array(18);
                    }
                    else
                        if (lvl[0] >= 6) {
                            if (deckCount[num - 1] > 18) {
                                allPool = Array(deckCount[num - 1]);
                            }
                            else {
                                allPool = Array(lvl[3] * lvl[5] / 2);
                            }
                        }

            var temp = 0;
            for (var t = 0; t < allPool.length; t++) {
                if (temp >= deckCount[num - 1]) {
                    temp = 0;
                }
                allPool[t] = temp + 1;
                temp++;
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
        }
        else
            if (nameGame == "Quads") {
                deckCount[0] = 16;
                if (count == 30 || count == 42) {
                    allPool = Array(count - 2);
                } else {
                    allPool = Array(count);
                }
                var n = 0;
                var temp = 0;
                if (deckCount[num - 1] < 19 || num == 4) {
                    for (var t = 0; t < allPool.length; t++) {
                        temp++;
                        if (temp <= deckCount[num - 1]) {
                            allPool[t] = t + 1;                            
                        }
                        else {
                            if (num < 11) {
                                n++;
                                allPool[t] = n;
                                t++;
                                allPool[t] = n + 4;
                                t++;
                                allPool[t] = n + 8;
                                t++;
                                allPool[t] = n + 12;
                            } else {
                                n++;
                                allPool[t] = n;
                                t++;
                                allPool[t] = n + 3;
                                t++;
                                allPool[t] = n + 6;
                                t++;
                                allPool[t] = n + 9;
                            }                            
                            if (deckCount[num - 1] == 12 && n == 3) {
                                n = 0;
                            }
                            if (deckCount[num - 1] == 16 && n == 4) {
                                n = 0;
                            }
                        }                       
                    }
                }
                else {
                    var arrTemp = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
                    53, 54, 55, 56, 25, 34, 43, 52, 24, 33, 42, 51, 23, 32, 41, 50, 22, 31, 40, 49,
                    21, 30, 39, 48, 20, 29, 38, 47, 19, 28, 37, 46, 18, 27, 36, 45, 17, 26, 35, 44];
                    for (var t = 0; t < allPool.length; t++) {                        
                        allPool[t] = arrTemp[t];
                    }
                }
                alert(allPool);
                for (var t = 0; t < count; t++) {
                    var rand = allPool[Math.floor(Math.random() * allPool.length)];
                    var del = allPool.indexOf(rand);
                    allPool.splice(del, 1);
                    array[t] = rand;                    
                }
            }
        
        return array;
    }    

    function game(elem, numBack, first, count) {
        
        var temp = elem.id.slice(0, 4);
        var len = elem.id.slice(4, elem.id.length);
        var index = len.indexOf("c");
        var card = len.slice(0, index);
        var str = len.slice(3 + card.length, len.length);
                
        if (temp == "good" || second != "0") {
            return first;
        }

        if (first == "0") {
            $("audio")[2].play();

            first = card;            
                                         
            var t = document.getElementsByClassName("front");
            t[str].style.backgroundImage = "url(/images/cards/deck" + num + "/" + card + ".png)";
            elem.classList.toggle("flip");
            
            elem.id = "good" + len;            
            
            var rank = Number($("#attempts").text());
            rank++;
            $("#attempts").text(rank);

            return first;
        }
        else {          
            var rank = Number($("#attempts").text());
            rank++;
            $("#attempts").text(rank);
                        
            var t = document.getElementsByClassName("front");
            t[str].style.backgroundImage = "url(/images/cards/deck" + num + "/" + card + ".png)";
            elem.classList.toggle("flip");

            if (nameGame == "Quads") {
                if (card <= 16 && first <= 16 && (card % 4 == first % 4) && num < 11 || 
                   (card > 16 && first > 16 && (card % 9 == first % 9) && num < 11) || (first > 52 && card > 52)
                    || (num == 4 && Math.abs(first - card) <= 3) && first % 4 == card % 4
                    || (num > 10 && first % 3 == card % 3)) {
                    $("audio")[3].play();

                    elem.id = "good" + len;
                    rate++;

                    if (rate == 4) {
                        var rank = Number($("#open").text());
                        rank++;
                        $("#open").text(rank);

                        first = "0";
                        rate = 1;
                        
                        if ($("#setLvl").val()[0] == 4 || $("#setLvl").val()[0] == 6) {
                            count = count - 2;
                        }

                        if (count / 4 == rank) {
                            clearInterval(intervalHandler);
                            time = 0;
                            $("audio")[1].play();
                        }
                    }
                    return first;
                }
                else {
                    $("audio")[4].play();
                    second = "1";
                    setTimeout(function () { back(elem, numBack) }, 1000);
                    return first;
                }
            }


            if (card != first) {
                $("audio")[4].play();
                second = "1";
                setTimeout(function () { back(elem, numBack) }, 1000);                
                return first;
            }
            else {
                $("audio")[3].play();
                var rank = Number($("#open").text());
                rank++;
                $("#open").text(rank);
                elem.id = "good" + len;
                first = "0";

                if (count / 2 == rank) {
                    clearInterval(intervalHandler);
                    time = 0;
                    $("audio")[1].play();
                    
                    var val = $("#setLvl").val();
                    if (val[0] < 9) {                        
                        var arr = ["1 (4x4)", "2 (4x5)", "3 (4x6)", "4 (5x6)", "5 (6x6)", "6 (6x7)", "7 (6x8)", "8 (7x8)"];
                        $("#setLvl").val(arr[val[0]]);
                        setTimeout(startGame, 10000);
                    }
                }
                return first;
            }
        }
    }

    function back(elem, numBack) {        
        elem.classList.toggle("flip");
        second = "0";
    }           

    function timer() {
        if (time < -1) {
            var timek = time * (-1) - 1;
            $("#time").text(timek);
            time++;            
            return;
        } else if (time == -1) {
            $("#time").text("00:00");
        }

        time++;
        
        var sec = time % 60;
        var min = (time - sec) / 60;                              

        if (sec < 10 && min < 10) {
            $("#time").text("0" + min + ":0" + sec);
        }
        else
            if (sec > 9 && min < 10) {
                $("#time").text("0" + min + ":" + sec);
            }
            else
                if (sec < 10 && min > 9) {
                    $("#time").text(min + ":0" + sec);
                }
                else
                    if (sec > 9 && min > 9) {
                        $("#time").text(min + ":" + sec);
                    }
    }

    function settings() {
        $("audio")[5].play();
        
        clearInterval(intervalHandler);
        time = 0;
        $("#time").text("00:00");
        $("#game").load("Settings.html");
        // Opera and Chrome don't download.
    }
});