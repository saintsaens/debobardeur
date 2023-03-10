import { getInputTextBlocks, getOutputTextBlocks, getTextFromParagraphBlocks } from "./notion-block";

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