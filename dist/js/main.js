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
        item = '.skills-item';
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
                $(this).siblings(item).addClass('disabled');
                $(this).next(img).addClass('active');
                $(this).addClass('active');
            },
            function(){
                $(this).siblings(item).removeClass('disabled');
                $(this).next(img).removeClass('active');
                $(this).removeClass('active');
            }
        );
    }


    //view all
    function heightParent(el,count){
        var height = '';
        el.each(function(index){
            if(index >= count){
                height += $(this).outerHeight();
            }
        });
        return height;
    }
    function viewAll(el,count){
        var btn = $('.js-view-all');
        el.each(function(index){
            if(index >= count){
                $(this).slideUp(500);
            }
        });
        console.log(heightParent(el,count));
        btn.on('click',function(e){
            e.preventDefault();
            if($(this).hasClass('active')){
                $(this).removeClass('active');
                //$(this).siblings('.js-view-all-parent').children().slideDown(500);
            }
            else{
                $(this).addClass('active');
                //$(this).siblings('.js-view-all-parent').children().slideDown(500);
            }
        });
    }

    //viewAll($('.case'),2);




/*=============PLUGINS==============*/

    $('.owl-carousel').owlCarousel({
        animateIn: 'fadeIn',
        animateOut: 'fadeOut',
        smartSpeed: 1500,
        mouseDrag: false,
        items: 1,
        loop: true,
        margin: 10,
        dots: true,
        nav: true,
        navText: [],
        onInitialized: function(e){
            $('.owl-nav,.owl-dots').wrapAll('<div class="owl-controls"/>');
            var height = $('.owl-controls').outerHeight();
            height /= 2;
            $('.owl-controls').css({'top':'50%','margin-top':-height});
        },
/*        onTranslate: function(e){
            $('.owl-item:not(.cloned)').each(function(){
                if($('.owl-item').hasClass('active')){
                    $(this).animate({'opacity':1},300);
                }
                else{
                    $(this).animate({'opacity':0},300);
                }
            });
        }*/
    });



    $('.experience-number').spincrement({
        from: 0,                // Стартовое число
        to: false,              // Итоговое число. Если false, то число будет браться из элемента с классом spincrement, также сюда можно напрямую прописать число. При этом оно может быть, как целым, так и с плавающей запятой
        duration: 2500         // Продолжительность анимации в миллисекундах
    });




    //GSAP
    // Init ScrollMagic
    var ctrl = new ScrollMagic.Controller({
        globalSceneOptions: {
            triggerHook: 0,
            tweenChanges: true,
            duration: ScreenHeight
        }
    });

    // Create scene
    $("section").each(function(index){

        if(index < $("section").length-1){
            new ScrollMagic.Scene({
                triggerElement: this
            })
                .setPin(this)
                .addTo(ctrl);
        }
    });


    /*===Section1===*/
    var title1 = '.title-main';

    var s1Tween = new TimelineMax();
    s1Tween.to('.title-main span', 2, {text:{value:"This is the new text", delimiter:" "}, ease:Linear.easeNone});
    /*s1Tween.from(title1, 1, { y: 150, opacity: 0, ease:Linear.easeNone});*/

    // Create scene1
    var scene1 = new ScrollMagic.Scene({
        triggerElement: '#scene1'
    })
        .addTo(ctrl);

    /*=============PLUGINS==============*/



    /*=================Validation===============*/

    /*===CONTACT===*/
    function formLabel(el){
        $(el).on('click contextmenu focusin',function(e){
            $(el).each(function(){
                if($(this).find('input').val() === '' || $(this).find('textarea').val() === ''){
                    //если инпут или текстареа не пусты
                    $(this).removeClass('active');
                }
            });
            $(this).addClass('active');
        });
        $(document).mouseup(function(e){// событие клика по веб-документу
            $(el).each(function(){
                if($(this).find('input').val() === '' || $(this).find('textarea').val() === '' && !$(this).is(e.target) && $(this).has(e.target).length === 0){
                    //если инпут или текстареа не пусты и клик был не поселектору и не по его дочерним элементам
                    $(this).removeClass('active');
                }
            });
        });
    }
    formLabel('.js-form-group');

    function validateForms(el){
        var val = el.val(),
            id = el.attr('id');
        switch (id){
            case 'js-name':
                var vName = /^[a-zA-Zа-яА-Я]+$/;
                if(val.length >= 3 && val != '' && vName.test(val)){
                    el.parent().removeClass('error').addClass('not-error');
                }
                else{
                    el.parent().addClass('error').removeClass('not-error');
                }
                break;
            case 'js-mail':
                var vMail = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
                if(val != '' && vMail.test(val)){
                    el.parent().removeClass('error').addClass('not-error');
                }
                else{
                    el.parent().addClass('error').removeClass('not-error');
                }
                break;
            case 'js-phone':
                var vPhone = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
                if(val.length >= 3 && val != '' && vPhone.test(val)){
                    el.parent().removeClass('error').addClass('not-error');
                }
                else{
                    el.parent().addClass('error').removeClass('not-error');
                }
                break;
            case 'js-message':
                if(val.length >= 3 && val != ''){
                    el.parent().removeClass('error').addClass('not-error');
                }
                else{
                    el.parent().addClass('error').removeClass('not-error');
                }
                break;
        }
    }
    $('.validate-field').on('input', function(){
        validateForms($(this));
    });


    /*=================Validation===============*/

});