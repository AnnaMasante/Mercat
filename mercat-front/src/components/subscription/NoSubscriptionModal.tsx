import React, {FC} from "react";
import {useHistory} from "react-router-dom";

const NoSubscriptionModal : FC <{show : boolean, onHide :() => void}> = ({show, onHide}) => {
    const history = useHistory()

    const changeSubscription = () => {
        history.push('/profil')
    }

    return(
        <>
            <div className={`modal ${show && 'is-active'}`}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Oups!</p>
                        <button className="delete" onClick={changeSubscription} aria-label="close"></button>
                    </header>
                    <section className="modal-card-body">
                        Vous ne pouvez pas ajouter un nouveau produit, si vous souhaitez continuer, sélectionnez un nouvel abonnement !
                    </section>
                    <button className="button is-info" onClick={changeSubscription}>Changer mon abonnement</button>
                </div>
            </div>
        </>
    )
}
export default NoSubscriptionModal
