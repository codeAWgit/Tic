'use strict'
// sqs is short for squares. Top left is [0].
let disableClick
let sqs = document.querySelectorAll('.col-3')
let comp, player, boardSpace, bSpaceObject, winner

startNewGame()

function startNewGame () {
    $('#menu').slideDown(1800)

    $('#X').click( function(){

        $('#menu').slideUp(1000)
        comp = 'O'; player = 'X';
        setTimeout(youGo, 1000)

        function youGo(){
            $('#youGo').text('X goes first.')
            $('#youGo').show()
            setTimeout(() => $('#youGo').hide(), 2000)

            boardSpace = []
            bSpaceObject = {}
            winner = false

            let len = sqs.length
            for ( let i = 0; i < len; i++) {
                    sqs[i].innerHTML = ''
            }

            setTimeout(() => enableClick(), 2000)
        }
    })

    $('#O').click( function(){

        $('#menu').slideUp(1000)
        comp = 'X'; player = 'O';
        
        boardSpace = []
        bSpaceObject = {}
        winner = false

        let len = sqs.length
        for ( let i = 0; i < len; i++) {
                sqs[i].innerHTML = ''
        }

        CPUplay()
    })
}

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
    bSpaceObject[+sqreClicked] = player

    for( let i = 0; i < len; i++) {
        sqs[i].attributes[1].value = ''
    }

    if ( boardSpace.length > 4 && boardSpace.length < 9 ) checkForWinner()
    if ( boardSpace.length === 9 ) {
        resetGame()
    }
    else {
    CPUplay()
    }
}

function CPUplay() {
    let x = Math.floor( Math.random() * 9 )
    if ( !boardSpace.includes(x) ) {
        boardSpace.push(x)
        sqs[x].innerHTML = comp
        bSpaceObject[x] = comp

        if ( boardSpace.length > 4 && boardSpace.length < 9 ) checkForWinner()
        if ( boardSpace.length === 9 ) {
            resetGame()
        }
        else {
            enableClick()
        }
        
    }
    else {
        CPUplay()
    }
}

function checkForWinner () {
    function lines(f, s, t) {

        if ( bSpaceObject[f] === bSpaceObject[s] && bSpaceObject[s] === bSpaceObject[t] && bSpaceObject[f] !== undefined) {
            winner = true
            if (winner) debugger;
            $('#youGo').text(bSpaceObject[f] + ' wins!')   
            $('#youGo').show()
            setTimeout(() => $('#youGo').hide(), 2500)
            player = ''; comp = '';
            startNewGame()
        }
    }
    lines(0,1,2)
    lines(3,4,5)
    lines(6,7,8)
    lines(0,3,6)
    lines(1,4,7)
    lines(2,5,8)
    lines(0,4,8)
    lines(2,4,6)
}

function resetGame () {
    debugger
    checkForWinner()
    if (!winner) {
        $('#youGo').text('Draw game. Try again.')   
        $('#youGo').show()
        setTimeout(() => $('#youGo').hide(), 2000)
        player = ''; comp = '';
        startNewGame()
    }
}
