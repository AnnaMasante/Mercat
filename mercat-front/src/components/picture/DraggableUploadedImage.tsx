import { FC } from 'react';
import { UploadedImage } from '../../utils/uploadImages';
import { Draggable } from 'react-beautiful-dnd';
import { TiDelete } from 'react-icons/ti';

const DraggableUploadedImage: FC<{
  image: UploadedImage;
  index: number;
  handleDelete: () => void;
}> = ({ image, index, handleDelete }) => {
  return (
    <Draggable draggableId={`${image.src}_${index}`} index={index}>
      {(provided) => (
        <div
          className="column is-one-fifth"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="card">
            <header className="card-header">
              <p className="card-header-title">{image.src} déjà téléchargé</p>
              <button
                className="card-header-icon"
                aria-label="more options"
                onClick={(e) => {
                  e.preventDefault();
                  handleDelete();
                }}
              >
                <span className="icon">
                  <TiDelete />
                </span>
              </button>
            </header>
            <div className="card-content">
              <div className="content">
                <img src={image.src} width="300" alt="upload" />
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default DraggableUploadedImage;
