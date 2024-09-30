const messageElement = document.querySelector('#message');
const greeting: string = 'Hello world!';

if (messageElement) {
    messageElement.innerHTML = greeting;
}
