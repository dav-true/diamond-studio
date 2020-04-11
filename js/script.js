
$(document).ready(function() {
    
   
    
   function fillBar(seconds, i, maxLength) {
        const bar = $('.bar-filler').eq(i);
        const span = $('.test').eq(i)
        let percent = 0;
        
        const interval = setInterval( () => {
            bar.css('width', percent + '%')
            span.text(percent)
            percent++;
            if(percent > maxLength) {
                clearInterval(interval)
            }     
        }, seconds * 1000 / 100)
            
    }

    var counter = 0;


    $('body').on("mousewheel", function() {
        var y = $(document).scrollTop();
        var h = $(window).height()
        console.log(y)
        
        if(y + h > 1100 && counter == 0) {
            counter++;
            fillBar(0.5, 0, 84);
            fillBar(0.8, 1, 89);
            fillBar(1.1, 2, 81);
        }
    });

  
});