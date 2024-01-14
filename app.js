const express = require('express');
const app = express();

// Conjunto de datos de usuarios
const users = [
    { id: 1, name: 'Antonio', age: 30, specialty: 'marketing' },
    { id: 2, name: 'LOla', age: 30, specialty: 'developers' },
    { id: 1, name: 'Paco', age: 20, specialty: 'marketing' },
    { id: 2, name: 'Marta', age: 22, specialty: 'developers' },
    { id: 1, name: 'Andrea', age: 40, specialty: 'marketing' },
    { id: 2, name: 'Jacinto', age: 46, specialty: 'developers' },
    { id: 1, name: 'Roberto', age: 20, specialty: 'marketing' },
    { id: 2, name: 'Olga', age: 58, specialty: 'developers' },
    { id: 1, name: 'Andres', age: 30, specialty: 'marketing' },
    { id: 2, name: 'Ricardo', age: 30, specialty: 'developers' },
    { id: 1, name: 'Elena', age: 20, specialty: 'marketing' },
    { id: 2, name: 'Maria', age: 22, specialty: 'developers' },
    { id: 1, name: 'Ruben', age: 40, specialty: 'marketing' },
    { id: 2, name: 'Pepe', age: 46, specialty: 'developers' },
    { id: 1, name: 'Pilar', age: 20, specialty: 'marketing' },
    { id: 2, name: 'Lucia', age: 58, specialty: 'cibersecurity' },
    { id: 2, name: 'Inma', age: 22, specialty: 'developers' },
    { id: 1, name: 'Rosa', age: 40, specialty: 'marketing' },
    { id: 2, name: 'Marcos', age: 46, specialty: 'developers' },
    { id: 1, name: 'Lucas', age: 20, specialty: 'marketing' },
    { id: 2, name: 'Jose', age: 44, specialty: 'cibersecurity' },
    
];

// Función para filtrar usuarios por especialidad
function getUsersBySpecialty(specialty) {
    return users.filter(user => user.specialty === specialty);
}
// Función para generar la página HTML
function generateHTMLPage(title, count, users) {
    const userDetails = users.map(user => `<p>${user.name}, ${user.age}, ${user.specialty} years old</p>`).join('');
    return `
        <h1>${title}</h1>
        <h5>${specialty}</h5>
        <p>${count} personas</p>
        ${userDetails}
        <a href="/">Home</a>

        
    `;
}

// Ruta principal
app.get('/', (req, res) => {
    const navigation = `<a href="/marketing">Marketing</a> | <a href="/developers">Developers</a> | <a href="/cibersecurity">Cibersecurity</a> | <a href="/sales">Sales</a>`;
    res.send(`<h1>Home</h1>${navigation}`);
});

// Rutas por especialidad
app.get('/:specialty', (req, res) => {
    const specialty = req.params.specialty;
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
