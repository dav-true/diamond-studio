var progress_counter = 0;
var exp_counter = 0;

console.time("time");

function debounce(func, wait, immediate) {
    var timeout;

    return function executedFunction() {
        var context = this;
        var args = arguments;
            
        var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
        };

        var callNow = immediate && !timeout;

        clearTimeout(timeout);

        timeout = setTimeout(later, wait);

        if (callNow) func.apply(context, args);
        };
        
};

function fillBar(seconds, i, maxLength) {
    const bar = $('.bar-filler').eq(i);
    const span = $('.test').eq(i)
    let percent = 0;
    bar.css('transition', `width ${seconds}s ease-in-out`)
    bar.css('width', maxLength + '%')
    const interval = setInterval( () => {
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


function pageCoords () {

    let pageY = window.pageYOffset || document.documentElement.scrollTop;
    let windowHeight = window.innerHeight || document.documentElement.clientHeight;
    
    if(pageY + windowHeight > 1000 && progress_counter == 0) {
        progress_counter++;
            fillBar(0.7, 0, 84);
            fillBar(1, 1, 89);
            fillBar(1.3, 2, 81);
    }

    if(pageY + windowHeight > 1420 && exp_counter == 0) {
        exp_counter++;
        liveCounter(1, 0, 83);
        liveCounter(1, 1, 1041);
        liveCounter(1, 2, 123);
        liveCounter(1, 3, 78);
        window.removeEventListener('scroll', pageCoords)
    }

}


window.addEventListener('DOMContentLoaded', () => {
    pageCoords () 

    const menu_close_button = document.querySelector('[data-menu-close-button]');
    const menu_button = document.querySelector('[data-menu-button]');
    const menu = document.querySelector('[data-menu]')
    
    console.timeEnd('time')
    window.addEventListener('scroll', pageCoords); 
    
    menu_button.addEventListener('click', () => {
        menu.style.right = 0;
    })

    menu_close_button.addEventListener('click', () => {
        menu.style.right = '-100%';
    })

})

