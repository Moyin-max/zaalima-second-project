const { generateExtensionCode, generateDemoExtensionCode } = require('../utils/llmPrompt');
const { createExtensionZip } = require('../utils/fileManager');
const { sanitizeGeneratedCode } = require('../utils/security');
const Project = require('../models/Project');
const { validateProjectInput } = require('../utils/validation');

const generate = async (req, res) => {
  try {
    const validation = validateProjectInput(req.body);
    if (validation.error) {
      return res.status(400).json({ error: validation.error });
    }

    const { prompt, title } = validation.value;
    const userId = req.user?.id;
    
    // 1. Generate code from LLM
    let files;
    let message = 'Extension generated successfully';
    let usedDemoMode = false;

    try {
      files = await generateExtensionCode(prompt);
    } catch (error) {
      if (error.code !== 'AI_PROVIDER_UNAVAILABLE') {
        throw error;
      }

      usedDemoMode = true;
      message = 'Demo extension generated because the AI provider is temporarily unavailable.';
      files = generateDemoExtensionCode(prompt, title);
    }
    
    // 2. Sanitize code
    files = sanitizeGeneratedCode(files);
    
    // 3. Create Zip
    const zipFileName = await createExtensionZip(files);
    const zipUrl = `/downloads/${zipFileName}`;
    
    // 4. Save project for the authenticated user
    const project = new Project({
      userId,
      title: title || 'New Extension',
      prompt,
      files,
      zipUrl
    });
    await project.save();
    
    res.json({
      message,
      demoMode: usedDemoMode,
      files,
      zipUrl,
      project: { id: project._id, title: project.title }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { generate };
