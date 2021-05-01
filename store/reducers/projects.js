import {
  ADD_PROJECT,
  EMPTY_PROJECT,
  SET_PROJECTS,
  ADD_DELETED_PROJECTS,
  ADD_TO_DELETED_PROJECTS,
} from '../actions/projects';

const initialState = {
  projects: [],
  deletedProjects: [],
};

const projectsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.project],
      };
    case ADD_DELETED_PROJECTS:
      return {
        ...state,
        deletedProjects: action.projects,
      };
    case ADD_TO_DELETED_PROJECTS:
      return {
        ...state,
        deletedProjects: [...state.deletedProjects, action.project],
        projects: state.projects.filter((item) => item.id !== action.id),
      };
    case EMPTY_PROJECT:
      return {
        ...state,
        projects: [],
        deletedProjects: [],
      };
    case SET_PROJECTS:
      return {
        ...state,
        projects: action.projects,
      };
    default:
      return state;
  }
};

export default projectsReducer;
