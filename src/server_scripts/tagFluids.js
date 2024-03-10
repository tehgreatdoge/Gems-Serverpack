let bottomless = ["create:honey", "create:chocolate", "#forge:experience"]
ServerEvents.tags("fluid", (event) => {
    for (let tag of bottomless) {
        event.add("create:bottomless/allow",tag)
    }
})
ServerEvents.tags("mekanism.slurries",(event) => {
    console.log("Loaded mekanism stuff somehow?")
})
