import firebase from '../firebase';

const setLessonRef = (courseId,lessonId) => {
    let lessonRef;
    if (courseId !== null) {
        lessonRef = firebase.firestore().collection("courses").doc(courseId).collection("lessons").doc(lessonId);
    } else {
        lessonRef = firebase.firestore().collection("lessons").doc(lessonId);
    }
    return lessonRef;
}

export const getLesson = (mode,courseId,lessonId) => {
    const lessonRef = setLessonRef(courseId,lessonId);
    return lessonRef.get()
}

export const handleDbErrors = response => {
    if (response.error) {
      throw Error(response.error);
    }
    return response;
}

export const updateAnswers = (courseId, lessonId, userInput) => {
    const lessonRef = setLessonRef(courseId,lessonId);
    lessonRef.update({ userInput: userInput })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.error(err);
        })
}

export const updateLesson = (courseId, lessonId, lessonData) => {
    const lessonRef = setLessonRef(courseId,lessonId);
    lessonRef.update({ json: lessonData })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.error(err);
        })
}
