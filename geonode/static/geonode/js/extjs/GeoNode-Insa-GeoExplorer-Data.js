let GeoNodeInsaGeoExplorerData = {}

GeoNodeInsaGeoExplorerData.dataGroupsHierarchy = {
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
                },
                {
                    name: 'resposta',
                    title: 'Resposta',
                    childrens: [
                        {
                            name: 'organizacaoDoPoderPublico',
                            title: 'Organização do Poder Público',
                        },
                        {
                            name: 'organizacaoDaSociedadeCivil',
                            title: 'Organização da Sociedade Civil',
                        }                        
                    ]
                },
                {
                    name: 'forcaMotriz',
                    title: 'Força Motriz',
                    childrens: [
                        {
                            name: 'desigualdadeSocilaNoCampo',
                            title: 'Desigualdade Social no Campo',
                        },
                        {
                            name: 'influenciaDaPopuçacaoUrbana',
                            title: 'Influencia da População Urbana',
                        },
                        {
                            name: 'concentracaoDeTerra',
                            title: 'Concentração de Terra',
                        }                        
                    ]                    
                },
                {
                    name: 'estado',
                    title: 'Estado',
                    childrens: [
                        {
                            name: 'condicaoSocial',
                            title: 'Condição Social',
                        },
                        {
                            name: 'condiçãoEconomica',
                            title: 'Condição Econômica',
                        },
                        {
                            name: 'condicaoAmbiental',
                            title: 'Condição Ambiental',
                        }     
                    ]                    
                }
            ]
        }
    ]
}

GeoNodeInsaGeoExplorerData.generateGeoNodeExplorerGroups = (groups, geoNodeExplorerGroups = {}) => {
    groups.forEach(element => {
        const elementName = element.name ? element.name : element.title
        let geoNodeExplorerGroup = {}
        geoNodeExplorerGroup[`${elementName}`] = { title: element.title }
        geoNodeExplorerGroups = { ...geoNodeExplorerGroups, ...geoNodeExplorerGroup }
        if (element.childrens != null && element.childrens.length != 0) {
            geoNodeExplorerGroups = GeoNodeInsaGeoExplorerData.generateGeoNodeExplorerGroups(element.childrens, geoNodeExplorerGroups)
        }
    })
    return geoNodeExplorerGroups
}

GeoNodeInsaGeoExplorerData.normalizeDataToGeoExplorer = (dataGroup) => {
    try {
        return GeoNodeInsaGeoExplorerData.generateGeoNodeExplorerGroups(dataGroup.groups)    
    } catch (error) {
        console.log('Error while normalizing geonode explorer groups', error)
        return {}   
    }
}