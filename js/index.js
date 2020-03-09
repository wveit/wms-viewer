
import { parseCapabilities } from "./capabilities-parser.js";
import * as CapabilitiesEntry from "./capabilities-entry.js";
import * as CapabilitiesPhaseSelector from "./capabilities-phase-selector.js";
import { clearChildElements, populateDropdown } from "./html-util.js";

/////////////////////////////////////////////////////////////////////////////////////
//
//      Get handles to all the ui components
//
/////////////////////////////////////////////////////////////////////////////////////
const layerDropdown = document.getElementById("layer-dropdown");
const imageGetButton = document.getElementById("image-get-button");
const outputImage = document.getElementById("layer-image");


/////////////////////////////////////////////////////////////////////////////////////
//
//      Application State
//
/////////////////////////////////////////////////////////////////////////////////////

let baseUrl = "";
let capabilities = {};

/////////////////////////////////////////////////////////////////////////////////////
//
//      Event Handlers
//
/////////////////////////////////////////////////////////////////////////////////////

CapabilitiesEntry.registerCallback(loadCapabilities);

imageGetButton.onclick = function() {
    const index = Number.parseInt(layerDropdown.value);
    const layer = capabilities.layers[index];
    requestImage(layer);
};


/////////////////////////////////////////////////////////////////////////////////////
//
//      Helper Functions
//
/////////////////////////////////////////////////////////////////////////////////////
function loadCapabilities(capabilitiesUrl) {
    baseUrl = capabilitiesUrl.split("?")[0];
    console.log("base url: " + baseUrl);
    console.log("full capabilities url: ", capabilitiesUrl, "\n\n");

    clearChildElements(layerDropdown);

    fetch(capabilitiesUrl)
    .then(response => response.text())
    .then(xmlText => parseCapabilities(xmlText))
    .then(parsedCapabilities => {
        capabilities = parsedCapabilities;
        console.log("capabilies:\n", capabilities, "\n\n");
        populateDropdown(layerDropdown, capabilities.layers.map(item => item.Name));
    })
    .catch(error => console.log("error:\n", error, "\n\n"));
}




function requestImage(layer) {
    // Added the following line because some layers do not seem to have a style element.
    // In those cases, just setting style to "default" seems to be working.
    // TODO: Try to find out if this is the correct approach when no style element is present.
    const style = layer.Style ? layer.Style[0].Name : "default";

    // The way we are requesting and displaying the image (for now) is by forming the url
    // through which the image can be accessed, and then setting a <IMG> element's "src"
    // attribute to that url.
    let url = baseUrl + "?VERSION=1.3&REQUEST=GetMap&SERVICE=WMS";
    url += `&LAYERS=${layer.Name}`;
    url += `&STYLES=${style}`;
    url += `&CRS=${layer.CRS[0]}`;
    url += `&BBOX=${layer.BoundingBox[0].extent.join(",")}`;
    url += `&WIDTH=1000`;
    url += `&HEIGHT=500`;
    url += `&FORMAT=${capabilities.formats[0]}`;

    console.log("image url: ", url, "\n\n");
    outputImage.src = url;
}
