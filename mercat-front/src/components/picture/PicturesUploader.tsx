import React, { FC } from 'react';
import { useRef } from 'react';
import { Image, UploadedImage } from '../../utils/uploadImages';
import DragDropZone from './DragDropZone';

const PicturesUploader: FC<{
  images: (Image | UploadedImage)[];
  setImages: React.Dispatch<React.SetStateAction<(Image | UploadedImage)[]>>;
  setPicturesError: React.Dispatch<React.SetStateAction<string | null>>;
}> = ({ images, setImages, setPicturesError }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addImage = (fileList: FileList) => {
    for (let i = 0; i < fileList.length; i++) {
      if (images.length >= 5) {
        setPicturesError('Maximum 5 images');
        return;
      }
      const reader = new FileReader();
      let currFile: File = fileList[i];
      reader.readAsDataURL(currFile);
      reader.onloadend = () => {
        const image: Image = {
          file: currFile,
          preview: reader.result as string,
          order: images.length,
        };
        setImages((prev) => [...prev, image]);
      };
    }
  };

  return (
    <>
      <form>
        {images && (
          <div className="container">
            <DragDropZone images={images} setImages={setImages} />
          </div>
        )}
        <button
          onClick={(event) => {
            event.preventDefault();
            fileInputRef.current?.click();
          }}
          className="button is-large is-link is-fullwidth"
        >
          Ajouter des images
        </button>
        <input
          type="file"
          multiple
          style={{ display: 'none' }}
          ref={fileInputRef}
          accept="image.*"
          onChange={(event) => {
            const files = event.target.files;
            if (files) {
              addImage(files);
              event.currentTarget.value = '';
            }
          }}
        />
      </form>
    </>
  );
};
export default PicturesUploader;
