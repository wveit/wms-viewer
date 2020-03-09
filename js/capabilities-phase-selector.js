const capabilitiesEntryTab = document.getElementById("capabilities-entry-tab");
const layerSelectionTab = document.getElementById("layer-selection-tab");
const activeLayersTab = document.getElementById("active-layers-tab");

const capabilitiesPhase = document.getElementById("capabilities-phase");
const layerSelectionPhase = document.getElementById("layer-selection-phase");
const activeLayersPhase = document.getElementById("active-layers-phase");

function tabClickHandler(event) {
    handleTabSelection(event.target);
}

function handleTabSelection(tabElement) {
    capabilitiesEntryTab.classList.remove("selected-tab");
    layerSelectionTab.classList.remove("selected-tab");
    activeLayersTab.classList.remove("selected-tab");

    capabilitiesPhase.classList.add("display-none");
    layerSelectionPhase.classList.add("display-none");
    activeLayersPhase.classList.add("display-none");

    if(tabElement === capabilitiesEntryTab) {
        capabilitiesEntryTab.classList.add("selected-tab");
        capabilitiesPhase.classList.remove("display-none");

    }
    else if(tabElement === layerSelectionTab) {
        layerSelectionTab.classList.add("selected-tab");
        layerSelectionPhase.classList.remove("display-none");
    }
    else {
        activeLayersTab.classList.add("selected-tab");
        activeLayersPhase.classList.remove("display-none");
    }
}

capabilitiesEntryTab.onclick = tabClickHandler;
layerSelectionTab.onclick = tabClickHandler;
activeLayersTab.onclick = tabClickHandler;


//////////////////////////////////////////////
//
//          Program startup condition
//
//////////////////////////////////////////////
handleTabSelection(capabilitiesEntryTab);