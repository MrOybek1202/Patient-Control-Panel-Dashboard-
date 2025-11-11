document.addEventListener('DOMContentLoaded', function () {
	console.log('Dashboard loaded successfully')

	const observer = new IntersectionObserver(function (entries) {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('show')
			}
		})
	}, {
		threshold: 0.1,
		rootMargin: '0px 0px -50px 0px'
	})

	document.querySelectorAll('.fade-in').forEach(element => {
		observer.observe(element)
	})

	document.querySelectorAll('.dot').forEach(dot => {
		dot.addEventListener('click', function () {
			const title = this.getAttribute('title')
			showBodyPartInfo(title)
		})
	})

	// function showBodyPartInfo(partName) {
	// 	const info = {
	// 		'Chest': 'Heart and lungs area. Monitor for any unusual pain or discomfort.',
	// 		'Abdomen': 'Digestive organs. Watch for bloating or persistent pain.',
	// 		'Knee': 'Joint health. Report any swelling or mobility issues.'
	// 	}

	// 	alert(`${partName}: ${info[partName] || 'No additional information available.'}`)
	// }

	animateCharts()
})

function animateCharts() {
	const bars = document.querySelectorAll('.bar')
	bars.forEach(bar => {
		const height = bar.style.getPropertyValue('--h')
		bar.style.height = '0%'
		setTimeout(() => {
			bar.style.height = height
		}, 100)
	})
}

function fadeIn(element) {
	if (!element) return
	element.style.display = 'flex'
	element.classList.remove('fade-out')
	element.classList.add('fade-in', 'show')
}

function fadeOut(element) {
	if (!element) return
	element.classList.remove('fade-in', 'show')
	element.classList.add('fade-out')
	setTimeout(() => {
		element.style.display = 'none'
	}, 300)
}