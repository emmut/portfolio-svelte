export default {
  name: 'profile',
  title: 'Profile',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'avatar',
      title: 'Image',
      type: 'image',
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'text',
    },
  ],
};
