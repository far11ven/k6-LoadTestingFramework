// :: SINGLETON ::
// selects a config based on (whether provided from Github actions/or from the repo)

const configPath = "../../config";

class InitFactory {

	constructor() {
		this.activeConfig = {};
		this.activeConfig.NAME = __ENV.config ? "GitHub Config" : __ENV.configFile
		this.activeConfig.PATH = configPath
		this.activeConfig.CONTENT = __ENV.config ? JSON.parse(__ENV.config) : JSON.parse(open(`${configPath}/${__ENV.configFile}`))
		
		// set user-info from GitHub only if not found in passed config/configFile
		if(typeof this.activeConfig.CONTENT.user_info === "undefined"){
			this.activeConfig.CONTENT.user_info = {};
			this.activeConfig.CONTENT.user_info.email = __ENV.userEmail
			this.activeConfig.CONTENT.user_info.password = __ENV.userPassword
		}
	}

	// returns the config details
	getActiveConfig() {
		return this.activeConfig
	}
}

const init = new InitFactory();

Object.freeze(init);

console.log('activeConfig NAME', init.getActiveConfig().NAME)
console.log('activeConfig CONTENT', init.getActiveConfig().CONTENT)

export default init;