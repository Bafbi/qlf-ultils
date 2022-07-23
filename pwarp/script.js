const form = document.getElementById('pwarps');

const WEBWOOK_URL = 'https://discord.com/api/webhooks/1000414847340654732/NwK-3JRhapAtWY0ZtgTNdu2X_G8bCHbgbuWsKrQM5dYh-FzMEzWGjlY0UJk1ygx8cPZq';

form.addEventListener('submit', function(e) {
    console.log('submit');
    e.preventDefault();
    const warp = document.getElementsByClassName('warp');
    const warp_time = [];
    for (let i = 0; i < 8; i++) {
        const pseudo = warp[i].firstElementChild.value;
        // time format : 10:20
        const timematch = warp[i].lastElementChild.value.match(/^([0-9]{1,2}):([0-9]{1,2})$/);
        const time = new Date

        let hours = Number(timematch[1]) + time.getHours();
        let minutes = Number(timematch[2]) + time.getMinutes();
        if (minutes > 59) {
            minutes -= 60;
            hours += 1;  
        }
        time.setMinutes(minutes);
        if (hours > 23) {
            hours -= 24;
            time.setDate(time.getDate() + 1);
        }
        time.setHours(hours);

        warp_time.push({name:pseudo, value:time.toLocaleTimeString().slice(0, 5), inline:true});
    }
    console.log(warp_time);

    const body = JSON.stringify(
        {
            username:(new Date).toLocaleDateString(),
            embeds:[{type:'rich', fields:warp_time}]
          })

    console.log(body);

    fetch(WEBWOOK_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: body
        }).then(function(response) {
            console.log(response);
        }
        ).catch(function(error) {
            console.log(error);
        }
        );

});