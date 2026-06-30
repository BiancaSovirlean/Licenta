import { useState, useEffect } from "react";
import { formateazaLunaAn } from "../../utils/data";
import FormularSpirometrie from "./FormularSpirometrie";

function Spirometrie({ cnp }) {
    const [spiro, setSpiro] = useState(null);
    const [gata, setGata] = useState(false); 

    async function incarcaSpiro() {
        const raspuns = await fetch(`/spirometrie/${cnp}`);
        if (raspuns.ok) {
            const date = await raspuns.json();
            setSpiro(date);
        } else {
            setSpiro(null);
        }
        setGata(true);
    }

    useEffect(() => { incarcaSpiro(); }, [cnp]);

    if (!gata) return <p>Se incarca...</p>;

    if (!spiro) return <FormularSpirometrie cnp={cnp} onSalvat={incarcaSpiro} />;
    
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