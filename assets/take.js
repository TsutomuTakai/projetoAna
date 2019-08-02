function init() { // eslint-disable-line no-unused-vars
    
    var player = videojs('my-video');

    var img = [
        3840, // original width of image
        2160 // original height of image
    ]
    // create the map
    var map = L.map('map', {
        minZoom: 2.3,
        zoomDelta: 0.2,
        zoomSnap: 0.1,
        zoomControl: false
    })

    var panorama, viewer, container, changeImageBtn, textureLoader, texture1, texture2;
    container = document.querySelector('#viewer');
    panorama = new PANOLENS.ImagePanorama('https://pchen66.github.io/Panolens/examples/asset/textures/equirectangular/tunnel.jpg');
    panorama.addEventListener('load', function () {
        texture1 = panorama.material.uniforms.tEquirect.value;
    });

    viewer = new PANOLENS.Viewer({
        container: container
    });
    viewer.add(panorama);
    textureLoader = new THREE.TextureLoader();
    textureLoader.crossOrigin = '*';

    // assign map and image dimensions
    var rc = new L.RasterCoords(map, img)
    // set max zoom Level (might be `x` if gdal2tiles was called with `-z 0-x` option)
    map.setMaxZoom(rc.zoomLevel())
    new L.Control.Zoom({
        position: 'bottomright'
    }).addTo(map);
    // set the view in the middle of the image
    map.setView(rc.unproject([img[0] / 2, img[1] / 2]), 2)
    map.fitBounds([
        [85.0511287798066, -180],
        [-9.79567758282973, 157.50000000000003]
    ], {
        padding: [0, 20]
    });


    // set marker at the image bound edges
    var layerBounds = L.layerGroup([
        L.marker([63.573222288756384, 43.591509262593384]).on('click', function (e) {
            player = videojs('my-video')
            document.getElementById("videoModal").style.display = "flex";
            player.src({
                type: 'video/mp4',
                src: "assets/videos/Macondo_video_interface_2.mp4"
            });
            player.play();
        }),
        L.marker([15.05854658772907, 47.54882812500001]).on('click', function (e) {
            
            texture2 = textureLoader.load( 'https://pchen66.github.io/Panolens/examples/asset/textures/equirectangular/field.jpg');
            
            panorama.updateTexture(texture2);
            
            document.getElementById("fotoModal").style.opacity = 1;
            document.getElementById("fotoModal").style.zIndex = 1;

        }),
        L.marker([57.24993345423012, -148.58867685966123]).on('click' , function(e){
            texture2 = textureLoader.load( 'https://pchen66.github.io/Panolens/examples/asset/textures/equirectangular/tunnel.jpg');
            
            panorama.updateTexture(texture2);
            
            document.getElementById("fotoModal").style.display = "flex";
            document.getElementById("fotoModal").style.opacity = 1;
            document.getElementById("fotoModal").style.zIndex = 1;


        }),
        L.marker([65.29817696561993, 108.12750044183491]).on('click', function (e) {
            player = videojs('my-video')
            document.getElementById("videoModal").style.display = "flex";
            player.src({
                type: 'video/mp4',
                src: "assets/videos/Macondo_video_interface_3.mp4"
            });
            player.play();
        }),
    ])
    map.addLayer(layerBounds)


    // set markers on click events in the map
    map.on('click', function (event) {
        /* var coords = rc.project(event.latlng)
        var marker = L.marker(rc.unproject(coords))
            .addTo(layerBounds)
        marker.bindPopup('[' + Math.floor(coords.x) + ',' + Math.floor(coords.y) + ']')
            .openPopup()
 */
        console.log(event.latlng);
    })


    // the tile layer containing the image generated with gdal2tiles --leaflet ...
    L.tileLayer('assets/tiles/{z}/{x}/{y}.png', {
        noWrap: true
    }).addTo(map)


}


function closeAll() {
    var cont = videojs('my-video');
    cont.pause();
    document.getElementById("map").style.display = "block";
    document.getElementById("sobre").style.display = "none";
    document.getElementById("envie").style.display = "none";
    document.getElementById("livro").style.display = "none";
    document.getElementById("transmedia").style.display = "none";
    document.getElementById("contato").style.display = "none";
    document.getElementById("videoModal").style.display = "none";
    document.getElementById("fotoModal").style.display = "none";


}

function openModal(nomeModal) {
    document.getElementById(nomeModal).style.display = "flex";
}