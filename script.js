window.onload = function () {
    var elem = document.querySelector('.timer');
    var timer = new Timer(elem);
}
function Timer (elem) {
    var cur_time = Math.round(new Date().getTime() / 1000);
    var end_time = parseInt(elem.getAttribute('data-time'));

    var stop = document.querySelector('#stop');
    var start = document.querySelector('#start');
    var reset = document.querySelector('#reset');
    var data_time = document.querySelector('#data_time');

    var time = end_time - cur_time;

    var timer = setInterval(tick, 1000);

    var btn = document.querySelector('#btn');

    function tick() {
        var data_value = data_time.getAttribute('data-value');

        if (time <= 0) {
            clearInterval(timer);
            view();
            elem.innerHTML = '00: 00: 00: 00';
            return false;
        }  else if (data_value == 0) {
            clearInterval(timer);
            return false;
        }

        do {
            time--;
            view();
            pause();
            readjust();
            break;
        } while (time >= 0)
    }


    function view () {
        var days = parseInt(time / 86400);
        var dop1 = time - (days * 86400);

        var hours = parseInt(dop1 / 3600);
        var dop2 = dop1 - (hours * 3600);

        var mins = parseInt(dop2 / 60);
        var sec = dop2 - (mins * 60);
        elem.innerHTML = ('0' + days).slice(-2) + ':' + ('0' + hours).slice(-2) + ':' + ('0' + mins).slice(-2) + ':' + ('0' + sec).slice(-2);
        elem.style.fontSize = '200%';
    }


    function pause () {
        stop.onclick = function() {
            data_time.setAttribute('data-value','0');
            play();
        }
    }


    function play () {
        start.onclick = function() {
            data_time.setAttribute('data-value','1');
            var start_value = start.getAttribute('value');
            if (start_value == 0) {
                var timer = setInterval(tick, 1000);
                start.setAttribute('value', '1');
                if (start_value == 1) {
                    return false;
                }
            }
        }
    }


    function readjust () {
        reset.onclick = function () {
            time = 0;
        }
    }
}




