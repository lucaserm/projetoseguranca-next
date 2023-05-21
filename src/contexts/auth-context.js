import {
	createContext,
	useContext,
	useEffect,
	useReducer,
	useRef,
	useState,
} from 'react';
import PropTypes from 'prop-types';
import { getDataLogin, setDataUser, updateDataUser } from 'src/utils/get-data';

const HANDLERS = {
	INITIALIZE: 'INITIALIZE',
	SIGN_IN: 'SIGN_IN',
	SIGN_OUT: 'SIGN_OUT',
	UPDATE_USER: 'UPDATE_USER',
};

const initialState = {
	isAuthenticated: false,
	isLoading: true,
	user: null,
};

const handlers = {
	[HANDLERS.INITIALIZE]: (state, action) => {
		const user = action.payload;

		return {
			...state,
			...// if payload (user) is provided, then is authenticated
			(user
				? {
						isAuthenticated: true,
						isLoading: false,
						user,
				  }
				: {
						isLoading: false,
				  }),
		};
	},
	[HANDLERS.SIGN_IN]: (state, action) => {
		const user = action.payload;

		return {
			...state,
			isAuthenticated: true,
			user,
		};
	},
	[HANDLERS.SIGN_OUT]: (state) => {
		return {
			...state,
			isAuthenticated: false,
			user: null,
		};
	},
	[HANDLERS.UPDATE_USER]: (state) => {
		const user = action.payload;

		return {
			...state,
			isAuthenticated: true,
			user,
		};
	},
};

const reducer = (state, action) =>
	handlers[action.type] ? handlers[action.type](state, action) : state;

// The role of this context is to propagate authentication state through the App tree.

export const AuthContext = createContext();

export const AuthProvider = (props) => {
	const { children } = props;
	const [state, dispatch] = useReducer(reducer, initialState);
	const initialized = useRef(false);

	const [user, setUser] = useState({});

	const initialize = async () => {
		if (initialized.current) {
			return;
		}

		initialized.current = true;

		let isAuthenticated = false;

		try {
			isAuthenticated =
				window.sessionStorage.getItem('authenticated') === 'true';
			setUser(JSON.parse(window.sessionStorage.getItem('u')));
		} catch (err) {
			console.error(err);
		}

		if (isAuthenticated) {
			dispatch({
				type: HANDLERS.INITIALIZE,
				payload: user,
			});
		} else {
			dispatch({
				type: HANDLERS.INITIALIZE,
			});
		}
	};

	useEffect(
		() => {
			initialize();
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	const signIn = async (codigo, senha) => {
		const data = await getDataLogin(codigo, senha);
		if (!data) throw new Error('Código de servidor ou senha inválidos.');
		if (!data.ativo) throw new Error('Servidor não ativo.');

		const userData = {
			id: data.id,
			avatar: '/assets/avatars/avatar-anika-visser.png',
			name: data.nome,
			cargo: data.cargo,
			codigo: data.codigo,
			email: data.email,
			ativo: data.ativo,
		};

		try {
			window.sessionStorage.setItem('authenticated', 'true');
			window.sessionStorage.setItem('u', JSON.stringify(userData));
			userData.senha = data.senha;
			setUser(userData);
		} catch (err) {
			console.error(err);
		}

		dispatch({
			type: HANDLERS.SIGN_IN,
			payload: userData,
		});
	};

	const signUp = async (nome, email, codigo, senha) => {
		const data = await setDataUser(nome, email, codigo, senha);
		if (!data)
			throw new Error(
				'Não foi possível registrar o servidor, verifiques seus dados e tente novamente.'
			);
		if (!data.ativo)
			throw new Error(
				'Servidor registrado, contate a coordenação para ativar seu usuário.'
			);
		const userData = {
			id: data.id,
			avatar: '/assets/avatars/avatar-anika-visser.png',
			name: data.nome,
			cargo: data.cargo,
			codigo: data.codigo,
			email: data.email,
			ativo: data.ativo,
		};

		try {
			window.sessionStorage.setItem('authenticated', 'true');
			window.sessionStorage.setItem('u', JSON.stringify(userData));
			userData.senha = data.senha;
			setUser(userData);
		} catch (err) {
			console.error(err);
		}

		dispatch({
			type: HANDLERS.SIGN_IN,
			payload: userData,
		});
	};

	const updateUser = async (u) => {
		const data = await updateDataUser(u.id, u.name, u.email, u.codigo, u.cargo);
		if (!data) throw new Error('Não foi possível atualizar o servidor.');
		const userData = {
			id: data.id,
			avatar: '/assets/avatars/avatar-anika-visser.png',
			name: data.nome.trim(),
			cargo: data.cargo,
			codigo: data.codigo,
			email: data.email.trim(),
		};

		try {
			window.sessionStorage.setItem('authenticated', 'true');
			window.sessionStorage.setItem('u', JSON.stringify(userData));
			setUser(userData);
		} catch (err) {
			console.error(err);
		}

		dispatch({
			type: HANDLERS.SIGN_IN,
			payload: userData,
		});
	};

	const signOut = () => {
		dispatch({
			type: HANDLERS.SIGN_OUT,
		});
	};

	return (
		<AuthContext.Provider
			value={{
				...state,
				user,
				signIn,
				signUp,
				signOut,
				updateUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

AuthProvider.propTypes = {
	children: PropTypes.node,
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
