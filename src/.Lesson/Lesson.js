import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { CircularProgress, makeStyles } from '@material-ui/core';
import { fetchLesson, setMode, killSpinner, resetLessonData } from '../.Store/lesson.actions';
import { mapPathToMode } from '../.Utilities/helpers';
import Header from './Header/LessonHeader';
import ModeSwitch from './Header/ModeSwitch';
import Body from './Body/LessonBody';
import SegmentDialog from './Dialog/SegmentDialog';

const useStyles = makeStyles({
    root: {
        backgroundColor: "#fff",
        padding: "40px",
        margin: "40px",
        boxShadow: '1px 3px 3px 0px rgba(60,64,67,.3)',
        width: '969px',
    }
})


const Lesson = (props) => {
    const mode = mapPathToMode(props.match.path);
    const lessonIdFromPath = props.match.params.lessonId || null;
    const courseIdFromPath = props.match.params.courseId || null;
    const classes = useStyles();


    useEffect(() => {
        if (mode !== 'new') {
            props.fetchLesson(mode,courseIdFromPath,lessonIdFromPath);
        } else {
            props.killSpinner();
            props.resetLessonData();
        }
        props.setMode(mode);
    }, [props.fetchLesson,mode,courseIdFromPath,lessonIdFromPath])

   
    return (
        <div className={classes.root}>
            {(props.isFetching) 
                ? <CircularProgress disableShrink />
                :   <>
                        <Header mode={mode} courseId={courseIdFromPath} lessonId={lessonIdFromPath} />
                        <Body /> 
                    </>
            }
            {(props.open) 
                ? <SegmentDialog />
                :   null
            }
        </div>
    );
}

const mapStateToProps = state => {
    return {
        mode: state.lesson.lessonMode,
        isFetching: state.lesson.isFetching,
        open: state.lesson.dialog.open,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchLesson: (mode, lessonId, courseId) => {dispatch(fetchLesson(mode, lessonId, courseId))},
        setMode: (path) => {dispatch(setMode(path))},
        killSpinner: () => {dispatch(killSpinner())},
        resetLessonData: () => {dispatch(resetLessonData())}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Lesson);