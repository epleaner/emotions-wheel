import * as yup from 'yup';

export default yup.object().shape({
  name: yup.string().required('Required'),
  email: yup.string().email('Invalid email').required('Required'),
  passwords: yup.object().shape(
    {
      oldPassword: yup.string().when('newPassword', {
        is: (newPassword) => newPassword && newPassword.length,
        then: yup.string().required('Required'),
        otherwise: yup.string(),
      }),
      newPassword: yup.string().when('oldPassword', {
        is: (oldPassword) => oldPassword && oldPassword.length,
        then: yup
          .string()
          .required('Required')
          .min(8, 'At least 8 characters, please'),
        otherwise: yup.string(),
      }),
    },
    ['oldPassword', 'newPassword']
  ),
});
