const findGroupByTitle = (groups, title) => {
    for (let i = 0; i < groups.length; i++) {
        const group = groups[i]
        if (group.title === title) {
            return group
        }
        const childrens = group.childrens
        if (childrens != null && childrens.length !== 0) {
            groupFound = findGroupByTitle(childrens, title)
            if (groupFound != null) {
                return groupFound
            }
        }
    }
    return null
}

const onClickArrowExpansion = () => {
    // TODO use constants or methods in the selectors
    $('div .x-tree-node-el').not(".x-tree-node-leaf").on( "click", function() {
        const title = $(this).text()
        const isExpanded = $(this).hasClass("x-tree-node-expanded")

        const groups = GeoNodeInsaGeoExplorerData.dataGroupsHierarchy.groups
        const group = findGroupByTitle(groups, title)
        const groupChildren = group.childrens
        childrenGroupExpansion(groupChildren, isExpanded)
    });
}

const createActions = () => {
    onClickArrowExpansion()
}

const init = () => {
    createActions()
    structureHierarchy()
}

// Temporary 
setTimeout(() => {
    init()
}, 1000);