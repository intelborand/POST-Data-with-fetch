'use strict'

// Отправка данных из формы на сервер

const forms = document.querySelectorAll('form');

const message = {
    loading: 'img/form/spinner.svg',
    success: 'Well Done!',
    fail: 'Fail'
};

forms.forEach(item => {
    bindPostData(item);
});

const postData = async (url, data) => {
    const res = await fetch(url, {
        method: "POST",
        headers: {
                'Content-type': 'application/json'
        },
        body: data
    });

    return await res.json();
};

function bindPostData(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const statusMessage = document.createElement('img');
        statusMessage.src = message.loading
        statusMessage.style.cssText = `
            display: block;
            margin: 0, auto;
        `;
        form.insertAdjacentElement('afterend', statusMessage);


        const formData = new FormData(form);

        // Перебор объекта в объект, который тоже можно использовать! 

        // const object = {};
        // formData.forEach(function(value, key) {
        //     object[key] = value;
        // })

        // Полученный объект приводится в формат JSON и исползуется в отправке формы

        const json = JSON.stringify(Object.fromEntries(formData.entries()));   //Способ быстрого превращения объекта FormData в формат JSON   


        postData('http://localhost:3000/requests', json)
        .then(data => data.text())
        .then(data => {
            console.log(data);
            showThanksModal(message.success);
            statusMessage.remove();
        })
        .catch(() => {
            showThanksModal(message.fail);
        })
        .finally(() => {
            form.reset();
        })

    });

}