let images = [
    {
        name: 'Mona Lisa',
        artist: 'Leonardo da Vinci',
        date: '1503'
    },
    {
        name: 'The Last Supper',
        artist: 'Leonardo da Vinci',
        date: '1495'
    },
    {
        name: 'Starry Night',
        artist: 'Vincent van Gogh',
        date: '1889'
    },
    {
        name: 'The Scream',
        artist: 'Edvard Munch',
        date: '1893'
    },
    {
        name: 'Guernica',
        artist: 'Pablo Picasso',
        date: '1937'
    },
    {
        name: 'The Kiss',
        artist: 'Gustav Klimt',
        date: '1907'
    },
    {
        name: 'Girl With a Pearl Earring',
        artist: 'Johannes Vermeer',
        date: '1665'
    },
    {
        name: 'The Birth of Venus',
        artist: 'Sandro Botticelli',
        date: '1485'
    },
    {
        name: 'Las Meninas',
        artist: 'Diego Velázquez',
        date: '1656'
    },
    {
        name: 'The Creation of Adam',
        artist: 'Michelangelo',
        date: '1512'
    }
];

images.forEach(painting => {
    console.log(`${painting.name}, ${painting.artist}, ${painting.date}`);
});