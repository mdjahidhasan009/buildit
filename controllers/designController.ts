const { formidable } = require('formidable');
class DesignController {
  createDesign = async (req, res) => {
    const form = formidable();

    try {
      const [fields, files] = await form.parse(req);
      console.log(fields);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = new DesignController();