const http = require('http');

const motoGP = [
    {
        circuit: 'Losail',
        Location: 'Qatar',
        winner: {
            firstName: 'Andrea',
            lastName: 'Dovizioso',
            country: 'Italy',
        }
    },
    {
        circuit: 'Autodromo', 
        Location: 'Argentine',
        winner:{
            firstName: 'Cal', 
            lastName: 'Crutchlow',
            country: 'UK',
        }
    },
    {
        circuit: 'De Jerez', 
        location: 'Spain', 
        winner: {
            firstName: 'Valentino', 
            lastName: 'Rossi', 
            country: 'Italy',
        }
    },
    {
        circuit: 'Mugello',
        Location: 'Italy',
        winner: {
            firstName: 'Andrea',
            lastName: 'Dovizioso',
            country: 'Italy',
        }
    }
];

const requestListener = (req, res) => {
    const { method, url } = req;

    if (method === 'GET' && url === '/') {
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(200);
        res.end(JSON.stringify(motoGP, null, 2));
    } else if (method === 'GET' && url === '/country') {
        const dataByCountry = motoGP.reduce((acc, race) => {
            const { country } = race.winner;
            if (!acc[country]) {
                acc[country] = [];
            }
            acc[country].push(race);
            return acc;
        }, {});
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(200);
        res.end(JSON.stringify(dataByCountry, null, 2));
    } else if (method === 'GET' && url === '/name') {
        const dataByName = motoGP.reduce((acc, race) => {
            const { firstName, lastName } = race.winner;
            const fullName = `${firstName} ${lastName}`;
            if (!acc[fullName]) {
                acc[fullName] = [];
            }
            acc[fullName].push(race);
            return acc;
        }, {});
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(200);
        res.end(JSON.stringify(dataByName, null, 2));
    } else {
        res.writeHead(400);
        res.end('Bad Request');
    }
};

const server = http.createServer(requestListener);

const port = 5000;
const host = 'localhost';

server.listen(port, host, () => {
    console.log(`Server berjalan pada http://${host}:${port}`);
});