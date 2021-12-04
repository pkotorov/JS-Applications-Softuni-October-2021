function attachEvents() {
    let uri = 'http://localhost:3030/jsonstore/phonebook';

    let loadBtn = document.getElementById('btnLoad');

    let ulPhoneBook = document.getElementById('phonebook');

    let createBtn = document.getElementById('btnCreate');

    [person, phone] = document.getElementsByTagName('input');

    loadBtn.addEventListener('click', () => {
        ulPhoneBook.innerHTML = '';

        fetch(uri)
            .then(body => body.json())
            .then(entries => {
                Object.values(entries).forEach(entry => {
                    let newLiEl = document.createElement('li');
                    let deleteBtn = document.createElement('button');
                    deleteBtn.textContent = 'Delete';
                    newLiEl.textContent = `${entry.person}: ${entry.phone}`;
                    newLiEl.appendChild(deleteBtn);
                    ulPhoneBook.appendChild(newLiEl);

                    deleteBtn.addEventListener('click', (e) => {
                        fetch(`${uri}/${entry._id}`, {
                            method: 'DELETE',
                        });

                        setTimeout(() => {
                            loadBtn.click();
                        }, 1);
                    });

                })
            });
    });

    createBtn.addEventListener('click', () => {
        fetch(uri, {
            method: 'POST',
            'Content-Type': 'application/json',
            body: JSON.stringify({
                person: person.value,
                phone: phone.value
            })  
        })

        person.value = '';
        phone.value = '';
        loadBtn.click();
    });
}

attachEvents();