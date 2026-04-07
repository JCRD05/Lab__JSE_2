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
        this.points.push(new Point(x, y));
    }

    addLine(coords) {
        this.lines.push(new Line(coords));
    }

    toJSON() {
        return JSON.stringify({
            points: this.points,
            lines: this.lines
        });
    }

    fromJSON(json, append = false) {
        const data = JSON.parse(json);
        
        if (!append) {
            this.deleteAll();
        }

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
f.addPoint(10,20);
f.addPoint(10,10);
f.addLine([[10,20], [30,40], [50,60]]);
let json = f.toJSON();
console.log(json);
f.fromJSON(json, true);
console.log(f.points.length);
console.log(f.lines.length);
f.fromJSON('{"points":[{"type":"point","x":10,"y":20},{"type":"point","x":10,"y":30},{"type":"point","x":10,"y":-30},{"type":"point","x":10,"y":20},{"type":"point","x":20,"y":20},{"type":"point","x":30,"y":20},{"type":"point","x":130,"y":20},{"type":"point","x":30,"y":20},{"type":"point","x":0,"y":20},{"type":"point","x":0,"y":-20},{"type":"point","x":0,"y":20}],"lines":[{"type":"line","points":[{"x":0,"y":0},{"x":10,"y":0},{"x":0,"y":10},{"x":20,"y":0},{"x":0,"y":20}]},{"type":"line","points":[{"x":30,"y":0},{"x":10,"y":0},{"x":0,"y":10},{"x":20,"y":0},{"x":0,"y":20}]},{"type":"line","points":[{"x":30,"y":0},{"x":10,"y":-10},{"x":0,"y":10},{"x":20,"y":0},{"x":0,"y":20}]},{"type":"line","points":[{"x":0,"y":0},{"x":10,"y":0},{"x":0,"y":10},{"x":20,"y":0},{"x":0,"y":20}]}]}');
console.log(f.points.length);
console.log(f.lines.length);