function getInfo() {
    let stopIdEl = document.getElementById('stopId');

    let stopNameEl = document.getElementById('stopName');

    let busesEl = document.getElementById('buses');

    busesEl.innerHTML = '';
    stopNameEl.innerHTML = '';

    fetch(`http://localhost:3030/jsonstore/bus/businfo/${stopIdEl.value}`)
        .then(res => res.json())
        .then((result) => {
            let stopName = result.name;
            stopNameEl.textContent = stopName;

            Object.entries(result.buses).forEach(([bus, time]) => {
                let newLiEl = document.createElement('li');
                newLiEl.textContent = `Bus ${bus} arrives in ${time} minutes`;

                busesEl.appendChild(newLiEl);
            })
        })
        .catch(error => {
            stopNameEl.textContent = 'Error';
        });

    stopIdEl.value = ''; 
}