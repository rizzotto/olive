import api from './api';

export default function RecipesAPI() {
  return {
    getRecipesList: async ({ title, tags, status }) => {
      title = title || undefined;
      let params = new URLSearchParams();
      tags.map(tag => params.append('tag', tag));
      if (title) params.append('title', title);

      if (!status) {
        params.append('status', 'P');
      } else {
        params.append('status', 'A');
      }

      return api
        .get('/recipes', { params })
        .then(response => response.data.data);
    },

    getRecipesListWithPreferences: async ({ tags }) => {
      let params = new URLSearchParams();
      params.append('isPreferences', true);
      tags.forEach(tag => params.append('tag', tag));

      return api
        .get('/recipes', { params })
        .then(response => response.data.data);
    },

    getRecipeById: async ({ id }) => {
      return api
        .get('/recipes')
        .then(
          response =>
            response.data.data.filter(recipe => recipe.recipe_id == id)[0],
        );
    },

    getRecipesByUser: async ({ id }) => {
      return api
        .get(`/recipes/user/${id}`)
        .then(response => response.data.data);
    },

    getTagsList: async () => {
      return api
        .get('/tags')
        .then(response =>
          response.data.data.map(tag => ({ ...tag, selected: false })),
        );
    },

    postRecipe: async postObject => {
      return api.post('/recipes', postObject);
    },

    patchRecipe: async recipe => {
      return api.patch('/recipes', recipe);
    },

    likeRecipe: async id => {
      return api.patch(`/recipes/like/${id}`);
    },

    dislikeRecipe: async id => {
      return api.patch(`/recipes/dislike/${id}`);
    },
  };
}
