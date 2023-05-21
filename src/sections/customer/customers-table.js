import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import {
	Avatar,
	Box,
	Card,
	Checkbox,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TablePagination,
	TableRow,
	TableSortLabel,
	Typography,
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';

export const CustomersTable = (props) => {
	const route = useRouter();
	const {
		count = 0,
		items = [],
		onPageChange = () => {},
		onRowsPerPageChange,
		page = 0,
		rowsPerPage = 0,
		selected = [],
	} = props;

	const handleStudent = (student) => {
		const { id } = student;
		route.push({
			pathname: '/student_profile',
			query: { id },
		});
	};

	return (
		<Card>
			<Scrollbar>
				<Box sx={{ minWidth: 800 }}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>RA</TableCell>
								<TableCell>CPF</TableCell>
								<TableCell>Nome</TableCell>
								<TableCell>Email</TableCell>
								<TableCell>Nome Responsável</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{items.map((student) => {
								return (
									<TableRow
										hover
										key={student.id}
										onClick={() => handleStudent(student)}
										sx={{ cursor: 'pointer' }}
									>
										<TableCell>
											<Stack alignItems='center' direction='row' spacing={2}>
												<Avatar src={student.avatar}>
													{getInitials(student.nome)}
												</Avatar>
												<Typography variant='subtitle2'>
													{student.ra}
												</Typography>
											</Stack>
										</TableCell>
										<TableCell>{student.cpf}</TableCell>
										<TableCell>{student.nome}</TableCell>
										<TableCell>{student.email_institucional}</TableCell>
										<TableCell>{student.responsavel.nome}</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</Box>
			</Scrollbar>
			<TablePagination
				component='div'
				count={count}
				onPageChange={onPageChange}
				onRowsPerPageChange={onRowsPerPageChange}
				page={page}
				rowsPerPage={rowsPerPage}
				rowsPerPageOptions={[5, 10, 25]}
			/>
		</Card>
	);
};

CustomersTable.propTypes = {
	count: PropTypes.number,
	items: PropTypes.array,
	onPageChange: PropTypes.func,
	onRowsPerPageChange: PropTypes.func,
	page: PropTypes.number,
	rowsPerPage: PropTypes.number,
};
