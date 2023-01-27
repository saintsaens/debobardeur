import { extractJsonIntoArray, getPageId, getPageTitle, getInputTextBlocks, getOutputTextBlocks, getTextFromParagraphBlocks, createFileName } from '../notion';
import { writeFileSync, existsSync, unlinkSync } from 'fs';

import { join } from 'path';
// const config = require(join(__dirname, "../../../conf"));

test('checks JSON file is correctly read and parsed', () => {
  const output = ["très", "vraiment"];
  const filepath = './testFile.json';

  writeFileSync(filepath, JSON.stringify(output));
  expect(existsSync(filepath)).toBe(true);
  expect(extractJsonIntoArray(filepath)).toStrictEqual(output);
});

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

  expect(getInputTextBlocks(blocks)).toStrictEqual(blocksInput);
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

  expect(getOutputTextBlocks(blocks)).toStrictEqual(blocksOutput);
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

  expect(getTextFromParagraphBlocks(paragraphBlocks)).toStrictEqual(textArray);
});

test('constructs file name', () => {
  const testTitle = "1";
  const output = process.env.TEXT_TEST_FILE_BASE_TITLE + testTitle + process.env.TEXT_TEST_FILE_EXTENSION;

  expect(createFileName(testTitle)).toBe(output);
});

afterEach(() => {
  const filepath = './testFile.json';
  if (existsSync(filepath)) {
    unlinkSync(filepath);
  }
});
