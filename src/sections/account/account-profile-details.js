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

const cargo = [
	{
		value: 'Coordenação',
		label: 'Coordenação',
	},
	{
		value: 'Assistência',
		label: 'Assistência',
	},
	{
		value: 'Portaria',
		label: 'Portaria',
	},
];

export const AccountProfileDetails = () => {
	const { user, updateUser } = useAuth();
	const [loading, setLoading] = useState(false);
	const [userForm, setUserForm] = useState(user);

	const handleChange = useCallback((event) => {
		setUserForm((prevState) => ({
			...prevState,
			[event.target.name]: event.target.value,
		}));
	}, []);

	const handleSubmit = (event) => {
		event.preventDefault();
		setLoading(true);
		updateUser(userForm);
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
									value={userForm.name}
								/>
							</Grid>
							<Grid xs={12} md={6}>
								<TextField
									fullWidth
									label='Email Address'
									name='email'
									onChange={handleChange}
									required
									value={userForm.email}
								/>
							</Grid>
							<Grid xs={12} md={6}>
								<TextField
									fullWidth
									label='Selecione o seu cargo'
									name='cargo'
									onChange={handleChange}
									required
									select
									SelectProps={{ native: true }}
									value={userForm.cargo}
								>
									{cargo.map((option) => (
										<option key={option.value} value={option.value}>
											{option.label}
										</option>
									))}
								</TextField>
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
