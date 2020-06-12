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

- [ ] Email for profile updates

### entry management

- [x] User can edit entries
- [ ] User can choose visibility of entries

### api

- [x] emotion entry ancestry is stored as array, not objects
- [ ] store color as FE look-up, not in DB
- [ ] store emotion ancestry as individual emotion, and look-up in FE

### emotion selection

- [ ] User can select multiple emotions
- [x] alert on success saving entry

### UI

- [ ] sunburst colors

### Bugs

- [ ] sunburst form displaced before sunburst loads
- [ ] multiple bugs with login/signup modal flow
