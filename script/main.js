boxShadowSelected = '0px 0px 0px 1px black';
boxShadowNotSelected = "0 7px 13px 0 rgb(86 95 102 / 7%)";

function setBlendImages ()
{
    baseBlend = document.querySelector(".base-colors-blend");
    baseBlend.style.backgroundImage = "url(images/base_colors/" + currentGloveType + "/bc_inverted.png)";

    liningBlend = document.querySelector(".lining-colors-blend");
    liningBlend.style.backgroundImage = "url(images/inner_linings/" + currentGloveType + "/il_inverted.png)";

    ttBaseBlend = document.querySelector(".two-tone-base-colors-blend");
    ttBaseBlend.style.backgroundImage = "url(images/base_colors/" + currentGloveType + "/twotone/tt_inverted.png)";

    if( "handnaht" == currentGloveType )
    {
        ttStitchBlend = document.querySelector(".two-tone-stitch-colors-blend");
        ttStitchBlend.style.backgroundImage = "url(images/stitching/" + currentGloveType + "/twotone/st_tt_inverted.png)";

        stitchBlend = document.querySelector(".stitch-colors-blend");
        stitchBlend.style.backgroundImage = "url(images/stitching/" + currentGloveType + "/st_inverted.png)";
    }
}

function setOutline( button )
{    
    button.classList.add("selected");
    button.style.boxShadow = boxShadowSelected;
}

function removeOutline( button )
{
    button.style.boxShadow = boxShadowNotSelected;
    button.classList.remove('selected');
}

function setLeather( button )
{
    currentLeatherType = button.dataset.name;
    leatherBlend = document.querySelector(".leather-image-blend");

    if( "lamm" == currentLeatherType )
    {
        leatherBlend.style.display = "none";
        leather_image.style.display = "none";
    }
    else 
    {       
        leatherBlend.style.display = "flex";
        leatherBlend.style.backgroundImage = "url(images/leather/" + currentGloveType + "/lt_" + currentLeatherType + "_inverted.png)";
    }
}

