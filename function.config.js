module.exports = {
	type: {//Žw—ß—ÞŒ^
		core: {
			status: true,
			dir: "./commands/core",
			help: true,
			ping: true,
		},
		beta: {
			status: false,
			dir: "./commands/beta",
			beta_help: true,
			beta_ping: true,
		},
		test: {
			status: true,
			dir: "./commands/test",
			test_help: true,
			test_ping: false,
		},
	}
}