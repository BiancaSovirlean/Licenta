//C:\Users\Bianca\OneDrive\Desktop\LICENTA\frontend\src\pages\fisa\Scoruri.jsx


import { useState, useEffect } from "react";

function Scoruri({ cnp }) {
    const [scoruri, setScoruri] = useState(null);

    async function incarcaScoruri() {
        const raspuns = await fetch(`/scoruri/${cnp}`);
        if (raspuns.ok) {
            const date = await raspuns.json(); setScoruri(date);
        }
    }

    useEffect(() => { incarcaScoruri(); }, [cnp]);
    if (!scoruri) return <p>Nu exista scoruri pentru acest pacient.</p>;
    return (
        <div className="card">
            <div className="card-titlu">Scoruri de severitate</div>
            <div className="grid-2">
                <div>
                    <div className="eticheta">Severitate BSI</div>
                    <div className="valoare">{scoruri.bsi_severitate}</div>
                </div>
                <div>
                    <div className="eticheta">Severitate Faced</div>
                    <div className="valoare">{scoruri.faced_severitate}</div>
                </div>
            </div>
        </div>
    );
}

export default Scoruri;