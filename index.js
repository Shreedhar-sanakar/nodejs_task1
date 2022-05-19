import express from "express";
import fs from "fs";

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

//create-file
app.get("/create-file", (req, res) => {
  //date 
  let date = new Date().toLocaleDateString("en-US");
  date = date.split("/");
  date = date.join("-");

  //time
  let time = new Date().toLocaleTimeString();
  time = time.split(":");
  time = time.join("-");
  time = time.split(" ");
  time = time.join("-");

  let file_sys = `${date}-${time}`;
  let time_stamp = new Date().getTime("en-US");

  fs.writeFile(`files/${file_sys}.txt`, `${time_stamp}`, (err) => {
    let final_res = err
      ? err
      : {
          status: true,
          file_name: `${file_sys}.txt`,
          path: `/file/${file_sys}`,
        };
    console.log(final_res);
    res.send(final_res);
  });
});
//get files

app.get("/files", (req, res) => {
  let filename = fs.readdirSync("files");
  let final = [];
  filename.forEach((file) => {
    let data = {
      name: file,
      path: `/files/${file}`,
    };
    final.push(data);
  });
  res.send(final);
});

app.listen(port, () => {
  console.log("Server running on port:" + port);
});