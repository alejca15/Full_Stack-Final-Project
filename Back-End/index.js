const express = require('express');
const { sequelize } = require('./models'); // Importa la conexión a la base de datos
const Province_route = require('./routes/provinces_routes'); // Importa las rutas de provincias
const Directions_route = require('./routes/directions_routes'); // Importa las rutas de direcciones
const Cantons_route = require('./routes/cantons_routes'); // Importa las rutas de Cantones
const Addresses_route = require('./routes/addresses_routes'); // Importa las rutas de Direcciones Completas
const Athletes_route = require('./routes/athletes_routes'); // Importa las rutas de los atletas
const Shirt_sizes_route = require('./routes/shirt_sizes_routes'); // Importa las rutas de las tallas de camisa
const Shoe_sizes_route = require('./routes/shoe_sizes_routes'); // Importa las rutas de las tallas de calzado
const Athlete_sizes_route = require('./routes/athlete_sizes_routes'); // Importa las rutas de las tallas de los atletas
const Parents = require('./routes/parents_routes'); // Importa las rutas de los Encargados
const Locations = require('./routes/locations_routes'); // Importa las rutas de las Sedes
const Mentors = require('./routes/mentors_routes'); // Importa las rutas de los Mentores
const MentorsAndAthletes = require('./routes/mentors_by_athletes_routes'); // Importa las rutas de los Mentores y sus atletas
const Athletes_records = require('./routes/athletes_records_routes'); // Importa las rutas de los expedientes de los atletas
const Counselors = require('./routes/counselors_routes'); // Importa las rutas de los Orientadores
const Comments = require('./routes/comments_by_incidents_routes'); // Importa las rutas de los Comentarios
const Admins = require('./routes/admins_routes'); // Importa las rutas de los Admins
const Incidents = require('./routes/incidents_routes'); // Importa las rutas de los Admins
const cors=require('cors')

const app = express();
const PORT = 3000;

app.use(express.json()); // Middleware para parsear JSON

app.use(cors()); //Activar Cors

// Probar la conexión con la base de datos
sequelize.authenticate()
  .then(() => console.log('Conexión a la base de datos exitosa.'))
  .catch((error) => console.error('No se pudo conectar a la base de datos:', error));

// Usar las rutas de productos


app.use('/Provinces', Province_route);
app.use('/Directions', Directions_route);
app.use('/Cantons', Cantons_route);
app.use('/Addresses', Addresses_route);
app.use('/Athletes', Athletes_route);
app.use('/Shirtsizes', Shirt_sizes_route);
app.use('/Shoesizes', Shoe_sizes_route);
app.use('/Athletessizes', Athlete_sizes_route);
app.use('/Parents', Parents);
app.use('/Locations', Locations);
app.use('/Mentors', Mentors);
app.use('/MentorsAndAthletes', MentorsAndAthletes);
app.use('/AthletesRecords', Athletes_records);
app.use('/Counselors', Counselors);
app.use('/Comments', Comments);
app.use('/Admins', Admins);
app.use('/Incidents', Incidents);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});