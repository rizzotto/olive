/* eslint-disable no-console */
import firebase from 'firebase/app';
import 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { firestore, googleAuthProvider } from '../services/firebase';
import RecipesAPI from '../services/RecipesAPI';

// Context
const AppContext = createContext();

// Provider
function AppProvider({ children }) {
  const [renderNavBar, setRenderNavBar] = useState(true);
  const [navBarValue, setNavBarValue] = useState(0);
  const [authUser, setAuthUser] = useState(null);
  const [isNewUser, setIsNewUser] = useState(false);
  const [userDoc, setUserDoc] = useState(null);
  const [favouriteRecipes, setFavouriteRecipes] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const discard = firebase.auth().onAuthStateChanged(async authUser => {
      setLoading(true);
      setRenderNavBar(false);
      if (authUser) {
        if (await _isNewUser(authUser)) {
          setIsNewUser(true);
        } else {
          setIsNewUser(false);
          const doc = await getUserDoc(authUser.uid);
          setFavouriteRecipes(doc.favourites.recipes);
          setUserDoc(doc);
        }
        setAuthUser(authUser);
      } else clearAuthStates();
      setLoading(false);
    });
    return () => {
      discard();
    };
  }, []);

  const doSignIn = () => {
    firebase.auth().signInWithPopup(googleAuthProvider);
  };

  const updateProfile = async (name, icon, tags) => {
    const newDocs = await firestore.collection('users').doc(authUser.uid).get();
    await firestore
      .collection('users')
      .doc(authUser.uid)
      .update({
        name: name,
        iconId: icon,
        favourites: {
          tags: tags,
          recipes: newDocs.data().favourites.recipes,
        },
      })
      .then(async function () {
        setUserDoc(await getUserDoc(authUser.uid));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const doSignOut = () => {
    firebase.auth().signOut();
  };

  const _isNewUser = async ({ creationTime, lastSignInTime, uid }) => {
    try {
      const doc = await firestore.collection('users').doc(uid).get();
      return !doc.exists && creationTime === lastSignInTime;
    } catch (err) {
      return true;
    }
  };

  const getUserDoc = async userId => {
    const doc = await firestore.collection('users').doc(userId).get();
    return doc.data();
  };

  const updateFavoriteRecipes = async recipeId => {
    const index = userDoc.favourites.recipes.indexOf(recipeId);
    let updated = userDoc.favourites.recipes;
    if (index >= 0) updated.splice(index, 1);
    else updated.push(recipeId);

    const doc = {
      ...userDoc,
      favourites: {
        tags: userDoc.tags ? userDoc.tags : [],
        recipes: updated ? updated : [],
      },
    };
    await firestore.collection('users').doc(authUser.uid).set(doc);
    return updated;
  };

  const createNewUserWithAuthData = async ({ tags }) => {
    try {
      setLoading(true);
      const allTags = await RecipesAPI().getTagsList();
      let tagsCounter = {};
      allTags.forEach(tag => {
        tagsCounter[tag.tag_id] = 0;
      });

      await firestore
        .collection('users')
        .doc(authUser.uid)
        .set({
          email: authUser.email,
          name: authUser.displayName,
          points: 0,
          role: 1,
          iconId: 1,
          favourites: {
            recipes: [],
            tags: tags,
          },
          achievements: {
            recipes: [],
            tags: tagsCounter,
          },
        });
      setUserDoc(await getUserDoc(authUser.uid));
      setIsNewUser(false);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const cookRecipe = async (recipe_id, tags) => {
    if (!userDoc.achievements.recipes.includes(recipe_id)) {
      let updatedAchievements = userDoc.achievements;
      tags.forEach(tag => {
        updatedAchievements.tags[tag.tag_id]++;
      });
      updatedAchievements['recipes'] = [
        ...updatedAchievements['recipes'],
        recipe_id,
      ];
      const doc = {
        ...userDoc,
        achievements: updatedAchievements,
      };
      await firestore.collection('users').doc(authUser.uid).set(doc);
      setUserDoc(doc);
    }
  };

  const getName = () => {
    return userDoc.name;
  };

  const clearAuthStates = () => {
    setAuthUser(null);
    setIsNewUser(false);
    setUserDoc(null);
    setNavBarValue(0);
  };

  return (
    <AppContext.Provider
      value={{
        renderNavBar,
        setRenderNavBar,
        navBarValue,
        setNavBarValue,
        authUser,
        setAuthUser,
        doSignIn,
        doSignOut,
        isNewUser,
        updateProfile,
        userDoc,
        loading,
        createNewUserWithAuthData,
        updateFavoriteRecipes,
        getName,
        setFavouriteRecipes,
        favouriteRecipes,
        cookRecipe,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export { AppContext, AppProvider };

// Hook, possible to create many different hooks
// export function useRenderNavBar(bool) {
//   const { renderNavBar, setRenderNavBar } = useContext(AppContext);
//   setRenderNavBar(bool);
//   return { renderNavBar, setRenderNavBar };
// }
