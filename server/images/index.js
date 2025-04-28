const path = require("path");
const fs = require("fs");

exports.upload = async (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send({ message: "Please select a file." });
  }
  const url = `/${file.filename}`;

  //store file path with orginal filename as the key
  db.set(file.filename, file.path);

  res.json({
    message: "File uploaded successfully.",
    url: url,
  });
};

//In-memory storage for file paths
// const db = new Map();
// const processed = new Map();

// //ensure the transform-image directory exists
// const transformedDir = path.join(__dirname, "transform-image");
// if (!fs.existsSync(transformedDir)) {
//   fs.mkdirSync(transformedDir);
// }

exports.getImage = async (req, res) => {
  const filename = req.params.filename;
  // const filePath = db.get(filename);

  if (!filename) {
    return res.status(400).send({ message: "File not found." });
  }

  const formatUrl = `public/images/${filename}`;
  // let editPath = processed.get(formatUrl);

  if (formatUrl) {
    return res.sendFile(path.resolve(formatUrl));
  }

  res.sendFile(path.resolve(filename));
};
