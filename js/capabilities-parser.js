const WMSCapabilities = ol.format.WMSCapabilities;
const parser = new WMSCapabilities();



export function parseCapabilities(capabilitiesText) {
    const openlayersObject = parser.read(capabilitiesText);

    const capabilities = {};
    capabilities.formats = openlayersObject.Capability.Request.GetMap.Format;
    capabilities.layers = openlayersObject.Capability.Layer.Layer;

    return capabilities;
}

