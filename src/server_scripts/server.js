// priority: 1

// Visit the wiki for more info - https://kubejs.com/

// TODO:Remove Fluix Researcher Trades

ServerEvents.recipes((event) => {
    for (let tierName in Tier) {
        let tier = Tier[tierName]
        for (let materialName in tier.materials) {
            let materialValue = tier.materials[materialName]
            registerBotanyCrop(event, tier.substrate, materialValue, Materials[materialName])
        }
    }
    for (let substrateName in Substrate) {
        let substrate = Substrate[substrateName]
        registerBotanySoil(event, substrate)
    }
})
