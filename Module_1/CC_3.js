function Image(title, artist, date) {
    this.title = title;
    this.artist = artist;
    this.date = date;
}

let images = {
    list: [],
    contains: function(title) {
        return this.list.some(image => image.title === title);
    },
    add: function(title, artist, date) {
        if(this.contains(title)) {
            return false;
        }

        this.list.push(new Image(title, artist, date)); 
        return true;
    },
    show: function() {
        if(this.list.length == 0) {
            console.log('List Empty')
            return;
        }

        this.list.forEach(image => console.log(`${image.title}, ${image.artist}, ${image.date}`))
    },
    clear: function() {
        if(this.list.length == 0) {
            return;
        }

        this.list.length = 0;
    }
}

images.add('Mona Lisa', 'Leonardo da Vinci', 1503);
images.add('The Last Supper', 'Leonardo da Vinci', 1495);
images.add('The Starry Night', 'Vincent van Gogh', 1889);
images.add('Mona Lisa', 'Leonardo da Vinci', 1503);
images.show();
images.clear();
images.show();