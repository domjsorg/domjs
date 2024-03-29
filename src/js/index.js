// Instantiate global Object Manager and required Object instances
const tools = mamboTools();
const ui = mamboUI();

const router = new tools.router();
const object = new tools.object();
object.save(tools.utils(), "utils");
object.save(tools.string(), "string");
object.save(tools.history(), "history");
object.save(tools.router({ historyManager: object.get("history") }), "router");
object.save(tools.api(), "api");

// Begin Storyboard development installation
installStoryboard();
