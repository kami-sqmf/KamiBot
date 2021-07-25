module.exports = (input, args) => {
    if(!args) return input
    let results = input.match(/{{(.*?)}}/g);
    if(!results) return input
    results.forEach( result => {
        let replace = args[result.slice(2, -2)]
        if(!replace){
            console.error(`Content: ${input}, Replace: ${result}, Replacement: ${args[result]}`)
            throw "Can't Find the Args! Assign correct args."
        } 
        input = input.replace(result , replace)
    });
    return input
}