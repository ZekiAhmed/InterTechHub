import multer from "multer";
import { v4 as uuid } from "uuid";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads");
  },
  filename(req, file, cb) {
    const id = uuid();

    const extName = file.originalname.split(".").pop();

    const fileName = `${id}.${extName}`;

    cb(null, fileName);
  },
});

export const uploadFiles = multer({ storage }).single("file");

/*

iltcode: what is multer and explain the above code

GitHub.copilot-chat.github.copilot.editor: Multer is a middleware 
for handling `multipart/form-data`, which is primarily used for uploading 
files in Node.js applications. It makes it easy to handle file uploads by 
parsing the incoming form data and attaching the files to the 

req

 object.

### Explanation of the Code

The provided code configures Multer to store uploaded files on disk with 
a custom storage engine. Let's break it down step by step:

1. **Importing Multer**: Although not shown in the provided code, you would 
typically import Multer at the beginning of your file:
    ```javascript
    const multer = require('multer');
    const uuid = require('uuid').v4; // Assuming uuid is used for generating 
    // unique IDs
    ```

2. **Setting Up Disk Storage**:
    ```javascript
    storage = multer.diskStorage({
      destination(req, file, cb) {
        cb(null, "uploads");
      },
      filename(req, file, cb) {
        const id = uuid();
        const extName = file.originalname.split(".").pop();
        const fileName = `${id}.${extName}`;
        cb(null, fileName);
      },
    });
    ```

    - **

destination

**: This function determines the folder where the uploaded files will be stored. 
In this case, it sets the destination to the "uploads" directory.
    - **

filename

**: This function determines the name of the uploaded file. It generates 
a unique ID using 

uuid()

, extracts the file extension from the original file name, and constructs a new 
file name in the format 

id.extension

.

3. **Using the Storage Configuration**:
    ```javascript
    const upload = multer({ storage: storage });
    ```

    This line creates an instance of Multer with the custom storage configuration.

### Example Usage

Here's how you might use this configuration in an Express route to handle 
file uploads:

```javascript
const express = require('express');
const multer = require('multer');
const uuid = require('uuid').v4;

const app = express();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads");
  },
  filename(req, file, cb) {
    const id = uuid();
    const extName = file.originalname.split(".").pop();
    const fileName = `${id}.${extName}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
  res.send('File uploaded successfully');
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
```

In this example, the `/upload` route handles file uploads. 
The `upload.single('file')` middleware processes the file upload, and the 
file is saved to the "uploads" directory with a unique name.

*/
