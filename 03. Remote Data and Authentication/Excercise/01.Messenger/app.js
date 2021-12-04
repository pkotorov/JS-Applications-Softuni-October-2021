function attachEvents() {
    let url = 'http://localhost:3030/jsonstore/messenger';

    let inputs = document.querySelectorAll('input');

    let textArea = document.getElementById('messages');

    [author, content, submitBtn, refreshBtn] = inputs;

    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();

        fetch(url, {
            method: 'POST',
            'Content-Type': 'application/json',
            body: JSON.stringify({
               author: author.value,
               content: content.value
            })
        });

        author.value = '';
        content.value = '';
    });

    refreshBtn.addEventListener('click', (e) => {
        e.preventDefault();

        fetch(url)
            .then(body => body.json())
            .then(messages => {
                let result = [];

                Object.values(messages).forEach(message => {
                    result.push(`${message.author}: ${message.content}`);
                })

                textArea.textContent = result.join('\n');
            });
    });
}

attachEvents();