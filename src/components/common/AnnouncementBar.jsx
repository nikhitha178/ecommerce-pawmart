import React from 'react';

export default function AnnouncementBar() {
    return (
        <div className="bg-warning text-dark text-center py-2 px-3 fw-bold small transition-all shadow-sm">
            🎉 BOGO Deal Active! Use Code <span className="badge bg-dark text-light font-monospace">PAWMART15</span> for 15% off site-wide! 🐾
        </div>
    );
}