import { createSelector } from "reselect";

export const selectUser = createSelector(
	(state) => state.auth.user,
	(user) => user
);

export const selectUsers = createSelector(
	(state) => state.user.users,
	(users) => users
);
