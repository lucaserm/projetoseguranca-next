import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import {
	Box,
	Divider,
	MenuItem,
	MenuList,
	Popover,
	Typography,
} from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';

export const AccountPopover = (props) => {
	const { anchorEl, onClose, open } = props;
	const router = useRouter();
	const auth = useAuth();

	const handleProfile = useCallback(() => {
		router.push('/account');
	}, [router]);

	const handleSignOut = useCallback(() => {
		onClose?.();
		auth.signOut();
		router.push('/auth/login');
	}, [onClose, auth, router]);

	return (
		<Popover
			anchorEl={anchorEl}
			anchorOrigin={{
				horizontal: 'left',
				vertical: 'bottom',
			}}
			onClose={onClose}
			open={open}
			PaperProps={{ sx: { width: 200 } }}
		>
			<Box
				sx={{
					py: 1.5,
					px: 2,
				}}
			>
				<Typography color='text.secondary' variant='overline'>
					{auth.user.name}
				</Typography>
			</Box>
			<MenuList
				disablePadding
				dense
				sx={{
					p: '8px',
					'& > *': {
						borderRadius: 1,
					},
				}}
			>
				<MenuItem onClick={handleProfile}>Perfil</MenuItem>
			</MenuList>
			<Divider />
			<MenuList
				disablePadding
				dense
				sx={{
					p: '8px',
					'& > *': {
						borderRadius: 1,
					},
				}}
			>
				<MenuItem onClick={handleSignOut}>Sair</MenuItem>
			</MenuList>
		</Popover>
	);
};

AccountPopover.propTypes = {
	anchorEl: PropTypes.any,
	onClose: PropTypes.func,
	open: PropTypes.bool.isRequired,
};
