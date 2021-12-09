require.config({ paths: { "vs": "../monaco-editor-0.25.2/package/min/vs" } });
require(["vs/editor/editor.main"], function () {
    // Initialize variables
    var fileCounter = 0;
    var editorArray = [];
    var defaultCode = ["function helloWorld() {", '   console.log("Hello world!");', "}"].join("\n");

    // define editor theme
    monaco.editor.defineTheme("myTheme", {
        base: "vs",
        inherit: true,
        rules: [{ background: "EDF9FA" }],
    });
    monaco.editor.setTheme("myTheme");

    // Create a new editor
    function newEditor(container_id, code, language) {
        var model = monaco.editor.createModel(code, language);
        var editor = monaco.editor.create(document.getElementById(container_id), {
            model: model,
        });
        editorArray.push(editor);
        return editor;
    }

    // Create a new div
    function addNewEditor(code, language) {
        newEditor("revMonacoCodeEditorContainer_Id", code, language);
        fileCounter += 1;
    }

    window.revSetInterval("revMonacoCodeEditorContainer_Id", () => {
        addNewEditor(defaultCode, "javascript");
    });
});
