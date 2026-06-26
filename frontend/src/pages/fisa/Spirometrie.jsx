import { useState, useEffect } from "react";
import { formateazaLunaAn } from "../../utils/data";


function Spirometrie({ cnp }) {
    const [spiro, setSpiro] = useState(null);

    async function incarcaSpiro() {
        const raspuns = await fetch(`/spirometrie/${cnp}`);
        if (raspuns.ok) {
            const date = await raspuns.json();
            setSpiro(date);
        }
    }

    useEffect(() => { incarcaSpiro(); }, [cnp]);

    if (!spiro) return <p>Nu exista date de spirometrie pentru acest pacient.</p>;
    return (
        <div className="card">
            <div className="card-titlu">Spirometrie</div>
            <div className="grid-2">
                <div>
                    <div className="eticheta">Data spirometriei</div>
                    <div className="valoare">{formateazaLunaAn(spiro.data_spirometriei)}</div>
                </div>
                <div>
                    <div className="eticheta">FEV1 (%)</div>
                    <div className="valoare">{spiro.fev1_proc}</div>
                </div>
                <div>
                    <div className="eticheta">FVC (%)</div>
                    <div className="valoare">{spiro.fvc_proc}</div>
                </div>
                <div>
                    <div className="eticheta">Interpretare Spirometrie</div>
                    <div className="valoare">{spiro.interpretare}</div>
                </div>
                <div>
                    <div className="eticheta">Severitate</div>
                    <div className="valoare">{spiro.severitate}</div>
                </div>
            </div>
        </div>
    );
}

export default Spirometrie;