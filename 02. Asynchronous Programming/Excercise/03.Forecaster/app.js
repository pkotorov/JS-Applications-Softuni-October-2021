function attachEvents() {
    let locationEl = document.getElementById('location');
    let submitEl = document.getElementById('submit');

    let currentDivEl = document.getElementById('current');

    let forecastDivEl = document.getElementById('forecast');

    let upcomingDivEl = document.getElementById('upcoming');

    let conditions = {
        Sunny: '☀',
        'Partly sunny': '⛅',
        Overcast: '☁',
        Rain: '☂',
        Degrees: '°'
    };

    submitEl.addEventListener('click', (e) => {
        e.preventDefault();

        fetch('http://localhost:3030/jsonstore/forecaster/locations')
            .then(res => res.json())
            .then(locations => {
                let searchedLocation = locations.find(n => n.name === locationEl.value);

                fetch(`http://localhost:3030/jsonstore/forecaster/today/${searchedLocation.code}`)
                    .then(body => body.json())
                    .then(currentWeather => {
                        currentDivEl.innerHTML = '';
                        forecastDivEl.style.display = 'block';

                        let divForecastsEl = document.createElement('div');
                        divForecastsEl.classList.add('forecasts');

                        let conditionSymbolEl = document.createElement('span');
                        conditionSymbolEl.classList.add('condition');
                        conditionSymbolEl.classList.add('symbol');
                        conditionSymbolEl.textContent = conditions[currentWeather.forecast.condition];
                        divForecastsEl.appendChild(conditionSymbolEl);

                        let spanConditionEl = document.createElement('span');
                        spanConditionEl.className = 'condition';
                        divForecastsEl.appendChild(spanConditionEl);

                        let cityEl = document.createElement('span');
                        cityEl.className = 'forecast-data';
                        cityEl.textContent = searchedLocation.name;
                        spanConditionEl.appendChild(cityEl);

                        let tempEl = document.createElement('span');
                        tempEl.className = 'forecast-data';
                        tempEl.textContent = `${currentWeather.forecast.low}${conditions.Degrees}/${currentWeather.forecast.high}${conditions.Degrees}`;
                        spanConditionEl.appendChild(tempEl);

                        let condEl = document.createElement('span');
                        condEl.className = 'forecast-data';
                        condEl.textContent = currentWeather.forecast.condition;
                        spanConditionEl.appendChild(condEl);

                        currentDivEl.appendChild(divForecastsEl);
                        locationEl.value = '';
                    })
                    .catch(() => {
                        forecastDivEl.textContent = 'Error';
                    });

                fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${searchedLocation.code}`)
                    .then(body => body.json())
                    .then(upcomingWeather => {
                        upcomingDivEl.innerHTML = '';

                        let divForecastInfoEl = document.createElement('div');
                        divForecastInfoEl.className = 'forecast-info';
                        upcomingDivEl.appendChild(divForecastInfoEl);

                        upcomingWeather.forecast.forEach(day => {
                            let upcomingSpanEl = document.createElement('span');
                            upcomingSpanEl.className = 'upcoming';
                            divForecastInfoEl.appendChild(upcomingSpanEl);

                            let symbolEl = document.createElement('span');
                            symbolEl.className = 'symbol';
                            symbolEl.textContent = conditions[day.condition];
                            upcomingSpanEl.appendChild(symbolEl);

                            let tempEl = document.createElement('span');
                            tempEl.className = 'forecast-data';
                            tempEl.textContent = `${day.low}${conditions.Degrees}/${day.high}${conditions.Degrees}`;
                            upcomingSpanEl.appendChild(tempEl);

                            let condEl = document.createElement('span');
                            condEl.className = 'forecast-data';
                            condEl.textContent = day.condition;
                            upcomingSpanEl.appendChild(condEl);
                        });
                    })
        })
        .catch(() => {
            forecastDivEl.style.display = 'block';
            forecastDivEl.innerHTML = 'Error';
        });
    })
}

attachEvents();