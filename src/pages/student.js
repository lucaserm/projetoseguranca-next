import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
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
import { CustomersTable } from 'src/sections/customer/customers-table';
import { CustomersSearch } from 'src/sections/customer/customers-search';
import { applyPagination } from 'src/utils/apply-pagination';
import api from 'src/api';
import { getDataStudent } from 'src/utils/get-data';

const now = new Date();

const Page = () => {
	const [data, setData] = useState([]);
	const [search, setSearch] = useState('');
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		const res = await getDataStudent();
		setData(res);
	};

	const useStudent = (page, rowsPerPage) => {
		return useMemo(() => {
			setData(applyPagination(data, page, rowsPerPage));
		}, [page, rowsPerPage]);
	};

	const useCustomerIds = (customers) => {
		return useMemo(() => {
			return customers.map((customer) => customer.id);
		}, [customers]);
	};

	const customers = useStudent(page, rowsPerPage);
	const customersIds = useCustomerIds(data);

	const handlePageChange = useCallback((event, value) => {
		setPage(value);
	}, []);

	const handleRowsPerPageChange = useCallback((event) => {
		setRowsPerPage(event.target.value);
	}, []);

	const handleChange = (value) => {
		setSearch(value);
	};

	return (
		<>
			<Head>
				<title>Customers | Devias Kit</title>
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
								<Typography variant='h4'>Estudantes</Typography>
							</Stack>
							<div>
								<Button
									startIcon={
										<SvgIcon fontSize='small'>
											<PlusIcon />
										</SvgIcon>
									}
									onClick={() => console.log(data)}
									variant='contained'
								>
									Add
								</Button>
							</div>
						</Stack>
						<CustomersSearch value={search} onChange={handleChange} />
						<CustomersTable
							count={data.length}
							items={data.filter((student) => {
								if (student.nome.toUpperCase().includes(search.toUpperCase())) {
									return student;
								} else if (
									student.cpf.toUpperCase().includes(search.toUpperCase())
								) {
									return student;
								} else if (
									student.ra.toUpperCase().includes(search.toUpperCase())
								) {
									return student;
								}
							})}
							onPageChange={handlePageChange}
							onRowsPerPageChange={handleRowsPerPageChange}
							page={page}
							rowsPerPage={rowsPerPage}
						/>
					</Stack>
				</Container>
			</Box>
		</>
	);
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
