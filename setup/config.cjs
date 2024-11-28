// Constants
const PUBLIC_DIR = "public";
const OUTPUT_HTML = `${PUBLIC_DIR}/index.html`;
const IMAGE_DIR = `${PUBLIC_DIR}/img`;
const PUBLIC_DIRS = [PUBLIC_DIR, "dist"];
const PORT = process.env.PORT || 8000;

module.exports = {
	OUTPUT_HTML,
	PUBLIC_DIR,
	PUBLIC_DIRS,
	PORT,
	system: {
		publicDirectories: PUBLIC_DIRS,
		imagesDirectory: IMAGE_DIR,
		host: {
			port: PORT,
		},
	},
};
