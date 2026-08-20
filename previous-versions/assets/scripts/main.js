((function () {
    var backgrounds = [
        "assets/images/bg0.webp",
        "assets/images/bg1.webp",
        "assets/images/bg2.webp",
        "assets/images/bg3.jpg",
        "assets/images/bg4.svg",
        "assets/images/bg5.svg",
        "assets/images/bg6.svg",
        "assets/images/bg7.webp",
        "assets/images/bg8.webp",
        "assets/images/bg9.webp",
        "assets/images/bg10.webp",
        "assets/images/bg11.webp"
    ];
    var backgroundsMap = {};
    for (var i = 0; i < backgrounds.length; i++) {
        backgroundsMap[i] = backgrounds[i];
    }
    var bgMap = JSON.parse(JSON.stringify(backgroundsMap));
    function getUsedKeysAsString() {
        try {
            return atob(localStorage.getItem("__wbg") || "");
        } catch (exjs) {
            return "";
        }
    }
    var usedKeys = getUsedKeysAsString().split("|");
    for (var i = 0; i < usedKeys.length; i++) {
        delete bgMap[usedKeys[i]];
    }
    var availableKeys = Object.getOwnPropertyNames(bgMap);
    if (availableKeys.length === 0) {
        localStorage.removeItem("__wbg");
        bgMap = JSON.parse(JSON.stringify(backgroundsMap));
        availableKeys = Object.getOwnPropertyNames(bgMap);
    }
    var key = availableKeys.sort(function () { return Math.random() - Math.random(); })[0];
    localStorage.setItem("__wbg", btoa(getUsedKeysAsString() + key + "|"));
    var selectedBG = bgMap[key];
    var mainBG = document.getElementById("mainBG");
    var contentWrapper = document.getElementById("content_wrapper");
    var mainContent = document.getElementById("main_content");
    var textContentElem = document.getElementById("text_content");
    var topBar = document.getElementById("top_bar");
    var copyrightBar = document.getElementById("copyright_bar");
    var __landscapeMsg = "The current device orientation isn't optimized for this view. <br/>Please switch to portrait mode for an improved experience.";
    var _landscapeMsgElem = document.querySelector(".landscape-mode-msg .info");

    mainBG.style.backgroundImage = "url('" + selectedBG + "')";
    textContentElem.innerHTML = textContentElem.innerHTML.split("{{EXPERIENCE}}").join((new Date()).getFullYear() - 2006);
    copyrightBar.innerHTML = copyrightBar.innerHTML.split("{{CURRENT_YEAR}}").join((new Date()).getFullYear());
    contentWrapper.classList.remove("hidden");
    copyrightBar.classList.remove("hidden");

    document.querySelector("body").addEventListener("click", function (e) {
        if (e.target.classList.contains("connectBtn")) {
            var url = e.target.getAttribute("data-url");
            if (url) {
                window.open(url, "_blank");
            }
        }
    }, false);
    var __debounce;
    function adjustDimensions() {
        clearTimeout(__debounce);
        __debounce = setTimeout(function () {
            if (mainBG.offsetWidth >= mainBG.offsetHeight) {
                // Consider as Desktop
                if (mainBG.offsetWidth >= 1024) {
                    contentWrapper.classList.remove("mobile");
                } else {
                    // Consider as Mobile
                    contentWrapper.classList.add("mobile");
                }
            } else {
                // Consider as Mobile
                contentWrapper.classList.add("mobile");
            }
            var scaleValue;
            if (contentWrapper.offsetWidth < 750 || mainBG.offsetWidth < 1024) {
                scaleValue = (contentWrapper.offsetWidth - 20) / 750;
            } else {
                scaleValue = 1;
            }
            if (scaleValue > 1) {
                scaleValue = 1;
            }
            topBar.style.transform = "scale(" + scaleValue + "," + scaleValue + ")";
            topBar.style.transformOrigin = "0 50%";
            var newHeight = topBar.offsetHeight * scaleValue;
            var diffHeight = -1 * (topBar.offsetHeight - newHeight);
            topBar.style.marginTop = (diffHeight * scaleValue) + "px";
            topBar.style.marginBottom = (diffHeight * scaleValue) + "px";

            mainContent.style.height = "auto";
            setTimeout(function () {
                mainContent.style.height = (contentWrapper.offsetHeight - 200) + "px";
                mainContent.scrollTo(0, 0);
                setTimeout(function () {
                    if (mainBG.offsetWidth > mainBG.offsetHeight && mainBG.offsetHeight < 450) {
                        _landscapeMsgElem.innerHTML = __landscapeMsg;
                        document.documentElement.classList.add("landscape-mode");
                    } else {
                        _landscapeMsgElem.innerHTML = "";
                        document.documentElement.classList.remove("landscape-mode");
                    }
                    document.querySelector("body").style.visibility = "visible";
                }, 5);
            }, 5);
        }, 121);
    };
    window.addEventListener("resize", adjustDimensions, false);
    function checkAndShow() {
        var hiddenElem = document.getElementById("hiddenElem");
        if (getComputedStyle(hiddenElem, null)["display"] === "none") {
            adjustDimensions();
        } else {
            setTimeout(checkAndShow, 50);
        }
    };
    checkAndShow();
})());