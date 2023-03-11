import { getAllPagesInDatabase, getArrayOfPages } from "./notion-db";

test('gets all pages in a 2 page database', () => {
  const pages = {
    object: 'list',
    results: [
      {
        object: 'page',
        id: '432f9c20-7bd9-48e5-3819-e368a237c526',
        created_time: '2023-01-26T11:01:00.000Z',
        last_edited_time: '2023-01-26T11:02:00.000Z',
        created_by: [Object],
        last_edited_by: [Object],
        cover: null,
        icon: null,
        parent: [Object],
        archived: false,
        properties: [Object],
        url: 'https://www.notion.so/3-432f9c207bd948e58347e368a237c192'
      },
      {
        object: 'page',
        id: '2b5ee720-5ac8-1928-a626-3d7b5b8f2151',
        created_time: '2022-12-10T22:49:00.000Z',
        last_edited_time: '2023-01-25T13:28:00.000Z',
        created_by: [Object],
        last_edited_by: [Object],
        cover: null,
        icon: null,
        parent: [Object],
        archived: false,
        properties: [Object],
        url: 'https://www.notion.so/1-2b5ee7205ac84601a6263d7b5b8f3281'
      }
    ],
    next_cursor: null,
    has_more: false,
    type: 'page',
    page: {}
  }

  const arrayPages = [
    {
      object: 'page',
      id: '432f9c20-7bd9-48e5-3819-e368a237c526',
      created_time: '2023-01-26T11:01:00.000Z',
      last_edited_time: '2023-01-26T11:02:00.000Z',
      created_by: [Object],
      last_edited_by: [Object],
      cover: null,
      icon: null,
      parent: [Object],
      archived: false,
      properties: [Object],
      url: 'https://www.notion.so/3-432f9c207bd948e58347e368a237c192'
    },
    {
      object: 'page',
      id: '2b5ee720-5ac8-1928-a626-3d7b5b8f2151',
      created_time: '2022-12-10T22:49:00.000Z',
      last_edited_time: '2023-01-25T13:28:00.000Z',
      created_by: [Object],
      last_edited_by: [Object],
      cover: null,
      icon: null,
      parent: [Object],
      archived: false,
      properties: [Object],
      url: 'https://www.notion.so/1-2b5ee7205ac84601a6263d7b5b8f3281'
    }
  ]

  expect(getArrayOfPages(pages)).toStrictEqual(arrayPages);
});
