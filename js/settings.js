function showSection(sectionId) {
	// Скрыть все секции
	const sections = document.querySelectorAll('.settings-section')
	sections.forEach(section => {
		section.classList.remove('active')
	})

	// Показать выбранную секцию
	document.getElementById(sectionId).classList.add('active')

	// Обновить активный пункт меню
	const navItems = document.querySelectorAll('.nav-item')
	navItems.forEach(item => {
		item.classList.remove('active')
	})

	// Найти и активировать соответствующий пункт меню
	navItems.forEach(item => {
		if (item.textContent.toLowerCase().includes(sectionId)) {
			item.classList.add('active')
		}
	})
}

// Инициализация - показать General section по умолчанию
document.addEventListener('DOMContentLoaded', function () {
	showSection('general')
})