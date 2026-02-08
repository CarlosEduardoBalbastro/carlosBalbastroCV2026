   function showCurrentDate() {
            const dateElement = document.getElementById('date');
            const currentDate = new Date();
            const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
            const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
            const dayName = days[currentDate.getDay()];
            const day = currentDate.getDate();
            const monthName = months[currentDate.getMonth()];
            const year = currentDate.getFullYear();
            dateElement.innerText = `${dayName} ${day} de ${monthName} de ${year}`;
        }

        showCurrentDate();