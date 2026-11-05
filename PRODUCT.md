# KapanDok

## What it is
AI system for hospital outpatient clinics (pilot: RS AR Fachrudin UMS, Solo) that predicts when a doctor will actually start practice and re-times each patient's arrival, delivered as WhatsApp messages. Built for the UMS Health Innovation Hackathon 2026, challenge RS-01.

## Users
- **Patients** (outpatient, including elderly JKN/BPJS patients): receive one WhatsApp message with their personal arrival time; confirm with buttons (Hadir / Jadwal ulang).
- **Doctors**: receive a WhatsApp message and answer with one tap (Tepat waktu / +15 / +30 / +60 / Batal) only when hospital signals are insufficient.
- **Clinic staff (petugas poli)**: web dashboard (built separately by the team).
- **Secondary audience**: hackathon judges reading the proposal appendix.

## Context of use
Patients read on a phone at home before leaving, often older users with limited tech literacy. Doctors glance between surgery or ward rounds; interaction must take one tap. Today staff send these updates manually by WhatsApp (confirmed by the partner, Oct 2026).

## Voice
Polite, calm, concrete Indonesian. Exact times, no jargon, no exclamation-heavy marketing tone. Respectful forms of address (Bapak/Ibu, dr.).

## Constraints
- Channel is WhatsApp: messages must respect WhatsApp Business conventions (template message, up to 3 quick-reply buttons per message, or a list).
- All sample data is simulated and must be labeled "Data simulasi".
- Assumption: patient-facing copy in Bahasa Indonesia only.
