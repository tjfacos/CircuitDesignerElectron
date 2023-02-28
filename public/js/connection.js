const CheckConnection = (comp1, comp2) => {
    // Return true if the 2 components have ports that overlap, false otherwise
    

    // Broken, check array comparison
    console.log()


    console.log(comp1.portCoords)
    console.log(comp2.portCoords)

    comp1.portCoords.forEach(portA => {
        comp2.portCoords.forEach(portB => {
            console.log(JSON.stringify(portA))
            console.log(JSON.stringify(portB))
            
            if (JSON.stringify(portA) == JSON.stringify(portB)){
                return true;
            }
        })
    });
    
    return false

}