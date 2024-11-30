import multer from "multer";
import { Request, Response, NextFunction } from "express";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 20 * 1024 * 1024, // 20MB limit
  },
});

export const uploadHandler = (fieldName: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    upload.single(fieldName)(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({
          message: "File upload error",
          error: err.message,
        });
      } else if (err) {
        return res.status(500).json({
          message: "Unknown upload error",
          error: err.message,
        });
      }
      next();
    });
  };
};
