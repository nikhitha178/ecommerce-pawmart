import React from 'react';

export default function FilterSidebar({ search, setSearch, petType, setPetType, category, setCategory, setSortOrder }) {
    return (
        <div className="card border-0 shadow-sm rounded-4 p-4 sticky-md-top" style={{ top: '100px', zIndex: '10' }}>
            <h5 className="fw-bold mb-4">Inventory Modifiers</h5>

            {/* Search Input Box */}
            <div className="mb-4">
                <label className="form-label small fw-bold text-muted text-uppercase">Textual Match Query</label>
                <input type="text" className="form-control rounded-pill" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>

            {/* Pet Target Select Dropdown */}
            <div className="mb-4">
                <label className="form-label small fw-bold text-muted text-uppercase">Target Pet Classification</label>
                <select className="form-select rounded-pill" value={petType} onChange={(e) => setPetType(e.target.value)}>
                    <option value="All">All Animals</option>
                    <option value="Dog">Dogs Only</option>
                    <option value="Cat">Cats Only</option>
                    <option value="Bird">Birds Only</option>
                    <option value="Fish">Fish Only</option>
                    <option value="Rabbit">Rabbits Only</option>
                </select>
            </div>

            {/* Department Category Select Dropdown */}
            <div className="mb-4">
                <label className="form-label small fw-bold text-muted text-uppercase">Core Functional Line</label>
                <select className="form-select rounded-pill" value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="All">All Categories</option>
                    <option value="Food">Food</option>
                    <option value="Toys">Toys</option>
                    <option value="Beds">Beds</option>
                    <option value="Grooming">Grooming</option>
                    <option value="Healthcare">Healthcare</option>
                </select>
            </div>

            {/* Reset Execution Action Trigger */}
            <div>
                <button
                    onClick={() => { setSearch(''); setPetType('All'); setCategory('All'); setSortOrder('default'); }}
                    className="btn btn-outline-danger btn-sm w-100 rounded-pill py-2"
                >
                    Clear Applied Filters
                </button>
            </div>
        </div>
    );
}