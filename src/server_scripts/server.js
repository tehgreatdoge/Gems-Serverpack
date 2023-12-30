// priority: 1

// Visit the wiki for more info - https://kubejs.com/

// TODO:Remove Fluixologist Trades

function registerBotanyCrop(event, substrate, multiplier, material) {
    let drops = []
    for (let drop of material.drops) {
        drops.push({
            chance: drop.chance ?? 1,
            minRolls: drop.min ?? 1,
            maxRolls: drop.max ?? 1,
            output: {
                item: drop.item
            }
        })
    }
    event.custom({
        type: "botanypots:crop",
        seed: {
            item:  material.item
        },
        categories: [substrate.getName()],
        growthTicks: Math.floor(material.growthTicks ?? 1200 / multiplier),
        display: {
            block: material.display
        },
        drops: drops
    })
}
function registerBotanySoil(event, substrate) {
    event.custom({
        type: "botanypots:soil",
        input: {
            item: substrate.getIdentifier()
        },
        display: {
            block: substrate.getIdentifier()
        },
        categories: [substrate.getName()],
        growthModifier: 1
    })
}

// TODO: Reverse the order so that multiple speed modifiers can map to the same recipe in jei
ServerEvents.recipes((event) => {
    for (let tierName in Tier) {
        let tier = Tier[tierName]
        console.log(tier.substrate)
        for (let materialName in tier.materials) {
            let materialValue = tier.materials[materialName]
            console.log(materialName)
            console.log(materialValue)
            console.log(Materials[materialName])
            registerBotanyCrop(event, tier.substrate, materialValue, Materials[materialName])
        }
    }
    for (let substrateName in Substrate) {
        let substrate = Substrate[substrateName]
        registerBotanySoil(event, substrate)
    }
})
