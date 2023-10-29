export function getRandomString() {

	let rs = "x".repeat(5)
		.replace(/./g, c => "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789" [Math.floor(Math.random() * 62)]);

	return rs
}