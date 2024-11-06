((function () {
    var backgrounds = [
        "assets/images/bg0.png",
        "assets/images/bg1.png",
        "assets/images/bg2.png",
        "assets/images/bg3.jpg",
        "assets/images/bg4.svg",
        "assets/images/bg5.svg",
        "assets/images/bg6.svg",
        "assets/images/bg7.png",
        "assets/images/bg8.png",
        "assets/images/bg9.png",
        "assets/images/bg10.png",
        "assets/images/bg11.png"
    ];
    var currentBG = localStorage.getItem("_wcb");
    if (currentBG) {
        try {
            backgrounds = backgrounds.filter(function (bg) {
                return bg !== atob(currentBG);
            });
        } catch (exjs) {
            /** DO NOTHING */
        }
    }
    var selectedBG = backgrounds.sort(function () { return Math.random() - Math.random(); })[0];
    localStorage.setItem("_wcb", btoa(selectedBG));
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