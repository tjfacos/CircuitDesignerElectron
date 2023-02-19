var componentArray = []

var ComponentCounters = {
    "resistor": 1,
    "bulb": 1,
    "cell": 1,
    "wire": 1
};

var SelectedElement = null;

class Component {
    constructor (type) {
        this.type = type;
        this.div = document.createElement("DIV")
        this.connections = [];
        
        this.div.id = type + ComponentCounters[type]++;
        this.div.classList.add("component");
        this.div.classList.add(type);
        
        
        this.selected = false;
        this.placed = false;

        this.addIcon();
        
        this.addToCanvas();

        
    }
    
    addToCanvas() {
        let element = this.div
        document.getElementById("component-container").append(element);
        var overlay = document.getElementById("overlay")
        
        // Start Placement
        overlay.style.display = "block"
        element.classList.add("isBeingAdded")
        document.onmousemove = (e) => {
            
            let x = e.pageX;
            let y = e.pageY;
            
            let lockedCoords = this.placeToGrid(x , y);
            x = lockedCoords[0];
            y = lockedCoords[1];
            
            element.style.left = (x-element.clientWidth/2) + "px";
            element.style.top = (y-element.clientHeight/2) + "px";
        }
        
        document.onmousedown = (e) => {
            // console.log("Called")
            if (!(document.getElementById("toolbar").contains(e.target))) {
                console.log("placed")
                overlay.style.display = "none";
                element.classList.remove("isBeingAdded")
                document.onmousemove = () => {}
                document.onmousedown = () => {};
                this.addHandlers();
            }
        }

    }
    
    addIcon() {
        let element = this.div;
        let img = document.createElement("img");
        let svgURL = `../assets/components/${element.classList[1]}.svg`;
        img.src = svgURL;
        img.id = element.id + "-icon";
        img.alt = element.id;
        img.draggable = false;
        
        element.append(img)
    }
    
    addHandlers(){
        this.addMovement()
        this.addControls();
    }
    
    addPorts() {
        
    }
    
    addMovement() {
        let element = this.div;
        element.addEventListener("mousedown", () => {
            element.style.position = "absolute";
            SelectedElement = element;
            
            
            document.onmousemove = (e) => {
                
                let x = e.pageX;
                    let y = e.pageY;
                    
                    let lockedCoords = this.placeToGrid(x , y);
                    x = lockedCoords[0];
                    y = lockedCoords[1];
    
                    SelectedElement.style.left = (x-SelectedElement.clientWidth/2) + "px";
                    SelectedElement.style.top = (y-SelectedElement.clientHeight/2) + "px";
            }   
        })
    
        document.onmouseup = () => {
            document.onmousemove = (e) => {}
            SelectedElement = null;
        }
        
    }

    addControls () {
        
        console.log("Adding controls...")
        
        var element = this.div;
        var rotateBtn = document.getElementById("rotate-button");
        var deleteBtn = document.getElementById("delete-button");

        // Add event listener to bring up controls on double-click
        element.addEventListener("dblclick", () => {
            console.log(`${element.id} selected...`)
            element.classList.toggle("selectedComponent")
            rotateBtn.style.display = "block";
            deleteBtn.style.display = "block";
            this.selected = true;
        })

        document.addEventListener('click', (e) => {
            if (!( element.contains(e.target) || rotateBtn.contains(e.target) || deleteBtn.contains(e.target)) && this.selected ) {
                element.classList.toggle("selectedComponent")
                rotateBtn.style.display = "none";
                deleteBtn.style.display = "none";
                this.selected = false
            }
        })
    }
    
    rotate() {
        // console.log("blah")
        this.div.classList.toggle("rotated")
    }

    placeToGrid(x, y) {
        let cellsize = 30;
        let NewCoords = []

        let coords = [x , y]
        coords.forEach(coord => {
            let up = Math.ceil(coord/cellsize)*cellsize;
            let down = Math.floor(coord/cellsize)*cellsize;
            NewCoords.push(( Math.abs(coord - up) < Math.abs(coord - down) ? up : down))
        });
    
        return NewCoords;
    }
    
    
}

class Cell extends Component {
    constructor (type) {
        super(type);
        this.voltage = 10.0;
    }
}

class LoadComponent extends Component {
    constructor (type) {
        super(type);
        this.resistance = 10.0;
        this.voltage = 0.0;
    }
}

// In future, an AC Source and logic for AC may be included. But not for now ...

const addComponent = (type) => {

    let component;
    if (type == "Cell") {
        component = new Cell(type);
    } else if (type == "wire") {
        component = new Wire()
    } else {
        component = new Component(type);
    }
    componentArray.push(component);

    console.log(componentArray);

}


const DeleteComponent = () => {
    componentArray.forEach((item, index) => {
        if (item.selected) {
            console.log(`Deleting ${item.div.id}...`)
            item.div.remove();
            componentArray.splice(index, 1);
        }
    })
}

const RotateComponent = () => {
    componentArray.forEach((item) => {
        if (item.selected) {
            item.rotate();
        }
    })
}
