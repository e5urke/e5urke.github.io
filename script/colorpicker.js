function innerlinings(name) {
    namediv = document.getElementById("colorName");
    namediv.classList.add(name + "ColorName");

    var btns = document.getElementsByClassName(name);
    for (let i = 0; i < btns.length; i++) 
    {
        let btn = btns[i];
        btn.addEventListener('click', function () {
            text = document.getElementById(name + "ColorName");
            document.querySelector(name + "ColorName").text = this.title;
            document.querySelector(name + "color-selected").style.backgroundColor = this.backgroundColor;

            // $(".color-selector").click(function () {
            //     $(".colorName").text(this.title);
            //     $(".color-selected").css("background-color", $(this).css("background-color"));
            // });
            // $(".color-picker").click(function () {
            //     $(".color-picker-body").toggle();
            // });
        });
    }
}

window.onload = function () 
{
    innerlinings("innerlinings");
}