const notion = require('./notion');
const fs = require('fs');

var path = require('path');
const config = require(path.join(__dirname, "../../conf"));

test('checks JSON file is correctly read and parsed', () => {
  const output = ["très", "vraiment"];
  const filepath = './testFile.json';

  fs.writeFileSync(filepath, JSON.stringify(output));
  expect(fs.existsSync(filepath)).toBe(true);
  expect(notion.extractJsonIntoArray(filepath)).toStrictEqual(output);
});

test('gets page ID', () => {
  const rightPageId = "2b5ee720-5ac8-4601-a101-3d7b5c8f2151"
  const wrongPageId = "2b6ee720-5ac8-4601-a101-3d7b5c8f2151"
  const page = {
    id: '2b5ee720-5ac8-4601-a101-3d7b5c8f2151'
  };

  expect(notion.getPageId(page)).toBe(rightPageId);
  expect(notion.getPageId(page)).not.toBe(wrongPageId);
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

  expect(notion.getPageTitle(page)).toBe(rightPageTitle);
  expect(notion.getPageTitle(page)).not.toBe(wrongPageTitle);
});

test('gets blocks of input text in list of blocks', () => {
  const blocks = {
    results: [
      {
        object: 'block',
        type: 'paragraph'
      },
      {
        object: 'block',
        type: 'paragraph'
      },
      {
        object: 'block',
        type: 'divider'
      },
      {
        object: 'block',
        type: 'paragraph'
      }
    ]
  };

  const blocksInput = [
    {
      object: 'block',
      type: 'paragraph'
    },
    {
      object: 'block',
      type: 'paragraph'
    }
  ];

  expect(notion.getInputTextBlocks(blocks)).toStrictEqual(blocksInput);
});

test('gets blocks of output text in list of blocks', () => {
  const blocks = {
    results: [
      {
        object: 'block',
        type: 'paragraph'
      },
      {
        object: 'block',
        type: 'divider'
      },
      {
        object: 'block',
        type: 'paragraph'
      },
      {
        object: 'block',
        type: 'paragraph'
      }
    ]
  };

  const blocksOutput = [
    {
      object: 'block',
      type: 'paragraph'
    },
    {
      object: 'block',
      type: 'paragraph'
    }
  ];

  expect(notion.getOutputTextBlocks(blocks)).toStrictEqual(blocksOutput);
});

test('gets text from list of blocks', () => {
  const paragraphBlocks = [
    {
      paragraph: {
        rich_text: [
          {
            plain_text: "Je fais, en traversant les groupes et les ronds,"
          }
        ]
      }
    },
    {
      paragraph: {
        rich_text: [
          {
            plain_text: ""
          }
        ]
      }
    },
    {
      paragraph: {
        rich_text: [
          {
            plain_text: "Sonner les vérités comme des éperons."
          }
        ]
      }
    }
  ];

  const textArray = [
    "Je fais, en traversant les groupes et les ronds,",
    "",
    "Sonner les vérités comme des éperons."
  ]

  expect(notion.getTextFromParagraphBlocks(paragraphBlocks)).toStrictEqual(textArray);
});

test('constructs file name', () => {
  const testTitle = "1";
  const output = config.TEXT_TEST_FILE_BASE_TITLE + testTitle + config.TEXT_TEST_FILE_EXTENSION;

  expect(notion.createFileName(testTitle)).toBe(output);
});

afterEach(() => {
  const filepath = './testFile.json';
  if (fs.existsSync(filepath)) {
    fs.unlinkSync(filepath);
  }
});
