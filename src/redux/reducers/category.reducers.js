import { categoryConstants } from "../actions/constants";

const initState = {
  categories: [],
  loading: false,
  error: null,
};

const buildNewCategories = (parentId, categories, category) => {
  let myCategories = [];
  if (parentId === undefined) {
    return [
      ...categories,

      {
        _id: category._id,
        name: category.name,
        slug: category.slug,
        type: category.type,
        children: [],
      },
    ];
  }
  for (let cat of categories) {
    if (cat._id === parentId) {
      const newCategory = {
        _id: category._id,
        name: category.name,
        slug: category.slug,
        type: category.type,
        parentId: category.parentId,
        children: [],
      };

      myCategories.push({
        ...cat,
        children:
          cat.children.length > 0
            ? [...cat.children, newCategory]
            : [newCategory],
      });
    } else {
      myCategories.push({
        ...cat,
        children: cat.children
          ? buildNewCategories(parentId, cat.children, category)
          : [],
      });
    }
  }
  return myCategories;
};
const categoryReducer = (state = initState, action) => {
  switch (action.type) {
    case categoryConstants.GET_ALL_CATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case categoryConstants.GET_ALL_CATEGORY_SUCCESS:
      state = {
        ...state,
        categories: action.payload.categories,
        loading: false,
      };
      break;
    case categoryConstants.GET_ALL_CATEGORY_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;
    case categoryConstants.ADD_NEW_CATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case categoryConstants.ADD_NEW_CATEGORY_SUCCESS:
      const updatedCategories = buildNewCategories(
        action.payload.category.parentId,
        state.categories,
        action.payload.category
      );
      console.log(updatedCategories);

      state = {
        ...state,
        categories: updatedCategories,
        loading: false,
      };
      break;
    case categoryConstants.ADD_NEW_CATEGORY_FAILURE:
      state = {
        ...initState,
        // error: action.payload.error,
        loading: false,
      };
      break;
    case categoryConstants.UPDATE_CATEGORY_REQUEST:
      state = {
        ...state,
        // error: action.payload.error,
        loading: true,
      };
      break;
    case categoryConstants.UPDATE_CATEGORY_SUCCESS:
      state = {
        ...state,
        // error: action.payload.error,
        loading: false,
      };
      break;
    case categoryConstants.UPDATE_CATEGORY_FAILURE:
      state = {
        ...state,
        // error: action.payload.error,
        error: action.payload.error,
      };
      break;
    case categoryConstants.DELETE_CATEGORY_REQUEST:
      state = {
        ...state,
        // error: action.payload.error,
        loading: true,
      };
      break;
    case categoryConstants.DELETE_CATEGORY_SUCCESS:
      state = {
        ...state,
        // error: action.payload.error,
        loading: false,
      };
      break;
    case categoryConstants.DELETE_CATEGORY_FAILURE:
      state = {
        ...state,
        // error: action.payload.error,
        error: action.payload.error,
      };
      break;
    default:
      return state;
  }
  return state;
};
export default categoryReducer;
