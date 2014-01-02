var _ = require('underscore'),
    consoler = require('consoler'),
    malls = require('./malls.json'),
    geo = {};

geo.type = 'FeatureCollection';
geo.features = [];

_.each(malls, function(mall){
    if (!mall.coordinates) return false;
    var properties = _.clone(mall);
    delete properties.coordinates;
    geo.features.push({
        type: 'Feature',
        properties: _.extend({'marker-symbol':'shop'}, properties),
        geometry: {
            type: 'Point',
            coordinates: mall.coordinates.reverse()
        }
    });
});

require('fs').writeFile('malls.geojson', JSON.stringify(geo) , function(err){
    if (err) return consoler.error(err);
    return consoler.success('compiled success');
});