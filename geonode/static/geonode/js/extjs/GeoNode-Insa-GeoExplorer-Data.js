let dataGroupsHierarchy = {
    groups: [
        {
            name: 'default',
            title: 'Desertificação',
            childrens: [
                {
                    name: 'pessao',
                    title: 'Pressão',
                    childrens: [
                        {
                            name: 'desmatamento',
                            title: 'Desmamento',
                        },
                        {
                            name: 'manejamentoInadequado',
                            title: 'Manejamento Inadequado da Terra',
                        }
                    ]
                },
                {
                    name: 'impacto',
                    title: 'Impacto',                    
                    childrens: []
                }
            ]
        }
    ]
}

let generateGeoNodeExplorerGroups = (groups, geoNodeExplorerGroups) => {
    groups.forEach(element => {
        const elementName = element.name ? element.name : element.title
        let geoNodeExplorerGroup = {}
        geoNodeExplorerGroup[`${elementName}`] = { title: element.title }
        geoNodeExplorerGroups = { ...geoNodeExplorerGroups, ...geoNodeExplorerGroup }
        if (element.childrens != null && element.childrens.length != 0) {
            geoNodeExplorerGroups = generateGeoNodeExplorerGroups(element.childrens, geoNodeExplorerGroups)
        }
    })
    return geoNodeExplorerGroups
}

let normalizeDataToGeoExplorer = (dataGroup) => {
    try {
        return generateGeoNodeExplorerGroups(dataGroup.groups, {})    
    } catch (error) {
        console.log('Error while normalizing geonode explorer groups', error)
        return {}   
    }
}