import { BsTrophy } from 'react-icons/bs';

export default {
  name: 'experience',
  title: 'Experience',
  type: 'document',
  icon: BsTrophy,
  fields: [
    {
      name: 'title',
      title: 'Titel',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
    },
    {
      name: 'text',
      title: 'Text',
      type: 'text',
    },
    {
      name: 'since',
      title: 'Since',
      type: 'date',
    },
  ],
};
