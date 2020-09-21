import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { stripTags } from '../../.Utilities/Utilities';
import parser from '../functions/parser';
import { updateFloovio } from '../../.Store/floovio.actions';
import { connect } from 'react-redux';

const FloovioEditor = (props) => {

    return (
        <Editor
            apiKey="i36gbjqh8ydba7ux5zg956l58ckmicfaa8rib2yuv9d3agu6"
            initialValue={props.html || '' }
            init={{
                height: 450,
                width: 979,
                skin: "material-outline",
                statusbar: true,
                plugins: 'table lists template paste',
                menubar: 'edit insert',
                table_grid: false,
                toolbar: "undo redo | bold italic underline strikethrough | numlist bullist | outdent indent | forecolor removeformat | alignleft aligncenter alignright alignjustify | formatselect | template",
                paste_preprocess: (plugin, args) => {
                    args.content = stripTags( args.content,'li,ol' )
                },  
            }}
            onEditorChange={(content) => props.updateContent(content)}
        />
    );
}

const mapStateToProps = state => {
    return {
        html: state.floovio.content.html,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        updateContent: (html) => {dispatch(updateFloovio(parser(html), html))},
    }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(FloovioEditor);