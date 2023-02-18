class WireSection {
    constructor(){
        console.log("Instance")
        
        this.ends = [[],[]] //x-y co-ordinates of the beginning and end
        this.ports = [];
        this.orientation = 0; // 0 will be horizontal, 1 will be vertical
        
        this.div = document.createElement("div")
        this.div.classList.add("wire")
        this.div.id = "wire" + ComponentCounters["wire"]++
    
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
        let overlay = document.getElementById("overlay")
        overlay.style.display = "block"
        document.getElementById("component-container").append(this.div)
        let port1 = this.ports[0]
        let port2 = this.ports[1]
        
        document.onmousemove = (e) => {
            var [x1, y1] = this.placeToGrid(e.pageX, e.pageY)
            port1.style.left = (x1-port1.clientWidth/2) + "px";
            port1.style.top = (y1-port1.clientHeight/2) + "px";
            this.ends[0] = [x1, y1]
        }
        document.onclick =  () => {
            console.log(this.ends[0])
            document.onmousemove = (e) => {
                var [x2, y2] = this.placeToGrid(e.pageX, e.pageY)
                port2.style.left = (x2-port2.clientWidth/2) + "px";
                port2.style.top = (y2-port2.clientHeight/2) + "px";
                this.ends[1] = [x2, y2]
            }
            document.onclick = () => {
                console.log(this.ends[1])
                this.drawWire()
                
                document.onmousemove = () => {}
                overlay.style.display = "none"
            }
        }

    }
    

    drawWire() {
        let canvas = document.getElementById("cnv")
        let ctx = canvas.getContext("2d")
        
        let [x1, y1] = this.ends[0]
        let [x2, y2] = this.ends[1]

        ctx.strokeStyle = "white"
        ctx.lineWidth = 10


        wireList.push(
            {
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
        )

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

