import S from '@sanity/desk-tool/structure-builder';
import { BsGear } from 'react-icons/bs';
import { FiUser } from 'react-icons/fi';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default () => {
  return S.list()
    .title('Content')
    .items([
      ...S.documentTypeListItems().filter(
        (item) => !['siteSettings', 'about'].includes(item.getId())
      ),
      S.listItem()
        .title('Me')
        .icon(FiUser)
        .child(S.document().schemaType('about').documentId('about').title('Me')),
      S.divider(),
      S.listItem()
        .title('Settings')
        .icon(BsGear)
        .child(
          S.document().schemaType('siteSettings').documentId('siteSettings').title('Settings')
        ),
    ]);
};
