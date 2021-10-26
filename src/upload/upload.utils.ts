// import AWS from "aws-sdk";
import { createWriteStream } from "fs";
import { mutationError } from "../common/common.utils";

const makeFileName = (filename: string, folder?: string) =>
  `${folder}/${Date.now()}-${Math.random() * 1000}-${filename}`;

const localFileUpload = async (file: any, folder?: string) => {
  if (file) {
    const { filename, createReadStream } = await file;
    const newFilename = makeFileName(filename, folder);
    const readStream = createReadStream();
    const writeStream = createWriteStream(
      process.cwd() + "/files/" + newFilename
    );
    readStream.pipe(writeStream);
    const PORT = process.env.PORT;
    return `http://localhost:${PORT}/static/${newFilename}`;
  } else {
    return null;
  }
};

const BUCKET_NAME = "idea-exchange";

// AWS.config.update({
//   credentials: {
//     accessKeyId: process.env.AWS_KEY,
//     secretAccessKey: process.env.AWS_SECRET,
//   },
// });

// const awsUploader = async (file:any, folder?:string) => {
//   if (file) {
//     const { filename, createReadStream } = await file;
//     const readStream = createReadStream();
//     const newFilename = makeFileName(filename, folder);
//     const { Location } = await new AWS.S3()
//       .upload({
//         Bucket: BUCKET_NAME,
//         Key: newFilename,
//         ACL: "public-read",
//         Body: readStream,
//       })
//       .promise();
//     return Location;
//   }
//   return null;
// };

// const deleteFile = async (url:string) => {
//   AWS.config.update({
//     credentials: {
//       accessKeyId: process.env.AWS_ACCESS_KEY,
//       secretAccessKey: process.env.AWS_PRIVATE_KEY,
//     },
//   });
//   try {
//     if (url) {
//       const Key = url.split(`${BUCKET_NAME}",.s3.amazonaws.com/`)[1];
//       await new AWS.S3()
//         .deleteObject(
//           {
//             Bucket: BUCKET_NAME,
//             Key,
//           },
//           (err, data) => {
//             if (err) {
//               throw err;
//             }
//             return { ok: true };
//           },
//         )
//         .promise();
//     }
//   } catch (e) {
//     console.log(e);
//     return mutationError(e);
//   }
// };

const uploader = (file: any, folder?: string) => localFileUpload(file, folder);

export default uploader;
