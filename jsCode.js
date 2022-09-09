function changeStylesheet(css) {
    const stylesheets = $("[rel='stylesheet']");
    if (stylesheets.length == 2) {
        var style = stylesheets[1].getAttribute('href');
        stylesheets[1].setAttribute('href', css);
    }
    else {
        addStylesheet(css);
    }
    switch (css){
        case '../retro70s.css':
            var innerArticle = document.getElementById('article-inner');
            const img1 = document.createElement('img'), img2 = document.createElement('img');
            img1.setAttribute('id', 'over-img-1');
            img1.setAttribute('src', '../images/buttfly.png');
            img2.setAttribute('id', 'over-abstract');
            img2.setAttribute('src', '../images/flower.png');
            document.getElementById('article').appendChild(img1);
            innerArticle.insertBefore(img2, innerArticle.firstChild)
            break;
        case '../manga.css':
            var js_script = document.createElement('script');
            js_script.type = "text/javascript";
            js_script.src = "https://typantheon.github.io/magazine/mangastructure.js";
            js_script.async = true;
            document.getElementsByTagName('head')[0].appendChild(js_script);
            break;
        case '../cervantes_style.css':
            break;
        case '../revo_style.css':
            break;

    }
};

function addStylesheet(fileName) {
    var link = $("<link />",{
        rel: "stylesheet",
        type: "text/css",
        href: fileName
    })
    $('head').append(link);
};

function highlight(entity) {
    var entityName = entity.getAttribute('name');
    const spans = document.getElementsByTagName("span");
    for (let i = 0; i < spans.length; i++) {
      if (spans[i].getAttribute('data-label') == entityName) {
          spans[i].classList.add('place-bg');
          spans[i].scrollIntoView({behavior: 'smooth', block: "center"}, true);
      }
      else {
          spans[i].classList.remove('place-bg');
      }
    }
}

/*documentation Selector */
$(function () {
    $('.style-instance').click(function () {
    $('#documentationSelector').find('.active').removeClass('active');
    $(this).addClass("active");
    movePointer($(this));
    showText();
  });
});

function movePointer(ele) {

  var parentScroll = $("#stylesList").scrollLeft();
  var offset = $(ele).offset().left - $('#stylesList').offset().left;
  var totalelement = offset + $(ele).outerWidth() / 2;

  var rt = $(ele).offset().left - $('#documentationWrapper').offset().left + $(ele).outerWidth() / 2;
  $('#selector').animate({
    left: totalelement + parentScroll });

}

