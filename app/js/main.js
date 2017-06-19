'use strict';

$(function () {
    var ScreenWidth = $(window).width(),
        ScreenHeight = $(window).height();

    //обработка тачей
    if (isTouch()) {
        $('html').addClass('touch');
    }
    else {
        $('html').addClass('no-touch');
    }
    function isTouch() {
        try {
            document.createEvent("TouchEvent");
            return true;
        }
        catch (e) {
            return false;
        }
    }

    //scroll header menu
    $(window).on('scroll',function(){
        scrollTop($(this));
    });
    scrollTop($(window));

    function scrollTop(obj){
        if(obj.scrollTop() > 0){
            $('.header').addClass('active');
        }
        else{
            $('.header').removeClass('active');
        }
    }

    //header menu 2 level
    $('.menu > ul > li').hover(
        function(){
            var ul2 = $(this).find('ul');
            if(ul2.length > 0){
                var counter = 0;
                $(this).addClass('hover');
                ul2.children('li').each(function(){
                    /*$(this).animate({'transform': 'rotateY(0deg)'},counter);*/

                    $(this).delay(counter).queue(function() {
                        $(this).addClass("rotate").dequeue();
                    });
                    counter += 400;
                });
            }
        },
        function(){
            var ul2 = $(this).find('ul');
            if(ul2.length > 0){
                var counter = 400;
                counter *= ul2.children('li').length;
                $(this).delay(counter+400).queue(function() {
                    $(this).removeClass('hover').dequeue();
                });
                ul2.children('li').each(function(){
                    $(this).delay(counter).queue(function() {
                        $(this).removeClass("rotate").dequeue();
                    });
                    counter -= 400;
                });
            }
        }
    );

    //skills block img full
    var img = '.skills-img',
        item = '.skills-item',
        color = '#69696a';
    if(item.length > 0){
        $(img).each(function(){
            var top = $(this).prev(item).position().top,
                left = $(this).prev(item).position().left,
                width = $(this).prev(item).outerWidth(),
                height = $(this).prev(item).outerHeight();
            $(this).css({'top':top,'left':left,'width':width,'height':height});
        });

        $(item).hover(
            function(){
                $(this).siblings(item).css('color',color);
                $(this).next(img).addClass('active');
            },
            function(){
                $(this).siblings(item).css('color','#fff');
                $(this).next(img).removeClass('active');
            }
        );
    }




/*=============PLUGINS==============*/

    $('.owl-carousel').owlCarousel({
        items: 1,
        loop: true,
        margin: 10,
        dots: true,
        nav: true
    })


});