export default {
  name: 'about',
  title: 'Me',
  type: 'document',
  fields: [
    {
      title: 'Image',
      name: 'image',
      type: 'image',
      fields: [
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
          options: {
            isHighlighted: true,
          },
        },
        {
          // Editing this field will be hidden behind an "Edit"-button
          name: 'attribution',
          type: 'string',
          title: 'Attribution',
        },
      ],
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
    {
      name: 'tools',
      title: 'Tools',
      type: 'array',
      of: [
        {
          title: 'Tool',
          name: 'tool',
          type: 'reference',
          to: [{ type: 'experience' }],
        },
      ],
    },
  ],
};
