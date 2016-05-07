class alertbox {
    show()
    {
        var str = "Hello";
        alert(str);
    }
}

window.onload = () =>
{
    var msb = new alertbox();
    var bttn = document.getElementById("Button3");
    bttn.onclick= function ()
    {
        msb.show();
    }
};