class Wire {
    constructor(){
        // console.log("Instance")
        
        this.ends = [[],[]] //x-y co-ordinates of the beginning and end
        this.joints = [];
        this.orientation = 0; // 0 will be horizontal, 1 will be vertical
        this.connectedItems = []
        
        this.div = document.createElement("div")
        this.div.classList.add("wire")
        this.div.id = "wire" + ComponentCounters["wire"]++
    
        this.DrawToCanvas()

    }
    
    
    addJoint() {
        let joint = document.createElement("div")
        joint.classList.add("joint")
        this.joints.push(joint)
        this.div.append(joint)
        return joint
    }
    

    DrawToCanvas() {
        let overlay = document.getElementById("overlay")
        overlay.style.display = "block"
        document.getElementById("component-container").append(this.div)
        
        var joint1 = this.addJoint()
        var joint2 = this.addJoint()
                
        
        document.onmousemove = (e) => {
            var [x1, y1] = this.placeToGrid(e.pageX, e.pageY)
            joint1.style.left = (x1-joint1.clientWidth/2) + "px";
            joint1.style.top = (y1-joint1.clientHeight/2) + "px";
            this.ends[0] = [x1, y1]
        }
        document.onclick = (e) => {
            document.onmousemove = (e) => {
                var [x2, y2] = this.positionWireToLine(e.pageX, e.pageY)
                joint2.style.left = (x2-joint1.clientWidth/2) + "px";
                joint2.style.top = (y2-joint1.clientHeight/2) + "px";
                this.ends[1] = [x2, y2]
                // console.log(wireMap)
            }
            document.onclick = (e) => {
                this.drawConnection()
                overlay.style.display = "none"
                document.onmousemove = () => {}
                document.onclick = () => {}
            }
        }
    }

    positionWireToLine(xIn, yIn) {
        const [x2,y2] = this.placeToGrid(xIn, yIn)
        const [x1, y1] = this.ends[0]

        let deltaX = Math.abs(x2-x1)
        let deltaY = Math.abs(y2-y1)

        // console.log(`DeltaX: ${deltaX}`)
        // console.log(`DeltaY: ${deltaY}`)
        
        // console.log(deltaX > deltaY)

        if (deltaX > deltaY) {
            // console.log("Trigger")
            this.orientation = 0
        } else {
            this.orientation = 1
        } 

        // console.log(this.orientation)

        if (this.orientation == 0) { //Horizontal
            return [x2, y1]
        } else { //Vertical
            return [x1, y2]
        }

    }


    drawConnection() {
        let canvas = document.getElementById("cnv")
        let ctx = canvas.getContext("2d")
        
        let [x1, y1] = this.ends[0]
        let [x2, y2] = this.ends[1]

        ctx.strokeStyle = "white"
        ctx.lineWidth = 10


        
        let wireObj = {
                "draw-method": (x1, y1, x2, y2) => {
                    ctx.beginPath()
                    
                    ctx.moveTo(x1, y1)
                    ctx.lineTo(x2, y1)
                    ctx.lineTo(x2, y2)
                    ctx.stroke();
                    
                    ctx.closePath()},
                
                "wire-id": this.div.id,
                "arguments": [x1, y1, x2, y2]                
            }
        
        
        let wireKey = this.div.id
        wireMap.set(wireKey, wireObj)
            

        updateGrid()
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


var wireMap = new Map()

const updateGrid = () => {
    let cnv = document.getElementById("cnv")
    ctx = cnv.getContext("2d")
    
    wireMap.forEach((wire) => {
        wire["draw-method"](...wire["arguments"]);
    })
    
    
}