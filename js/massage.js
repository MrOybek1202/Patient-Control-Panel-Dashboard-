document.addEventListener('DOMContentLoaded', () => {
	const fadeElems = document.querySelectorAll(".fade-in")

	fadeElems.forEach((el, index) => {
		setTimeout(() => el.classList.add("show"), index * 200)
	})

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) entry.target.classList.add("show")
		})
	}, { threshold: 0.2 })

	fadeElems.forEach((el) => observer.observe(el))

	const tabs = document.querySelectorAll('.filter-tab')
	const conversationPanel = document.querySelector('.conversation-panel')
	const appointmentSection = document.querySelector('.appointment-section')
	const labResultSection = document.querySelector('.lab-result-section')
	const messageList = document.querySelector('.message-list')
	const scheduleList = document.querySelector('.schedule-list')

	function initializeSections() {
		showSection('all', false)
	}

	tabs.forEach(tab => {
		tab.addEventListener('click', () => {
			tabs.forEach(t => t.classList.remove('active'))
			tab.classList.add('active')
			showSection(tab.textContent.trim().toLowerCase())
		})
	})

	function showSection(name, animate = true) {
		const allSections = [conversationPanel, appointmentSection, labResultSection]
		const allLists = [messageList, scheduleList]

		allSections.forEach(el => hideElement(el, animate))
		allLists.forEach(el => hideElement(el, animate))

		setTimeout(() => {
			switch (name) {
				case 'all':
					showElement(conversationPanel, 'flex', animate)
					showElement(messageList, 'flex', animate)
					break
				case 'appointment':
					showElement(appointmentSection, 'flex', animate)
					showElement(scheduleList, 'flex', animate)
					break
				case 'lab result':
					showElement(labResultSection, 'flex', animate)
					break
			}
		}, animate ? 300 : 0)
	}

	function showElement(element, displayType = 'block', animate = true) {
		if (!element) return
		element.style.display = displayType

		if (animate) {
			element.classList.add('fade-in')
			requestAnimationFrame(() => {
				element.classList.add('show')
				element.style.opacity = '1'
			})
		} else {
			element.style.opacity = '1'
			element.classList.add('show')
		}
	}

	function hideElement(element, animate = true) {
		if (!element) return
		if (animate) {
			element.classList.remove('show')
			element.style.opacity = '0'
			setTimeout(() => {
				element.style.display = 'none'
			}, 300)
		} else {
			element.style.opacity = '0'
			element.style.display = 'none'
		}
	}

	function generateCalendar() {
		const calendarDays = document.getElementById('calendarDays')
		if (!calendarDays) return

		const today = new Date()
		const currentMonth = today.getMonth()
		const currentYear = today.getFullYear()

		const firstDay = new Date(currentYear, currentMonth, 1)
		const startingDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1
		const lastDay = new Date(currentYear, currentMonth + 1, 0)
		const totalDays = lastDay.getDate()
		const prevMonthLastDay = new Date(currentYear, currentMonth, 0).getDate()

		calendarDays.innerHTML = ''

		for (let i = startingDay - 1; i >= 0; i--) {
			const day = document.createElement('div')
			day.className = 'calendar-day other-month'
			day.textContent = prevMonthLastDay - i
			calendarDays.appendChild(day)
		}

		for (let i = 1; i <= totalDays; i++) {
			const day = document.createElement('div')
			day.className = 'calendar-day'
			if (i === today.getDate()) day.classList.add('today')
			if ([5, 12, 19, 26].includes(i)) day.classList.add('has-appointment')
			day.textContent = i
			calendarDays.appendChild(day)
		}

		const totalCells = 42
		const remainingCells = totalCells - (startingDay + totalDays)
		for (let i = 1; i <= remainingCells; i++) {
			const day = document.createElement('div')
			day.className = 'calendar-day other-month'
			day.textContent = i
			calendarDays.appendChild(day)
		}
	}

	initializeSections()
	generateCalendar()

	const allTab = document.querySelector('.filter-tab.active')
	if (allTab) showSection('all')

	const messageItems = document.querySelectorAll('.message-item')
	messageItems.forEach(item => {
		item.addEventListener('click', () => {
			messageItems.forEach(i => i.classList.remove('active'))
			item.classList.add('active')

			const avatar = item.querySelector('.message-avatar img').src
			const sender = item.querySelector('.message-sender').textContent
			const subject = item.querySelector('.message-subject').textContent

			const headerAvatar = document.querySelector('.conversation-header .message-avatar img')
			const headerSender = document.querySelector('.conversation-header .message-sender')
			const headerSubject = document.querySelector('.conversation-header .message-subject')

			if (headerAvatar) headerAvatar.src = avatar
			if (headerSender) headerSender.textContent = sender
			if (headerSubject) headerSubject.textContent = subject
		})
	})

	const messageInput = document.getElementById('messageInput')
	const sendBtn = document.getElementById('sendBtn')
	const conversation = document.getElementById('conversation')

	function sendMessage() {
		const text = messageInput.value.trim()
		if (!text) return

		const messageDiv = document.createElement('div')
		messageDiv.className = 'message sent fade-in'
		messageDiv.innerHTML = `
			<div class="message-text">${text}</div>
			<div class="message-time-small">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
		`
		conversation.appendChild(messageDiv)
		setTimeout(() => messageDiv.classList.add('show'), 10)
		messageInput.value = ''
		conversation.scrollTop = conversation.scrollHeight
	}

	if (sendBtn && messageInput) {
		sendBtn.addEventListener('click', sendMessage)
		messageInput.addEventListener('keypress', (e) => {
			if (e.key === 'Enter') sendMessage()
		})
	}

	const attachBtn = document.getElementById('attachBtn')
	const fileInput = document.getElementById('fileInput')

	if (attachBtn && fileInput) {
		attachBtn.addEventListener('click', () => fileInput.click())

		fileInput.addEventListener('change', (e) => {
			if (e.target.files.length > 0) {
				alert(`Файл "${e.target.files[0].name}" прикреплен`)
			}
		})
	}
})
