//priority: 9
function registerAE2InscriberRecipeTagMiddle(event, out, input) {
    let ingredients = {}
    ingredients.middle = {tag:input[0]}
    if (input[1]) {
        ingredients.top = {item:input[1]}
    }
    if (input[2]) {
        ingredients.bottom = ({item:input[2]})
    }
    event.custom({
        "type": "ae2:inscriber",
        "ingredients": ingredients,
        "result": {
            item: out
        }
    })
}

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
