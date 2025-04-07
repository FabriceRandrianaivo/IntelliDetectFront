import React from "react";

interface ConfirmationPopupProps {
  reason: string;
  setReason: (value: string) => void;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmationPopup: React.FC<ConfirmationPopupProps> = ({ reason, setReason, onCancel, onConfirm }) => (
  <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-4 rounded-lg shadow-lg w-1/3">
      <h3 className="text-lg font-bold mb-4">Confirmation de déblocage</h3>
      <textarea
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        placeholder="Raison du déblocage (obligatoire)"
        className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
      />
      <div className="flex justify-end gap-4">
        <button onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded-lg">
          Annuler
        </button>
        <button onClick={onConfirm} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
          Confirmer
        </button>
      </div>
    </div>
  </div>
);

export default ConfirmationPopup;
