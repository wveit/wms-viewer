
const WMSCapabilities = ol.format.WMSCapabilities;
const parser = new WMSCapabilities();

/////////////////////////////////////////////////////////////////////////////////////
//
//      Get handles to all the ui components
//
/////////////////////////////////////////////////////////////////////////////////////
const capabilitiesUrlButton = document.getElementById("capabilities-url-button");
const capabilitiesUrlInput = document.getElementById("capabilities-url-input");
const layerDropdown = document.getElementById("layer-dropdown");
const imageGetButton = document.getElementById("image-get-button");
const outputImage = document.getElementById("layer-image");


/////////////////////////////////////////////////////////////////////////////////////
//
//      Application State
//
/////////////////////////////////////////////////////////////////////////////////////
let formats = [];
let layers = [];
let baseUrl = "";


/////////////////////////////////////////////////////////////////////////////////////
//
//      Event Handlers
//
/////////////////////////////////////////////////////////////////////////////////////
capabilitiesUrlButton.onclick = function() {
    baseUrl = capabilitiesUrlInput.value.split("?")[0];
    console.log("baseUrl: " + baseUrl);
    loadCapabilities(capabilitiesUrlInput.value);
};

imageGetButton.onclick = function() {
    const index = Number.parseInt(layerDropdown.value);
    const layer = layers[index];
    requestImage(layer);
};


/////////////////////////////////////////////////////////////////////////////////////
//
//      Helper Functions
//
/////////////////////////////////////////////////////////////////////////////////////
function loadCapabilities(capabilitiesUrl) {

    fetch(capabilitiesUrl)
    .then(response => response.text())
    .then(xmlText => parser.read(xmlText))
    .then(capabilities => {
        console.log(capabilities);
        formats = capabilities.Capability.Request.GetMap.Format;
        layers = capabilities.Capability.Layer.Layer;
        layers.forEach((layer, index) => {
            layerDropdown.appendChild(createDropdownOption(layer.Name, index));
        });
    });
}


function createDropdownOption(name, index) {
    const option = document.createElement("option");
    option.innerHTML = name;
    option.value = index;
    return option;
}

function requestImage(layer) {
    let url = baseUrl + "?VERSION=1.3&REQUEST=GetMap&SERVICE=WMS";
    url += `&LAYERS=${layer.Name}`;
    url += `&STYLES=${layer.Style[0].Name}`;
    url += `&CRS=${layer.CRS[0]}`;
    url += `&BBOX=${layer.BoundingBox[0].extent.join(",")}`;
    url += `&WIDTH=500`;
    url += `&HEIGHT=500`;
    url += `&FORMAT=${formats[0]}`;

    console.log("url: " + url);
    outputImage.src = url;
}
