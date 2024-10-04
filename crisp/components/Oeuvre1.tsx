"use client";

import { getSession } from "@/utils/sessions";

 
// chargement du SDK Crisp

export default function Oeuvre1() {
    const voter = async () => {

        const session = await getSession();
    
        const reponse = await fetch("/api/voter", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: session.rowid,
            oeuvre: 'oeuvre 1'
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
            <h1> Le Baiser </h1>
            <p>
            Le Baiser est un tableau du peintre autrichien Gustav Klimt, réalisé de 1908 à 1909. Cette peinture à l'huile sur toile recouverte de feuilles d'or est conservée au palais du Belvédère à Vienne. L'œuvre fait partie du Cycle d'or de Klimt et elle est sûrement la plus célèbre du peintre autrichien.
            </p>
            <img src="/image/The_Kiss.jpg" height={400}></img>
            <button onClick={voter}>Voter</button>
        </>
       
    );

    
}