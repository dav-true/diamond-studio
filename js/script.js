var progress_counter = 0;
var exp_counter = 0;


function debounce(func, wait, immediate) {
    var timeout;

    return function executedFunction() {
        var context = this;
        var args = arguments;

        var later = function () {
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
    const interval = setInterval(() => {
        span.text(percent)
        percent++;
        if (percent > maxLength) {
            clearInterval(interval)
        }
    }, seconds * 1000 / 100)
}

function liveCounter(seconds, i, maxLength) {
    const exp = $('.exp-nums').eq(i);
    $(exp).css({
        'font-size': '25px',
        'transition': `font-size ${seconds}s `
    })
    let num = 0;
    const interval = setInterval(() => {
        exp.text(num);

        (i == 1) ? num += 10 : num++;

        if (num > maxLength) {
            exp.text(maxLength);
            clearInterval(interval);
        }
    }, seconds * 1000 / 100)
}


function pageCoords() {


    let windowHeight = window.innerHeight || document.documentElement.clientHeight;
    let pageY = window.pageYOffset || document.documentElement.scrollTop;
    const skills = document.querySelector('.skills');
    const experience = document.querySelector('.experience');

    if (pageY + windowHeight > skills.offsetTop && progress_counter == 0) {
        progress_counter++;
        fillBar(0.7, 0, 84);
        fillBar(1, 1, 89);
        fillBar(1.3, 2, 81);
    }

    if (pageY + windowHeight > experience.offsetTop && exp_counter == 0) {
        exp_counter++;
        liveCounter(1, 0, 83);
        liveCounter(1, 1, 1041);
        liveCounter(1, 2, 123);
        liveCounter(1, 3, 78);
        window.removeEventListener('scroll', pageCoords)
    }

}

function emailValidation(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function charsCounter() {
    const comment_promt = document.querySelector('.comment-prompt')
    const char = document.querySelector('.chars-counter')
    const comment_input = document.querySelector('.comment-input');
    let regularString = comment_input.value.replace(/\s/g, '');
    char.innerHTML = regularString.length;
    if (regularString.length >= 75) {
        comment_input.style.border = '1px solid #b1b1b1'
        comment_promt.style.color = 'grey'
    }

}



function showNamePrompt() {
    let regexp_name = /^[A-Za-z\-]+$/
    let name_input = document.querySelector('.name-input');
    let name_promt = document.querySelector('.name-prompt');
    name_input.placeholder = 'Name'
    if (name_input.value == "" || regexp_name.test(name_input.value) == false ) {
        name_promt.style.display = 'block'
        name_input.style.border = '1px solid red'
        return false 
    } else {
        name_promt.style.display = 'none'
        name_input.style.border = '1px solid #b1b1b1'
        return true
    }

}


function showEmailPrompt() {
    let email_input = document.querySelector('.email-input');
    let email_promt = document.querySelector('.email-prompt')
    email_input.placeholder = 'Email'
    

    if (emailValidation(email_input.value) == false || email_input.value == "") {
        email_promt.style.display = 'block'
        email_input.style.border = '1px solid red'
        return false
    } else {
        email_promt.style.display = 'none'
        email_input.style.border = '1px solid #b1b1b1'
        return true
    }

}



function showTitlePrompt() {
    let title_input = document.querySelector('.title-input');
    let title_promt = document.querySelector('.title-prompt')
    title_input.placeholder = 'Your title'
    let regexp_title = title_input.value.replace(/\s/g, '');
    if (regexp_title == "") {
        title_promt.style.display = 'block'
        title_input.style.border = '1px solid red'
        return false
    } else {
        title_promt.style.display = 'none'
        title_input.style.border = '1px solid #b1b1b1'
        return true
    }
}



function showCommentPrompt() {
    let comment_input = document.querySelector('.comment-input');
    let comment_promt = document.querySelector('.comment-prompt');
    let regularString = comment_input.value.replace(/\s/g, '');
    comment_input.placeholder = 'Your comment'

  
    if (regularString.length < 75) {
       
        comment_input.style.border = '1px solid red'
        comment_promt.style.color = 'red'
        return false
    } else {
        comment_input.style.border = '1px solid #b1b1b1'
        comment_promt.style.color = '1px solid #b1b1b1'
        return true
    }

}

window.addEventListener('DOMContentLoaded', () => {


    pageCoords();
    const body = document.querySelector('body');
    const menu_close_button = document.querySelector('[data-menu-close-button]');
    const menu_button = document.querySelector('[data-menu-button]');
    const menu = document.querySelector('[data-menu]')
    const send_button = document.querySelector('[data-send-button]')




    window.addEventListener('scroll', pageCoords);

    window.addEventListener('click', (event) => {
        var clicked_menu_anchor = function () {
            var target = event.target.className;
            if (target == "menu-anchor") {
                menu.style.right = '-100%';
                body.style.overflowY = "scroll";
            }
        }
        clicked_menu_anchor();
    })


    send_button.addEventListener('click', () => {
        let name_input = document.querySelector('.name-input');
        let email_input = document.querySelector('.email-input');
        let title_input = document.querySelector('.title-input');
        let comment_input = document.querySelector('.comment-input');
        const char = document.querySelector('.chars-counter')
        
        showNamePrompt();
        showCommentPrompt()
        showEmailPrompt()
        showTitlePrompt()


        if (showNamePrompt() == true && showEmailPrompt() == true && showTitlePrompt() == true && showCommentPrompt() == true) {
            $.ajax({
                url: 'https://testdiamond.ew.r.appspot.com/writedata ',  // https://testdiamond.ew.r.appspot.com/writedata  http://127.0.0.1:3000/writedata
                crossDomain: true,
                type: 'POST',
                dataType: "text",
                data: { name: name_input.value, email: email_input.value, title: title_input.value, comment: comment_input.value }
            });

            name_input.value = ""
            email_input.value = ""
            title_input.value = ""
            comment_input.value = ""
            char.innerHTML = '0'

            $('#exampleModalCenter').modal()


        }

    })

    menu_button.addEventListener('click', () => {
        body.style.overflowY = "hidden"
        menu.style.right = 0;
    })

    menu_close_button.addEventListener('click', () => {
        menu.style.right = '-100%';
        body.style.overflowY = "scroll"
    })


})

