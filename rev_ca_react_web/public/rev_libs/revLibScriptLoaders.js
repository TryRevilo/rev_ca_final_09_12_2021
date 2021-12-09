var revLoadDynamicScript = (revUrl, callback) => {
    const existingScript = document.getElementById("scriptId");

    if (!existingScript) {
        const script = document.createElement("script");
        script.src = revUrl; // URL for the third-party library being loaded.
        script.id = "libraryName"; // e.g., googleMaps or stripe
        document.body.appendChild(script);

        script.onload = () => {
            if (callback) callback();
        };
    }

    if (existingScript && callback) callback();
};

var revLoadDynamicScriptData = (revData, callback) => {
    let revScriptModuleId = revData.revNameId;
    let existingScript = document.getElementById(revScriptModuleId);

    if (!window.revIsEmptyVar(revData.revData) && !existingScript) {
        let script = document.createElement("script");

        let scriptStr = revData.revData;

        scriptStr = scriptStr.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, " ");
        scriptStr = scriptStr.replace(/(\r\n|\n|\r)/gm, " ");

        script.src = "data:text/javascript," + scriptStr;

        script.id = revScriptModuleId;
        document.body.appendChild(script);

        if (!callback) {
            return new Promise((resolve, reject) => {
                script.onload = () => {
                    resolve();
                };
            });
        } else {
            script.onload = () => {
                callback();
                return;
            };
        }
    } else if (callback) {
        callback();
    }
};

var revLoadPageCSS = (revData) => {
    let sheet = document.createElement("style");
    sheet.innerHTML = revData.revCSS;
    document.head.appendChild(sheet);
};

function download(filename, text) {
    var element = document.createElement("a");
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text));
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}
