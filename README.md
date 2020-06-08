- [feeels](#feeels)

  - [Roadmap](#roadmap)
    - [account](#account)
    - [entry management](#entry-management)
    - [emotion selection](#emotion-selection)
    - [UI](#ui)

# feeels

For checking in with yourself.

Built using React, Next, Chakra-UI, and MongoDB, with serverless auth supported by Passport. Hosted on Now.

## Roadmap

### account

- [x] User can reset password
- [x] User can validate email
- [x] User can change email
- [x] User can delete their account
- [x] Password length / form requirements
- [ ] Email looks good
- [ ] Back button for editing account
- [ ] Email for profile updates

### entry management

- [ ] User can edit entries
- [x] User can delete entries
- [ ] User can choose visibility of entries

### emotion selection

- [x] User sees a sunburst view of all emotions at once
- [ ] User can select multiple emotions
- [x] Form resets after selecting

### UI

- [ ] sunburst drop shadow: http://bl.ocks.org/cpbotha/5200394
- [ ] sunburst colors
- [ ] sunburst circle expands to fill space
- [ ] Forms with https://jaredpalmer.com/formik/ (https://chakra-ui.com/formcontrol#usage-with-form-libraries)
- [ ] log in --> email verification needed --> send in form
- [ ] verification UI should allow to resend

### Bugs

- [ ] Cannot save account edit because of email check
- [ ] sunburst form displaced before sunburst loads
- [ ] log in --> email verification needed --> first click does not redirect
- [ ] log in does not recognize email dot variations
- [ ] sign up form does not prompt for email verification if already exists
