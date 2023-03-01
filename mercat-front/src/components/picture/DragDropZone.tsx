import { FC } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { UploadedImage } from '../../utils/uploadImages';
import DraggableImage from './DraggableImage';
import DraggableUploadedImage from './DraggableUploadedImage';

interface Image {
  file: File;
  preview: string;
  order: number;
}

const DragDropZone: FC<{
  images: (Image | UploadedImage)[];
  setImages: React.Dispatch<React.SetStateAction<(Image | UploadedImage)[]>>;
}> = ({ images, setImages }) => {
  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceImage = images[source.index];

    setImages((prevState) => {
      const x = prevState[destination.index].order;
      prevState[source.index].order = x;
      prevState[destination.index].order = prevState[source.index].order;
      prevState.splice(source.index, 1);
      prevState.splice(destination.index, 0, sourceImage);
      return prevState;
    });
  };
  const handleDeleteImage = (index: number) => {
    setImages((images) => {
      return images.filter((_, i) => i !== index);
    });
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={'image_drop'} direction="horizontal">
        {(provided) => (
          <div
            className="columns"
            style={{ border: 'solid' }}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {images.map((image, index) => {
              let uploadedImage = image as UploadedImage;
              if (!uploadedImage.src) {
                return (
                  <DraggableImage
                    index={index}
                    image={image as Image}
                    handleDelete={() => handleDeleteImage(index)}
                  />
                );
              } else {
                return (
                  <DraggableUploadedImage
                    index={index}
                    image={image as UploadedImage}
                    handleDelete={() => handleDeleteImage(index)}
                  />
                );
              }
            })}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DragDropZone;
