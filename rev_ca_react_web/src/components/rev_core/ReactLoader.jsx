import React, { Suspense } from 'react';
import { render } from 'react-dom';

const RevSlateRichTextPlain = React.lazy(() => import('./rev_views/rev_view_templates/rev_view_input_form_emplates/revSlateRichTextPlain'));

class ReactLoader extends React.Component {
    load(componentName, args, container, callback) {

        const Component = React.createElement(eval(componentName), args, null);

        render(<Suspense fallback="Component Failed to Load">{Component}</Suspense>, container, callback);
    }

    render() {
        return React.createElement("span", { style: { display: "none" } }, "React Loader", this.props.name);
    }
}

render(<ReactLoader ref={(element) => { window.Loader = element; }} />, document.getElementById('revDefaults'));
