const app = require("./src/api/app");
const ENV = require("./src/configs/env.validation.js");

app.listen(ENV.PORT, () => {
  // biome-ignore lint/suspicious/noConsole: <explanation>
  console.log(`app listening on port ${ENV.PORT}`);
});
