import { revGetServerData_Text_Async } from '../rev_pers/rev_remote_pers/rev_entity/revPersLibReadServerData_RevEntity';

var revLoadDynamicScript = (revUrl, callback) => {
    const existingScript = document.getElementById('scriptId');

    if (!existingScript) {
        const script = document.createElement('script');
        script.src = revUrl; // URL for the third-party library being loaded.
        script.id = 'libraryName'; // e.g., googleMaps or stripe
        document.body.appendChild(script);

        script.onload = () => {
            if (callback) callback();
        };
    }

    if (existingScript && callback) callback();
};

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

var revGetRemoteScriptObject = async (revEntity) => {
    let revScriptObject = await revGetServerData_Text_Async('http://localhost:4000/api/download/rev_view_js?filePath=' + 'rev_test.js');
    var body = revScriptObject.substring(revScriptObject.indexOf("{") + 1, revScriptObject.lastIndexOf("}"));

    localStorage.setItem("revJSFucnctionCallData", body);

    let revItemsArr = [];

    if (typeof (Storage) !== "undefined") {
        let revTestJsFunc = new Function('revEntity', localStorage.revJSFucnctionCallData);
        let revJSFucnctionCallData = revTestJsFunc(revEntity).revView({ 'revData': 'Hi THERE 04:36' });

        revItemsArr.push({ 'rev_test': revTestJsFunc });

        (revItemsArr[0].rev_test)(revEntity).revView({ 'revData': 'OLI REV SAYS >>> Hi THERE 04:36' });

        console.log('revJSFucnctionCallData >>> ' + revJSFucnctionCallData)

        return revJSFucnctionCallData;
    }
};

export { revGetRemoteScriptObject, revLoadDynamicScript };