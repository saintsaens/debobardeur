const notiondb = require('./notionCorrectionsDb');
const fs = require('fs');

test('checks the Notion database contains at least one page with the given name', () => {
  const trueInput = {
    object: 'list',
    results: [
      {
        object: 'page',
        id: 'c9e9612a-fut1-4e2f-aba3-4e3113co6eb2',
        created_time: '2022-12-17T08:24:00.000Z',
        last_edited_time: '2022-12-17T08:31:00.000Z',
        created_by: [Object],
        last_edited_by: [Object],
        cover: null,
        icon: null,
        parent: [Object],
        archived: false,
        properties: [Object],
        url: 'https://www.notion.so/bien-c9e3827afde14e2faba19e3113cf6eb2'
      }
    ],
    next_cursor: null,
    has_more: false,
    type: 'page',
    page: {}
  };
  const falseInput = {
    object: 'list',
    results: [],
    next_cursor: null,
    has_more: false,
    type: 'page',
    page: {}
  };
  expect(notiondb.isElementPresent(trueInput)).toBeTruthy();
  expect(notiondb.isElementPresent(falseInput)).toBeFalsy();
});

test('gets Sir Bedevere, Sir Galahad and Sir Lancelot', async () => {
  const input = {
    object: 'list',
    results: [
      {
        object: 'page',
        id: 'c9e9612a-fut1-4e2f-aba3-741804dieon',
        created_time: '2022-12-17T08:24:00.000Z',
        last_edited_time: '2022-12-17T08:31:00.000Z',
        created_by: [Object],
        last_edited_by: [Object],
        cover: null,
        icon: null,
        parent: [Object],
        archived: false,
        properties: {
          Nom: {
                id: 'title',
                type: 'title',
                title: [
                  {
                    plain_text: "Sir Bedevere"
                  }
                ] 
            } 
        },
        url: 'https://www.notion.so/ihcear478047108sihcear'
      },
      {
        object: 'page',
        id: 'c9e9612a-fut1-4e2f-aba3-37180odite',
        created_time: '2022-12-17T08:24:00.000Z',
        last_edited_time: '2022-12-17T08:31:00.000Z',
        created_by: [Object],
        last_edited_by: [Object],
        cover: null,
        icon: null,
        parent: [Object],
        archived: false,
        properties: {
          Nom: {
                id: 'title',
                type: 'title',
                title: [
                  {
                    plain_text: "Sir Galahad"
                  }
                ] 
            } 
        },
        url: 'https://www.notion.so/ihcear478047108sihcear'
      },
      {
        object: 'page',
        id: 'c9e9612a-fut1-4e2f-ied1-37180odite',
        created_time: '2022-12-17T08:24:00.000Z',
        last_edited_time: '2022-12-17T08:31:00.000Z',
        created_by: [Object],
        last_edited_by: [Object],
        cover: null,
        icon: null,
        parent: [Object],
        archived: false,
        properties: {
          Nom: {
                id: 'title',
                type: 'title',
                title: [
                  {
                    plain_text: "Sir Lancelot"
                  }
                ] 
            } 
        },
        url: 'https://www.notion.so/ihcear478047108sihcear'
      }
    ],
    next_cursor: null,
    has_more: false,
    type: 'page',
    page: {}
  };
  const output = ["Sir Bedevere", "Sir Galahad", "Sir Lancelot"];
  expect(await notiondb.mapPageNamesIntoArray(input)).toStrictEqual(output);
});

test('checks JSON file is correctly read and parsed', () => {
  const output = ["très", "vraiment"];
  const filepath = './testFile.json';

  fs.writeFileSync(filepath, JSON.stringify(output));
  expect(fs.existsSync(filepath)).toBe(true);
  expect(notiondb.extractJsonIntoArray(filepath)).toStrictEqual(output);
});

afterEach(() => {
    const filepath = './testFile.json';
    if(fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
    }
});
