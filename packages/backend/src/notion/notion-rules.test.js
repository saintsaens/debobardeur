import { expect } from "vitest";
import { getRulesRemplacer } from "./notion-rules";

test('gets 2 remplacer rules', async () => {
  const pages = [
    {
      object: 'page',
      id: '1b08a85a-23b4-4745-a02a-76f3f6e073d7',
      created_time: '2023-02-07T10:41:00.000Z',
      last_edited_time: '2023-02-07T10:44:00.000Z',
      created_by: { object: 'user', id: '49deea31-c95d-4374-b684-a88ccb5053c2' },
      last_edited_by: { object: 'user', id: '49deea31-c95d-4374-b684-a88ccb5053c2' },
      cover: null,
      icon: null,
      parent: {
        type: 'database_id',
        database_id: '699bfc42-45bf-4c18-a6c0-c38da0681e10'
      },
      archived: false,
      properties:
      {
        "Remplacer par": {
          "rich_text": [
            {
              "type": "text",
              "text": {
                "content": "des",
                "link": null
              },
              "annotations": {
                "bold": false,
                "italic": false,
                "strikethrough": false,
                "underline": false,
                "code": false,
                "color": "default"
              },
              "plain_text": "des",
              "href": null
            }
          ]
        },
        "Nom": {
          "id": "title",
          "type": "title",
          "title": [
            {
              "type": "text",
              "text": {
                "content": "des différents",
                "link": null
              },
              "annotations": {
                "bold": false,
                "italic": false,
                "strikethrough": false,
                "underline": false,
                "code": false,
                "color": "default"
              },
              "plain_text": "des différents",
              "href": null
            }
          ]
        }
      }
    },
    {
      object: 'page',
      id: '558dcfd0-bdcc-4a9e-b0b1-9dd339ca9945',
      created_time: '2023-02-07T10:41:00.000Z',
      last_edited_time: '2023-02-07T10:44:00.000Z',
      created_by: { object: 'user', id: '49deea31-c95d-4374-b684-a88ccb5053c2' },
      last_edited_by: { object: 'user', id: '49deea31-c95d-4374-b684-a88ccb5053c2' },
      cover: null,
      icon: null,
      parent: {
        type: 'database_id',
        database_id: '699bfc42-45bf-4c18-a6c0-c38da0681e10'
      },
      archived: false,
      properties:
      {
        "Remplacer par": {
          "rich_text": [
            {
              "type": "text",
              "text": {
                "content": "changez",
                "link": null
              },
              "annotations": {
                "bold": false,
                "italic": false,
                "strikethrough": false,
                "underline": false,
                "code": false,
                "color": "default"
              },
              "plain_text": "changez",
              "href": null
            }
          ]
        },
        "Nom": {
          "id": "title",
          "type": "title",
          "title": [
            {
              "type": "text",
              "text": {
                "content": "il vous faut changer",
                "link": null
              },
              "annotations": {
                "bold": false,
                "italic": false,
                "strikethrough": false,
                "underline": false,
                "code": false,
                "color": "default"
              },
              "plain_text": "il vous faut changer",
              "href": null
            }
          ]
        }
      }
    }
  ];

  const rulesArray = {
    "des différents": "des",
    "il vous faut changer": "changez"
  };

  expect(getRulesRemplacer(pages)).toStrictEqual(rulesArray);
});