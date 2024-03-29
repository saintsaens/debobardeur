import { expect } from "vitest";
import { getPageId, getPageTitle, getAllPageProperties, getPagePropertyByName } from "./notion-page";

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

test("gets all page properties", () => {
  const page = {
    "object": "page",
    "id": "be633bf1-dfa0-436d-b259-571129a590e5",
    "created_time": "2022-10-24T22:54:00.000Z",
    "last_edited_time": "2023-03-08T18:25:00.000Z",
    "created_by": {
      "object": "user",
      "id": "c2f20311-9e54-4d11-8c79-7398424ae41e"
    },
    "last_edited_by": {
      "object": "user",
      "id": "9188c6a5-7381-452f-b3dc-d4865aa89bdf"
    },
    "cover": null,
    "icon": {
      "type": "emoji",
      "emoji": "🐞"
    },
    "parent": {
      "type": "database_id",
      "database_id": "a1d8501e-1ac1-43e9-a6bd-ea9fe6c8822b"
    },
    "archived": true,
    "properties": {
      "Due date": {
        "id": "M%3BBw",
        "type": "date",
        "date": {
          "start": "2023-02-23",
          "end": null,
          "time_zone": null
        }
      },
      "Status": {
        "id": "Z%3ClH",
        "type": "status",
        "status": {
          "id": "86ddb6ec-0627-47f8-800d-b65afd28be13",
          "name": "Not started",
          "color": "default"
        }
      },
      "Title": {
        "id": "title",
        "type": "title",
        "title": [
          {
            "type": "text",
            "text": {
              "content": "Bug bash",
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
            "plain_text": "Bug bash",
            "href": null
          }
        ]
      }
    },
    "url": "https://www.notion.so/Bug-bash-be633bf1dfa0436db259571129a590e5"
  };

  const propertiesArray = [
    {
      "name": "Due date",
      "id": "M%3BBw",
      "type": "date",
      "date": {
        "start": "2023-02-23",
        "end": null,
        "time_zone": null
      }
    },
    {
      "name": "Status",
      "id": "Z%3ClH",
      "type": "status",
      "status": {
        "id": "86ddb6ec-0627-47f8-800d-b65afd28be13",
        "name": "Not started",
        "color": "default"
      }
    },
    {
      "name": "Title",
      "id": "title",
      "type": "title",
      "title": [
        {
          "type": "text",
          "text": {
            "content": "Bug bash",
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
          "plain_text": "Bug bash",
          "href": null
        }
      ]
    }
  ];

  expect(getAllPageProperties(page)).toStrictEqual(propertiesArray);
});

test("gets property with name Caca", () => {
  const page = {
    "object": "page",
    "id": "be633bf1-dfa0-436d-b259-571129a590e5",
    "created_time": "2022-10-24T22:54:00.000Z",
    "last_edited_time": "2023-03-08T18:25:00.000Z",
    "created_by": {
      "object": "user",
      "id": "c2f20311-9e54-4d11-8c79-7398424ae41e"
    },
    "last_edited_by": {
      "object": "user",
      "id": "9188c6a5-7381-452f-b3dc-d4865aa89bdf"
    },
    "cover": null,
    "icon": {
      "type": "emoji",
      "emoji": "🐞"
    },
    "parent": {
      "type": "database_id",
      "database_id": "a1d8501e-1ac1-43e9-a6bd-ea9fe6c8822b"
    },
    "archived": true,
    "properties": {
      "Due date": {
        "id": "M%3BBw",
        "type": "date",
        "date": {
          "start": "2023-02-23",
          "end": null,
          "time_zone": null
        }
      },
      "Caca": {
        "id": "Z%3ClH",
        "type": "status",
        "status": {
          "id": "86ddb6ec-0627-47f8-800d-b65afd28be13",
          "name": "Not started",
          "color": "default"
        }
      },
      "Title": {
        "id": "title",
        "type": "title",
        "title": [
          {
            "type": "text",
            "text": {
              "content": "Bug bash",
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
            "plain_text": "Bug bash",
            "href": null
          }
        ]
      }
    },
    "url": "https://www.notion.so/Bug-bash-be633bf1dfa0436db259571129a590e5"
  };

  const propertyName = "Caca";

  const propertyCaca = {
    "name": "Caca",
    "id": "Z%3ClH",
    "type": "status",
    "status": {
      "id": "86ddb6ec-0627-47f8-800d-b65afd28be13",
      "name": "Not started",
      "color": "default"
    }
  }

  expect(getPagePropertyByName(page, propertyName)).toStrictEqual(propertyCaca);
});