function changeStylesheet(css) {
    const stylesheets = $("[rel='stylesheet']");
    if (stylesheets.length == 2) {
        var style = stylesheets[1].getAttribute('href');
        stylesheets[1].setAttribute('href', css);
    }
    else {
        addStylesheet(css);
    }
    if (css == '../retro70s.css') {
        var innerArticle = document.getElementById('article-inner');
        const img1 = document.createElement('img'), img2 = document.createElement('img');
        img1.setAttribute('id', 'over-img-1');
        img1.setAttribute('src', '../images/buttfly.png');
        img2.setAttribute('id', 'over-abstract');
        img2.setAttribute('src', '../images/flower.png');
        document.getElementById('article').appendChild(img1);
        innerArticle.insertBefore(img2, innerArticle.firstChild)
    }
    else if (css == '../manga.css') {
        var js_script = document.createElement('script');
        js_script.type = "text/javascript";
        js_script.src = "https://typantheon.github.io/magazine/mangastructure.js";
        js_script.async = true;
        document.getElementsByTagName('head')[0].appendChild(js_script);
    }
};

function addStylesheet(fileName) {
    var link = $("<link />",{
        rel: "stylesheet",
        type: "text/css",
        href: fileName
    })
    $('head').append(link);
}
