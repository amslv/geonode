var insa = [{
  "name": "Desertificação",
  "children": [{
      "name": "Estado",
      "size": 2,
      "children": [{
          "name": "Condição Ambiental",
          "size": 3.3,
          "children": [{
              "name": "Indice de Aridez",
              "size": 3.3
            },
            {
              "name": "Indice de Seca",
              "size": 3.3
            },
            {
              "name": "Cobertura Vegetal",
              "size": 3.3
            },
            {
              "name": "Grau de Fertilidade do Solo",
              "size": 3.3
            },
            {
              "name": "Risco de Erosão Hidrica",
              "size": 3.3
            }
          ]
        },
        {
          "name": "Condição Econômica",
          "size": 3.3,
          "children": [{
              "name": "Renda Per Capita Rural",
              "size": 3.3
            },
            {
              "name": "Produtividade do Feijão",
              "size": 3.3
            },
            {
              "name": "Produtividade do Milho",
              "size": 3.3
            }
          ]
        },
        {
          "name": "Condição Social",
          "size": 3.3,
          "children": [{
              "name": "Densidade de População Rural",
              "size": 3.3
            },
            {
              "name": "Estabelecimentos Rurais Dirigidos por Mulheres",
              "size": 3.3
            }
          ]
        }
      ]
    },
    {
      "name": "Força Motriz",
      "size": 2,
      "children": [{
          "name": "Concentração de Terra",
          "size": 3.3,
          "children": [{
              "name": "Área dos estabelecimentos Rurais menores que o modulo fiscal",
              "size": 3.3
            },
            {
              "name": "Área dos estabelecimentos Rurais sob regime de não propriedade",
              "size": 3.3
            }
          ]
        },
        {
          "name": "Influência da População Urbana",
          "size": 3.3
        },
        {
          "name": "Desigualdade Social no Campo",
          "size": 3.3,
          "children": [{
              "name": "Analfabetismo no Campo",
              "size": 3.3
            },
            {
              "name": "População rural abaixo da linha de pobreza",
              "size": 3.3
            }
          ]
        }
      ]
    },
    {
      "name": "Resposta",
      "size": 2,
      "children": [{
          "name": "Organização da Sociedade Civil",
          "size": 2
        },
        {
          "name": "Organização do Poder Público",
          "size": 2
        }
      ]
    },
    {
      "name": "Impacto",
      "size": 2,
      "children": [{
          "name": "Taxa de Migração do Campo para a Cidade",
          "size": 5
        },
        {
          "name": "Variação da Participação da Agropecuária no PIB",
          "size": 5
        }
      ]
    },
    {
      "name": "Pressão",
      "size": 2,
      "children": [{
          "name": "Desmatamento",
          "size": 5,
          "children": [{
              "name": "Avanço da fronteira agropecuária",
              "size": 3.3
            },
            {
              "name": "Mudança da cobertura vegetal",
              "size": 3.3
            }
          ]
        },
        {
          "name": "Manejamento Inadequado da Terra",
          "size": 5,
          "children": [{
              "name": "Carga animal excessiva",
              "size": 3.3
            },
            {
              "name": "Recorrência de Incêndio",
              "size": 3.3
            }
          ]
        }
      ]
    }
  ]
}];
var color = d3.scaleOrdinal(d3.schemePaired);
d3.json(insa).then(data => {
  Sunburst()
    .data(data)
    .label('name')
    .size('size')
    .color((d, parent) => color(parent ? parent.data.name : null))
    (document.getElementById('chart'));
});