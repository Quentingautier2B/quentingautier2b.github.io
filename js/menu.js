const menu = document.querySelector('.menu'),
			phone = document.querySelector('.profil'),
			web = document.querySelector('.contact'),
			mail = document.querySelector('.portfolio');
let count = 0;
menu.addEventListener('click', init);
function init() {
	if (count % 2 === 0) {
		menu.className = 'menu dark';
		phone.className = 'profil visible';
		web.className = 'contact visible';
		mail.className = 'portfolio visible';
		count++
	}
	else {
		menu.className = 'menu bright';
		phone.className = 'profil hide';
		web.className = 'contact hide';
		mail.className = 'portfolio hide';
		count++
	}
}