"use client";

import { getSession } from "@/utils/sessions";

export default function Oeuvre3() {
    const voter = async () => {

        const session = await getSession();
    
        const reponse = await fetch("/api/voter", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: session.rowid,
            oeuvre: 'oeuvre 3'
          }),
        });

        if(!reponse.ok || reponse.status >= 300){
            alert("Vous avez déja voté !");
          }
          else{
            alert("Merci d'avoir voté !");
          }
      }

  
    
    return (
        <>
        <h1> La Cène </h1>
        <p>
        La Cène en italien : L'Ultima Cena, soit « le Dernier Repas » de Léonard de Vinci est une peinture murale à la détrempe de 460 × 880 cm, réalisée de 1495 à 1498 pour le réfectoire du couvent dominicain de Santa Maria delle Grazie à Milan.            </p>
        <img src= "/image/cene.jpg" height={400}></img>
        <button onClick={voter}>Voter</button>
    </>
    );
}