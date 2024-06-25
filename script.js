document.getElementById('messageForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const message = document.getElementById('message').value;

    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                loadMessages();
                document.getElementById('message').value = '';
            } else {
                alert('Error submitting message');
            }
        });
});

function loadMessages() {
    fetch('/messages')
        .then(response => response.json())
        .then(data => {
            const messagesDiv = document.getElementById('messages');
            messagesDiv.innerHTML = '';
            data.messages.forEach(msg => {
                const messageElement = document.createElement('div');
                messageElement.innerHTML = msg.message;
                messagesDiv.appendChild(messageElement);
            });
        });
}

function readPswFile() {
    fetch('/psw.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('pswContent').innerText = 'Username: ' + data.username + ', Password: ' + data.password;
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}


window.readPswFile = readPswFile;

window.onload = function() {
    loadMessages();
    //readPswFile();
};
