var setFeaturedHeight = function() {
    var h = $(window).innerHeight() - 150;
    h = Math.max(250, Math.min(h, 600));
    $("#featured").css({ height: h });
    $("#scrollArrow").css({ "top" : h , 'cursor' : 'pointer' });
};

try { 
    setFeaturedHeight(); 
} catch(e) {
    // Try once more in case things aren't quite loaded
    $(document).ready(setFeaturedHeight);
}


$(document).ready(function () {
    var template = Handlebars.compile($("#art-template").html());
    var counts = {
        'paintings' : 0,
        'murals' : 0,
        'finishes' : 0,
    };
    for (var imgId in LSFA_DATA) {
        var data = LSFA_DATA[imgId];
        var html = template(data);
        var sec = '';
        if (data.section == 'home' || data.section == 'paintings') {
            sec = 'paintings';
        } else if (data.section == 'murals') {
            sec = 'murals';
        } else if (data.section == 'faux') {
            sec = 'finishes';
        } else {
            console.log('unknown section: ' + data.section);
        }
        var n = ++counts[sec];
        if (n > 0 && n % 4 == 0) {
            html += '  <div class="clearfix visible-lg-block"></div> ';
        }
        if (n > 0 && n % 3 == 0) {
            html += '  <div class="clearfix visible-md-block"></div> ';
        }
        if (n > 0 && n % 2 == 0) {
            html += '  <div class="clearfix visible-sm-block"></div> ';
            html += '  <div class="clearfix visible-xs-block"></div> ';
        }
        $("#" + sec + " .row").append(html); 
    }
    $("#navbar a").click(function() {
        var selector = $(this).attr('href');
        var offset = $(selector).offset();
        var scrollto = offset.top - 50; // fixed_top_bar_height = 50px
        $('html, body').animate({scrollTop:scrollto}, 200);
        return false;
    });
    $("#scrollArrow").hide().click(function() {
        $("#navbar a[href='#about']").click();
        $(this).fadeOut();
    });
    var handleScroll = function() {
        if ($(document).scrollTop() < 5) {
            $("#scrollArrow").fadeIn();
        } else {
            $("#scrollArrow").fadeOut();
        }
    };
    $(document).scroll(handleScroll);
    handleScroll();
});
