import Modal from "../Modal/Modal";
import { useLanguage } from "../../context/LanguageContext";
import "./ConfirmModal.css";

export default function ConfirmModal({ open, onClose, onConfirm, title, body, danger = true }) {
  const { t } = useLanguage();

  return (
    <Modal open={open} onClose={onClose} title={title} width={400}>
      <p className="confirm-modal__body">{body}</p>
      <div className="confirm-modal__actions">
        <button type="button" className="btn btn--ghost" onClick={onClose}>
          {t("common.cancel")}
        </button>
        <button
          type="button"
          className={danger ? "btn btn--danger" : "btn btn--primary"}
          onClick={() => {
            onConfirm();
            onClose();
          }}
        >
          {t("common.confirm")}
        </button>
      </div>
    </Modal>
  );
}
