export default {
  name: 'about',
  title: 'Me',
  type: 'document',
  fields: [
    {
      name: 'tools',
      title: 'Tools',
      type: 'reference',
      to: [{ type: 'experience' }],
    },
    {
      name: 'about',
      title: 'About me',
      type: 'array',
      of: [
        {
          title: 'Block',
          type: 'block',
          lists: [],
        },
      ],
    },
  ],
};
