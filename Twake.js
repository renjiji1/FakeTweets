window.addEventListener('load', function () {
    var siteWidth = 1920;
    var scale = screen.width / siteWidth;
    document.querySelector('meta[name="viewport"]').setAttribute('content', 'width=' + siteWidth + ', initial-scale=' + scale + '');
    document.getElementById("tweetBg").style.backgroundColor = 'white';
    document.getElementById("checkmarkBox").checked = true
    setInterval(Update, 100);
})
window.onclick = OnClick;
var theme = "white";
var doneChecked = true;

function OnClick() {
    ChangeTheme();
    ThemeChanges();
    CheckMark();
    if (doneChecked == document.getElementById("done").checked) {
        Done();
        if (doneChecked) {
            doneChecked = false;
        } else {
            doneChecked = true;
        }
    }
}
function Update() {
    document.getElementById("profile").onchange = PFP();
    document.getElementById("tweetImgInp").onchange = tweetImg();
    ScaleTxt();
}

function ChangeTheme() {
    let Bg = document.getElementById("tweetBg");
    if (document.getElementById("light").checked) {
        Bg.style.backgroundColor = "white";
        theme = "white";
    }
    if (document.getElementById("blue").checked) {
        Bg.style.backgroundColor = '#15202b';
        theme = "blue";
    }
    if (document.getElementById("dark").checked) {
        Bg.style.backgroundColor = "black";
        theme = "black"
    }
}
function ThemeChanges() {
    let txt = document.getElementsByName("txt");
    for (i = 0; i < txt.length; i++) {
        if (theme == "black" || theme == "blue") {
            if (txt[i] != document.getElementById("date") && txt[i] != document.getElementById("handle")) {
                txt[i].style.color = "#ffffff";
            }
            if (theme == "black") {
                txt[i].style.backgroundColor = "#000000";
            } else {
                txt[i].style.backgroundColor = "#15202b";
            }
        }
        if (theme == "white") {
            if (txt[i] != document.getElementById("date") && txt[i] != document.getElementById("handle")) {
                txt[i].style.color = "#000000";
            }
            txt[i].style.backgroundColor = "#ffffff";
        }
    }
    document.getElementById("nameTxt").style.color = document.getElementById("name").style.color;
}

function PFP() {
    var file = document.getElementById("profile").files;
    if (file.length > 0) {
        var fileReader = new FileReader();
        fileReader.onload = function (event) {
            document.getElementById("pfp").setAttribute("src", event.target.result);
        };
        fileReader.readAsDataURL(file[0])
    }
}

function CheckMark() {
    let checkmark = document.getElementById("checkmark");
    if (theme == "black" || theme == "blue") {
        checkmark.src = "CheckmarkWhite.png";
    } else {
        checkmark.src = "CheckmarkBlue.png";
    }

    let checkmarkDiv = document.getElementById("checkmarkDiv");
    if (!document.getElementById("checkmarkBox").checked) {
        checkmark.style.visibility = "hidden";        
        checkmarkDiv.style.width = "0";
        checkmarkDiv.style.height = "0";
    } else {
        checkmark.style.visibility = "visible";
        checkmarkDiv.style.width = "5%";
        checkmarkDiv.style.height = "5%";
    }
}
 
