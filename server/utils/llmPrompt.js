const OpenAI = require('openai');
const dotenv = require('dotenv');

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.XAI_API_KEY,
  baseURL: 'https://api.x.ai/v1',
});

const SYSTEM_PROMPT = `
You are an expert Chrome Extension Developer. Your task is to generate the source code for a Chrome Extension based on the user's requirement.
You MUST output the result in a strict JSON format where the keys are filenames and the values are the content of those files.

Rules:
1. Always include a "manifest.json" file (Version 3).
2. Include all necessary files (background.js, content.js, popup.html, popup.js, style.css, etc.) based on the requirement.
3. Use modern JavaScript (ES6+).
4. Ensure the extension is functional and follows Chrome Extension best practices.
5. The output MUST be a valid JSON object. Do not include any text outside the JSON object.

Example Output Format:
{
  "manifest.json": "{ ... }",
  "popup.html": "...",
  "popup.js": "..."
}

Chain of Thought:
1. Analyze the user request.
2. Identify the necessary Chrome Extension components (Background script, Content script, Popup, Permissions).
3. Draft the manifest.json file first to define the structure.
4. Implement the logic for each component.
5. Combine everything into the required JSON format.
`;

async function generateExtensionCode(userPrompt) {
  try {
    const response = await openai.chat.completions.create({
      model: 'grok-4.3',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt }
      ],
      response_format: { type: 'json_object' },
    });

    const content = response.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error('The AI provider returned an empty response.');
    }

    return JSON.parse(content);
  } catch (error) {
    const providerMessage =
      error?.response?.data?.error?.message ||
      error?.error?.message ||
      error?.message ||
      'Unknown xAI error';

    console.error('Error generating code:', providerMessage);

    if (/quota|billing|rate limit|insufficient/i.test(providerMessage)) {
      const unavailableError = new Error('AI generation is temporarily unavailable. Please try again later.');
      unavailableError.code = 'AI_PROVIDER_UNAVAILABLE';
      throw unavailableError;
    }

    throw new Error('Failed to generate extension code. Please try again.');
  }
}

function generateDemoExtensionCode(userPrompt, projectTitle = 'Demo Extension') {
  const normalizedPrompt = String(userPrompt || '').toLowerCase();
  const extensionName = String(projectTitle || 'Demo Extension').slice(0, 45);

  if (normalizedPrompt.includes('image') && normalizedPrompt.includes('red square')) {
    return {
      'manifest.json': JSON.stringify({
        manifest_version: 3,
        name: extensionName,
        version: '1.0.0',
        description: 'Demo fallback extension that replaces images with red squares.',
        permissions: ['activeTab'],
        content_scripts: [
          {
            matches: ['<all_urls>'],
            js: ['content.js'],
            css: ['styles.css'],
          },
        ],
        action: {
          default_popup: 'popup.html',
        },
      }, null, 2),
      'content.js': `const placeholderClass = 'extensio-demo-red-square';

function replaceImages() {
  document.querySelectorAll('img').forEach((img) => {
    if (img.dataset.extensioProcessed === 'true') return;

    const box = document.createElement('div');
    const width = img.width || img.naturalWidth || 120;
    const height = img.height || img.naturalHeight || 120;

    box.className = placeholderClass;
    box.style.width = \`\${Math.max(width, 40)}px\`;
    box.style.height = \`\${Math.max(height, 40)}px\`;
    box.title = 'Image replaced by Extensio.ai demo mode';

    img.dataset.extensioProcessed = 'true';
    img.replaceWith(box);
  });
}

replaceImages();
new MutationObserver(replaceImages).observe(document.body, { childList: true, subtree: true });`,
      'styles.css': `.${'extensio-demo-red-square'} {
  background: #dc2626;
  border: 2px solid #991b1b;
  box-sizing: border-box;
  display: inline-block;
}`,
      'popup.html': `<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>${extensionName}</title>
    <style>
      body { font-family: Arial, sans-serif; margin: 0; padding: 16px; width: 260px; background: #111827; color: white; }
      h1 { font-size: 16px; margin: 0 0 8px; }
      p { font-size: 13px; line-height: 1.5; margin: 0; color: #d1d5db; }
    </style>
  </head>
  <body>
    <h1>${extensionName}</h1>
    <p>Demo mode is active. Images on the page are being replaced with red squares.</p>
  </body>
</html>`,
    };
  }

  return {
    'manifest.json': JSON.stringify({
      manifest_version: 3,
      name: extensionName,
      version: '1.0.0',
      description: 'Demo fallback extension generated when the AI provider is unavailable.',
      permissions: ['activeTab', 'scripting'],
      action: {
        default_popup: 'popup.html',
      },
    }, null, 2),
    'popup.html': `<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>${extensionName}</title>
    <style>
      body { font-family: Arial, sans-serif; margin: 0; padding: 16px; width: 280px; }
      h1 { font-size: 16px; margin: 0 0 10px; }
      p { font-size: 13px; color: #374151; line-height: 1.5; }
      button { width: 100%; padding: 10px 12px; border: none; background: #2563eb; color: white; border-radius: 8px; cursor: pointer; }
    </style>
  </head>
  <body>
    <h1>${extensionName}</h1>
    <p>This extension was generated in demo mode while the AI provider was temporarily unavailable.</p>
    <button id="highlightBtn">Highlight Buttons</button>
    <script src="popup.js"></script>
  </body>
</html>`,
    'popup.js': `document.getElementById('highlightBtn').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) return;

  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      document.querySelectorAll('button, a').forEach((el) => {
        el.style.outline = '3px solid #2563eb';
        el.style.outlineOffset = '2px';
      });
    },
  });
});`,
  };
}

module.exports = { generateExtensionCode, generateDemoExtensionCode };
