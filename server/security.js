MA_Logs.allow({
	insert: function() {
		return true
	},
	remove: function() {
		return true
	}
})

MA_Apps.allow({
	insert: function() {
		return true
	},
	update:function() {
		return true
	},
	remove: function() {
		return true
	}
})

MA_Servers.allow({
	insert: function() {
		return true
	},
	update: function() {
		return true
	},
	remove: function() {
		return true
	}
})