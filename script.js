document.addEventListener('DOMContentLoaded', () => {
    const card = document.getElementById('card');
    const closeBtn = document.getElementById('closeBtn');
    const cardLabel = card.querySelector('.card-label');


    card.addEventListener('click', (e) => {
        if (!card.classList.contains('active') && !e.target.closest('.close-btn')) {
            card.classList.add('active');
        }
    });

    closeBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        card.classList.add('closing');
        card.classList.remove('active');

        card.addEventListener('animationend', () => {
            card.classList.remove('closing');
        }, { once: true });
    });


    const navButtons = document.querySelectorAll('.nav-btn');
    const contentSections = document.querySelectorAll('.content-section');
    const activeIndicator = document.querySelector('.nav-active-indicator');
    const topNav = document.querySelector('.top-nav');


    function moveIndicator(targetButton) {

        const buttonRect = targetButton.getBoundingClientRect();
        const navRect = topNav.getBoundingClientRect();

        const offsetLeft = buttonRect.left - navRect.left;


        activeIndicator.style.width = `${buttonRect.width}px`;
        activeIndicator.style.left = `${offsetLeft}px`;
    }


    const initialActiveButton = document.querySelector('.nav-btn.active');
    if (initialActiveButton) {

        setTimeout(() => moveIndicator(initialActiveButton), 50);
    }

    navButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();


            navButtons.forEach(btn => btn.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('active'));


            button.classList.add('active');
            const targetTab = button.dataset.tab;
            document.getElementById(targetTab).classList.add('active');


            moveIndicator(button);
        });
    });

});
