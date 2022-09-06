
var pages = document.getElementsByClassName('page');

// numPage is the page where the htmlElement is going to be inserted
function distributeContentOnPage(numPage, htmlElement) {
    if (numPage+1 > 2 && numPage+1 < pages.length-2){ // Two pages from each cover 
        pages[numPage+1].innerHTML += htmlElement;     // Plus one because counting starts from 1
        return true; // To avoid issues with asynchronus response awaited from this listener 
    }else{
        return false;
    }
}

// Same but accepts several elements at once so you don't have to call it too many times
// Layout is 2D array e.g.: [[numPage, htmlElement],...]]
function distributeContentOnPages(layout) {
    var validPageRange=(pages.length-2)-2;  // Two pages from each cover
    if (layout.length <= validPageRange){
        for(var index=2; index<pages.length-2; index++) {
            var pageNum=layout[index-2][0]+1; // Plus one because counting starts from 1
            if (pageNum > 2 && pageNum < pages.length-2){
                pages[pageNum].innerHTML += layout[index-2][1];
            }else{
                continue; // Invalid page number is skipped
            }
        }
        return true; // To avoid issues with asynchronus response awaited from this listener 
    }else{
        return false;
    }
}

// DOMContentLoaded waits for all base HTML to be loaded before processing just after deferred load
document.addEventListener('DOMContentLoaded', () => {
    for(var index = 0; index < pages.length; index++){
        var page = pages[index];
        if(index != 0 && index != 1 && index != pages.length-1 && index != pages.length-2){
            var number=document.createElement('span');
            number.textContent = index-1;
            number.classList.add('pageNumber');
            page.appendChild(number);
        }
        if (index == 0){
            createFrontCover();
        }else if (index == pages.length-1){
            createBackCover();
        }
        if (index % 2 === 0){
            page.style.zIndex = (pages.length - index);
        }
        page.pageIndex = index + 1;
        page.onclick=function(event){
            playFlipAudio();
            if (event.target.pageIndex % 2 == 0){
                event.target.classList.remove('flipped');
                event.target.previousElementSibling.classList.remove('flipped');
            }else{
                event.target.classList.add('flipped');
                event.target.nextElementSibling.classList.add('flipped');
            }
        }
    }
    return true;  // To avoid issues with asynchronus response awaited from this listener 
});

function createFrontCover(){
    var firstPage= pages[0];
    var boundingBox=firstPage.getBoundingClientRect();

    var div=document.getElementById("frontCover");
    var svg=document.createElementNS("http://www.w3.org/2000/svg", "svg");
    var group=document.createElementNS("http://www.w3.org/2000/svg","g");

    var pageWidth=boundingBox.width;
    var pageHeight=boundingBox.height;
    const padding=30;
    svg.setAttribute("width", pageWidth);
    svg.setAttribute("height", pageHeight);
    svg.style="position:absolute;"

    group.setAttribute("stroke", "rgb(194, 121, 41)");
    group.setAttribute("stroke-width", "4px");
    group.setAttribute("fill", "none");

    // Outer inner rectangle
    var outerRect=document.createElementNS("http://www.w3.org/2000/svg","rect");
    outerRect.setAttribute('x', padding);
    outerRect.setAttribute('y', padding);
    outerRect.setAttribute('width', pageWidth-(padding*2));
    outerRect.setAttribute('height', pageHeight-(padding*2));

    group.appendChild(outerRect);
    svg.appendChild(group);
    div.prepend(svg);

    return true;
}

function createBackCover(){
    var lastPage= pages[pages.length-1];
    var boundingBox=lastPage.getBoundingClientRect();

    var div=document.getElementById("backCover");
    var svg=document.createElementNS("http://www.w3.org/2000/svg", "svg");
    var group=document.createElementNS("http://www.w3.org/2000/svg","g");

    var pageWidth=boundingBox.width;
    var pageHeight=boundingBox.height;
    const padding=30;
    svg.setAttribute("width", pageWidth);
    svg.setAttribute("height", pageHeight);

    group.setAttribute("stroke", "rgb(194, 121, 41)");
    group.setAttribute("stroke-width", "4px");
    group.setAttribute("fill", "none");

    // Outer inner rectangle
    var outerRect=document.createElementNS("http://www.w3.org/2000/svg","rect");
    outerRect.setAttribute('x', padding);
    outerRect.setAttribute('y', padding);
    outerRect.setAttribute('width', pageWidth-(padding*2));
    outerRect.setAttribute('height', pageHeight-(padding*2));

    // First inner rectangle
    var firstRingRect = document.createElementNS("http://www.w3.org/2000/svg","rect");
    firstRingRect.setAttribute('x', padding*1.5);
    firstRingRect.setAttribute('y', padding*1.5);
    firstRingRect.setAttribute('width', pageWidth-(padding*2)*1.5);
    firstRingRect.setAttribute('height', pageHeight-(padding*2)*1.5);

    // Second inner rectangle
    var seconInnerRect = document.createElementNS("http://www.w3.org/2000/svg","rect");
    seconInnerRect.setAttribute('x', padding*2);
    seconInnerRect.setAttribute('y', padding*2);
    seconInnerRect.setAttribute('width', pageWidth-(padding*2)*2);
    seconInnerRect.setAttribute('height', pageHeight-(padding*2)*2);
    
    group.appendChild(outerRect);
    group.appendChild(firstRingRect);
    group.appendChild(seconInnerRect);

    svg.appendChild(group);
    div.appendChild(svg);

    return true;
}

// Flip audio effects
var audio = null;
function loadAudio(url){
    this.audio = new Audio(url);
}

function playFlipAudio(){
    audio.currentTime = 0;
    audio.play();
}