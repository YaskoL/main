"use client";

import { getSession } from "@/utils/sessions";

export default function Oeuvre2() {
    const voter = async () => {

        const session = await getSession();
    
       const reponse = await fetch("/api/voter", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: session.rowid,
            oeuvre: 'oeuvre 2'
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
            <h1> La Joconde </h1>
            <p>
            La Joconde, également connue sous le nom de Mona Lisa, est un tableau peint par Léonard de Vinci entre 1503 et 1506. C’est l’une des œuvres les plus célèbres et mystérieuses de l’histoire de l’art, exposée au Musée du Louvre à Paris.            </p>
            <img src= "/image/joconde.jpg" height={400}></img>
            <button onClick={voter}>Voter</button>
        </>
    );
}