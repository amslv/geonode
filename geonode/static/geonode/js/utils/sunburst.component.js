var color = d3.scaleOrdinal(d3.schemePaired);
d3.json("../../json/desertificacao.json").then(data => {
  Sunburst()
    .data(data)
    .label('name')
    .size('size')
    .color((d, parent) => color(parent ? parent.data.name : null))
    (document.getElementById('chart'));
});
