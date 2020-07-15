- [feeels](#feeels)

  - [Roadmap](#roadmap)
    - [account](#account)
    - [entry management](#entry-management)
    - [emotion selection](#emotion-selection)
    - [UI](#ui)
    - [backend](#backend)
    - [bugs](#bugs)

# feeels

For checking in with yourself.

Built using React, D3.js, Next, Chakra-UI, and MongoDB, with serverless auth supported by Passport. Hosted on Now.

## Roadmap

### account

- [ ] Email for profile updates

### entry management

- [x] see entries as beeswarm
- [x] edit/delete entries in beeswarm
- [ ] beeswarm overflow (too many bees!)
- [ ] User can choose visibility of entries

### emotion selection

- [ ] User can select multiple emotions

### UI

- [ ] sunburst colors better represent emotions
- [ ] handle failure to log out (and ensure all error cases are handled)

### backend

- [ ] store color as FE look-up, not in DB
- [ ] have multiple db environments
- [ ] shrink user object
- [x] when signing up, store emotion with initial request

### bugs

- [x] handle beeswarm chart for single entry
- [ ] year date wrong in emotion list detail
- [ ] loading UI for login/signup
