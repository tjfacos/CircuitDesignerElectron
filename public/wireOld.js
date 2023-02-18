class WireSection {
    constructor(){
        console.log("Instance")
        
        this.ends = [] //x-y co-ordinates of the beginning and end
        this.ports = [];
        this.orientation = 0; // 0 will be horizontal, 1 will be vertical
        
        this.div = document.createElement("div");
        this.div.classList.add("component");
        this.div.classList.add("wire");
    

        this.addPorts()
        this.addToCanvas()

    }
    
    
    addPorts(){
        for (var i = 0; i < 2; i++) {
            this.ports.push(document.createElement("div"))
            this.ports[i].classList.add("port")
            this.div.append(this.ports[i])
        }
    }

    addToCanvas() {
        document.getElementById("component-container").append(this.div)
        var overlay = document.getElementById("overlay")
        overlay.style.display = "block"
        this.addFirstPort()
    }
        
    addFirstPort() {
        let firstPort = this.ports[0]
        
        // Start Placement of First Port (Same as any other component)
        
        document.onmousemove = (e) => {
            
            let x = e.pageX;
            let y = e.pageY;
            
            let lockedCoords = this.placeToGrid(x , y);
            x = lockedCoords[0];
            y = lockedCoords[1];
            
            firstPort.style.left = (x-firstPort.clientWidth/2) + "px";
            firstPort.style.top = (y-firstPort.clientHeight/2) + "px";
        }
        
        document.onmousedown = (e) => {
            if (!(document.getElementById("toolbar").contains(e.target))) {
                console.log("First Port Placed...")
                this.ends.push([
                    firstPort.style.left,
                    firstPort.style.top
                ])
                document.onmousemove = () => {}
                document.onmousedown = () => {}
                this.addSecondPort()
            }
        }
    }   
    
    addSecondPort() {
        //Place Second Port (Locked onto a direction)
        let secondPort = this.ports[1]
    
        console.log(secondPort)

        let wireDiv = this.div

        document.onmousemove = (e) => {
            
            let x1 = this.ends[0][0];
            let y1 = this.ends[0][1];

            let x2 = e.pageX;
            let y2 = e.pageY;

            let lockedCoords = this.placeToGrid(x2 , y2);
            x2 = lockedCoords[0];
            y2 = lockedCoords[1];
            // console.log(`${x2} ${y2}`)

            if (Math.abs(y2-y1) < Math.abs(x2-x1)) { //The difference in the y direction is less than in the x direction, thus the line is more horizontal than vertical
                this.orientation = 0;
            } else {
                this.orientation = 1;
            }
            console.log(this.orientation)

            if (this.orientation == 0) { //Horizontal
                y2 = y1;
            } else { //Vertical
                x2 = x1;
            }
            
            secondPort.style.left = (x2-secondPort.clientWidth/2) + "px";
            secondPort.style.top = (y2-secondPort.clientHeight/2) + "px";

            //Draw the wire (10px wide)
            let wireWidth = 10;
            let wireLength;
            if (this.orientation == 0) {
                // Check which coord is closes to the left
                wireLength = Math.abs(x1-x2)
                
                if (x1 < x2) {  // x1 o---------------o x2
                    wireDiv.style.left = x1
                    wireDiv.style.width = wireLength

                    wireDiv.style.top = y1+0.5*wireWidth
                    wireDiv.style.height = wireWidth
                } else {  // x2 o---------------o x1
                    wireDiv.style.left = x2
                    wireDiv.style.width = wireLength

                    wireDiv.style.top = y2+0.5*wireWidth
                    wireDiv.style.height = wireWidth
                }

            } else {
                /*
                y1   y2
                o    o
                |    |
                |    |
                o    o
                y2   y1
                */ 
            
            if (y1 > y2) {
                wireDiv.style.top = y1
                wireDiv.style.height = wireLength

                wireDiv.style.left = x1-0.5*wireWidth
                wireDiv.style.width= wireWidth
            } else {
                wireDiv.style.top = y2
                wireDiv.style.height = wireLength

                wireDiv.style.left = x2-0.5*wireWidth
                wireDiv.style.width= wireWidth
            }
            
            document.onmousedown = (e) => {
                if (!(document.getElementById("toolbar").contains(e.target))) {
                    console.log("Second Port Placed...")
                    this.ends.push([
                        secondPort.style.left,
                        secondPort.style.top
                    ])
                    document.onmousemove = () => {}
                    document.onmousedown = () => {};
                }
            }
            
            
            
        }
            
            
            
            
            
            
            
            
            }


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