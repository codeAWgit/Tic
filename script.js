'use strict'
// sqs is short for squares. Top left is [0].
let disableClick

function gamePlay () {

    let sqs = document.querySelectorAll('.col-3')
    let comp, player, boardSpace = []

    $('#menu').slideDown(1800)

    $('#X').click( function(){
        $('#menu').slideUp(1000)
        comp = 'O'; player = 'X';
        setTimeout(youGo, 1000)

        function youGo(){
            $('#youGo').show()
            setTimeout(() => $('#youGo').hide(), 2000)
            setTimeout(() => enableClick(), 2000)
        }
    })

    $('#O').click( function(){
        $('#menu').slideUp(1000)
        comp = 'X'; player = 'O';
        playBall()
    })

    function enableClick() {
        let len = sqs.length 

        for ( let i = 0; i < len; i++) {
            if (!boardSpace.includes(i)) {
                sqs[i].attributes[1].value = `this.innerHTML = "${player}"; disableClick(${i})`
            }
        }
    }

    disableClick = function (sqreClicked) {
        let len = sqs.length
        boardSpace.push(+sqreClicked)

        for( let i = 0; i < len; i++) {
            sqs[i].attributes[1].value = ''
        }

        if (boardSpace.length > 4) checkForWinner()
        playBall()
    }

    function playBall() {
        let x = Math.floor(Math.random() * 9)
        if (!boardSpace.includes(x)) {
            boardSpace.push(x)
            sqs[x].innerHTML = comp

            if (boardSpace.length > 4) checkForWinner()
            enableClick()
        }
        else {
            playBall()
        }
    }

    function checkForWinner () {
        if ( boardSpace.length === 9) {
            $('#youGo').text('Draw game. Try again.')
            $('#youGo').show()
            boardSpace = []
            setTimeout(() => $('#youGo').hide(), 2000)
            
            let len = sqs.length
            for ( let i = 0; i < len; i++) {
                    sqs[i].innerHTML = ''
            }

            gamePlay()
        }
    }
}

gamePlay()