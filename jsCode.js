function changeStylesheet(css) {
    const stylesheets = $("[rel='stylesheet']");
    if (css != 'reset') {
        /*document.getElementById('resetButton').style.display="block";*/
        $("#resetButton").show();
        if (stylesheets.length == 3) {
            var style = stylesheets[2].getAttribute('href');
            stylesheets[2].setAttribute('href', css);
        }
        else {
            addStylesheet(css); 
        }
        switch (css) {
        case '../retro60s.css':
            var innerArticle = document.getElementById('article-inner');
            const img1 = document.createElement('img'), img2 = document.createElement('img');
            img1.setAttribute('id', 'over-img-1');
            img1.setAttribute('src', '../images/buttfly.png');
            document.getElementById('article').appendChild(img1);
            const ps = document.getElementsByTagName('p');
            for (let i = 0; i < ps.length; i++) {
              if(ps[i].getAttribute('class') == 'pubnote abs') {
                img2.setAttribute('id', 'over-abstract');
                img2.setAttribute('src', '../images/flower.png');
                innerArticle.insertBefore(img2, innerArticle.firstChild);
              }
            }
            break;
        case '../cervantes_style.css':
            break;
        case '../revo_style.css':
            break;
        }
    }
    else {
        $("#resetButton").hide();
        stylesheets[2].remove();
    }
    if (css != '../retro60s.css') {
        $("#over-abstract").remove();
        $("#over-img-1").remove();
    }
    if (css != '../manga.css') {
        const scripts = document.getElementsByTagName('script');
        for (let i = 0; i < scripts.length; i++) {
            if(scripts[i].getAttribute('src')  == 'https://typantheon.github.io/magazine/mangastructure.js') {
                scripts[i].remove();
            }
        }
    }
        
};

function addStylesheet(fileName) {
    var link = $("<link />", {
        rel: "stylesheet",
        type: "text/css",
        href: fileName
    })
    $('head').append(link);
};

/* metadata */

function highlight(entity) {
    const entities = document.querySelectorAll('li[class~=bolder]');
    for (let i = 0; i < entities.length; i++) {
      entities[i].classList.remove('bolder');
    }
    entity.classList.add('bolder');
    var entityName = entity.getAttribute('name');
    const spans = document.getElementsByTagName("span");
    var a = 300;
    for (let i = 0; i < spans.length; i++) {
        if (spans[i].getAttribute('data-sort') == entityName) {
            switch (spans[i].getAttribute('class')) {
                case 'place' :
                    spans[i].classList.add('place-bg');
                    break;
                case'culture':
                    spans[i].classList.add('culture-bg');
                    break;
                case'event':
                    spans[i].classList.add('event-bg');
                    break;
                case'ritual':
                    spans[i].classList.add('rituals-bg');
                    break;
                case'languages':
                    spans[i].classList.add('language-bg');
                    break;
                case'literature':
                    spans[i].classList.add('literature-bg');
                    break;
                case'epithet':
                    spans[i].classList.add('epithet-bg');
                    break;
                case 'domain':
                    spans[i].classList.add('domain-bg');
                    break;
                case 'subject':
                    spans[i].classList.add('subject-bg');
                    break;
                case 'connections':
                    spans[i].classList.add('connection-bg');
                    break;
                case 'object':
                    spans[i].classList.add('object-bg');
                    break;
                case 'pop-culture':
                    spans[i].classList.add('pop-bg');
                    break;
                case 'morality':
                    spans[i].classList.add('morality-bg');
                    break;
                case 'powers':
                    spans[i].classList.add('powers-bg');
                    break;
            }
            if (i < a) {
                a = i
                spans[a].scrollIntoView({ behavior: 'smooth', block: "center" }, true);
            }
            if (spans[i].hasAttribute('wikidata')) {
                var link = spans[i].getAttribute('wikidata');
                var openLink = "window.open('" + link + "')"
                document.getElementById('wikiLink').style.display="block";
                document.getElementById('wikiLink').setAttribute('onclick', openLink);
            }
            else {
                document.getElementById('wikiLink').style.display="none";
            }           
        }
        else {
            spans[i].classList.remove('place-bg');
            spans[i].classList.remove('culture-bg');
            spans[i].classList.remove('literature-bg');
            spans[i].classList.remove('epithet-bg');
            spans[i].classList.remove('language-bg');
            spans[i].classList.remove('rituals-bg');
            spans[i].classList.remove('event-bg');
            spans[i].classList.remove('domain-bg');
            spans[i].classList.remove('connection-bg');
            spans[i].classList.remove('subject-bg');
            spans[i].classList.remove('powers-bg');
            spans[i].classList.remove('morality-bg');
            spans[i].classList.remove('pop-bg');
            spans[i].classList.remove('object-bg');
        }
    }
}

$(function () {
    $('.badge').click(function () {
        $(".activeBadge").removeClass("activeBadge");
        this.classList.add('activeBadge');
        var index = $(this).parent().children().index(this);
        $("#entities").find(".active").removeClass("active");
        $(".entities-list").get(index).classList.add("active");
    });
});

/*documentation Selector */
$(function () {
    $('.stylesListItem').click(function () {
        var index = $(this).parent().children().index(this);
        var secondIndex = index - 1
        var translation = 7.5 + ((index - 1) * 15);
        $("#selector").animate({ left: translation + '%' });
        $("#documentation").find(".active").removeClass("active");
        $(".documentationParagraph").get(secondIndex).classList.add("active");
    });
});



