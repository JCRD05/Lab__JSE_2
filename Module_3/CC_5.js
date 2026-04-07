class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.type = 'point';
    }
}

class Line {
    constructor(coords) {
        this.type = 'line';
        this.points = coords.map(c => new Point(c[0], c[1]));
    }
}

class Figure {
    constructor() {
        this.points = [];
        this.lines = [];
    }

    addPoint(x, y) {
        const exists = this.points.some(p => p.x === x && p.y === y);
        if (!exists) {
            this.points.push(new Point(x, y));
        }
    }

    addLine(coords) {
        const newPath = JSON.stringify(coords);
        const exists = this.lines.some(l => 
            JSON.stringify(l.points.map(p => [p.x, p.y])) === newPath
        );
        
        if (!exists) {
            this.lines.push(new Line(coords));
        }
    }

    sort() {
        this.points.sort((a, b) => a.x - b.x || a.y - b.y);
        this.lines.sort((a, b) => a.points.length - b.points.length);
    }

    toJSON() {
        return JSON.stringify({
            points: this.points,
            lines: this.lines
        });
    }

    fromJSON(json, append = false) {
        const data = JSON.parse(json);
        if (!append) this.deleteAll();

        if (data.points) {
            data.points.forEach(p => this.addPoint(p.x, p.y));
        }

        if (data.lines) {
            data.lines.forEach(l => {
                const coords = l.points.map(p => [p.x, p.y]);
                this.addLine(coords);
            });
        }
    }

    deleteAll() {
        this.points = [];
        this.lines = [];
    }
}

let f = new Figure();
f.addPoint(10, 20); // Adds point
f.addPoint(10, 20); // Duplicate - ignored
f.addPoint(5, 5);   // Adds point
f.addLine([[10, 20], [30, 40]]); // Adds line
f.addLine([[10, 20], [30, 40]]); // Duplicate line - ignored

f.sort(); // Sorts points (5,5 comes first) and lines

console.log(f.points.length); // -> 2
console.log(f.points[0].x);   // -> 5
console.log(f.lines.length);  // -> 1

let json = f.toJSON();
f.fromJSON(json, true); // Appends data, but uniqueness check prevents growth
console.log(f.points.length); // -> 2