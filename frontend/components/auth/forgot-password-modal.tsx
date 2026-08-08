"use client";

import React from "react";

export function ForgotPasswordModal({ isOpen, onClose, onBack }: { isOpen: boolean; onClose: () => void; onBack?: () => void }) {
	if (!isOpen) return null;
	return (
		<div className="fixed inset-0 z-[10000] flex items-center justify-center">
			<div className="bg-white text-black p-6 rounded">Forgot password placeholder
				<div className="mt-3 flex gap-2">
					<button onClick={onBack} className="px-3 py-2 border rounded">Back</button>
					<button onClick={onClose} className="px-3 py-2 bg-black text-white rounded">Close</button>
				</div>
			</div>
		</div>
	);
}

export default ForgotPasswordModal;
