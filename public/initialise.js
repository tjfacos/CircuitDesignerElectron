const initialise = () => {
    drawGrid();

    window.scroll(window.innerWidth, window.innerHeight)

    document.addEventListener('keydown', (e) => {
        switch(e.key){
            case "r":
                RotateComponent()
                break;
            case "Delete":
                DeleteComponent()
                break;
            case "w":
                addComponent("wire")
        }
    })
    
}