import { useCallback, useState } from 'react';
import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Divider,
	TextField,
	Unstable_Grid2 as Grid,
} from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';

export const StudentProfileDetails = ({ student }) => {
	const [loading, setLoading] = useState(false);
	const [studentForm, setStudentForm] = useState(student);

	const handleChange = useCallback((event) => {
		setStudentForm((prevState) => ({
			...prevState,
			[event.target.name]: event.target.value,
		}));
	}, []);

	const handleSubmit = (event) => {
		event.preventDefault();
		setLoading(true);
		updateUser(studentForm);
		setLoading(false);
	};

	return (
		<form autoComplete='off' noValidate>
			<Card>
				<CardHeader
					subheader='As informações podem ser editadas'
					title='Perfil'
				/>
				<CardContent sx={{ pt: 0 }}>
					<Box sx={{ m: -1.5 }}>
						<Grid container spacing={3}>
							<Grid xs={12} md={12}>
								<TextField
									fullWidth
									label='Nome'
									name='name'
									onChange={handleChange}
									required
									value={studentForm.nome}
								/>
							</Grid>
							<Grid xs={12} md={6}>
								<TextField
									fullWidth
									label='Email Address'
									name='email'
									onChange={handleChange}
									required
									value={studentForm.email_institucional}
								/>
							</Grid>
							<Grid xs={12} md={6}>
								<TextField
									fullWidth
									label='RA'
									name='ra'
									onChange={handleChange}
									required
									value={studentForm.ra}
								/>
							</Grid>
							<Grid xs={12} md={6}>
								<TextField
									fullWidth
									label='CPF'
									name='cpf'
									onChange={handleChange}
									required
									value={studentForm.cpf}
								/>
							</Grid>
						</Grid>
					</Box>
				</CardContent>
				<Divider />
				{loading ? (
					<CardActions sx={{ justifyContent: 'flex-end' }}>
						<Button variant='contained'>Carregando...</Button>
					</CardActions>
				) : (
					<CardActions sx={{ justifyContent: 'flex-end' }}>
						<Button onClick={handleSubmit} variant='contained'>
							Save details
						</Button>
					</CardActions>
				)}
			</Card>
		</form>
	);
};
