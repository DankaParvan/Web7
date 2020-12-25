
const phrases = [
    'Я люблю тебя', 'Давай сражатся вместе', 'Пошли смотреть аниме вместе', 'Я тебя тоже', 'go 1x1 zxc'
]

const btn = document.querySelector('#submit')
const field = document.querySelector('#field')
const chat = document.createElement('div')
const chatHeader = document.createElement('div')
const user = document.createElement('div')
const userImg = document.createElement('img')
const input = document.getElementById('field')

const createChat = function (userName, img) {
    user.className = 'chat_with'
    userImg.className = 'userImg'
    chatHeader.className = 'chatHeader'
    chat.className = 'chat'
    user.innerText = userName
    userImg.src = img
    userImg.width = 100
    userImg.height = 100
    userImg.alt = 'User\'s Photo'
    chatHeader.prepend(userImg, user)
    chat.prepend(chatHeader)
    document.body.prepend(chat)
}

const calculate = function (str) {
    console.log(str)
    let regex = /^[-\d(]+[+-\/*()\d]*/
    if (regex.test(str)) {
        return eval(str)
    }
    return  false
}

const getRandomPhrase = function (words) {
    return words[Math.floor(Math.random() * words.length)];
}

const sendMessage = function (messageContent, user,  time, imgSrc = 'assets/images/24331c72356f7c883ef2ea3525c74ea6.jpg') {

    let message = document.createElement('div')
    let content = document.createElement('div')
    let context = document.createElement('div')
    let sendTime = document.createElement('div')
    let messageAuthor = document.createElement('div');
    let messageAvatar = document.createElement('img')

    context.className = 'context'
    context.innerText = messageContent

    message.className = 'userMessage'

    content.className = 'content'

    sendTime.className = 'sendTime'
    sendTime.innerText =  time.getHours() + ':' + time.getMinutes()

    messageAuthor.className = 'user'
    messageAuthor.innerText = user

    messageAvatar.className = 'messageAvatar'
    messageAvatar.src = imgSrc

    if (user === 'Asuna(you)') {
        message.classList.add('my_message')
        message.style.cursor = 'pointer';
        message.style.marginLeft = '28%';
        message.style.background = 'cornflowerblue';
        messageAuthor.style.color = 'ghostwhite'
    }

    content.append(context, sendTime)
    message.append(messageAvatar, messageAuthor, content)
    chat.append(message)
    return message
}

createChat('Kirito', 'assets/images/zHnmkmB.jpg')

btn.addEventListener('click', function () {
    let fieldValue = field.value
    let str = fieldValue.replace(/\s+/g, '');
    if (str !== '') {
        sendMessage(fieldValue, 'You', new Date())
            .addEventListener('click', function () {
                if (this.classList.contains('selected')) {

                    this.firstChild.remove()
                    this.classList.remove('selected')

                } else {

                    let removeButton = document.createElement('a')
                    removeButton.className = 'removeButton'
                    removeButton.innerHTML = 'X'
                    this.classList.add('selected')

                    removeButton.addEventListener('click', function () {
                        chat.removeChild(this.parentElement)
                    })

                    this.prepend(removeButton)
                }
            })

        let botText = getRandomPhrase(phrases)
        let messagesContext = chat.querySelectorAll('.context')
        let calculation = calculate(messagesContext[messagesContext.length - 1].textContent)

        if (calculation)
            sendMessage(calculation , user.textContent, new Date(), userImg.src)
        else
            sendMessage(botText, user.textContent, new Date(), userImg.src)

        location.href = '#submit'
    }
    input.value = ''
})

document.addEventListener('keydown', function (evt) {
    if (evt.code === 'Enter') {
        btn.click()
        input.value = ''
    }
})

