function arrayEquals(a, b) {
    console.log(a)
    console.log(b)
    
    let val =  Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
    // console.log(val)
    return val
}

// console.log(arrayEquals(
//     [1,2,3],
//     [1,2,3]
// ))

const CheckConnection = (comp1, comp2) => {
    // Return true if the 2 components have ports that overlap, false otherwise
    

    // Broken, check array comparison
    

    // console.log(comp1.portCoords)
    // console.log(comp2.portCoords)

    let connected = false

    comp1.portCoords.forEach(portA => {
        comp2.portCoords.forEach(portB => {
            
            console.log(arrayEquals(portA, portB))
            if (arrayEquals(portA, portB)){
                console.log("MATCH")
                connected = true;
            }
        })
    });
    
    return connected

}