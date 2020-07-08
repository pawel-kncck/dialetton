import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { setDialog, deleteExercise } from '../../.Store/lesson.actions';
import { connect } from 'react-redux';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

// props = index, mode
const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
    }
})

const EditingPanel = (props) => {
    const classes = useStyles();
    
    const handleOpenEditorInEditMode = () => {
        const type = props.segments[props.index].type
        const json = props.segments[props.index].json
        const html = props.segments[props.index].htmlString

        props.setDialog(true,type,props.index,html,json)
    }

    return (
        <div className={classes.editButtons}>
            <Button color="primary"><ArrowUpwardIcon /></Button>
            <Button color="primary"><ArrowDownwardIcon /></Button>
            <Button color="primary" onClick={() => handleOpenEditorInEditMode()}><EditIcon /></Button>
            <Button color="primary" onClick={() => props.deleteExercise(props.index)}><DeleteIcon /></Button>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        mode: state.lesson.lessonMode,
        segments: state.lesson.lessonData.segments,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        deleteExercise: (index) => {dispatch(deleteExercise(index))},
        setDialog: (open,type,index,html,json) => {dispatch(setDialog(open,type,index,html,json))},
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(EditingPanel);