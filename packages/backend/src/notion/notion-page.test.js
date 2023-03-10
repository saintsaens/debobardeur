import { getPageId, getPageTitle } from "./notion-page";

test('gets page ID', () => {
  const rightPageId = "2b5ee720-5ac8-4601-a101-3d7b5c8f2151"
  const wrongPageId = "2b6ee720-5ac8-4601-a101-3d7b5c8f2151"
  const page = {
    id: '2b5ee720-5ac8-4601-a101-3d7b5c8f2151'
  };

  expect(getPageId(page)).toBe(rightPageId);
  expect(getPageId(page)).not.toBe(wrongPageId);
});

test('gets page title', () => {
  const rightPageTitle = "Danhauser";
  const wrongPageTitle = "Lemire";
  const page = {
    properties: {
      Titre: {
        title: [
          {
            plain_text: "Danhauser"
          }
        ]
      }
    }
  };

  expect(getPageTitle(page)).toBe(rightPageTitle);
  expect(getPageTitle(page)).not.toBe(wrongPageTitle);
});