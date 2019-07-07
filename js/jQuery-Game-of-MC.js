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
        
    function flipswitch() {        
        if ($("#fs").prop("checked")) {
            memory = 1            
        } else {
            memory = 0;            
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
        intervalHandler = setInterval(timer, 1000);

        $("#game").html("");

        var first = "0";        

        var name = $("#selName").val();
        var lvl = $("#selLvl").val();

        var item = -1;              
        var joker = 0;                                  // This's agrument for hard game
        var count = Number(lvl[3]) * Number(lvl[5]);    // It is a sum all cards in game.
        
        var array = Array(count);

        array = random(array, count, lvl);               

        $("#lg").text(name);
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
                        first = game(this, numBack, first, count);
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
            time = -10;
            $("#time").text("10");            
            setTimeout(function () { memory = 0;}, 600);
            setTimeout(function () { draw(lvl, horiz, vert, array) }, 10000);
        }
    }
    
    function draw(lvl, horiz, vert, array) {
        var t = -1;
        for (var j = 1; j <= lvl[3]; j++) {
            for (var i = 1; i <= lvl[5]; i++) {
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
        const deckCount = [18, 54, 52, 52, 50, 16, 16, 16, 12, 16, 12, 54];
        let numPool = Array(count);
        let allPool;        
        
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
        $("#game").load("settings.html");
    }
});