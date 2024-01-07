let bottomless = ["create:honey", "create:chocolate"]
ServerEvents.tags("fluid", (event) => {
    for (let tag of bottomless) {
        event.add("create:bottomless/allow",tag)
    }
})
