'use strict'

$('#menu').slideDown(1800)

$('#X').click( function(){
    $('#menu').slideUp(1000)
    setTimeout(youGo, 1000)

    function youGo(){
        $('#youGo').show()
        setTimeout(() => $('#youGo').hide(), 2000)
    }

    playBall()
})

$('#O').click( function(){
    $('#menu').slideUp(1000)

    playBall()
})

function playBall() {
    
}