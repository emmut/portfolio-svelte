import S from "@sanity/desk-tool/structure-builder";

export default () => {
  return S.list()
    .title('Content')
    .items(
      [
        ...S.documentTypeListItems().filter((item) => !['siteSettings'].includes(item.getId())),
        S.divider(),
        S.listItem()
          .title('Settings')
          .child(
            S.document()
              .schemaType('siteSettings')
              .documentId('siteSettings')
          )
      ]
    )
}