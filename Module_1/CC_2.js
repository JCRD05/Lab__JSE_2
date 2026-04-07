let images = [
    {
        title: 'Mona Lisa',
        artist: 'Leonardo da Vinci',
        date: '1503'
    },
    {
        title: 'The Last Supper',
        artist: 'Leonardo da Vinci',
        date: '1495'
    },
    {
        title: 'Starry Night',
        artist: 'Vincent van Gogh',
        date: '1889'
    },
    {
        title: 'The Scream',
        artist: 'Edvard Munch',
        date: '1893'
    },
    {
        title: 'Guernica',
        artist: 'Pablo Picasso',
        date: '1937'
    },
    {
        title: 'The Kiss',
        artist: 'Gustav Klimt',
        date: '1907'
    },
    {
        title: 'Girl With a Pearl Earring',
        artist: 'Johannes Vermeer',
        date: '1665'
    },
    {
        title: 'The Birth of Venus',
        artist: 'Sandro Botticelli',
        date: '1485'
    },
    {
        title: 'Las Meninas',
        artist: 'Diego Velázquez',
        date: '1656'
    },
    {
        title: 'The Creation of Adam',
        artist: 'Michelangelo',
        date: '1512'
    }
];

function Image(title, artist, date) {
    this.title = title;
    this.artist = artist;
    this.date = date;
}

function getImage(title, artist, date) {
    return{
        title,
        artist,
        date
    }
}

let images1 = [];
let images2 = [];

console.log('image array');
images.forEach(image => console.log(`${image.title}, ${image.artist}, ${image.date}`));
console.log('');

// Filling the images1 array from the images array using the Image function
images.forEach(image => {
    images1.push(new Image(image.title, image.artist, image.date));
});

console.log('image1 array');
images1.forEach(image => console.log(`${image.title}, ${image.artist}, ${image.date}`));
console.log('');

// Filling the images2 array from the images1 array using the getImage function
images1.forEach(image => {
    images2.push(getImage(image.title, image.artist, image.date));
})

console.log('image2 array');
images2.forEach(image => console.log(`${image.title}, ${image.artist}, ${image.date}`));