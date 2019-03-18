var dataHierarchy = {
    "default": {
        title: 'Desertificação',
        level: 0,
        parent: null,
    },
    "pessao": {
        title: 'Pressão',
        level: 1,
        parent: 'deserficacao',
        childrens: [
            'Desmamento', 'Manejamento Inadequado da Terra'
        ]
    },
    "desmatamento": {
        title: 'Desmamento',
        level: 2,
        parent: 'pressao',
    },
    "manejamentoInadequado": {
        title: 'Manejamento Inadequado da Terra',
        level: 2,
        parent: 'pressao',
    },
    "impacto": {
        title: 'Impacto',
        level: 1,
        parent: 'deserficacao',
    }
}