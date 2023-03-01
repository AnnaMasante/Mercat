import { FC } from 'react';

const DeleteValidationModal: FC<{
  isOpen: boolean;
  close: () => void;
  onSuccess: () => void;
}> = ({ isOpen, close, onSuccess }) => {
  const onSubmit = () => {
    onSuccess();
    close();
  };

  return (
    <div className={`modal ${isOpen && 'is-active'}`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Confirmation de suppression</p>
          <button
            className="delete"
            aria-label="close"
            onClick={close}
          ></button>
        </header>
        <section className="modal-card-body">
          Etes vous sur de vouloir supprimer ce produit ?
        </section>
        <footer className="modal-card-foot">
          <button className="button is-danger" onClick={onSubmit}>
            Supprimer
          </button>
          <button className="button is-info" onClick={close}>
            Annuler
          </button>
        </footer>
      </div>
    </div>
  );
};

export default DeleteValidationModal;
