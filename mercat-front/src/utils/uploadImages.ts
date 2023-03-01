import { AxiosInstance } from 'axios';

export interface Image {
  file: File;
  preview: string;
  order: number;
}

export interface UploadedImage {
  src: string;
  order: number;
}

export const uploadImages = (
  axios: AxiosInstance,
  images: (Image | UploadedImage)[],
  folderName?: string,
) => {
  const formData: FormData = new FormData();
  if (folderName) {
    formData.append('folderName', folderName);
  }

  images.forEach((image) => {
    const img = image as Image;
    if (img.file) {
      formData.append('file', img.file, img.file.name);
    }
  });
  return axios
    .post<string[]>('/photos', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
      let iterator = -1;
      return images.map((i) => {
        const img = i as Image;
        if (img.file) {
          iterator++;
          return res.data[iterator];
        } else {
          return (i as UploadedImage).src;
        }
      });
    })
    .catch(() => {
      return null;
    });
};
