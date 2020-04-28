import * as Yup from 'yup';

export default Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .required('Required')
    .length(8, 'At least 8 characters, please'),
});