window.onload = function () 
{
    // Buttons
    const leatherTypeBtns   = document.querySelectorAll('.leather-type');
    const gloveTypeBtns     = document.querySelectorAll('.glove-type');
    const mainColorBtns     = document.querySelectorAll(".main-color-btn");
    const liningColorBtns   = document.querySelectorAll(".inner-lining-btn");
    const stitchColorBtns   = document.querySelectorAll(".stitch-btn");
    const twoToneColorBtns  = document.querySelectorAll(".two-tone-base-color-btn");
    const color_dropdown    = document.getElementById('color-dropdown');
        
    // global vars
    currentGloveType = document.querySelector(".glove-type.selected").dataset.name;
    currentLeatherType = document.querySelector(".leather-type.selected").dataset.name;
    currentLiningColor = "#6e7172";
    currentStitchColor = "#6e7172";
    currentTTColor = "#6e7172";
    currentBaseColor = "#6e7172";
    
    twoToneActive = false;

    // images
    leather_image = document.querySelector(".leather-image");
    maincol_image = document.querySelector('.base-images');
    fingcol_image = document.querySelector('.inner-linings');
    twotone_image = document.querySelector('.two-tone-base-img');
    stitch_image = document.querySelector('.stitch');
    stitch_tt_image = document.querySelector('.two-tone-stitch-img');
    
    setBlendImages();

    const colorList = new Map();
    colorList.set("white",  "rgb(250, 250, 250");
    colorList.set("red",    "rgb(245, 14, 14)");
    colorList.set("black",  "rgb(50, 50, 50)");
    colorList.set("grey",   "rgb(128, 128, 128)");
    colorList.set("royal",  "rgb(19, 109, 204)");
    colorList.set("orange", "rgb(255, 80, 0)");

    // Leather type buttons
    document.querySelector('.leather-type.selected').style.boxShadow = boxShadowSelected;
    for( let i = 0; i < leatherTypeBtns.length; i++ )
    {
        let btn = leatherTypeBtns[i];

        btn.addEventListener("click", function()
        {
            buttonSelected = document.querySelector('.leather-type.selected');
            removeOutline(buttonSelected);
            setOutline(this);
            setLeather(this);    
        });
    }

    // Glove type buttonss
    document.querySelector('.glove-type.selected').style.boxShadow = boxShadowSelected;
    for (let i = 0; i < gloveTypeBtns.length; i++) 
    {
        let btn = gloveTypeBtns[i];        

        btn.addEventListener('click', function() 
        {
            buttonSelected = document.querySelector('.glove-type.selected');
            removeOutline(buttonSelected);
            setOutline(this);
            
            currentGloveType = this.dataset.name;

            maincol_image.src = "images/base_colors/" + currentGloveType + "/bc_grey.png";
            fingcol_image.src = "images/inner_linings/" + currentGloveType + "/il_grey.png";
            twotone_image.src = "images/base_colors/" + currentGloveType + "/twotone/tt_grey.png";
            
            document.querySelector('.base-colors-blend').style.backgroundColor = colorList.get(currentBaseColor);
            document.querySelector('.base-colors-blend').style.backgroundImage = colorList.get(currentBaseColor);
            document.querySelector('.lining-colors-blend').style.backgroundColor = colorList.get(currentLiningColor);
            document.querySelector('.two-tone-base-colors-blend').style.backgroundColor = colorList.get(currentTTColor);
            document.querySelector('.two-tone-stitch-colors-blend').style.backgroundColor = colorList.get(currentStitchColor);

            setBlendImages();
            
            if ("handnaht" != currentGloveType) 
            {
                document.querySelector(".stitch").style.display = "none";
                document.querySelector(".two-tone-stitch-colors-blend").style.display = "none";
                document.querySelector(".stitch-colors-blend").style.display = "none";
                document.querySelector(".two-tone-stitch-img").style.display = "none";
                document.querySelector(".stitch-color-separator").style.display = "none";
                document.querySelector(".stitch-title").style.display = "none";
                document.querySelector(".stitch-color-btns").style.display = "none";
            }
            else 
            {
                document.querySelector('.stitch').style.display = "flex";
                document.querySelector(".stitch-colors-blend").style.display = "flex";
                document.querySelector('.stitch-title').style.display = "flex";
                document.querySelector('.stitch-color-separator').style.display = "block";
                document.querySelector('.stitch-color-btns').style.display = "block";
                
                if (twoToneActive)
                {
                    document.querySelector(".two-tone-stitch-colors-blend").style.display = "flex";
                    document.querySelector(".two-tone-stitch-img").style.display = "flex";
                }
            }
            setLeather(document.querySelector(".leather-type.selected"));
        });
    }

    // Base color buttons
    document.querySelector(".base-colors-blend").style.backgroundColor = currentBaseColor;
    for (let i = 0; i < mainColorBtns.length; i++) 
    {
        let btn = mainColorBtns[i];
        btn.addEventListener('click', function() 
        {
            currentBaseColor = this.style.backgroundColor;
            document.querySelector(".base-colors-blend").style.backgroundColor = currentBaseColor;
        });
    }

    // Inner-lining colors
    document.querySelector(".lining-colors-blend").style.backgroundColor = currentLiningColor;
    for( let i = 0; i < liningColorBtns.length; i++)
    {
        let btn  = liningColorBtns[i];
        btn.addEventListener("click", function()
        {
            currentLiningColor = this.style.backgroundColor;
            document.querySelector(".lining-colors-blend").style.backgroundColor = currentLiningColor;
        });
    }

    // Stitching colors
    document.querySelector(".stitch-colors-blend").style.backgroundColor = currentStitchColor;
    document.querySelector(".two-tone-stitch-colors-blend").style.backgroundColor = currentStitchColor;
    for (let i = 0; i < stitchColorBtns.length; i++)
     {
        let btn = stitchColorBtns[i];

        btn.addEventListener('click', function() 
        {
            currentStitchColor = this.style.backgroundColor;

            document.querySelector(".stitch-colors-blend").style.backgroundColor = currentStitchColor;
            document.querySelector(".two-tone-stitch-colors-blend").style.backgroundColor = currentStitchColor;
        });
    }
    
    // Two-Tone dropdown
    color_dropdown.addEventListener('change', function()
     {
        ttlabels = document.querySelectorAll('.two-tone-label-text');

        if ("single" == this.value) 
        { 
            twoToneActive = false;
            document.querySelector('.main-color-btns').style.display="block";
            
            document.querySelector('.two-tone-base-color-btns').style.display='none';
            document.querySelector('.two-tone-base-img').style.display='none';
            document.querySelector('.two-tone-stitch-img').style.display='none';
            document.querySelector('.two-tone-base-colors-blend').style.display='none';
            document.querySelector('.two-tone-stitch-colors-blend').style.display='none';
            document.querySelector(".two-tone-separator").style.display="none";
            
            for (let i = 0; i < ttlabels.length; i++)
                ttlabels[i].style.display='none';
        }
        else 
        {
            twoToneActive = true;
            document.querySelector('.two-tone-base-color-btns').style.display="block";

            for (let i = 0; i < ttlabels.length; i++) 
                ttlabels[i].style.display='flex';
            
            // update tt image
            document.querySelector('.two-tone-base-img').style.display='flex';
            document.querySelector('.two-tone-base-colors-blend').style.display='flex';
            document.querySelector(".two-tone-separator").style.display="block";
            
            // tt_sel = document.querySelector('.two-tone-base-color-btn.selected').dataset.name;
            document.querySelector(".two-tone-base-colors-blend").style.backgroundColor = currentTTColor;
            
            if ("handnaht" == currentGloveType)
            {
                document.querySelector('.two-tone-stitch-colors-blend').style.display='flex';
                document.querySelector('.two-tone-stitch-img').style.display='flex';
            }
        }
    });

    // Two-Tone color buttons
    for (let i = 0; i < twoToneColorBtns.length; i++) 
    {
        let btn = twoToneColorBtns[i];

        btn.addEventListener('click', function()
         {
            currentTTColor = this.style.backgroundColor;
            document.querySelector(".two-tone-base-colors-blend").style.backgroundColor = currentTTColor;

            if ("handnaht" != currentGloveType)
            {
                document.querySelector('.two-tone-stitch-colors-blend').style.display='none';
                document.querySelector('.two-tone-stitch-img').style.display = "none";
            }  
        });
    }
}