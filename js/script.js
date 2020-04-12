var progress_counter = 0;
var exp_counter = 0;
 
function fillBar(seconds, i, maxLength) {
    const bar = $('.bar-filler').eq(i);
    const span = $('.test').eq(i)
    let percent = 0;
    bar.css('transition', `width ${seconds}s ease-in-out`)
    bar.css('width', maxLength + '%')
    const interval = setInterval( () => {
        // bar.css('width', percent + '%')
        span.text(percent)
        percent++;
        if(percent > maxLength) {
            clearInterval(interval)
        }     
    }, seconds * 1000 / 100)    
}

function liveCounter (seconds, i, maxLength) {
    const exp = $('.exp-nums').eq(i);
    $(exp).css({
        'font-size': '25px',
        'transition': `font-size ${seconds}s `
    })
    let num = 0;
    const interval = setInterval ( () => {
        exp.text(num);
        
        (i == 1) ? num+=10 : num++;
        
        if(num > maxLength) {
            exp.text(maxLength);
            clearInterval(interval);
        }
    }, seconds * 1000 / 100)
}


$(document).ready(function() {

    $(window).on("scroll", function() {
        var y = $(document).scrollTop();
        var h = $(window).height()
        console.log(y+h)
        
        if(y + h > 1000 && progress_counter == 0) {
            progress_counter++;
            fillBar(0.7, 0, 84);
            fillBar(1, 1, 89);
            fillBar(1.3, 2, 81);
        }


        if(y + h > 1500 && exp_counter == 0) {
            exp_counter++;
            liveCounter(1, 0, 83);
            liveCounter(1, 1, 1041);
            liveCounter(1, 2, 123);
            liveCounter(1, 3, 78);
        }
        
        
    });

   $('.menu-button').click(function () {
        $('.menu-div').css({
            'right' : '0',
            'transition' : 'right 0.4s ease-in-out'
        })

        $('body').css('overflow-y', 'hidden')
    })

    $('.close-button').click(function () {
        $('.menu-div').css({
            'right' : '-100%',
            'transition' : 'right 0.4s ease-in-out'
        })
        
        $('body').css('overflow-y', 'scroll')
    })


  
});


window.addEventListener('DOMContentLoaded', () => {
    var y = $(document).scrollTop();
    console.log(y)
    var h = $(window).height()

    if(y+h > 1000) {
        progress_counter++;
            fillBar(0.7, 0, 84);
            fillBar(1, 1, 89);
            fillBar(1.3, 2, 81);
    }

    if(y + h > 1500) {
        exp_counter++;
        liveCounter(1, 0, 83);
        liveCounter(1, 1, 1041);
        liveCounter(1, 2, 123);
        liveCounter(1, 3, 78);
    }
})