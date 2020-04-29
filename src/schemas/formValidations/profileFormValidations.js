import * as Yup from 'yup';

export default Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  oldPassword: Yup.string(),
  newPassword: Yup.string(),
});
