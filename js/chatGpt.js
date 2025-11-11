function autoResize(textarea) {
	textarea.style.height = 'auto'
	textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px'
}

function insertQuestion(card) {
	const question = card.querySelector('h3').textContent
	const input = document.querySelector('.chat-input')
	input.value = question
	input.focus()
	autoResize(input)
}

function sendMessage() {
	const input = document.querySelector('.chat-input')
	const message = input.value.trim()

	if (message) {
		alert('Отправлено: ' + message)
		input.value = ''
		autoResize(input)

		console.log('Вопрос отправлен:', message)
	}
}

document.querySelector('.chat-input').addEventListener('keydown', function (e) {
	if (e.key === 'Enter' && !e.shiftKey) {
		e.preventDefault()
		sendMessage()
	}
})