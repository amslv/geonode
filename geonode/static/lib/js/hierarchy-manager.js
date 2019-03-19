const PADDING_SIZE_PER_LEVEL_HIERARCHY = 26

        const structureLevelHierarchy = (groups, level) => {
            groups.forEach(element => {
                const title = element.title
                const hierarchyPadding = level * PADDING_SIZE_PER_LEVEL_HIERARCHY

                // TODO use constants or methods in the selectors
                // TODO find the parent. Refactoring
                $(`.x-tree-node a span:contains("${title}")`).parent().parent().parent().css('padding-left', `${hierarchyPadding}px`)

                const childrens = element.childrens
                if (childrens != null && childrens.length !== 0) {
                    structureLevelHierarchy(childrens, level + 1)
                }
            });
        }

        const structureHierarchy = () => {
            const firstLevel = 0
            structureLevelHierarchy(GeoNodeInsaGeoExplorerData.dataGroupsHierarchy.groups, firstLevel)
        }

        const childrenGroupExpansion = (childrenGroups, isExpanded) => {
            childrenGroups.forEach( element => {
                const title = element.title
                // TODO use constants or methods in the selectors
                // TODO find the parent. Refactoring
                $(`.x-tree-node a span:contains("${title}")`).parent().parent().parent().css('display', isExpanded ? 'none': '')
                const childrens = element.childrens
                if (childrens != null && childrens.length !== 0) {
                    childrenGroupExpansion(childrens, isExpanded)
                }
            });
        }