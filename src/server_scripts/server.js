// priority: 1

// Visit the wiki for more info - https://kubejs.com/

// TODO:Remove Fluix Researcher Trades

// Remove Computer Scientist Trades
MoreJSEvents.villagerTrades((event) => {
    event.forEachTrades("advancedperipherals:computer_scientist", [1,5], (listings) => {
        listings.removeIf(()=> true)
    })
})
let VillagerTrade = Java.loadClass("de.srendi.advancedperipherals.common.village.VillagerTrade")
MoreJSEvents.wandererTrades((event) => {
    // Nuke Advanced Peripherals trades
    event.getTrades(1).removeIf((trade) => trade.getClass() == VillagerTrade)
    event.getTrades(2).removeIf((trade) => trade.getClass() == VillagerTrade)
    // what were they even thinking
    event.removeTrades({firstItem:Ingredient.all,secondItem:Ingredient.all,outputItem:Ingredient.of("minecraft:beacon")})
})

for (let key of Object.keys(this)) {
    console.log(key)
}

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
