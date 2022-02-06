/** @todo Try out {@link https://github.com/ricokahler/sanity-codegen} */
export default {
  name: 'portfolio',
  title: 'Portfolio',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titel',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLenght: 96,
      },
      // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
      validation: (Rule) => [Rule.required().warning('Required')],
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
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
      name: 'bio',
      title: 'Portfolio bio',
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
