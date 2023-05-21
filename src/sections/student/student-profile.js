import {
	Avatar,
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Divider,
	Typography,
} from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';

export const StudentProfile = ({ student }) => {
	const auth = useAuth();
	return (
		<Card>
			<CardContent>
				<Box
					sx={{
						alignItems: 'center',
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					<Avatar
						src={auth.user.avatar}
						sx={{
							height: 80,
							mb: 2,
							width: 80,
						}}
					/>
					<Typography gutterBottom variant='h5'>
						{student.nome}
					</Typography>
					<Typography color='text.secondary' variant='body2'>
						{student.ra}, {student.cpf}
					</Typography>
					<Typography color='text.secondary' variant='body2'>
						{student.email_institucional}
					</Typography>
				</Box>
			</CardContent>
			<Divider />
			<CardActions>
				<Button fullWidth variant='text'>
					Upload picture
				</Button>
			</CardActions>
		</Card>
	);
};
