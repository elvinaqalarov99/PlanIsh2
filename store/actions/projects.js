export const ADD_PROJECT = 'ADD_PROJECT';
export const EMPTY_PROJECT = 'EMPTY_PROJECT';
export const SET_PROJECTS = 'SET_PROJECTS';
export const ADD_DELETED_PROJECTS = 'ADD_DELETED_PROJECTS';
export const ADD_TO_DELETED_PROJECTS = 'ADD_TO_DELETED_PROJECTS';

export const addProject = (project) => {
  return { type: ADD_PROJECT, project: project };
};

export const emptyProject = () => {
  return { type: EMPTY_PROJECT };
};

export const setProjects = (projects) => {
  return { type: SET_PROJECTS, projects: projects };
};

export const addDeletedProjects = (projects) => {
  return { type: ADD_DELETED_PROJECTS, projects: projects };
};

export const addToDeletedProjects = (id, project) => {
  return { type: ADD_TO_DELETED_PROJECTS, project: project, id: id };
};