function ScaleTxt() {
    /*let txt = document.getElementsByName("txt");
    
    let comment = document.getElementById("commentNum");
    let retweet = document.getElementById("retweetNum");
    let heart = document.getElementById("heartNum");
   
    for (i = 0; i < txt.length; i++) {
        if (txt[i].value.length > 0 && txt[i] != tweet && txt[i] != comment && txt[i] != retweet && txt[i] != heart) {
            let txtLength = document.getElementById("myCanvas").getContext("2d").measureText(txt[i].value).width;
            let length = txtLength / factor * screenWidth;
            txt[i].style.width = length.toString() + "%";
        }
    }
    let txtLength = document.getElementById("myCanvas").getContext("2d").measureText(tweet.value).width;
    let spaceLength = document.getElementById("myCanvas").getContext("2d").measureText(" ").width;
    for (i = 0; i < tweet.value.length; i++) {
        if (parseInt(tweet.value[i]) == 32) {
            txtLength += spaceLength;
        }
    }*/
    let tweet = document.getElementById("Tweet");
    let txtLength = document.getElementById("myCanvas").getContext("2d").measureText(tweet.value).width;
    let factor = 5.8;
    let length = txtLength / factor;

    if (length > tweet.rows * 53) {
        tweet.rows++;
        let num = parseInt(document.getElementById("TweetPush").style.marginTop) + 2.7;
        document.getElementById("TweetPush").style.marginTop = num.toString() + "%";
    } else if (length < (tweet.rows - 1) * 53) {
        let num = parseInt(document.getElementById("TweetPush").style.marginTop) - 2.7;
        document.getElementById("TweetPush").style.marginTop = num.toString() + "%";
        tweet.rows--;
    }
    console.log(parseInt(document.getElementById("TweetPush").style.marginTop));
}
       
function tweetImg() {
    let file = document.getElementById("tweetImgInp").files;
    if (file.length > 0) {
        var fileReader = new FileReader();
        fileReader.onload = function (event) {
            document.getElementById("tweetImg").setAttribute("src", event.target.result);
        };
        fileReader.readAsDataURL(file[0])
        let img = document.getElementById("tweetImg");
        img.style.width = "100%";
        img.style.height = "100%";
        img.style.borderRadius = "5%";
    }
}
var txtWidth = [];
function Done() {
    
    if (document.getElementById("done").checked) {
        let hide = document.getElementsByName("hide");
        for (i = 0; i < hide.length; i++) {
            hide[i].style.visibility = "hidden";
        }
        let txt = document.getElementsByName("txt");
        for (i = 0; i < txt.length; i++) {
            txtWidth[i] = txt[i].style.width;
            if (txt[i] != document.getElementById("Tweet") && txt[i] != document.getElementById("commentNum") && txt[i] != document.getElementById("retweetNum")
                && txt[i] != document.getElementById("heartNum") && txt[i] != document.getElementById("shareNum")) {
                txt[i].visibility = "hidden";
                
                txt[i].style.width = "0";
                txt[i].style.height = "0";
            }
                txt[i].style.borderStyle = "none";   
        }
        document.getElementById("nameTxt").innerHTML = txt[0].value;
        document.getElementById("handleTxt").innerHTML = txt[1].value;
        document.getElementById("dateTxt").innerHTML = txt[2].value;
        document.getElementById("pfp").style.borderStyle = "none";
        let imgInp = document.getElementById("tweetImgInp");
        imgInp.style.visibility = "hidden";
        imgInp.style.width = "0px";
        imgInp.style.height = "0px";
        let img = document.getElementById("tweetImg");
        if (img.src == "file:///C:/Users/randy/Documents/FakeATweet/ImageIcon.gif") {
            img.style.visibility = "hidden";
            img.style.width = "0";
            img.style.height = "0";
        }
    } else {
        let hide = document.getElementsByName("hide");
        for (i = 0; i < hide.length; i++) {
            hide[i].style.visibility = "visible";
        }
        let txt = document.getElementsByName("txt");
        for (i = 0; i < txt.length; i++) {
            txt[i].visibility = "visible";
            txt[i].style.width = txtWidth[i];
            txt[i].style.height = "auto";
            txt[i].style.borderStyle = "dashed";
            txt[i].style.borderColor = "red";
           
        }
        document.getElementById("nameTxt").innerHTML = "";
        document.getElementById("handleTxt").innerHTML = "";
        document.getElementById("dateTxt").innerHTML = "";
        document.getElementById("pfp").style.borderStyle = "dashed";
        let imgInp = document.getElementById("tweetImgInp");
        imgInp.style.visibility = "visible";
        imgInp.style.width = "auto";
        imgInp.style.height = "auto";
        let img = document.getElementById("tweetImg");
        img.style.visibility = "visible";
        img.style.width = "auto";
        img.style.height = "90%";
    }
}
