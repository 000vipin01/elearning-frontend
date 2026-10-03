import React from 'react';
import { AlertTriangle, AlertCircle } from 'lucide-react';
import { Modal } from './Modal';
import { Button } from './Button';

export function ConfirmDialog({
  isOpen,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isDanger = false,
  isLoading = false,
  onConfirm,
  onCancel
}) {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} size="sm" showClose={!isLoading}>
      <div className="flex flex-col items-center text-center">
        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${
            isDanger ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30' : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
          }`}
        >
          {isDanger ? <AlertCircle className="w-7 h-7" /> : <AlertTriangle className="w-7 h-7" />}
        </div>
        <h4 className="text-lg font-bold text-slate-100">{title}</h4>
        <p className="text-sm text-slate-400 mt-2 mb-6 leading-relaxed">{message}</p>

        <div className="flex items-center gap-3 w-full justify-end">
          <Button variant="secondary" onClick={onCancel} disabled={isLoading} className="w-1/2">
            {cancelText}
          </Button>
          <Button
            variant={isDanger ? 'danger' : 'primary'}
            onClick={onConfirm}
            isLoading={isLoading}
            className="w-1/2"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
