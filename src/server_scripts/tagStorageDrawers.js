//priority 11
// (before common)

let tags = {
    "1x1": ["oak_full_drawers_1","spruce_full_drawers_1","birch_full_drawers_1","jungle_full_drawers_1","acacia_full_drawers_1","dark_oak_full_drawers_1","crimson_full_drawers_1","warped_full_drawers_1"],
    "2x1": ["oak_full_drawers_2","spruce_full_drawers_2","birch_full_drawers_2","jungle_full_drawers_2","acacia_full_drawers_2","dark_oak_full_drawers_2","crimson_full_drawers_2","warped_full_drawers_2"],
    "2x2": ["oak_full_drawers_4","spruce_full_drawers_4","birch_full_drawers_4","jungle_full_drawers_4","acacia_full_drawers_4","dark_oak_full_drawers_4","crimson_full_drawers_4","warped_full_drawers_4"],
    "half1x1": ["oak_half_drawers_1","spruce_half_drawers_1","birch_half_drawers_1","jungle_half_drawers_1","acacia_half_drawers_1","dark_oak_half_drawers_1","crimson_half_drawers_1","warped_half_drawers_1"],
    "half2x1": ["oak_half_drawers_2","spruce_half_drawers_2","birch_half_drawers_2","jungle_half_drawers_2","acacia_half_drawers_2","dark_oak_half_drawers_2","crimson_half_drawers_2","warped_half_drawers_2"],
    "half2x2": ["oak_half_drawers_4","spruce_half_drawers_4","birch_half_drawers_4","jungle_half_drawers_4","acacia_half_drawers_4","dark_oak_half_drawers_4","crimson_half_drawers_4","warped_half_drawers_4"]
}

ServerEvents.tags("item", (event) => {
    for (let tagName in tags) {
        let tagArray = tags[tagName]
        for (let tag of tagArray) {
            event.add("storagedrawers:"+tagName,"storagedrawers:"+tag)
        }
    }
})
