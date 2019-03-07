// (refactoring) TODO this constants must be setted in another file (Issue 3)    
    const GEOSERVER_URL = 'http://192.168.15.13/geoserver/ows/';
    const DEFAULT_LAYER_OPACITY = 0.85;
    const CENTER_COORDS = [-4615573.515972, -794945.094166];

    changeAdvancedButton = (imgName) => {
      let url = window.location.protocol + '//' + window.location.hostname + '/maps/new?layer=' + imgName;

      $('#advanced-button').attr("href", url);
    }  
    
    let currentLayer;
    createLayer = (imgName) => {
      currentLayer = imgName;
      layer = new ol.layer.Tile({
        opacity: DEFAULT_LAYER_OPACITY,
        visible: true,
        source: new ol.source.TileWMS({
          url: GEOSERVER_URL,
          params: {
            'LAYERS': imgName,
            'TILED': 'true'
          },
          ratio: 3,
          serverType: "geoserver"
        })
      });

      tryForceEndLoading();
      layer.getSource().on('tileloadstart', function (event) {        
        tryStartLoading();
      });

      layer.getSource().on('tileloadend', function (event) {
        tryEndLoading();
      });

      layer.getSource().on('tileloaderror', function (event) {
        tryEndLoading();
      });

      return layer;
    }

    calculateChartSize = () => {
      const DEFAULT_PERCENT_SIZE = 0.9;
      const DEFAULT_SIZE = 400;
      try {
        return parseInt($("#container-chart").css('width')) * DEFAULT_PERCENT_SIZE;
      } catch (error) {
        return DEFAULT_SIZE;
      }
    };

    stopPeddingRequests = () => {
      window.stop();
    }

    const layerTitleSource = new ol.source.XYZ({
        url: 'https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}'
      })

      const layerTitle = new ol.layer.Tile({
          source: layerTitleSource
      });

      let sabLayer = new ol.layer.Tile({
        visible: true,
        source: new ol.source.TileWMS({
          url: GEOSERVER_URL,
          params: {
            LAYERS: 'geonode:lim_semiarido_municipal_oficial',
            TILED: "true"
          },
          ratio: 3,
          serverType: "geoserver"
        })
      });

      let aguasLayer = new ol.layer.Tile({
        visible: true,
        source: new ol.source.TileWMS({
          url: GEOSERVER_URL,
          params: {
            LAYERS: 'geonode:massa_dagua_sab',
            TILED: "true"
          },
          ratio: 3,
          serverType: "geoserver"
        })
      });

      const defaultLSource = new ol.source.XYZ({
        url: 'https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}'
      })

      let defaultL = new ol.layer.Tile({
        source: defaultLSource
      });

      const initialImgNameLayer = dataDesertificacao.imgName;
      let rootLayer = createLayer(initialImgNameLayer);

    actionOnSunbust = (map, sunburst, choosenData, defaultL, aguasLayer, sabLayer, layerTitle) => {
      let imgName = choosenData.imgName;
      if (currentLayer === imgName) {
          console.log('The same image. Do nothing.')
          return;
        }
        stopPeddingRequests();
        map.getLayers().clear();
        sunburst.focusOnNode(choosenData);
        
        let layer1 = createLayer(imgName);    

        map.addLayer(defaultL);
        map.addLayer(layer1);
        map.addLayer(aguasLayer);
        map.addLayer(sabLayer);
        map.addLayer(layerTitle);
        
        changeAdvancedButton(choosenData.imgName);
        fillBreadcrumbs(map, sunburst, choosenData, defaultL, aguasLayer, sabLayer, layerTitle);
        fillLegend(choosenData.imgName);
        fillDescrition(choosenData);      
    }

    let sunburst;
      $(document).ready(() => {
      let map = new ol.Map({
        layers: [defaultL, rootLayer, aguasLayer, sabLayer, layerTitle],
        target: "map",
        pixelRatio: 1,
        view: new ol.View({
          center: CENTER_COORDS,
          zoom: 5
        })
      });

      let geocoder = new Geocoder('nominatim', {
        provider: 'osm',
        lang: 'pt-BR',
        placeholder: 'Pesquisa por município . . .',
        targetType: 'glass-button',
        limit: 2,
        keepOpen: true
      });

      geocoder.on('addresschosen', function (evt) {        
        map.getView().animate({ zoom: 10, center: evt.coordinate });
        // TODO study who the geocode works
        // to colapse the search field
        $("#map").click();
      });

      map.addControl(geocoder);  

      // TODO analyze this approach, because only works in the page initialization (Issue 5)
      let chartContainerSize = calculateChartSize();

      let color = d3.scaleOrdinal(d3.schemePaired);
      // TODO (refactoring) put the "data" in another file. (Issue 6)
      const DATA_DESERT_ATTR_LABEL = "name2";
      const DATA_DESERT_ATTR_SIZE = "size";
      sunburst = Sunburst()
        .data(dataDesertificacao)
        .label(DATA_DESERT_ATTR_LABEL)
        .size(DATA_DESERT_ATTR_SIZE)
        .width(chartContainerSize)
        .height(chartContainerSize)
        .color((d, parent) => d.color);

      sunburst.onNodeClick(choosenData => {
        actionOnSunbust(map, sunburst, choosenData, defaultL, aguasLayer, sabLayer, layerTitle);
      });

      sunburst($("#chart")[0]);

      changeAdvancedButton(initialImgNameLayer);
      fillBreadcrumbs(map, sunburst, dataDesertificacao, defaultL, aguasLayer, sabLayer, layerTitle);
      fillLegend(initialImgNameLayer);
      fillDescrition(dataDesertificacao);
    });

    $('#navbar li').on( "click", () => {
      stopPeddingRequests();
    });    

    let resizing = false;
    $(window).on('resize', function(){
      const RESIZING_TIMEOUT = 1000;
      if (!resizing) {
        resizing = true;
        setTimeout(() => {          
          let chartContainerSize = calculateChartSize();
          sunburst.width(chartContainerSize);
          sunburst.height(chartContainerSize);
          $("#chart").html('');
          sunburst($("#chart")[0]);
          resizing = false;          
        }, RESIZING_TIMEOUT);
      }
    }); 