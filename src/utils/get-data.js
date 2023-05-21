import api from 'src/api';

export const updateDataUser = async (id, nome, email, codigo, cargo) => {
	try {
		const res = await api.post('/usuario/atualizar', {
			id,
			nome,
			email,
			cargo,
			codigo,
		});
		return res.data;
	} catch (e) {
		console.log(e);
	}
};

export const activeUser = async (id) => {
	try {
		const res = await api.post('/usuario/atualizar', {
			id,
			ativo: true,
		});
		return res.data;
	} catch (e) {
		console.log(e);
	}
};

export const setDataUser = async (nome, email, codigo, senha) => {
	try {
		const res = await api.post('/usuario/salvar', {
			nome,
			email,
			codigo,
			senha,
		});
		return res.data;
	} catch (e) {}
};

export const getDataLogin = async (codigo, senha) => {
	const res = await api.post('/login', { codigo, senha });
	return res.data;
};

export const getDataUsers = () => {
	const res = api
		.get('/usuario/listar')
		.then((res) => {
			return res.data;
		})
		.catch((e) => []);

	return res;
};

export const getDataStudent = () => {
	const res = api
		.get('/estudante/listar')
		.then((res) => {
			return res.data;
		})
		.catch((e) => []);

	return res;
};

export const getDataStudentByStudent = (id) => {
	const res = api
		.post('/estudante/buscar', {
			id,
		})
		.then((res) => {
			return res.data;
		})
		.catch((e) => []);
	return res;
};
