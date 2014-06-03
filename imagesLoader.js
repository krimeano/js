var loadImages = function (sources, onFinished) {
    var output = {},
        pp = [],
        key,
        loadImg = function (url, key) {
            return new Promise(function (resolve, reject) {
                var img = new Image();
                img.attributes['data-key'] = key;
                img.onload = function () {
                    resolve(img);
                };
                img.onerror = function () {
                    reject(Error('Can\'t load image \"' + url + '"'));
                };
                img.src = url;
            });
        },
        handleLoaded = function (data) {
            var i = data.length;
            while (i--) {
                output[data[i].attributes['data-key']] = data[i];
            }
            onFinished(output);
        };
    for (key in sources) {
        if (!sources.hasOwnProperty(key)) {
            continue;
        }
        pp.push(loadImg(this.constructImageUrl(sources[key]), key));
    }
    Promise.all(pp).then(handleLoaded);
};


var sources = {
    foo: '/images/bar.jpg',
    spam: '/images/egg.jpg'
};