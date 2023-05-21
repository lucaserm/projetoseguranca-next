import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Link, Stack, TextField, Typography } from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';

const Page = () => {
	const router = useRouter();
	const auth = useAuth();
	const formik = useFormik({
		initialValues: {
			nome: '',
			codigo: '',
			email: '',
			senha: '',
			submit: null,
		},
		validationSchema: Yup.object({
			nome: Yup.string().max(255).required('Nome é obrigatório'),
			email: Yup.string()
				.max(255)
				.email('Email tem que ser válido')
				.required('Código de servidor é obrigatório'),
			codigo: Yup.string()
				.max(255)
				.required('Código de servidor é obrigatório'),
			senha: Yup.string().max(255).required('Senha é obrigatório'),
		}),
		onSubmit: async (values, helpers) => {
			try {
				await auth.signUp(
					values.nome,
					values.email,
					values.codigo,
					values.senha
				);
				router.push('/');
			} catch (err) {
				helpers.setStatus({ success: false });
				helpers.setErrors({ submit: err.message });
				helpers.setSubmitting(false);
			}
		},
	});

	return (
		<>
			<Head>
				<title>Register | Devias Kit</title>
			</Head>
			<Box
				sx={{
					flex: '1 1 auto',
					alignItems: 'center',
					display: 'flex',
					justifyContent: 'center',
				}}
			>
				<Box
					sx={{
						maxWidth: 550,
						px: 3,
						py: '100px',
						width: '100%',
					}}
				>
					<div>
						<Stack spacing={1} sx={{ mb: 3 }}>
							<Typography variant='h4'>Registrar</Typography>
							<Typography color='text.secondary' variant='body2'>
								Já tem uma conta? &nbsp;
								<Link
									component={NextLink}
									href='/auth/login'
									underline='hover'
									variant='subtitle2'
								>
									Entrar
								</Link>
							</Typography>
						</Stack>
						<form noValidate onSubmit={formik.handleSubmit}>
							<Stack spacing={3}>
								<TextField
									error={!!(formik.touched.nome && formik.errors.nome)}
									fullWidth
									helperText={formik.touched.nome && formik.errors.nome}
									label='Nome'
									name='nome'
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									value={formik.values.nome}
								/>
								<TextField
									error={!!(formik.touched.email && formik.errors.email)}
									fullWidth
									helperText={formik.touched.email && formik.errors.email}
									label='Email'
									name='email'
									type='email'
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									value={formik.values.email}
								/>
								<TextField
									error={!!(formik.touched.codigo && formik.errors.codigo)}
									fullWidth
									helperText={formik.touched.codigo && formik.errors.codigo}
									label='Código de servidor'
									name='codigo'
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									value={formik.values.codigo}
								/>
								<TextField
									error={!!(formik.touched.senha && formik.errors.senha)}
									fullWidth
									helperText={formik.touched.senha && formik.errors.senha}
									label='Senha'
									name='senha'
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									type='password'
									value={formik.values.senha}
								/>
							</Stack>
							{formik.errors.submit && (
								<Typography color='error' sx={{ mt: 3 }} variant='body2'>
									{formik.errors.submit}
								</Typography>
							)}
							<Button
								fullWidth
								size='large'
								sx={{ mt: 3 }}
								type='submit'
								variant='contained'
							>
								Continue
							</Button>
						</form>
					</div>
				</Box>
			</Box>
		</>
	);
};

Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Page;
