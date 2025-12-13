import React from 'react';
import {
    MdEdit,
    MdPhone,
    MdEmail,
    MdLocationOn,
    MdWork,
    MdCalendarToday,
    MdPerson,
    MdMale,
    MdFemale,
    MdAccessTime,
    MdEvent,
} from 'react-icons/md';
import './PatientProfileHeader.css';

const PatientProfileHeader = ({ patient, onEdit, variant = 'default' }) => {
    /* ---------- DATA EXTRACTION (UNCHANGED LOGIC) ---------- */

    const name = patient?.clientName || patient?.name || 'Unknown Patient';

    const gender = patient?.gender || patient?.metadata?.gender || 'Male';
    const isFemale = gender.toLowerCase() === 'female';

    const avatarSrc = isFemale ? '/girlicon.png' : '/boyicon.png';

    let age = patient?.age || patient?.metadata?.age;
    if (!age && patient?.dateOfBirth) {
        const dob = new Date(patient.dateOfBirth);
        age = Math.floor((Date.now() - dob.getTime()) / (1000 * 60 * 60 * 24 * 365.25));
    }

    const dobString = patient?.dateOfBirth
        ? new Date(patient.dateOfBirth).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        })
        : '';

    const location = patient?.address?.city
        ? `${patient.address.city}${patient.address.state ? `, ${patient.address.state}` : ''}`
        : patient?.location || 'Location not set';

    const profession = patient?.profession || patient?.metadata?.profession || 'Patient';

    const bmi = patient?.bmi || patient?.vitals?.bmi || '—';
    const weight = patient?.weightKg || patient?.vitals?.weightKg || '—';
    const height = patient?.heightCm || patient?.vitals?.heightCm || '—';
    const bp = patient?.bp || patient?.vitals?.bp || '—';

    const apptDate = patient?.date || 'Not set';
    const apptTime = patient?.time || 'Not set';
    const apptType = patient?.type || 'Follow-up';
    const apptMode = patient?.mode || 'In-clinic';

    const conditions = [];
    if (patient?.condition) conditions.push(patient.condition);
    if (patient?.metadata?.condition) conditions.push(patient.metadata.condition);
    if (Array.isArray(patient?.medicalHistory)) {
        conditions.push(...patient.medicalHistory.slice(0, 2));
    }
    const uniqueConditions = [...new Set(conditions)];
    if (uniqueConditions.length === 0) uniqueConditions.push('None recorded');

    const barriers = patient?.barriers?.length ? patient.barriers : ['None recorded'];

    /* -------------------- JSX -------------------- */
    const isModal = variant === 'modal';

    return (
        <div className={`profile-header-container ${isModal ? 'modal-header-container' : ''}`}>
            <div className="profile-header-content">

                {/* LEFT : Avatar */}
                <div className="header-left-col">
                    <div className="avatar-wrapper">
                        <img
                            src={avatarSrc}
                            alt="Patient"
                            className="main-avatar"
                            onError={(e) => (e.target.src = '/boyicon.png')}
                        />
                        <div className="gender-badge">
                            {isFemale ? <MdFemale size={12} /> : <MdMale size={12} />}
                        </div>
                    </div>
                </div>

                {/* RIGHT : Information */}
                <div className="header-right-col">

                    {/* Row 1 : Name + Edit */}
                    <div className="row-identity row-identity-with-edit">
                        <div>
                            <div className="name-group">
                                <h2 className="name-text">{name}</h2>
                                <div className="contact-icons">
                                    <button className="icon-btn-xs"><MdPhone size={10} /></button>
                                    <button className="icon-btn-xs"><MdEmail size={10} /></button>
                                </div>
                            </div>

                            <div className="meta-group">
                                <span className="meta-pill"><MdPerson /> {gender}</span>
                                <span className="meta-pill"><MdLocationOn /> {location}</span>
                                <span className="meta-pill"><MdWork /> {profession}</span>
                                <span className="meta-pill">
                                    <MdCalendarToday /> {dobString} {age ? `(${age}y)` : ''}
                                </span>
                            </div>
                        </div>

                        {/* EDIT BUTTON (RIGHT SIDE) */}
                        <button
                            className="edit-btn-top"
                            onClick={() => onEdit && onEdit(patient)}
                        >
                            <MdEdit size={12} /> Edit
                        </button>
                    </div>

                    {/* Row 2 : Vitals OR Appointment Slots */}
                    {!isModal ? (
                        /* DEFAULT : VITALS */
                        <div className="vitals-row-below-name">
                            <div className="vital-box">
                                <span className="v-label">BMI</span>
                                <span className="v-val">{bmi}</span>
                            </div>
                            <div className="vital-box">
                                <span className="v-label">Weight</span>
                                <span className="v-val">{weight} <small>kg</small></span>
                            </div>
                            <div className="vital-box">
                                <span className="v-label">Height</span>
                                <span className="v-val">{height} <small>cm</small></span>
                            </div>
                            <div className="vital-box">
                                <span className="v-label">BP</span>
                                <span className="v-val">{bp}</span>
                            </div>
                        </div>
                    ) : (
                        /* MODAL : APPOINTMENT SLOTS */
                        <div className="appt-slots-row">
                            <div className="vital-box appt-box">
                                <span className="v-label">Due Date</span>
                                <span className="v-val small-text">{apptDate}</span>
                            </div>
                            <div className="vital-box appt-box">
                                <span className="v-label">Time</span>
                                <span className="v-val small-text">{apptTime}</span>
                            </div>
                            <div className="vital-box appt-box">
                                <span className="v-label">Type</span>
                                <span className="v-val small-text">{apptType}</span>
                            </div>
                            <div className="vital-box appt-box">
                                <span className="v-label">Mode</span>
                                <span className="v-val small-text">{apptMode}</span>
                            </div>
                        </div>
                    )}

                    {/* Row 3 : Diagnosis & Barriers */}
                    <div className="row-vital-tags">
                        <div className="tags-block">
                            <div className="tag-row">
                                <span className="tag-label">Diagnosis:</span>
                                <div className="tag-list">
                                    {uniqueConditions.map((c, i) => (
                                        <span key={i} className="tag-item condition">{c}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="tag-row">
                                <span className="tag-label">Barriers:</span>
                                <div className="tag-list">
                                    {barriers.map((b, i) => (
                                        <span key={i} className="tag-item barrier">{b}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Row 4 : Appointment Meta (ONLY IF NOT MODAL, since we moved them up) */}
                    {!isModal && (
                        <div className="row-appt-details">
                            <div className="appt-pill"><MdEvent /> {apptDate}</div>
                            <div className="appt-pill"><MdAccessTime /> {apptTime}</div>
                            <div className="appt-pill">Type: <b>{apptType}</b></div>
                            <div className="appt-pill">Mode: <b>{apptMode}</b></div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default PatientProfileHeader;
