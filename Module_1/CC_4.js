function Image(title, artist, date) {
    this.title = title;
    this.artist = artist;
    this.date = date;
}

Image.prototype.show = function() {
    console.log(`${this.title}, ${this.artist}, ${this.date}`);
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
            console.log('List Empty');
            return;
        }

        this.list.forEach(image => image.show());
    },
    clear: function() {
        if(this.list.length == 0) {
            return;
        }

        this.list.length = 0;
    },
    edit: function(title, artist, date) {
        for(let image of this.list) {
            if(image.title === title) {
                image.artist = artist;
                image.date = date;
                return true;
            }
        }

        return false;
    },
    delete: function(title) {
        const index = this.list.findIndex(image => image.title === title);

        if(index !== -1){
            this.list.splice(index, 1);
            return true;
        }

        return false;
    }
}

images.add('Mona Lisa', 'Leonardo da Vinci', 1503);
images.add('The Last Supper', 'Leonardo da Vinci', 1495);
images.add('The Starry Night', 'Vincent van Gogh', 1889);
images.edit('Mona Lisa', 'Leonardo da Vinci', 1504);
images.show(); console.log('');
images.delete('The Last Supper');
images.show();