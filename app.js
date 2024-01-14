const express = require('express');
const app = express();

// Conjunto de datos de usuarios
const users = [
    { id: 1, name: 'Usuario1', age: 25, specialty: 'marketing' },
    { id: 2, name: 'Usuario2', age: 30, specialty: 'developers' },
    // Otros usuarios...
];

// Función para filtrar usuarios por especialidad
function getUsersBySpecialty(specialty) {
    return users.filter(user => user.specialty === specialty);
}
// Función para generar la página HTML
function generateHTMLPage(title, count, users) {
    const userDetails = users.map(user => `<p>${user.name}, ${user.age} years old</p>`).join('');
    return `
        <h1>${title}</h1>
        <p>${count} personas</p>
        ${userDetails}
        <a href="/">Home</a>
    `;
}

// Ruta principal
app.get('/', (req, res) => {
    const navigation = `<a href="/marketing">Marketing</a> | <a href="/developers">Developers</a>`;
    res.send(`<h1>Home</h1>${navigation}`);
});

// Rutas por especialidad
app.get('/:specialty', (req, res) => {
    const specialty = req.params.specialty.toLowerCase();
    const filteredUsers = getUsersBySpecialty(specialty);

    if (filteredUsers.length === 0) {
        res.status(404).send('<h1>404 Not Found</h1>');
    } else {
        const userDetails = filteredUsers.map(user => `<p>${user.name}, ${user.age} years old</p>`).join('');
        const pageContent = `<h1>${specialty.charAt(0).toUpperCase() + specialty.slice(1)}</h1><p>${filteredUsers.length} people</p>${userDetails}`;
        const navigation = `<a href="/">Home</a>`;
        res.send(`${navigation}${pageContent}`);
    }
});

// Manejo de errores 404 para rutas no definidas
app.use((req, res) => {
    res.status(404).send('<h1>404 Not Found</h1>');
});

// Configuración del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
