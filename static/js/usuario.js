document.addEventListener('DOMContentLoaded', function () {
    fetch('http://127.0.0.1:5000/get_logged_in_status')
        .then(response => response.json())
        .then(data => {
            console.log('Logged in status:', data.logged_in);
            const menuContainer = document.getElementById('menu-container');
            if (data.logged_in) {
                menuContainer.innerHTML = '<a href="/templates/pagar.html">PAGAR</a>';
            } else {
                menuContainer.innerHTML = '<a href="/templates/ingresar.html"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user-filled" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#c2b284" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z" stroke-width="0" fill="currentColor" /><path d="M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z" stroke-width="0" fill="currentColor" /> INGRESAR</a>';
            }
        })
        .catch(error => {
            console.error('Error fetching logged in status:', error);
        });
});
