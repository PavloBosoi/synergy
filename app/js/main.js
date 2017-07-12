'use strict';

$(function () {
    var ScreenWidth = $(window).width(),
        ScreenHeight = $(window).height(),
        btnMenu = $(".js-menu");

    //обработка тачей
    if (isTouch()){
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

    //btn-menu
    btnMenu.on('click', function(e){
        $(this).toggleClass("active");
    });


    //add estimate btn to slide menu
    function estimateBtnClone() {
        btnMenu.on('click',function(){
            var btn = $('.h-estimate').clone();
            if($(this).hasClass('active')){
                btn.prependTo('.menu ul');
            }
            else{
                btn = '';
                $('.menu ul .h-estimate').remove();
            }
        });
    }

    estimateBtnClone();

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
/*    $('.menu > ul > li').hover(
        function(){
            var ul2 = $(this).find('ul');
            if(ul2.length > 0){
                var counter = 0;
                $(this).addClass('hover');
                ul2.children('li').each(function(){
                    /!*$(this).animate({'transform': 'rotateY(0deg)'},counter);*!/

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
    );*/

    //skills block img full
    function skillsBg(){
        var img = '.skills-img',
            item = '.skills-item';
        if(item.length > 0){

            skillsSize(img,item);

/*            $(item).hover(
                function () {
                    $(this).siblings(item).addClass('disabled');
                    $(this).next(img).addClass('active');
                    $(this).addClass('active');
                },
                function () {
                    $(this).siblings(item).removeClass('disabled');
                    $(this).next(img).removeClass('active');
                    $(this).removeClass('active');
                }
            );*/

            if(ScreenWidth < 640){
                $(img).removeClass('active');
                $(item).removeClass('disabled, active');
            }

            $(item).on({
                mouseenter: function () {
                    if(ScreenWidth > 640){
                        $(this).siblings(item).addClass('disabled');
                        $(this).next(img).addClass('active');
                        $(this).addClass('active');
                    }
                },
                mouseleave: function () {
                    if(ScreenWidth > 640){
                        $(this).siblings(item).removeClass('disabled');
                        $(this).next(img).removeClass('active');
                        $(this).removeClass('active');
                    }
                }
            });
        }
    }

    function skillsSize(img,item) {
        $(img).each(function(){
            var top = $(this).prev(item).position().top,
                left = $(this).prev(item).position().left,
                width = $(this).prev(item).outerWidth(),
                height = $(this).prev(item).outerHeight();
            $(this).css({'top':top,'left':left,'width':width,'height':height});
        });
    }

    skillsBg();




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
        autoHeight: true,
        autoplay: true,
        autoplayTimeout: 3500,
        autoplayHoverPause: true,
        smartSpeed: 3500,
        mouseDrag: false,
        touchDrag: false,
        items: 1,
        loop: true,
        margin: 10,
        dots: true,
        nav: true,
        navText: [],
        onInitialized: function(e){
            $('.owl-nav,.owl-dots').wrapAll('<div class="owl-controls"/>');
            if(ScreenWidth > 640){
                var control = $('.owl-controls'),
                    height = control.outerHeight();
                height /= 2;
                control.css({'top':'50%','margin-top':-height});
            }
        }
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




    //GSAP
    // Init ScrollMagic
    var ctrl = new ScrollMagic.Controller({
        globalSceneOptions: {
            triggerHook: 0,
            tweenChanges: true
        }
    });

    var typed = new Typed('.js-change-text', {
        strings: ['1 Some <i>strings</i> with', '2 Some <strong>HTML</strong>', 'consectetur'],
        typeSpeed: 20,
        backSpeed: 40,
        backDelay: 2500,
        cursorChar: '_',
        shuffle: true,
        smartBackspace: false,
        loop: true,
        preStringTyped: function(pos, self){
            $(self.el).removeClass('active');
        },
        onStringTyped: function(pos,self){ console.log(self);
            $(self.el).addClass('active');
        }
    });

/*    $('.js-effect-text').textillate({
        initialDelay: 200,
        in: { effect: 'fadeInUp', delay: 0.5}
    });*/


    /*===ALL SECTIONS===*/

    $("section").each(function(index){
        var sectionTitle = $(this).find('.sections-title'),
            titleMain = $(this).find('.title-main'),
            textEffect = $(this).find('.js-effect-text');

        if(index <= $("section").length){

            var sTween = new TimelineMax();
            sTween.staggerFrom(titleMain, 0.5, {opacity:0, y:100, ease:Back.easeIn}, 0.1);
            sTween.set(titleMain, { className: "+=active" }, 0.5);
            sTween.staggerFrom(sectionTitle, 0.5, {opacity:0, y:100, ease:Back.easeIn}, 0.1);
            /*sTween.set(textEffect, { className: "+=active" }, 0.5);*/

            var scene = new ScrollMagic.Scene({
                triggerElement: this
            })
                .setTween(sTween)
                /*.addIndicators({name: index + " (duration: 0)"})*/
                .addTo(ctrl);

            scene.triggerHook(0.7);
        }


    });


    $(".js-effect-opacity").each(function(index){

        var sTweenOpacity = new TimelineMax();
        sTweenOpacity.set($(this), { className: "+=active" }, 0.5);

        var sceneOpacity = new ScrollMagic.Scene({
            triggerElement: this
        })
            .setTween(sTweenOpacity)
            /*.addIndicators({name: index + " (sTweenText: 0)"})*/
            .addTo(ctrl);

        sceneOpacity.triggerHook(1);
    });

    $(".js-effect-img").each(function(index){

        var sTweenImage = new TimelineMax();
        sTweenImage.set($(this), { className: "+=active" }, 0.5);

        var sceneImage = new ScrollMagic.Scene({
            triggerElement: this
        })
            .setTween(sTweenImage)
            /*.addIndicators({name: index + " (sTweenImage: 0)"})*/
            .addTo(ctrl);

        sceneImage.triggerHook(1);
    });

    $(".js-effect-text").each(function(index){

        var sTweenText = new TimelineMax();
        sTweenText.set($(this), { className: "+=active" }, 0.5);

        var sceneText = new ScrollMagic.Scene({
            triggerElement: this
        })
            .setTween(sTweenText)
            /*.addIndicators({name: index + " (sTweenText: 0)"})*/
            .addTo(ctrl);

        sceneText.triggerHook(1);
    });


    $(".js-effect-line").each(function(index){

        var sTweenLine = new TimelineMax();
        sTweenLine.set($(this),{
            className: "+=active"
        }, '+=0.1');

        var sceneLine = new ScrollMagic.Scene({
            triggerElement: this
        })
            .setTween(sTweenLine)
            /*.addIndicators({name:  " (sTweenLine: 0)"})*/
            .addTo(ctrl);

        sceneLine.triggerHook(1);
    });

    /*===Section1===*/

    var s1Tween = new TimelineMax();
    /*s1Tween.to('.title-main span', 2, {text:{value:"This is the new text", delimiter:" "}, ease:Linear.easeNone});*/
    /*s1Tween.from(title1, 1, { y: 150, opacity: 0, ease:Linear.easeNone});*/




    // Create scene1
    var scene1 = new ScrollMagic.Scene({
        triggerElement: '#scene1'
    })
        .addTo(ctrl);

    /*===Section2===*/
    var opacity = '.js-opacity',
        baseX = 100;

    var s2Tween = new TimelineMax();
    /*s1Tween.to('.title-main span', 2, {text:{value:"This is the new text", delimiter:" "}, ease:Linear.easeNone});*/
    /*s1Tween.from(title1, 1, { y: 150, opacity: 0, ease:Linear.easeNone});*/
    /*s2Tween.staggerFrom(opacity, 1, {opacity:0, ease:Back.easeIn}, 0.1);
    $('.js-img-effect').each(function(index, element) {
        //s2Tween.from(element, 0.5, {backgroundColor: '#fff'}, index * 0.2)
        s2Tween.staggerFrom($(this), 0.1, {height: '100%', ease:Back.easeIn}, 0.2);
/!*        s2Tween.insert(TweenMax.set($(this), {css:{className:'+=on'}}), '+=0.2');
        s2Tween.insert(TweenMax.set($(this), {css:{className:'-=on'}}), '+=0.5');*!/
        //s2Tween.to(element, {className:"+=show-map"},index * 0.2);
    });*/


/*    s2Tween.staggerFrom(opacity, 0.5, {opacity:0, ease:Back.easeIn}, 0.1);
    $('.skills-effect').each(function(index, element){
        s2Tween.set($(this), {
            className: "+=show"
        }, '+=0.2');
    });*/

    // Create scene2
    var scene2 = new ScrollMagic.Scene({
        triggerElement: '#scene2'
    })
        .setTween(s2Tween)
        /*.addIndicators({name: "Section2 (duration: 0)"})*/
        .addTo(ctrl);

    scene2.triggerHook(0.8);



    /*===Section3===*/
    var s3Tween = new TimelineMax();

    // Create scene3
    var scene3 = new ScrollMagic.Scene({
        triggerElement: '#scene3'
    })
        .setTween(s3Tween)
        /*.addIndicators({name: "Section2 (duration: 0)"})*/
        .addTo(ctrl);

    scene3.triggerHook(0.8);

    scene3.on("enter", function (event){

        $('.experience-number').spincrement({
            from: 0,                // Стартовое число
            to: false,              // Итоговое число. Если false, то число будет браться из элемента с классом spincrement, также сюда можно напрямую прописать число. При этом оно может быть, как целым, так и с плавающей запятой
            duration: 3500         // Продолжительность анимации в миллисекундах
        });
    });



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


    $(window).resize(function(){
        ScreenWidth = $(window).width();
        ScreenHeight = $(window).height();
        skillsBg();
        if(ScreenWidth > 1024){
            btnMenu.removeClass('active');
        }
        if(ScreenWidth > 1024 && !btnMenu.hasClass('active')){
            $('.menu ul .h-estimate').remove();
        }
    });

});