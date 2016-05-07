var alertbox = (function () {
    function alertbox() {
    }
    alertbox.prototype.show = function () {
        var str = "Hello";
        alert(str);
    };
    return alertbox;
})();
window.onload = function () {
    var msb = new alertbox();
    var bttn = document.getElementById("Button3");
    bttn.onclick = function () {
        msb.show();
    };
};
//# sourceMappingURL=alert.js.map