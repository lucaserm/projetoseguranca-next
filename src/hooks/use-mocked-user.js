export const useMockedUser = () => {
	// To get the user from the authContext, you can use
	// `const { user } = useAuth();`

	const data = JSON.parse(window.sessionStorage.getItem('u'));
	return {
		id: data.id,
		avatar: '/assets/avatars/avatar-anika-visser.png',
		name: data.name,
		email: 'anika.visser@devias.io',
	};
};
