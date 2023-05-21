import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';
import {
	Box,
	Button,
	Container,
	Stack,
	SvgIcon,
	Typography,
} from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { UsersTable } from 'src/sections/users/users-table';
import { UsersSearch } from 'src/sections/users/users-search';
import { applyPagination } from 'src/utils/apply-pagination';
import api from 'src/api';
import { activeUser, getDataUsers } from 'src/utils/get-data';
import { useAuth } from 'src/hooks/use-auth';

const now = new Date();

const Page = () => {
	const auth = useAuth();
	const [data, setData] = useState([]);
	const [search, setSearch] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		const res = await getDataUsers();
		setData(res);
	};

	const useUsers = (page, rowsPerPage) => {
		return useMemo(() => {
			setData(applyPagination(data, page, rowsPerPage));
		}, [page, rowsPerPage]);
	};

	const useCustomerIds = (users) => {
		return useMemo(() => {
			return users.map((user) => user.id);
		}, [users]);
	};

	const users = useUsers(page, rowsPerPage);
	const usersIds = useCustomerIds(data);
	const usersSelection = useSelection(usersIds);

	const handlePageChange = useCallback((event, value) => {
		setPage(value);
	}, []);

	const handleRowsPerPageChange = useCallback((event) => {
		setRowsPerPage(event.target.value);
	}, []);

	const handleChange = (value) => {
		setSearch(value);
	};

	const handleActive = async () => {
		if (usersSelection.selected.length === 0)
			return setErrorMessage('Nenhum usuário selecionado.');
		setErrorMessage('');
		usersSelection.selected.map((value) => {
			activeUser(value);
		});
		getData();
	};

	const handleFilter = (data) => {
		return data.filter((user) => {
			return user.codigo.toUpperCase().includes(search.toUpperCase())
				? user
				: user.nome.toUpperCase().includes(search.toUpperCase())
				? user
				: user.cargo.toUpperCase().includes(search.toUpperCase())
				? user
				: user.email.toUpperCase().includes(search.toUpperCase())
				? user
				: !user.ativo && 'Inativo'.toUpperCase().includes(search.toUpperCase())
				? user
				: user.ativo && 'Ativo'.toUpperCase().includes(search.toUpperCase())
				? user
				: null;
		});
	};

	return (
		<>
			<Head>
				<title>Usuários | Devias Kit</title>
			</Head>
			<Box
				component='main'
				sx={{
					flexGrow: 1,
					py: 8,
				}}
			>
				<Container maxWidth='xl'>
					<Stack spacing={3}>
						<Stack direction='row' justifyContent='space-between' spacing={4}>
							<Stack spacing={1}>
								<Typography variant='h4'>Usuários</Typography>
								{errorMessage !== '' && (
									<Typography color='error' sx={{ mt: 3 }} variant='body2'>
										{errorMessage}
										<XMarkIcon
											width={20}
											color='inherit'
											onClick={() => setErrorMessage('')}
										/>
									</Typography>
								)}
							</Stack>
							{auth.user.cargo === 'Coordenação' && (
								<div>
									<Button
										startIcon={
											<SvgIcon fontSize='small'>
												<CheckIcon />
											</SvgIcon>
										}
										onClick={handleActive}
										variant='contained'
									>
										Ativar
									</Button>
								</div>
							)}
						</Stack>
						<UsersSearch value={search} onChange={handleChange} />
						<UsersTable
							count={data.length}
							items={handleFilter(data)}
							onDeselectAll={usersSelection.handleDeselectAll}
							onDeselectOne={usersSelection.handleDeselectOne}
							onPageChange={handlePageChange}
							onRowsPerPageChange={handleRowsPerPageChange}
							onSelectAll={usersSelection.handleSelectAll}
							onSelectOne={usersSelection.handleSelectOne}
							page={page}
							rowsPerPage={rowsPerPage}
							selected={usersSelection.selected}
						/>
					</Stack>
				</Container>
			</Box>
		</>
	);
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
