((function () {
    var backgrounds = [
        "https://www.ashishkumarkc.com/assets/images/bg0.png",
        "https://www.ashishkumarkc.com/assets/images/bg1.png",
        "https://www.ashishkumarkc.com/assets/images/bg2.png",
        "https://www.ashishkumarkc.com/assets/images/bg3.jpg"
    ];
    var currentBG = sessionStorage.getItem("c_bg");
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
    sessionStorage.setItem("c_bg", btoa(selectedBG));
    var mainBG = document.getElementById("mainBG");
    var contentWrapper = document.getElementById("content_wrapper");
    var mainContent = document.getElementById("main_content");
    var textContentElem = document.getElementById("text_content");
    var linkContentElem = document.getElementById("link_content");
    var topBar = document.getElementById("top_bar");
    var copyrightBar = document.getElementById("copyright_bar");

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
                        document.documentElement.classList.add("landscape-mode");
                    } else {
                        document.documentElement.classList.remove("landscape-mode");
                    }
                }, 5);
            }, 5);
        }, 121);
    };
    window.addEventListener("resize", adjustDimensions, false);
    adjustDimensions();
})());