const axios = require('axios');
const keys = require('../config/keys');

exports.compileCode = async (req, res) => {
    const {code, input, language} = req.body;

    const languageMapper = {
        'C++': ['cpp14', 3],
        'Java': ['java', 4],
        'Python':['python3', 3]
    }
    console.log('code', code);
    console.log("\n");
    console.log('input',  input);
    console.log("\n");
    console.log('language',  language);
    const response = await axios.post('https://api.jdoodle.com/v1/execute', {
        clientId: keys.jdoodleApiClientId,
        clientSecret:keys.jdoodleApiClientSecret,
        script: code,
        stdin: input,
        language: languageMapper[language][0],
        versionIndex: languageMapper[language][1]
    });
    console.log(response.data);
    res.json(response.data);
}