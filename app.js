var charSet = {
    A: {
        col0: "0011111",
        col1: "0101000",
        col2: "1001000",
        col3: "0101000",
        col4: "0011111"
    },
    B: {
        col0: "1111111",
        col1: "1001001",
        col2: "1001001",
        col3: "1001001",
        col4: "0110110"    
    },
    C: {
        col0: "0111110",
        col1: "1000001",
        col2: "1000001",
        col3: "1000001",
        col4: "1000001"       
    },
    D: {
        col0: "1111111",
        col1: "1000001",
        col2: "1000001",
        col3: "0100010",
        col4: "0011100"    
    },
    O: {
        col0: "0111110",
        col1: "1000001",
        col2: "1000001",
        col3: "1000001",
        col4: "0111110"
    },
    Y: {
        col0: "1000000",
        col1: "0100000",
        col2: "0011111",
        col3: "0100000",
        col4: "1000000"
    }
};

function show(char) {
    for(var col = 0; col<5; col ++) {
        var currentColData = charSet[char]["col"+col];

        for(var idx=0; idx<currentColData.length; idx++) {
            var bit = currentColData.charAt(idx);
            
            if(bit === "0") {
                $("#r"+idx+"c"+(col+15)).find(".fa").removeClass("red");
            } else if(bit === "1") {
                $("#r"+idx+"c"+(col+15)).find(".fa").addClass("red");                       
            }
        }    
    }
}

var interValId = "";
$(function() {
    $("#clear").click(function(e) {
        $(".fa-circle").removeClass("red");
        clearInterval(interValId);
    });
    $("#start").click(function(){
        $(".fa-circle").removeClass("red");
        clearInterval(interValId);

        var stringToDisp = "BAD BOY";
        var charArray = stringToDisp.split("");
        //console.log(charArray);
        
        //we can introduce new characters after 5-6 iterations
        //so as to not overlap
        var counter = 0;
        interValId = setInterval(function() {
            
            repaintScreen();
            
            if(counter === 0) {
                var thisChar = charArray.shift();
                if(thisChar != null) {
                    //console.log(thisChar);
                    if(thisChar == " ") {
                        counter = 1;
                    } else {
                        show(thisChar);    
                        counter = 5;
                    }
                }
                if(thisChar == null) {
                    counter = 0; //do nothing
                    //charArray = stringToDisp.split("");
                }
            } else {
                counter--;
            }
        }, 300);
    });
    $("button").click(function(e) {
        var id = this.id;
        if(id !=="clear" && id !=="start")
            show(id);
    });
    $(".container").on("click", "span", function() {
        console.log(this);

        $(this).find(".fa").toggleClass("red");
    });
});

function repaintScreen() {
    var dots = $(".container").find(".red");
    $.each(dots, function(i, val) {
        
        var itsParent = $(val).parent("span");

        $(itsParent).find(".fa").removeClass("red");
        var itsId = itsParent[0].id;
        var digit = itsId.slice(itsId.indexOf("c")+1);
        var digitMinus1 = parseInt(digit) - 1;

        var nextId = itsId.slice(0, itsId.indexOf("c")+1);
        nextId = nextId + "" + digitMinus1;

        $("#"+nextId).find(".fa").addClass("red");
    });
}