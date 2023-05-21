import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
	Box,
	Container,
	Stack,
	Typography,
	Unstable_Grid2 as Grid,
	Button,
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { StudentProfile } from 'src/sections/student/student-profile';
import { StudentProfileDetails } from 'src/sections/student/student-profile-details';
import { SettingsPassword } from 'src/sections/settings/settings-password';
import { getDataStudentByStudent } from 'src/utils/get-data';

const Page = (props) => {
	const route = useRouter();
	const [student, setStudent] = useState();

	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		const { id } = route.query;
		const res = await getDataStudentByStudent(id);
		setStudent(res);
	};

	return (
		<>
			<Head>
				<title>Account | Devias Kit</title>
			</Head>
			<Box
				component='main'
				sx={{
					flexGrow: 1,
					py: 8,
				}}
			>
				<Container maxWidth='lg'>
					<Stack spacing={3}>
						<div>
							<Typography variant='h4'>Estudante</Typography>
						</div>
						{!student ? (
							<div>
								<Typography variant='h4'>Carregando...</Typography>
							</div>
						) : (
							<>
								{student.length > 0 ? (
									<div>
										<Grid container spacing={3}>
											<Grid xs={12} md={6} lg={4}>
												<StudentProfile student={student[0]} />
											</Grid>
											<Grid xs={12} md={6} lg={8}>
												<StudentProfileDetails student={student[0]} />
											</Grid>
										</Grid>
									</div>
								) : (
									<div>
										<Typography variant='h6'>
											Esse estudante não existe.
										</Typography>
										<Button onClick={() => route.back()}>Voltar</Button>
									</div>
								)}
							</>
						)}
					</Stack>
				</Container>
			</Box>
		</>
	);
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
